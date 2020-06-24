const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { kullaniciEkle, kullaniciKaldir, kullaniciBul, odadakiKullanicilar , publicAnahtarlar } = require('./kulanicilar');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ isim, oda }, callback) => {
    console.log(isim);
    
    const { error, kullanici } = kullaniciEkle({ id: socket.id, isim, oda });
    const anahtarlar =  publicAnahtarlar(oda);
    if(error) return callback(error);

    socket.join(kullanici.odaBilgi.oda);
    socket.emit('publicAnahtarlar', anahtarlar);
    socket.emit('mesaj', { kullanici: 'admin', text: `${kullanici.isim}, odaya giris yaptı ${kullanici.odaBilgi.oda}.`});
    socket.broadcast.to(kullanici.odaBilgi.oda).emit('mesaj', { kullanici: 'admin', text: `${kullanici.isim} odaya katildi` });

    io.to(kullanici.odaBilgi.oda).emit('odaBilgi', { oda: kullanici.odaBilgi.oda, kullanicilar: odadakiKullanicilar(kullanici.odaBilgi.oda) });

    callback();
  });

  socket.on('mesajGonder', (mesaj, callback) => {
    const kullanici = kullaniciBul(socket.id);
    console.log(socket.id + "socket");
    console.log(kullanici+"socket");
    console.log(kullanici.isim+"fds");
    console.log(kullanici.odaBilgi.oda+"socket");
    console.log(mesaj);
    io.to(kullanici.odaBilgi.oda).emit('mesaj', { kullanici: kullanici.isim, text: mesaj });

    callback();
  });
  
  

  socket.on('disconnect', () => {
    const kullanici = kullaniciKaldir(socket.id);

    if(kullanici) {
      io.to(kullanici.odaBilgi.oda).emit('mesaj', { kullanici: 'Admin', text: `${kullanici.isim} has left.` });
      io.to(kullanici.odaBilgi.oda).emit('odaBilgi', { oda: kullanici.odaBilgi.oda, kullanicilar: odadakiKullanicilar(kullanici.odaBilgi.oda)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Sunucu calismaya basladi`));
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
    
    
    const { error, kullanici } = kullaniciEkle({ id: socket.id, isim, oda });
    const anahtarlar =  publicAnahtarlar(oda);
    if(error) return callback(error);

    socket.join(kullanici.odaBilgi.oda);
    socket.emit('publicAnahtarlar', {acikanahtarlar : anahtarlar});
    socket.emit('mesaj', { kullanici: 'admin', text: `${kullanici.isim}, odaya giris yaptı ${kullanici.odaBilgi.oda}.`});
    socket.broadcast.to(kullanici.odaBilgi.oda).emit('mesaj', { kullanici: 'admin', text: `${kullanici.isim} odaya katildi` });

    io.to(kullanici.odaBilgi.oda).emit('odaBilgi', {us : kullanici.odaBilgi.us ,mod: kullanici.odaBilgi.mod,oda: kullanici.odaBilgi.oda, kullanicilar: odadakiKullanicilar(kullanici.odaBilgi.oda) });

    callback();
  });

  socket.on('mesajGonder', (mesaj, callback) => {
    const kullanici = kullaniciBul(socket.id);
    
    io.to(kullanici.odaBilgi.oda).emit('mesaj', { kullanici: kullanici.isim, text: mesaj });

    callback();
  });
  
  

  socket.on('disconnect', () => {
    const kullanici = kullaniciKaldir(socket.id);

    if(kullanici) {
      io.to(kullanici.odaBilgi.oda).emit('mesaj', { kullanici: 'Admin', text: `${kullanici.isim} has left.` });
      io.to(kullanici.odaBilgi.oda).emit('odaBilgi', { mod:kullanici.odaBilgi.mod,oda: kullanici.odaBilgi, kullanicilar: odadakiKullanicilar(kullanici.odaBilgi.oda)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Sunucu calismaya basladi`));
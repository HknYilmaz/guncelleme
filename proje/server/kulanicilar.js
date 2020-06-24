const kullanicilar = [];
function between(min, max) {  
  return Math.floor(
    (Math.random() * (max - min + 1) + min)+1
  )
}

const modla = (anahtar,ussu,mod) => {
  return ((ussu**anahtar)%mod);
}

const kullaniciEkle = ({ id, isim, oda }) => {
  isim = isim.trim().toLowerCase();
  oda =  oda.trim().toLowerCase();
  const us = between(0,20);
  const mod = between(0,20);
  let odaBilgi = {};

  const denem = kullanicilar.find((kullanici) => { return kullanici.odaBilgi.oda === oda });
  if(denem === undefined){
    console.log("tanımlanması");
    odaBilgi = { oda , us , mod};
  }
  else{
    odaBilgi = denem.odaBilgi;
  }
  console.log(odaBilgi.oda);
  
  
   

  
  const kullaniciDurumu = kullanicilar.find((kullanici) => kullanici.odaBilgi.oda === oda && kullanici.isim === isim);

  if(!isim || !odaBilgi.oda) return { error: 'Kullanici ismi ve oda gereklidir' };
  if(kullaniciDurumu) return { error: 'Kullanıcı ismi kullanılmıstır' };
  key = between(0,20);
  const kullanici = { id, isim, odaBilgi , key };

  kullanicilar.push(kullanici);
  console.log(isim+"isim");
  
  return { kullanici };
}

const kullaniciKaldir = (id) => {
  const index = kullanicilar.findIndex((kullanici) => kullanici.id === id);

  if(index !== -1) return kullanicilar.splice(index, 1)[0];
}

const kullaniciBul = (id) => kullanicilar.find((kullanici) => kullanici.id === id);


const odadakiKullanicilar = (oda) => kullanicilar.filter((kullanici) => kullanici.odaBilgi.oda=== oda);

const publicAnahtarlar = (oda) => {
  const sil = kullanicilar.map((kullanici) => {
    console.log(kullanici.isim);
    return modla(kullanici.key,kullanici.odaBilgi.us,kullanici.odaBilgi.mod);
  })
  console.log(sil+"sil");
  return sil;
}

module.exports = { kullaniciEkle, kullaniciKaldir, kullaniciBul, odadakiKullanicilar , publicAnahtarlar };
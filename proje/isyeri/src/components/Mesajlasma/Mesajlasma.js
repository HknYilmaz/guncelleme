import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Mesajlar from '../Mesajlar/Mesajlar';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Mesajlasma.css';

let socket;

const Mesajlasma = ({ location }) => {
  const [isim, setIsim] = useState('');
  const [oda, setOda] = useState('');
  const [odaBilgi,setOdaBilgi] = useState([]);
  const [kullanicilar, setKullaniciler] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [text, setText] = useState('');
  const [mesajlar, setMesajlar] = useState([]);
  const [key,setKey] = useState([]);
  const [yedek, setYedek] = useState([]);
  const ENDPOINT = 'localhost:5000';
  const [anahtar,setAnahtar] = useState('');
  const [mod,setMod] = useState('');
  const [us,setUs] = useState('');
  const [deneme,setDeneme] = useState('');
  const [acikkeyler,setacikkeyler] = useState([]);
  useEffect(() => {
    const { isim, oda } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setOda(oda);
    setIsim(isim);
    socket.emit('join', { isim, oda }, (error) => {
      if(error) {
        alert(error);
      }
    });

    socket.on("odaBilgi", ({ oda,kullanicilar }) => {
      
      let anahtar = kullanicilar.find((kullanici) => { return kullanici.isim === isim});
      setKey(anahtar.key);
      setMod(anahtar.odaBilgi.mod);
      setUs(anahtar.odaBilgi.us);  
    });

  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('mesaj', mesaj => {
      setText(mesaj.text);
      setMesajlar(mesajlar => [ ...mesajlar,mesaj ]);
      mesajlar.push(mesaj);
     
      mesajlar.map((sa) => {
        setYedek(yedek.push(sa.text))
        
      })
     
    });
    socket.on('publicAnahtarlar',dene => {
       const sil =  dene.map((sa) => {
        console.log(sa+"sil");
        
      })
      setacikkeyler(dene);
    });


    socket.on("odaBilgi", ({ oda,kullanicilar }) => {
      setKullaniciler(kullanicilar); 
           
    });

}, []);
  
  const yonlendir = () =>{
       
      }
  const mesajGonder = (event) => {
    event.preventDefault();
     if(mesaj) {
      socket.emit('mesajGonder', mesaj, () => setMesaj(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar oda={oda} />
          <Mesajlar mesajlar={mesajlar} isim={isim}  />
          <Input mesaj={mesaj} setMesaj={setMesaj} mesajGonder={mesajGonder} />
      </div>
       
      <TextContainer kullanicilar={kullanicilar} yonlendir={yonlendir} setAnahtar={setAnahtar} parentKey={key} mod={mod} us={us} isim={isim} acikkeyler={acikkeyler}  />
        <h1>{acikkeyler.map((sa) => {console.log(sa+"ananın");
        })}</h1>
    </div>
  )
}

export default Mesajlasma;
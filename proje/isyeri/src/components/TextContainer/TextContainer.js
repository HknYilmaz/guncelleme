import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ kullanicilar, yonlendir,setAnahtar, parentKey, mod,us , isim ,acikkeyler}) =>{
   const [adres,setAdres] = useState('');
   const [gecici,setGecici] = useState([]);
   const [sira,setSira] = useState(0);
   useEffect(() => {
      setGecici(acikkeyler);
   },[]);

  let say = 0 ;
  const modla = (anahtar,ussu) => {
    
    
    
    return (ussu**anahtar)%mod;
   
  }
  const gonder = (e) => {
       setAnahtar(e.target.value);
       let anahtar = e.target.value;
       console.log( "parent" + parentKey.key);
       let acik1 = modla(parentKey.key,us);
       console.log("acik1" +acik1);
       let acik2 = e.target.value; 
       acik2 = modla(acik2,us);
       
       console.log("acik2" +acik2);
       console.log("us" + us);
       console.log("mod" + mod);
       let sonuncu = modla(gecici,acik2);
       console.log( acik2**parentKey.key%mod);
       console.log(acik2+"acik2" + parentKey+"parent" + mod+"mod");
      
       
       
       
       
       
      
      
       
       
       console.log("acik1" + acik1+"acik2" + acik2+"sonuncu" +sonuncu);
       
      setAdres((acik2**parentKey.key)%mod);
       
  }
  
  
  return (
  <div className="textContainer">
    <div>
      <h1>Gerçek zamanlı mesajlaşma uygulaması <span role="img" aria-label="emoji">💬</span></h1>
      <h2>İs yeri eğitimisüresince gelistirilmistir </h2>
      
    </div>
    {
      kullanicilar
        ? (
          <div>
            <h1>Mesajlasan insanlar</h1>
            <div className="activeContainer">
              <h2>
                {/*}
                {kullanicilar.map(({isim,key,odaBilgi}) => (
                  <div key={isim} className="activeItem">
                    {isim}
                    {key}
                   
                  
                    <Link target="_blank" to={`/chat?isim=${parentKey.isim}&oda=${adres}`}>
                          <button className={'bulus mt-30'} value={key} onClick={e => gonder(e)} type="submit">Bulus</button>
                    </Link>
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
                  {*/}
              
                {kullanicilar.filter((kullanici) => {
                  if(kullanici.isim === isim){
                    return false;
                  }
                  else{return true;}
                }).map(({isim,key,odaBilgi}) => (
                  <div key={isim} className="activeItem">
                    {isim}
                    {key}
                   
                  
                    <Link target="_blank" to={`/chat?isim=${parentKey.isim}&oda=${adres}`}>
                          <button className={'bulus mt-30'} value={key} onClick={e => gonder(e)} type="submit">Bulusk</button>
                    </Link>
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}



              </h2>
              

            </div>
          </div>
        )
        : null
    }
                 
  </div>
);
  }
export default TextContainer;
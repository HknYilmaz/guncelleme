import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ kullanicilar, yonlendir,setAnahtar, parentKey, mod,us , isim ,acikkeyler}) =>{
   const [adres,setAdres] = useState('');
   const [gecici,setGecici] = useState([]);
   
   useEffect(() => {
      setGecici(acikkeyler);
   },[]);

  let say = 0 ;
  const modla = (anahtar,ussu) => {
    console.log(acikkeyler+"gecici");
    
    
    return ((ussu**anahtar)%mod);

  }
  const gonder = (e) => {
       setAnahtar(e.target.value);
       let acik1 = modla(parentKey,us);
       let acik2 = e.target.value; 
       acik2 = modla(acik2,us);
       let sonuncu = modla(parentKey,acik2);
       
       
       
      setAdres(sonuncu);
       
  }
  
  
  return (
  <div className="textContainer">
    <div>
      <h1>Gerçek zamanlı mesajlaşma uygulaması <span role="img" aria-label="emoji">💬</span></h1>
      <h2>İs yeri eğitimisüresince gelistirilmistir {console.log(gecici+ "fdfds")}</h2>
      
    </div>
    {
      kullanicilar
        ? (
          <div>
            <h1>Mesajlasan insanlar</h1>
            <div className="activeContainer">
              <h2>
                {kullanicilar.map(({isim,key,odaBilgi}) => (
                  <div key={isim} className="activeItem">
                    {isim}
                    {key}
                   
                   
                    <Link target="_blank" to={`/chat?isim=${isim}&oda=${adres}`}>
                          <button className={'bulus mt-30'} value={key} onClick={e => gonder(e)} type="submit">Bulus</button>
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
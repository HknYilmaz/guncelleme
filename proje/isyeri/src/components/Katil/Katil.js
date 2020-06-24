import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Katil.css';

export default function Katil() {
  const [isim, setIsim] = useState('');
  const [oda, setOda] = useState('');
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Odaya Katıl</h1>
        <div>
          <input placeholder="Isim yaz" className="joinInput" type="text" onChange={(event) => setIsim(event.target.value)} />
        </div>
        <div>
          <input placeholder="Girlecek oda" className="joinInput mt-20" type="text" onChange={(event) => setOda(event.target.value)} />
        </div>
        <Link onClick={e => (!isim || !oda) ? e.preventDefault() : null} to={`/chat?isim=${isim}&oda=${oda}`}>
          <button className={'button mt-20'} type="submit">Kayıt ol</button>
        </Link>
      </div>
    </div>
  );
}

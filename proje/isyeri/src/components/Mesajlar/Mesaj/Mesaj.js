import React from 'react';

import './Mesaj.css';

import ReactEmoji from 'react-emoji';

const Mesaj = ({ mesaj: { text, kullanici }, isim}) => {
  let mevcutKulanici = false;

  const kucukisim = isim.trim().toLowerCase();

  if(kullanici === kucukisim) {
    mevcutKulanici = true;
  }

  return (
    mevcutKulanici
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{kucukisim}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{kullanici}</p>
          </div>
        )
  );
}

export default Mesaj;
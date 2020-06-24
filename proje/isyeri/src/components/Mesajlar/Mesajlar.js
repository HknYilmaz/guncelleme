import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Mesaj from './Mesaj/Mesaj';

import './Mesajlar.css';

const Mesajlar = ({ mesajlar, isim }) => (
  <ScrollToBottom className="mesajlar">
    {mesajlar.map((mesaj, i) => <div key={i}><Mesaj mesaj={mesaj} isim={isim}/></div>)}
    
    
  </ScrollToBottom>
);

export default Mesajlar;
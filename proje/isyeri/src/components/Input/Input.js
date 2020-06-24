import React from 'react';

import './Input.css';

const Input = ({ setMesaj, mesajGonder, mesaj }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={mesaj}
      onChange={({ target: { value } }) => setMesaj(value)}
      onKeyPress={event => event.key === 'Enter' ? mesajGonder(event) : null}
    />
    <button className="sendButton" onClick={e => mesajGonder(e)}>Send</button>
  </form>
)

export default Input;
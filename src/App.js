import React from 'react';
import { useState } from 'react';
import Modal from './components/Modal';
import './index.scss';

function App() {
  const[open,setOpen] = useState(false)

  return (
    <div className="App">
      <button onClick= {()=>setOpen(true)} className="open-modal-btn">✨ Открыть окно</button>
      <Modal open={open} setOpen={setOpen}>Подпись</Modal>
    </div>
  );
}

export default App;

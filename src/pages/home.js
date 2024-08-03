import React from 'react';
import HeaderApp from '../libs/headerApp'; // Verifique se o caminho está correto
import '../App.css'; // Certifique-se de que o Tailwind CSS está configurado corretamente

function Home() {
  return (
    <div>
      <HeaderApp />
      <h1 className="text-4xl">Testando uma parada aqui</h1>
    </div>
  );
}

export default Home;

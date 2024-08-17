import React from 'react';

const AboutUser = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Sobre o Usuário</h2>
      <ul className="space-y-2 text-sm">
        <li>
          <strong>Participações:</strong> 215
        </li>
        <li>
          <strong>Investimentos:</strong> 19.999 ETH
        </li>
        <li>
          <strong>Data de Início:</strong> 01 Julho 2024
        </li>
        <li>
          <strong>Data de Término:</strong> 25 Julho 2024
        </li>
      </ul>
      <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
        Join Telegram
      </button>
    </div>
  );
};

export default AboutUser;


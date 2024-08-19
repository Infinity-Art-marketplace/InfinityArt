import React, { useState } from 'react';
import { useUser } from '../context/UserContext'; // Assumindo que UserContext está no conforme necessário
import ProfileUpdateModal from '../components/ProfileUpdateModal'; // Certifique-se de ajustar o caminho

const AboutUser = () => {
  const { userData } = useUser(); // Obtém os dados do usuário do contexto
  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar a abertura do modal

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSave = () => {
    // Lógica para salvar as atualizações do perfil
    // ...
    setModalOpen(false); // Fecha o modal após salvar
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Sobre o Usuário</h2>
      <ul className="space-y-2 text-sm">
        <li>
          <strong>Usuário Ativo Desde:</strong> {userData ? formatDate(userData.createdAt) : 'Data não disponível'}
        </li>
      </ul>
      <button
        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        onClick={handleOpenModal}
      >
        update profile
      </button>

      {/* Componente do Modal */}
      <ProfileUpdateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default AboutUser;


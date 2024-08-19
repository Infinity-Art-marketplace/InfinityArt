import React, { useState } from 'react';

const ProfileUpdateModal = ({ isOpen, onClose, address }) => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [banner, setBanner] = useState('');

  if (!isOpen) return null; 

  const handleSave = async () => {
    try {
      const userData = {
        username: username.trim(),
        description: description.trim(),
        image: image.trim(),
        banner: banner.trim(),
      };

      const response = await fetch('/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, ...userData }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error('Error updating user:', errorData);
        alert('Erro ao atualizar o perfil. Tente novamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao atualizar o perfil. Tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Atualizar Perfil</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Imagem do Perfil (URL)</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Banner do Perfil (URL)</label>
            <input
              type="text"
              value={banner}
              onChange={(e) => setBanner(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdateModal;


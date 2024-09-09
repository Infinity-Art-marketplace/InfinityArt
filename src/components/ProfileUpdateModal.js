import React, { useState, useEffect } from 'react';
import MyDropzone from './myDropzone';
import { updateUser } from '../backend/updateUser';
import { useUser } from '../context/UserContext';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

const ProfileUpdateModal = ({ isOpen, onClose }) => {
  const { address, isConnected } = useWeb3ModalAccount();
  const { userData, setUserData } = useUser(); // Obtém os dados do usuário do contexto
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [banner, setBanner] = useState('');

  // UseEffect para preencher os campos com os dados atuais do usuário quando o modal é aberto
  useEffect(() => {
    if (isOpen && userData) {
      setUsername(userData.username || '');
      setDescription(userData.userDescription || '');
      setImage(userData.userImage || '');
      setBanner(userData.userBanner || '');
    }
  }, [isOpen, userData]);

  // Função para converter o arquivo em Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const handleSave = async () => {
    if (!address) {
      alert('Endereço não encontrado. Por favor, conecte sua carteira.');
      return;
    }

    try {
      const userData = {
        username: username.trim(),
        description: description.trim(),
        image: image ? image.trim() : null,
        banner: banner ? banner.trim() : null,
      };

      const updatedUser = await updateUser(address, userData);

      if (typeof setUserData === 'function') {
        setUserData(updatedUser);
      } else {
        console.error('setUserData is not a function');
      }

      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar o perfil. Tente novamente.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
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
            <label className="block text-sm font-medium text-gray-700">Imagem do Perfil</label>
            <MyDropzone
              onDrop={async (acceptedFiles) => {
                const file = acceptedFiles[0];
                if (file) {
                  const base64Image = await convertToBase64(file);
                  setImage(base64Image);
                }
              }}
            />
            {image && (
              <img
                src={image}
                alt="Pré-visualização do Perfil"
                className="mt-2 h-32 w-32 rounded-full object-cover"
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Banner do Perfil</label>
            <MyDropzone
              onDrop={async (acceptedFiles) => {
                const file = acceptedFiles[0];
                if (file) {
                  const base64Banner = await convertToBase64(file);
                  setBanner(base64Banner);
                }
              }}
            />
            {banner && (
              <img
                src={banner}
                alt="Pré-visualização do Banner"
                className="mt-2 h-32 w-full rounded-lg object-cover"
              />
            )}
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


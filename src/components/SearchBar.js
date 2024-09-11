import React, { useState, useEffect } from 'react';
import { searchUsers } from '../backend/SearchUser'; // Certifique-se de ajustar o caminho corretamente
import { FiSearch } from 'react-icons/fi'; // Ícone de busca
import { IoMdCloseCircle } from 'react-icons/io'; // Ícone de fechar
import { FaUser } from 'react-icons/fa'; // Ícone de usuário
import { useUser } from '../context/UserContext'; // Importa o contexto para setar o address

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [inputPosition, setInputPosition] = useState(null); // Para capturar a posição do input
  const { setAddress } = useUser(); // Pega a função setAddress do contexto

  // Função para buscar sugestões
  useEffect(() => {
    const loadSuggestions = async () => {
      if (input.length > 0) {
        try {
          const results = await searchUsers(input);  // Busca os usuários
          setSuggestions(results || []);
        } catch (err) {
          setError(`Erro ao buscar sugestões: ${err.message}`);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    loadSuggestions();
  }, [input]);

  // Captura a posição do input para posicionar as sugestões corretamente
  const handleInputPosition = (e) => {
    const rect = e.target.getBoundingClientRect();
    setInputPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  };

  // Função para lidar com o clique na sugestão
  const handleSuggestionClick = (address) => {
    setAddress(address); // Atualiza o contexto com o address clicado
  };

  return (
    <div className="relative w-full"> {/* Layout relativo para manter o controle do dropdown */}
      <div className="relative flex items-center w-full max-w-lg">
        {/* Ícone de busca */}
        <FiSearch className="absolute left-3 text-gray-400" size={20} />

        {/* Input de Pesquisa */}
        <input
          type="text"
          className="w-full pl-10 pr-10 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition duration-200 ease-in-out"
          value={input}
          onChange={e => {
            setInput(e.target.value);
            handleInputPosition(e); // Captura a posição do input ao digitar
          }}
          placeholder="Search"
        />

        {/* Ícone de limpar à direita */}
        <IoMdCloseCircle className="absolute right-3 text-gray-400 cursor-pointer" size={20} onClick={() => setInput('')} />

        {/* Sugestões de Usuários - fixo para flutuar sobre o conteúdo */}
        {inputPosition && suggestions.length > 0 && (
          <ul
            className="fixed bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50"
            style={{
              top: `${inputPosition.top}px`,
              left: `${inputPosition.left}px`,
              width: `${inputPosition.width}px`,
            }}
          >
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer"
                onClick={() => handleSuggestionClick(item.Address)} // Passa o address clicado para o contexto
              >
                <a
                  href={`/user-profile/${item.Address}`}
                  className="flex items-center w-full"
                >
                  <FaUser className="text-black text-2xl mr-3" />
                  <span>{item.username}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default SearchBar;


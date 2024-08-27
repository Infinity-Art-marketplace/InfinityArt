import React from 'react';
import { useDropzone } from 'react-dropzone';

const MyDropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach(file => {
        resizeImage(file).then(resizedImage => {
          onDrop([resizedImage]);
        });
      });
    },
  });

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 300; // Define a largura máxima desejada
          const scaleSize = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          }, file.type, 0.9); // Aumenta a qualidade da imagem para 0.9
        };

        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div
      {...getRootProps()}
      className={`flex justify-center items-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition duration-300 ${
        isDragActive
          ? 'border-blue-400 bg-blue-100'
          : 'border-gray-300 bg-gray-50'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-400">Solte os arquivos aqui...</p>
      ) : (
        <p className="text-gray-500">Arraste e solte alguns arquivos aqui, ou clique para selecionar</p>
      )}
    </div>
  );
};

export default MyDropzone;


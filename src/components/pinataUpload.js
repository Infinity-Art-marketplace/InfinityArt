import React, { useState } from 'react';
import axios from 'axios';
import MyDropzone from './myDropzone';

const PinataUpload = () => {
    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert("Por favor, selecione um arquivo primeiro!");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const pinataMetadata = JSON.stringify({
            name: 'File name',
        });
        formData.append('pinataMetadata', pinataMetadata);

        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        });
        formData.append('pinataOptions', pinataOptions);

        const JWT = process.env.REACT_APP_PINATA_JWT;

        try {
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                maxBodyLength: "Infinity",
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    'Authorization': `Bearer ${JWT}`,
                },
            });
            console.log(res.data);
            setUploadedUrl(`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
        } catch (error) {
            console.log(error);
            alert("Erro ao carregar o arquivo");
        }
    };

    return (
        <div>
            <h2>Upload para Pinata</h2>
            <MyDropzone onDrop={handleDrop} />
            {previewImage && (
                <div className="mt-4">
                    <p>Pré-visualização da Imagem:</p>
                    <img
                        src={previewImage}
                        alt="Pré-visualização"
                        className="mt-2 h-32 w-32 rounded object-cover"
                    />
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Enviar
                </button>
            </form>
            {uploadedUrl && (
                <div className="mt-4">
                    <p>Arquivo carregado para:</p>
                    <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">{uploadedUrl}</a>
                </div>
            )}
        </div>
    );
};

export default PinataUpload;


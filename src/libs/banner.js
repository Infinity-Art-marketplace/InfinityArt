import React from 'react';
import './SummerDay.css';
import imageIcon from '../assets/poko.png'; // Substitua pelo caminho correto da sua imagem

const SummerDay = () => {
    return (
        <div className="container">
            <div className="image-background">
                <div className="content">
                    <div className="title">
                        <img src={imageIcon} alt="One Summer Day" />
                        <h1>One Summer Day</h1>
                        <p>By dailofrog</p>
                    </div>
                    <div className="minting-info">
                        <p>Open edition 0.001 ETH</p>
                        <button>Minting now</button>
                    </div>
                </div>
            </div>
            <div className="view-drop">
                <button>View drop</button>
            </div>
        </div>
    );
}

export default SummerDay;

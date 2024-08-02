import React from "react";
import ConnectButton from "../components/wallet";

const HeaderApp = () => {
    return (
        <header>
            <div className="header">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><ConnectButton /></li>
                </ul>        
            </div>
        </header>
    );
}

export default HeaderApp;

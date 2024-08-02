import React from "react";
import ConnectButton from "../components/wallet";

const Header = () => {
    return (
        <header>
            <div className="header">
                <ConnectButton />
            </div>
        </header>
    )
}

export default Header;
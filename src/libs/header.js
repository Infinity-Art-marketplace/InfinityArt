import React from "react";
import ConnectButton from "../components/wallet";

const Header = () => {
    return (
        <header className="m-2 p-2 box-border">
            <div className="flex justify-between items-center">
                <ul className="flex space-x-4">
                    <li><a href="/">Home</a></li>
                    <li><a href="/user-profile">User Profile</a></li>
                </ul>
                <ConnectButton />
            </div>
        </header>
    );
}

export default Header;


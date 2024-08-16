import React from "react";
import ConnectButton from "../components/wallet";

const Header = () => {
    return (
        <header className="m-2 p-2 box-border">
            <div>
                <ul className="flex justify-between">
                    <li><a href="/">Home(nao existe um home é só placebo)</a></li>
                    <li><a href="/user-profile">user profile</a></li>
                    <li><ConnectButton /></li>
                </ul>
            </div>
        </header>
    );
}

export default Header;

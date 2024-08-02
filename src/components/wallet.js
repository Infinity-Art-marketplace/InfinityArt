import React from 'react';
import { useWeb3Modal } from '@web3modal/ethers/react';

const ConnectButton = () => {
  const { open } = useWeb3Modal();

  return (
    <div>
      <button onClick={() => open()}>Open Connect Modal</button>
      <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
    </div>
  );
};

export default ConnectButton;

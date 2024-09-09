import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Your WalletConnect Cloud project ID
const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID;

// 2. Set chains
const bscMainnet = {
  chainId: 56,
  name: 'Binance Smart Chain',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrl: 'https://bsc-dataseed.binance.org/'
};

const arbitrumSepolia = {
  chainId: 656476,
  name: 'EDU Chain',
  currency: 'ETH',
  explorerUrl: 'https://opencampus-codex.blockscout.com',
  rpcUrl: 'https://rpc.open-campus-codex.gelato.digital'
};

// 3. Create a metadata object
const metadata = {
  name: 'InfinityArt',
  description: 'AppKit Example',
  url: 'https://infinity-art-orcin.vercel.app/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: 'https://rpc.open-campus-codex.gelato.digital', // Arbitrum Sepolia RPC URL
  defaultChainId: 656476, // Arbitrum Sepolia Chain ID
})

// 5. Create a Web3Modal instance
export const initializeWeb3Modal = () => createWeb3Modal({
  ethersConfig,
  chains: [bscMainnet, arbitrumSepolia],
  projectId,
  enableAnalytics: true
})


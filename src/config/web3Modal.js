
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Your WalletConnect Cloud project ID
const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID;


// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
};

const bscMainnet = {
  chainId: 56,
  name: 'Binance Smart Chain',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrl: 'https://bsc-dataseed.binance.org/'
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
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
export const initializeWeb3Modal = () => createWeb3Modal({
  ethersConfig,
  chains: [mainnet, bscMainnet],
  projectId,
  enableAnalytics: true
})
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// this manifest is used temporarily for development purposes
const manifestUrl = 'https://subogdanov.github.io/ton-dapp/tonconnect-manifest.json'

createRoot(document.getElementById('root') as HTMLElement).render(
    <TonConnectUIProvider manifestUrl={manifestUrl}>
        <App />
    </TonConnectUIProvider>,
)

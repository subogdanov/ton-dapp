import { TonConnectButton } from '@tonconnect/ui-react'
import './App.css'
import { useMainContract } from './hooks/useMainContract'
import { useTonConnect } from './hooks/useTonConnect.ts'
import {fromNano} from "@ton/core";
import WebApp from "@twa-dev/sdk";

function App() {
    const {
        contractAddress,
        counterValue,
        contractBalance,
        sendIncrement,
        sendDeposit,
        sendWithdrawalRequest,
    } = useMainContract()

    const { connected } = useTonConnect()

    const showAlert = () => {
        WebApp.showAlert("Hey there!");
    };

    return (
        <div className="App">
            <div className='Card'>
                <TonConnectButton/>
            </div>

            <div className='Card'>
                <div className='Card'>
                    <b>{WebApp. platform}</b>

                    <b>Our contract Address</b>
                    <div className='Hint'>{contractAddress?.slice(0, 30) + "..."}</div>

                    <b>Our contract Balance</b>
                    <div className='Hint'>{fromNano(contractBalance ?? 0)} TON</div>
                </div>

                <div className='Card'>
                    <b>Counter Value</b>
                    <div>{counterValue ?? "Loading..."}</div>
                </div>

                <a onClick={showAlert}>Show Alert</a>

                {connected && (<a onClick={sendIncrement}> Increment by 3</a>)}

                <br />

                {connected && (<a onClick={sendDeposit}> Request deposit of 1 TON</a>)}

                <br />

                {connected && (<a onClick={sendWithdrawalRequest}> Request withdrawal of 0.7 TON</a>)}
            </div>
        </div>
    )
}

export default App

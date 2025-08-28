import { TonConnectButton } from '@tonconnect/ui-react'
import './App.css'
import { useMainContract } from './hooks/useMainContract'

function App() {
    const {
        contractAddress,
        counterValue,
        contractBalance,
    } = useMainContract()

  return (
      <div className="App">
          <div>
              <TonConnectButton/>
          </div>
          <div>
              <div className='Card'>
                  <b>Our contract Address</b>
                  <div className='Hint'>{contractAddress?.slice(0, 30) + "..."}</div>
                  <b>Our contract Balance</b>
                  <div className='Hint'>{contractBalance}</div>
              </div>

              <div className='Card'>
                  <b>Counter Value</b>
                  <div>{counterValue ?? "Loading..."}</div>
              </div>
          </div>
      </div>
  )
}

export default App

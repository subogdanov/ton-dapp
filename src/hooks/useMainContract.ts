import { useEffect, useState } from 'react'
import { MainContract } from '../contracts/MainContract'
import { useTonClient } from './useTonClient'
import { useAsyncInitialize } from './useAsyncInitialize'
import { Address, OpenedContract, toNano } from '@ton/core'
import { useTonConnect } from "./useTonConnect.ts"


export function useMainContract() {
    const client = useTonClient()
    const { sender } = useTonConnect()

    const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

    const [contractData, setContractData] = useState<null | {
        counterValue: number
        recentSender: Address
        ownerAddress: Address
    }>()

    const [balance, setBalance] = useState<number | null>(null)

    const mainContract = useAsyncInitialize(async () => {
        if (!client) return
        const contract = new MainContract(
            Address.parse('kQCo01fgxn0yQaaz5ewf5iq35rA5Dp4CmOLa1YAhH7kF2uuj') // replace with your address from tutorial 2 step 8
        )
        return client.open(contract) as OpenedContract<MainContract>
    }, [client])

    useEffect(() => {
        (async function getValue() {
            if (!mainContract) return
            setContractData(null)
            const data = await mainContract.getData()
            const balance = await mainContract.getBalance()
            setContractData({
                counterValue: data.number,
                recentSender: data.recentSender,
                ownerAddress: data.ownerAddress,
            })
            setBalance(balance)
            await sleep(5000); // sleep 5 seconds and poll value again

            await getValue()
        })()
    }, [mainContract])

    return {
        contractAddress: mainContract?.address.toString(),
        contractBalance: balance,
        ...contractData,
        sendIncrement: async () => {
            return mainContract?.sendIncrement(sender, toNano(0.05), 3)
        },
        sendDeposit: async () => {
            return mainContract?.sendDeposit(sender, toNano(1))
        },
        sendWithdrawalRequest: async () => {
            return mainContract?.sendWithdrawalRequest(sender, toNano(0.05), toNano(0.7))
        },
    }
}

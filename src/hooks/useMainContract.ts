import { useEffect, useState } from 'react'
import { MainContract } from '../contracts/MainContract'
import { useTonClient } from './useTonClient'
import { useAsyncInitialize } from './useAsyncInitialize'
import { Address, OpenedContract } from '@ton/core'


export function useMainContract() {
    const client = useTonClient()
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
        async function getValue() {
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
        }
        getValue()
    }, [mainContract])

    return {
        contractAddress: mainContract?.address.toString(),
        contractBalance: balance,
        ...contractData,
    }
}

import { createContext, ReactNode, useEffect, useState } from "react";

interface TransactionData {
    id: string;
    description: string;
    amount: number;
    date: string;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsData{
    incomes: number,
    expenses: number,
    total: number,
    transactions: TransactionData[],
    formatAmount: (params: number) => string,
    addTransaction: (params: TransactionData)=>void,
    removeTransaction: (params: string) => void
}

export const Transactions = createContext({} as TransactionsData)

export const TransactionsProvider = ({children}: TransactionsProviderProps) => {

    const addTransaction = (transaction) => {
        const {description, amount, date} = transaction
        setTransactions([...transactions, {
            id: generateHash(description,amount,date),
            description: transaction.description,
            amount: Number(transaction.amount)*100,
            date: transaction.date
        }])
    }
    
    const removeTransaction = (id:string) => {
        let newTransactions = transactions
        let index = 0
        newTransactions.forEach(transaction=>{
            if(transaction.id==id) {index = transactions.indexOf(transaction)}
        })
        newTransactions.splice(index, 1)
        setTransactions(newTransactions)
        reload()
    }

    const reload = () => {
        setIncomes(0)
        setExpenses(0)
        //setTotal(0)
    }

    const formatAmount = (value:number) => {
        const signal = value<0?'- R$ ':'R$ '
        const numbered = value<0?Number((value/100)*(-1)):Number(value/100)
        let amount = signal+String(numbered.toFixed(2))
        return amount
    }

    const generateHash = (description, amount, date) => {
        const descriptionSplitted = description.split(' ')
        const dateSplitted = date.split('-')
        return `${descriptionSplitted.toString()}-${Math.random()+amount}${Math.random()+Number(dateSplitted[0]+dateSplitted[1]+dateSplitted[2])}`
    }

    const [transactions, setTransactions] = useState<TransactionData[]>([])
    
    const [incomes, setIncomes] = useState(0)

    const [expenses, setExpenses] = useState(0)

    const [total, setTotal] = useState(0)

    useEffect(()=>{
        reload()
        
        let entries = 0
        let exits = 0

        transactions.map(transaction => {
            let {amount} = transaction
            amount>=0 ? (entries+=amount) : (exits+=amount)
        })

        setIncomes(entries)
        setExpenses(exits)
        console.log(transactions)
    }, [transactions,incomes, expenses])

    useEffect(()=>{
        setTotal(incomes+expenses)
    }, [incomes, expenses])

    return (
        <Transactions.Provider value={{
            incomes,
            expenses,
            total,
            transactions,
            formatAmount,
            addTransaction,
            removeTransaction
        }}>
            {children}
        </Transactions.Provider>
    )
}
import React, { useContext } from 'react'
import { Transactions } from '../../contexts/TransactionsContext'
import { UpdateProductModalContext } from '../../contexts/UpdateProductModalContext'

import styles from '../../styles/components/DataTable.module.css'

export const DataTable = ({ transactions, text}) => {
    const { formatAmount } = useContext(Transactions)
    const {toggleUpdateModal, get} = useContext(UpdateProductModalContext)

    const chils = transactions.length>0&&(
        transactions.map(transaction=>{
            const {description, amount, date, id} = transaction
            const textcolor = amount < 0 ? '#ff0000' : '#00ff00'
            return (<tr 
                      key={id} 
                      style={{color: text}}>
                        <td
                          onClick={()=> {
                            toggleUpdateModal(id)
                            get(description, amount, date)
                        }}>{description}</td>
                        <td 
                          style={{color: textcolor}}
                          onClick={()=> {
                            toggleUpdateModal(id)
                            get(description, amount, date)
                        }}>{amount}</td>
                        <td
                          onClick={()=> {
                            toggleUpdateModal(id)
                            get(description, amount, date)
                        }}>{date}</td>
                        <td onClick={()=>alert(`Sucessfully deleted: ${id}`)}>
                            <img src="icons/minus.svg" />
                        </td>
                    </tr>)
        })
    )

    return (
        <div className={styles.dataTableContainer}>
            <table className={styles.dataTable}>
                <thead>
                    <tr style={{color: text}}>
                        <td>Description</td>
                        <td>Amount</td>
                        <td>Date</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    { chils }
                </tbody>
            </table>
        </div>
    )
}
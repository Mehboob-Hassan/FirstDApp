import React, { useContext } from "react";
import { TransactionContext } from "../context/TransContext";
import { shortenAddress } from "../utils/shortenAddress";
import dummyData from "../utils/dummyData";

// Functional Transaction Card Component
const TransactionsCard = ({addressTo, addressFrom, timestamp, message, keyword, amount}) =>{
    return (
        <div className="transactioncard">
            <p>From : {shortenAddress(addressFrom)}</p>
            <p>To : {shortenAddress(addressTo)}</p>
            <p>Message : {message}</p>
            <p>amount : {amount}</p>
        </div>
    )
}

const Transactions = ()=>{
    const {currentAccount, transactions}  = useContext(TransactionContext);

    const {addressFrom,addressTo,amount,keyword,message,timestamp} = transactions;

    return(
        <div className="transactions">
            <div className="inner-transaction">
                {[...transactions].reverse().map((transaction, i)=>(
                    <TransactionsCard key={i} {...transaction} />
                ))}
            </div>
        </div>
    );
}

export default Transactions;
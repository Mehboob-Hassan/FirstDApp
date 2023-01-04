import React, { useState, useEffect} from "react";
import {ethers} from 'ethers';

import { contractAbi, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();
const {ethereum} = window;

//---------------GET ETHEREUM CONTRACT-------------------
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer);

    return transactionContract;
}


//------------------- TRANSACTION PROVIDER-------------------
export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [formData, setFormData] = useState({addressTo : '', amount : '', phrase : ''});
    const [isLoading, setLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    // HANDLE CHANGE TO CHANGE VALUES OF INPUT FIELDS
    const handleChange = (e)=>{
        setFormData((prevState)=>({...prevState, [e.target.name]: e.target.value}));
    }
    

        // ----------------GET ALL TRANSACTIONS
        const getAllTransactions = async()=>{
            try {
                if(!ethereum) return alert("Please Install the metamask");
                const transactionContract = getEthereumContract();

                const availableTransactions = await transactionContract.getAllTransactions();

                const structuredTransactions = availableTransactions.map((transaction)=>({
                    addressFrom: transaction.sender,
                    addressTo: transaction.receiver,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18),
                    keyword: transaction.keyword,
                    message: transaction.message,
                    timestamp : new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                }));

                console.log("Structured Trans", structuredTransactions);
                setTransactions(structuredTransactions);  
                console.log("Transaction setted: ", transactions)
                console.log("available Transactions", availableTransactions);
            } catch (error) {
                console.log(error);
            }
        }


    // -----------CHECK IF WALLET IS CONNECTED
    const checkIfWalletIsConnected = async()=>{
       try {
         if(!ethereum) return alert("Please Install the metamask");
         const accounts = await ethereum.request({method: 'eth_accounts'});
 
         if(accounts.length){
             setCurrentAccount(accounts[0]);
 
             getAllTransactions();
         }else{
             console.log("No account Found")
         }
         console.log(accounts);
       } catch (error) {
            console.log("NO ethereum Object");
       }
    }

    // ---------------CHECK IF TRANSACTIONS EXISTS
    const checkIfTransactionExist = async()=>{
        try {
            if(!ethereum) return alert("Please Install the metamask");
            const transactionContract = getEthereumContract(); 

            const transactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem('transactionCount', transactionCount);
        } catch (error) {
            console.error(error);
            throw new Error("NO ethereum Object")
        }
    }


    // ----------------CONNECT WALLET---------------
    const connectWallet = async()=>{
        try {  
            if(!ethereum) return alert("Please Install the metamask");

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error(error);
            throw new Error("NO ethereum Object")
        }
    }


    // -------------SEND TRANSACTION--------------------
    const sendTransaction = async()=>{
        try {
            if(!ethereum) return alert("Please Install the metamask");

            const {addressTo, amount, phrase} = formData;

            const transactionContract = getEthereumContract();
            // parese decimal amount in gwei hexadecimal
            const parsedAmount = ethers.utils.parseEther(amount);
            // -----------

            //code for sending ethereums 
        // ---------------
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',   //21000 GWEI
                    value: parsedAmount._hex, //
                }]
            })
        // --------------- 

        // Add Transaction (store) to Blockchain
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, phrase, "Keyword");

            setLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setLoading(false);
            console.log(`Successful - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());  
            window.reload();
        } catch (error) {
            console.error(error);
            throw new Error("NO ethereum Object")
        }
    }

    useEffect(()=>{
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions }}>
            {children}
        </TransactionContext.Provider>
    );
}
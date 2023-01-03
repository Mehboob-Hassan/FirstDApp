import React, { useState, useEffect} from "react";
import {ethers} from 'ethers';

import { contractAbi, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();
const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [formData, setFormData] = useState({addressTo : '', amount : '', phrase : ''});


    const handleChange = (e)=>{
        setFormData((prevState)=>({...prevState, [e.target.name]: e.target.value}));
    }

    const checkIfWalletIsConnected = async()=>{
       try {
         if(!ethereum) return alert("Please Install the metamask");
         const accounts = await ethereum.request({method: 'eth_accounts'});
 
         if(accounts.length){
             setCurrentAccount(accounts[0]);
 
             // getAllTransactions
         }else{
             console.log("No account Found")
         }
         console.log(accounts);
       } catch (error) {
            console.log("NO ethereum Object");
       }
    }

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

    const sendTransaction = async()=>{
        try {
            if(!ethereum) return alert("Please Install the metamask");

            const {addressTo, amount, phrase} = formData;
            getEthereumContract();

        } catch (error) {
            console.error(error);
            throw new Error("NO ethereum Object")
        }
    }

    useEffect(()=>{
        checkIfWalletIsConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
}
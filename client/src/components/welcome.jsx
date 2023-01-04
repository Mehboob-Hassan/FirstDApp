import React, { useContext } from "react";
import { TransactionContext } from "../context/TransContext";
import { shortenAddress } from "../utils/shortenAddress";

const Welcome = ()=>{
    const { connectWallet, currentAccount, formData, sendTransaction, handleChange } = useContext(TransactionContext);

    const handleSubmit = (e)=>{
        const {addressTo, amount, phrase} = formData;
        e.preventDefault();

        if(!addressTo || !amount || !phrase) return console.log("No data found");
        sendTransaction();
     }
    return(
        <div className="welcome">
            <div className="left">
                <h1>Hello this is my First DApp </h1>
                {!currentAccount && (
                    <button className="connectButton" type="text" onClick={ connectWallet }>Connect to Wallet</button>
                )}
            </div>
            <div className="right">
                <div className="card">
                <h3>{shortenAddress(currentAccount)}</h3>
                    <h4>Etherium</h4>
                </div>
                <div className="form">
                    <div >
                        <input name="addressTo" placeholder="Enter address" onChange={handleChange} /><br />
                        <input name="amount" placeholder="Enter the Amount in Ethers"  onChange={handleChange} /><br />
                        <input name="phrase" placeholder="Enter the  phrase"  onChange={handleChange} /><br />
                        <button className="btnSubmit" type="button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
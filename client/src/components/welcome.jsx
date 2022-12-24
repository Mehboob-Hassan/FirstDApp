const Welcome = ()=>{
    const connect = ()=>{  }
    return(
        <div className="welcome">
            <div className="left">
                <h1>Hello this is my First DApp </h1>
                <button className="connectButton" type="text" onClick={connect}>Connect to Wallet</button>
            </div>
            <div className="right">
                <div className="card">
                    <h3>Address</h3>
                    <h4>Etherium</h4>
                </div>
                <div className="form">
                    <form action="">
                        <input placeholder="Enter the Address" type={Text} /><br />
                        <input placeholder="Enter the Amount in Ethers" type={Number} /><br />
                        <input placeholder="Enter the Amount phrase" type={Text} /><br />
                        <button className="btnSubmit" type="submit" onClick={send}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
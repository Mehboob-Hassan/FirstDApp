export const shortenAddress = (address)=>{ 
    if(address){
        return `${address.slice(0,6)}...${address.slice(address.length-5)}`;
    }
        return "";
    };


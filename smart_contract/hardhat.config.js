require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/ho_iWNnacUFgV88NSt8EbgyvossF4YrE',
      accounts: ['5f71c1b4a61ba391e649ab616a138f3399597302de11c24d72397a4cbb8b8ace']
    }
  }
}
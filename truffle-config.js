module.exports = {
  contracts_build_directory: "src/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777", // Match any network id
      gas: 5000000,
      from: '0x2fcF19054E33c60a2d5A182C17f29C63fdE1B6DD'
    }
  },
  compilers: {
    solc: {
      version: "0.8.13",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};

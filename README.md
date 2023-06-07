# HouseLocker

Per usare l'applicazione:
- aprire ganache
- vai in ./smart_contracts/bank
- $ truffle migrate
- su ganache in transazioni andare sull'ultima transazione (che sarà Contract Creation) e copiare il "Created Contract Address"
- incollare questo indirizzo in web3_init.js nella variabile bankAddress
- $ npm start
- vai su http://localhost:3000

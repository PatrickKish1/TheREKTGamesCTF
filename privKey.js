const { numberToHex } = require('viem')
const { privateKeyToAccount } = require('viem/accounts')

// Convert the known date to Unix timestamp
const startTimestamp = Math.round(new Date('2008-10-31T00:00:00.000Z').getTime() / 1000);

let i = startTimestamp;
while(true) {
    if(i % 1000000 === 0) {
        console.log(`Trying: ${i}`);
    }
    
    let privateKey = numberToHex(i, { size: 32 })
    const account = privateKeyToAccount(privateKey);
    
    if (account.address.toLowerCase().startsWith('0xc0de')) {
        console.log(`Found the vulnerable wallet!`);
        console.log(`Address: ${account.address}`);
        console.log(`Private key: ${privateKey}`);
        break;
    }
    i++;
}
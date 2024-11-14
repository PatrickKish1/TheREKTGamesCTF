REKT HACKATHON

CHALL - CRYPTO (INTERNS VANITY)

First, let's look at the concerning aspects of this script:

The intern is using a sequential counter starting from the current Unix timestamp as the private key
We have the exact date when this script was run (from the comment): 2008-10-31T00:00:00.000Z
The script converts this counter directly into a private key

This is extremely unsafe because:

Private keys should be randomly generated, not sequential
We know the exact starting point
We can recreate the same sequence

CODE:
const { numberToHex } = require('viem')
const { privateKeyToAccount } = require('viem/accounts')

// script to create a new account starting with 0xc0de
// @authot RedGuildIntern
// @date 2008-10-31T00:00:00.000Z
	const start = Math.round(new Date().getTime() / 1000);

let i = start;
while(1) {
    if(i % 1000000 === 0) {
        console.log(`i: ${i}`);
    }
    let priv = numberToHex(i, { size: 32 }) 
    const account = privateKeyToAccount(priv); 
    let w = account;
    if (w.address.toLowerCase().startsWith('0xc0de')) {
        console.log(`Found it! ${account.address}`);
        console.log(`Private key: ${priv}`);
        break;
    }
    i++;
}


SOLUTION:
The vulnerability here is a classic case of using sequential numbers instead of cryptographically secure random numbers for key generation. Since we know:

The exact timestamp when the script was run
That the counter starts from that timestamp
That the script uses a simple increment

We can replicate the exact same sequence and find the private key.
The private key will be the flag for this challenge, and running this script will reveal it. This proves the wallet is completely compromised, as anyone with knowledge of when the script was run can recover the private key.
Security lessons:

Never use sequential or predictable numbers for cryptographic keys
Always use cryptographically secure random number generators for key generation
Don't skip security reviews, even for "quick wins"
Be suspicious of surprisingly quick solutions to cryptographic problems

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

// OUTPUT
Found the vulnerable wallet!
Address: 0xc0dE5709cEdf8AfadEEDB41cfdCD52B4026Dad01
Private key: 0x00000000000000000000000000000000000000000000000000000000490b69ce






CHALL - secrets FIND THE LEAK PART I 
FIND .ENV FILE
GET THE PK=c2VjcmV0IGFwZSBmb3Jnb3Qgc2VlZCBwaHJhc2Ugbm93IHdhbGxldCByZWt0IGhhY2tlcnMgbGF1Z2ggd2ViMyBzZWN1cml0eSBmYWlscw==
USE CYBERCHEF TO DECODE - secret ape forgot seed phrase now wallet rekt hackers laugh web3 security fails
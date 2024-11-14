The REKT Games' CTF by the red guild 🪷

----------------Challenges--------------------

├──[-] calldata
│   ├── Calldata Detective 🕵️ (10)
│   ├── Calldata fish 🐟 (75)
│   └── Calldata Optimizoooor 🧙‍♂️ (100)
│
├──[-] scavenger
│   ├── The Devcon Workshop 🙋 (10)
│   ├── The Booth 👋 (10)
│   ├── Frameworks 🦭 (10)
│   └── Phishing Dojo 🎣 (30)
│
├──[-] hello-world
│   └── Sanity check, hello world! (20)
│
├──[-] crypto
│   ├── The Intern's Vanity 🔑 (#1) (30)
│   ├── The Intern's KeyStore 🔑 (#3) (50)
│   └── The Intern's Profanity 🔑 (#2-2) (300)
│
├──[-] spoofing
│   └── Red Spoofing 🔀 (50)
│
├──[-] secrets
│   ├── Find the leak! - Part I 🙊 (50)
│   ├── Find the leak! - Part II 🙊 (50)
│   └── Find the leak! - Container 📂 (50)
│
└──[-] supply chain
    └── Worktest 💻 (100)



CHALLENGE - calldata
-> Calldata Detective 🕵️:

As a member of a prominent DAO's multisig, you've just received an urgent email from a fellow council member:

    "Hey! We need your signature ASAP for this routine maintenance transaction. Nothing major, just some standard updates. Could you sign it right away?"

The transaction's calldata looks innocent enough: 0xf2fde38b000000000000000000000000098b716b8aaf21512996dc57eb0615e2383e2f96
trezor

But something feels off about the urgency. Before blindly signing, maybe you should decode what this transaction actually does...

<img width="508" alt="Screenshot_2024-11-01_at_14 05 35" src="https://github.com/user-attachments/assets/c6f084e0-be59-4d16-9024-152fb3eb3e77">


Task
Decode the transaction's calldata to reveal its true purpose. What exactly are you being asked to sign?

Flag
A human-readable description of the function call, like: transfer(0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045,1000)


With this challenge the best way to start is analyzing the calldata: 0xf2fde38b000000000000000000000000098b716b8aaf21512996dc57eb0615e2383e2f96.

A calldata is made up of a function selector and its arguments. The first 4bytes of the calldata is the function selection and the rest are arguments. In the calldata the function selector will be: 0xf2fde38b and the the argument will be: 98b716b8aaf21512996dc57eb0615e2383e2f96. So first go to https://www.4byte.directory/ and search for the function selector to know its arguments.

![image](https://github.com/user-attachments/assets/2ee9cda9-5ffd-4abe-adfc-9f03374a8030)

Here due to the nature of the situation we go for the second options and also because there is only one argument.
Using ethers we can use node to decode the calldata knowing the selector name and the argument. The code: https://github.com/PatrickKish1/TheREKTGamesCTF/blob/main/datadecoder.js  decodes it.



-> Calldata fish 🐟 


During the investigation of a phishing campaign, someone on X shared this calldata of an Ethereum transaction. They lost the tx hash, so it's hard to know more details. All we know is that it was flagged as an approval of a stablecoin by a monitoring system.

0x8fcbaf0c000000000000000000000000b4d44b2217477320c706ee4509a40b44e54bab850000000000000000000000000629b1048298ae9deff0f4100a31967fb3f989620000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006907dbf70000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000001b99a694ae810fa810c9c6fc8fa039a3e021244e3c05909d674a400d82a15c0eb13a57e18015ba577966d250fa7f3ac45742a22df9e4c6bd914016b3470f12dcf6

Task

Analyze the calldata to find out the token address and how many tokens the phishing victim could lose.
Flag

The token address and how many tokens the phishing victim could lose, separated by a -.




-> Calldata Optimizoooor 🧙‍♂️ 

One of our ex-employees left behind a peculiar smart contract with some... interesting constraints. The contract needs to be initialized, but there's a catch - the initialization function has some tricky requirements:

// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

contract Demo {
   bool public initialized;
	 
   function initialize(uint256[] calldata prev, uint256[] memory next) external {
       require(prev.length == next.length, "inaccurate length");
       require(msg.data.length < 101, "msg too long");
       
       initialized = true;
   }
}

We need to set initialized to true.
Task

Craft the perfect calldata that satisfies all requirements to initialize this contract.
Flag

The complete calldata starting with a function selector, such as: 0xbb4b2443...





CHALLENGE - CRYPTO
-> The Intern's Vanity 🔑 (#1) 


A new intern has joined The Red Guild's team.

Skipping the usual security onboarding, management needed a quick win and assigned the intern the first task: to generate a vanity wallet address starting with 0xc0de. This wallet will be used in the future to deploy the Guild's on-chain vault.

The intern delivered surprisingly quickly, and the deployment went ahead. But something feels off about how fast they accomplished this seemingly complex task...
Files Vanity wallet generation script https://github.com/theredguild/therektgames-archive/tree/main/guild-intern

    
Your task
Is the intern's wallet generation script safe? If you can uncover a security vulnerability and get the Guild wallet's private key, you'll earn the respect of the Guild.

Flag
The wallet's private key. For example:

0x9bf1d24dc556910168f9a3c54db8d62deebff71820ee009531a51702700a27d0



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


-> The Intern's KeyStore 🔑 (#3) 


Third time's the charm? Not for our intern. After multiple security blunders, The Red Guild finally intervened, providing two secure private keys for their multisig wallet.

Our security-conscious (but still green) intern decided to add an "extra layer of protection" by encrypting the keys in keystore format.

However, in a classic rookie move, he accidentally leaked the keystores folder online.

"No worries," said, "it's encrypted after all!"
Files

The leaked keystores: guild-intern-keystore https://github.com/theredguild/therektgames-archive/tree/main/guild-intern-keystore

Task

Crack the keystores encryption and retrieve both private keys. Show the intern why encryption is only as strong as its weakest link.
Flag

The private keys separated with a -.

For example: 0x3d2b5f39a5a425110a4ac8333794b4eb9db5d80b4cb652fb03b9f57cd96f438a-0xcbe2584036801cfd0d5664c466d85b9af865dbd8d9f685deff5ad1cf70eb83c7





CHALL - secrets
-> Find the leak! - Part I 🙊



We have been hired by the Ethereum Foundation to do an assessment on what appears to be a leak inside some of their repos.

They suspect some devs mistakenly submitted some sensitive data into the geth’s repository (go-ethereum), but couldn’t figure out where, and if it is an isolated case or not.

We have forked it under theredguild/goat-ethereum, so go and take a look, see what you can find.

So far, they identified a mnemonic / seed phrase consisting of 12 words. Can you help them find it?
https://github.com/theredguild/goat-ethereum 

FIND .ENV FILE
GET THE PK=c2VjcmV0IGFwZSBmb3Jnb3Qgc2VlZCBwaHJhc2Ugbm93IHdhbGxldCByZWt0IGhhY2tlcnMgbGF1Z2ggd2ViMyBzZWN1cml0eSBmYWlscw==
USE CYBERCHEF TO DECODE - secret ape forgot seed phrase now wallet rekt hackers laugh web3 security fails

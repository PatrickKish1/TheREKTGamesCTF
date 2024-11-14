const { ethers } = require('ethers');

// Raw transaction hex provided
const rawTxHex = '0x02f88e83aa36a780843b9aca00853227f4d2e482548a94badc0de0bbf4758160bc9ca795b573a076fa484d80a0546869732074696d65206e6f626f64792077696c6c206861636b206d65000000c001a06b2aec6082d83b9839da7fd2d4555d52c95d2d06b5c23ff2f960c8a8cac110e3a02457e36ad57bc05f695622bf816ba3c74f537e69c5e3ac03d27f83f5593197f4';

// Parse the transaction
const tx = ethers.utils.parseTransaction(rawTxHex);

// Extract the public key from the transaction signature
const publicKey = ethers.utils.recoverPublicKey(tx.hash, {
    r: tx.r,
    s: tx.s,
    v: tx.v
});

console.log('Public Key:', publicKey);

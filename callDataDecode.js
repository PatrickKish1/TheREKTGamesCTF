const ethers = require('ethers');

// The calldata you provided
const calldata = '0x8fcbaf0c000000000000000000000000b4d44b2217477320c706ee4509a40b44e54bab850000000000000000000000000629b1048298ae9deff0f4100a31967fb3f989620000000000000000000000000000000000000000000000000000000000006907dbf70000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000001b99a694ae810fa810c9c6fc8fa039a3e021244e3c05909d674a400d82a15c0eb13a57e18015ba577966d250fa7f3ac45742a22df9e4c6bd914016b3470f12dcf6';

// Define the function signature
const functionSignature = 'permit(address,address,uint256,uint256,bool,uint8,bytes32,bytes32)';

// Decode the calldata
const iface = new ethers.utils.Interface([functionSignature]);
const decoded = iface.parseTransaction({ data: calldata });

console.log('Function:', decoded.name);
console.log('Parameters:');
console.log('- token address:', decoded.args[0]);
console.log('- spender address:', decoded.args[1]);
console.log('- token amount:', ethers.utils.formatUnits(decoded.args[2], 18));
console.log('- nonce/deadline:', decoded.args[3]);
console.log('- flag:', decoded.args[4]);
console.log('- signature data:', {
  v: decoded.args[5],
  r: decoded.args[6],
  s: decoded.args[7]
});
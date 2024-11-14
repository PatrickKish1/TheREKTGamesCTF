// Common Ethereum function signatures and their human-readable formats
const knownFunctionSignatures = {
    "0xf2fde38b": "transferOwnership(address)",
    "0xa9059cbb": "transfer(address,uint256)",
    "0x23b872dd": "transferFrom(address,address,uint256)",
    "0x095ea7b3": "approve(address,uint256)",
    "0x70a08231": "balanceOf(address)",
    // Add more signatures as needed
};

function decodeCalldata(calldata) {
    // Extract function signature (first 4 bytes / 8 characters after 0x)
    const functionSignature = calldata.slice(0, 10);
    
    // Extract parameters (remaining data)
    const parameters = calldata.slice(10);
    
    // Get function name
    const functionName = knownFunctionSignatures[functionSignature] || "Unknown Function";
    
    // For transferOwnership, decode the address parameter
    if (functionSignature === "0xf2fde38b") {
        // Extract the address (32 bytes / 64 characters)
        const address = "0x" + parameters.slice(24); // Remove padding and add 0x prefix
        
        return {
            functionName: "transferOwnership",
            decodedCall: `transferOwnership(${address})`,
            warning: "⚠️ WARNING: This is attempting to transfer contract ownership!"
        };
    }
    
    return {
        functionName: "Unknown",
        decodedCall: "Could not decode parameters",
        warning: "⚠️ Unable to decode this calldata"
    };
}

// Test with the provided calldata
const calldata = "0xf2fde38b000000000000000000000000098b716b8aaf21512996dc57eb0615e2383e2f96";
const result = decodeCalldata(calldata);
console.log(result);
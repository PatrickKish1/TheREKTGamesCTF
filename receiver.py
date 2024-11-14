from eth_account import Account
import secrets

# Define the target pattern (first 3 and last 3 characters)
target_start = "7d2"
target_end = "023"

# Loop until an address matching the pattern is found
while True:
    # Generate a random private key
    private_key = "0x" + secrets.token_hex(32)
    
    # Generate the corresponding Ethereum address
    acct = Account.from_key(private_key)
    address = acct.address.lower()  # Convert to lowercase for consistent comparison
    
    # Check if the address matches the target pattern
    if address[2:5] == target_start and address[-3:] == target_end:
        print("Matching Address Found!")
        print("Address:", address)
        print("Private Key:", private_key)
        break

print("Done.")

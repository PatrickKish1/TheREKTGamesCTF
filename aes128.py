import hashlib
import pyscrypt
from Crypto.Cipher import AES

# Scrypt parameters
salt = bytes.fromhex('ad1696a0d6c32aa655b96095ac52a776b9467c8537ede8f87dc4cd839aef954d')
iv = bytes.fromhex('af3cf18836b3ed28c08d95cee6f8e1dc')
ciphertext = bytes.fromhex('20ddf02bce09ef123e42e2722146dc48b329cc3b01695501426e1b3fde09a09d')
mac_provided = bytes.fromhex('3154bc01fd590f1d29478e90b3e1b51ce6e4595fe793ac18da2eb00aba887f24')

# Replace with your password or brute-force logic
passphrase = 'password123'

# Key derivation
derived_key = pyscrypt.hash(password=passphrase.encode(), salt=salt, N=8192, r=8, p=1, dkLen=32)
aes_key = derived_key[:16]

# Decrypt
cipher = AES.new(aes_key, AES.MODE_CTR, nonce=iv)
plaintext = cipher.decrypt(ciphertext)

# Check MAC for verification
mac_calculated = hashlib.sha3_256(derived_key[16:32] + ciphertext).digest()
if mac_calculated == mac_provided:
    print("Decryption successful!")
    print("Private key:", plaintext.hex())
else:
    print("MAC check failed. Wrong passphrase or corrupted data.")

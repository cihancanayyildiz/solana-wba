import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "./wallet/wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
// 6Mf1QLKbbU49dcsFKnANF45K6SytCXCwnfjdC31VngP1
const mint = new PublicKey("6Mf1QLKbbU49dcsFKnANF45K6SytCXCwnfjdC31VngP1");

(async () => {
    try {
        // Create an ATA
        // const ata = ???
        // console.log(`Your ata is: ${ata.address.toBase58()}`);

        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log(`ata is: ${ata.address.toBase58()} https://explorer.solana.com/tx/${ata.address}?cluster=devnet`);

        // ata: AxjdEqWah6aq98PHZK2QMHbq1xeGLMyC9aP2HVF3BC3j
        // Mint to ATA
        // const mintTx = ???
        // console.log(`Your mint txid: ${mintTx}`);

        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair, 100);

        // https://explorer.solana.com/tx/hDhkZn1gtQDdXoQekzfUZLEyU311ZKhJRzq6nooE6ahn6tCudyHgQALnnv1ak6Ff2FeCj4tfDUk55GSWGuhQFvp?cluster=devnet
        console.log(`Your mint txid: https://explorer.solana.com/tx/${mintTx}?cluster=devnet`);

    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()

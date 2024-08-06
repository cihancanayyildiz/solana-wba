import wallet from "./wallet/wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://arweave.net/UJMRCn3jmDlGjrfhyJOXH9-Q55ez40qfh7oGT3GdXWA"
        const metadata = {
            name: "The Cihan Rug",
            symbol: "CANRUG",
            description: "the can rug",
            image,
            attributes: [
                {trait_type: "material", value: "fur"}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your image URI: ", myUri);
        // https://arweave.net/oLN6JE46zc_oC3qE-NF_i0npP7fG31aqZdk0-X1omrg
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

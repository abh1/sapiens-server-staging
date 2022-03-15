const sendTokens = (req: any, res: any) => {};
import * as splToken from "@solana/spl-token";
import { PublicKey, Connection, Keypair, Transaction } from "@solana/web3.js";
let bs58 = require("bs58");

require("dotenv").config();

export const send = async (toAddress: any) => {
  let secretKeyString: string = process.env.WALLET_SECRET_KEY as string;

  let secretKeyB58 = bs58.decode(secretKeyString);
  let keypair = Keypair.fromSecretKey(secretKeyB58);

  const connection = new Connection("https://api.devnet.solana.com");

  const mint = new PublicKey("3qq7ExpwRRAAexGNpUVoFkiTfSB1uo8ezsbyAoxhyryo");

  let fromAccount = await splToken.getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey
  );

  let toAccount = await splToken.getOrCreateAssociatedTokenAccount(
    connection,
    toAddress,
    mint,
    toAddress
  );

  const transaction = new Transaction().add(
    splToken.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      fromAccount.address,
      toAccount.address,
      10,
      []
    )
  );
};

export default {
  send,
};

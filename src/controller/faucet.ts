import * as splToken from "@solana/spl-token";
import {
  PublicKey,
  Connection,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
let bs58 = require("bs58");

require("dotenv").config();

export const send = async (toAddress: any) => {
  let secretKeyString: string = process.env.WALLET_SECRET_KEY as string;

  let secretKeyB58 = bs58.decode(secretKeyString);
  let keypair = Keypair.fromSecretKey(secretKeyB58);

  const connection = new Connection(process.env.NETWORK as string);

  const mint = new PublicKey(process.env.TOKEN_MINT_ADDRESS as string);

  let fromAccount = await splToken.getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey
  );

  let toAccount = await splToken.getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    new PublicKey(toAddress)
  );

  const transaction = new Transaction().add(
    splToken.createTransferInstruction(
      fromAccount.address,
      toAccount.address,
      keypair.publicKey,
      100000000,
      [],
      splToken.TOKEN_PROGRAM_ID
    )
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    keypair,
  ]);

  const response = await connection.confirmTransaction(signature, "processed");

  console.log(response);
};

export default {
  send,
};

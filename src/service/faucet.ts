import * as splToken from "@solana/spl-token";
import {
  PublicKey,
  Connection,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
let bs58 = require("bs58");

export const sendTokens = async (
  toAddress: any,
  amount: number,
  tokenAddress: string
) => {
  let secretKeyString: string = process.env.WALLET_SECRET_KEY as string;

  let secretKeyB58 = bs58.decode(secretKeyString);
  let keypair = Keypair.fromSecretKey(secretKeyB58);

  const connection = new Connection(process.env.NETWORK as string);

  const mint = new PublicKey(tokenAddress);

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
      amount,
      [],
      splToken.TOKEN_PROGRAM_ID
    )
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    keypair,
  ]);

  await connection.confirmTransaction(signature, "processed");
};

export default {
  sendTokens,
};

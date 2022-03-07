import { Program, Provider, web3, Wallet } from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";

const { Keypair } = web3;
const network = "https://api.devnet.solana.com";
const idl = require("./idl.json");

const getAllArticlesFromBlockchain = async () => {
  const keyPair = new Keypair();
  const wallet = new Wallet(keyPair);

  const provider = getProvider(wallet);

  const programID = new PublicKey(
    "3Z8eqLzepWH6UmqFyU9mDsjQp6QepLURqHSBFwmJLdCh"
  );

  const program = new Program(idl, programID, provider);

  const publicKey = new PublicKey(
    "J74UtXHDxgzfvaorBDxh9V3SSJ1fcASVX1UBc7XXDb28"
  );

  const res = await program.account.reportAccount.fetchMultiple([publicKey]);

  console.log(res);
};

function getProvider(wallet: any) {
  const opts: any = {
    preflightCommitment: "processed",
  };
  const connection = new Connection(network, opts.preflightCommitment);

  const provider = new Provider(connection, wallet, opts.preflightCommitment);
  return provider;
}

export default {
  getAllArticlesFromBlockchain,
};

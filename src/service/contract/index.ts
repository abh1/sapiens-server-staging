import { Program, Provider, web3, Wallet } from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
require("dotenv").config();
import axios from "axios";

const { Keypair } = web3;
const network = process.env.NETWORK as string;
const idl = require("./idl.json");

const getAllArticlesFromBlockchain = async (
  reportAccountPublicKeys: string[]
) => {
  const keyPair = new Keypair();
  const wallet = new Wallet(keyPair);

  const provider = getProvider(wallet);

  const programID = new PublicKey(process.env.PROGRAM_ID as string);

  const program = new Program(idl, programID, provider);

  const reportAccountPublicKeyObjects = reportAccountPublicKeys.map(
    (reportAccountPublicKey) => new PublicKey(reportAccountPublicKey)
  );

  const articles = await program.account.reportAccount.fetchMultiple(
    reportAccountPublicKeyObjects
  );

  return articles;
};

const doesAddressOwnSapienToken = async (userPublicKey: string) => {
  const minimumBalance = 1;
  const balance = await getBalance(
    userPublicKey,
    process.env.SAPIEN_TOKEN_MINT_ADDRESS as string
  );
  return balance > minimumBalance;
};

function getProvider(wallet: any) {
  const opts: any = {
    preflightCommitment: "processed",
  };
  const connection = new Connection(network, opts.preflightCommitment);

  const provider = new Provider(connection, wallet, opts.preflightCommitment);
  return provider;
}

const getBalance = async (walletAddress: string, tokenMintAddress: string) => {
  const response = await axios({
    url: network,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: [
      {
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenAccountsByOwner",
        params: [
          walletAddress,
          {
            mint: tokenMintAddress,
          },
          {
            encoding: "jsonParsed",
          },
        ],
      },
    ],
  });
  return response.data[0].result.value[0].account.data.parsed.info.tokenAmount
    .uiAmount;
};

export default {
  getAllArticlesFromBlockchain,
  doesAddressOwnSapienToken,
};

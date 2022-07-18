import { Program, Provider, web3, Wallet } from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
require("dotenv").config();
import axios from "axios";
import * as idl from "./idl.json";

const { Keypair } = web3;
const network = process.env.NETWORK as string;

const getAllArticlesFromBlockchain = async (
  reportAccountPublicKeys: string[]
) => {
  console.log("getAllArticlesFromBlockchain13");
  reportAccountPublicKeys = reportAccountPublicKeys.filter((a) => a);
  const keyPair = new Keypair();
  const wallet = new Wallet(keyPair);

  const provider = getProvider(wallet);

  const programID = new PublicKey(process.env.PROGRAM_ID as string);

  const program = new Program(idl as any, programID, provider);
  console.log("getAllArticlesFromBlockchain23");
  const reportAccountPublicKeyObjects = reportAccountPublicKeys.map(
    function(reportAccountPublicKey) {
      console.log(reportAccountPublicKey);
      console.log(reportAccountPublicKey.charAt(0));
    if(reportAccountPublicKey.charAt(0) == "/"){
      (reportAccountPublicKey) => new PublicKey("4tXjhLjhLSdDBoV8y7UfDrtL9sut8RrLN96LP5GybFrp");
    }else{
      (reportAccountPublicKey) => new PublicKey(reportAccountPublicKey);
    }

});
  console.log("getAllArticlesFromBlockchain27");
  let articles = await program.account.reportAccount.fetchMultiple(
    reportAccountPublicKeyObjects
  );


  //articles = articles.filter((article: any) => article.uri !== "");

  console.log("getAllArticlesFromBlockchain35");
  console.log(process.env.PROGRAM_ID as string);

  console.log(reportAccountPublicKeyObjects);
  console.log(articles);

  return articles;
};

const doesAddressOwnSapienToken = async (userPublicKey: string) => {
  const minimumBalance = 100;
  const balance = await getBalance(
    userPublicKey,
    process.env.DAO_TOKEN_MINT_ADDRESS as string
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

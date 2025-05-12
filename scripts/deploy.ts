import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("Deploying SlipVaultToken...");

  const SlipVaultToken = await ethers.getContractFactory("SlipVaultToken");
  const slipVaultToken = await SlipVaultToken.deploy();

  await slipVaultToken.waitForDeployment();

  const address = await slipVaultToken.getAddress();
  console.log(`SlipVaultToken deployed to: ${address}`);

  // Store contract addresses in contracts.json
  const contractData = {
    SlipVaultToken: address,
    network: process.env.HARDHAT_NETWORK || "local"
  };

  fs.writeFileSync(
    path.join(__dirname, "../contracts.json"), 
    JSON.stringify(contractData, null, 2)
  );
  console.log("Contract addresses written to contracts.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 
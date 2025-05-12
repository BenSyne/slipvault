import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";
import { performance } from "perf_hooks";

async function main() {
  console.log("Deploying SlipVaultToken to Base Sepolia...");
  
  // Measure gas prices
  const startTime = performance.now();
  const provider = ethers.provider;
  const gasPrice = await provider.getFeeData();
  
  console.log(`Current gas price: ${ethers.formatUnits(gasPrice.gasPrice || 0, "gwei")} gwei`);
  
  // Deploy contract
  const SlipVaultToken = await ethers.getContractFactory("SlipVaultToken");
  const slipVaultToken = await SlipVaultToken.deploy({
    gasLimit: 5000000,
  });

  await slipVaultToken.waitForDeployment();

  const address = await slipVaultToken.getAddress();
  console.log(`SlipVaultToken deployed to: ${address}`);

  // Calculate deployment cost
  const deploymentReceipt = await provider.getTransactionReceipt(
    slipVaultToken.deploymentTransaction()?.hash || ""
  );
  
  const gasUsed = deploymentReceipt?.gasUsed || ethers.getBigInt(0);
  const effectiveGasPrice = deploymentReceipt?.effectiveGasPrice || ethers.getBigInt(0);
  const cost = gasUsed * effectiveGasPrice;
  
  console.log(`Gas used: ${gasUsed.toString()}`);
  console.log(`Deployment cost: ${ethers.formatEther(cost)} ETH`);
  
  // Calculate mint cost estimation
  const estimatedMintGas = await slipVaultToken.mintReceipt.estimateGas(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Sample address
    "ipfs://sample", 
    ethers.keccak256(ethers.toUtf8Bytes("sample data")),
    { from: await slipVaultToken.signer.getAddress() }
  );
  
  const mintCost = estimatedMintGas * (gasPrice.gasPrice || ethers.getBigInt(0));
  console.log(`Estimated mint gas: ${estimatedMintGas.toString()}`);
  console.log(`Estimated mint cost: ${ethers.formatEther(mintCost)} ETH (approximately $${parseFloat(ethers.formatEther(mintCost)) * 3000} at 3000 USD/ETH)`);
  
  // Check if cost meets requirement of < $0.01
  const costUSD = parseFloat(ethers.formatEther(mintCost)) * 3000; // Assuming ETH price of $3000
  const meetsRequirement = costUSD < 0.01;
  console.log(`Meets <$0.01 requirement: ${meetsRequirement ? "✅ YES" : "❌ NO"}`);

  // Store contract addresses
  const endTime = performance.now();
  const contractData = {
    SlipVaultToken: address,
    network: "base_sepolia",
    deployedAt: new Date().toISOString(),
    deploymentTimeMs: endTime - startTime,
    gasStats: {
      gasUsed: gasUsed.toString(),
      effectiveGasPrice: effectiveGasPrice.toString(),
      costETH: ethers.formatEther(cost),
      estimatedMintGasUsed: estimatedMintGas.toString(),
      estimatedMintCostETH: ethers.formatEther(mintCost),
      estimatedMintCostUSD: costUSD.toFixed(5),
      meetsRequirement
    }
  };

  // Save to JSON
  fs.writeFileSync(
    path.join(__dirname, "../../contracts.json"), 
    JSON.stringify(contractData, null, 2)
  );
  
  // Copy to web folder for frontend use
  fs.writeFileSync(
    path.join(__dirname, "../../web/public/contracts.json"), 
    JSON.stringify(contractData, null, 2)
  );
  
  console.log("Contract addresses and stats written to contracts.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 
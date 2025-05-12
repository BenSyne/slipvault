import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    base_sepolia: {
      url: "https://sepolia.base.org",
      accounts: process.env.PRIVATE_KEY_DEPLOYER ? [process.env.PRIVATE_KEY_DEPLOYER] : [],
      chainId: 84532
    },
    base_mainnet: {
      url: "https://mainnet.base.org",
      accounts: process.env.PRIVATE_KEY_DEPLOYER ? [process.env.PRIVATE_KEY_DEPLOYER] : [],
      chainId: 8453
    }
  },
  etherscan: {
    apiKey: {
      base_sepolia: process.env.ETHERSCAN_API_KEY || "",
      base_mainnet: process.env.ETHERSCAN_API_KEY || ""
    },
    customChains: [
      {
        network: "base_sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      },
      {
        network: "base_mainnet",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      }
    ]
  }
};

export default config; 
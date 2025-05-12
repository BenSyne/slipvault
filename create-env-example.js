const fs = require('fs');

const envExample = `# API Keys
OPENAI_API_KEY=your_openai_api_key
NFT_STORAGE_API_KEY=your_nft_storage_api_key

# Blockchain Configuration
PRIVATE_KEY=your_wallet_private_key
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASE_MAINNET_RPC_URL=https://mainnet.base.org

# Mainnet Deployment Safety
# Set to "yes" to confirm mainnet deployment
CONFIRM_MAINNET_DEPLOY=no

# Application Settings
NEXT_PUBLIC_ENABLE_TESTNET_ONLY=true
NEXT_PUBLIC_DEFAULT_CHAIN=base_sepolia

# Performance Tracking
NEXT_PUBLIC_ENABLE_PERFORMANCE_TRACKING=true
NEXT_PUBLIC_MAX_FLOW_TIME_SECONDS=60
`;

fs.writeFileSync('.env.example', envExample);
console.log('.env.example file created successfully!'); 
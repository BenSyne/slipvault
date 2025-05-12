# SlipVault MVP

## 1 — Summary
A Base-L2 dApp that lets users upload purchase receipts and receive ERC-721 NFTs containing hash and IPFS CID of receipt data.

## 2 — Functional Requirements
- Users can upload receipt images through the frontend
- AI extracts data from receipt images
- Receipt data is stored on IPFS
- Smart contract mints ERC-721 NFT with metadata containing hash and IPFS CID
- Users can view their minted receipt NFTs in a gallery
- System verifies receipt authenticity by comparing on-chain hash
- Complete flow from upload to mint in ≤ 60 seconds
- Gas cost ≤ US $0.01 per mint

## 3 — Non-Functional Requirements
- Performance: Complete flow in ≤ 60 seconds
- Cost: Gas ≤ US $0.01 per mint
- Security: SHA-256 hash verification
- Lighthouse mobile performance score ≥ 85
- Base L2 deployment

## 4 — Development Plan
### 4.1 Big-Picture Steps
- [ ] Step 1 — Smart Contract Development
- [ ] Step 2 — Frontend Scaffold
- [ ] Step 3 — AI Extraction Endpoint
- [ ] Step 4 — IPFS + Hash Implementation
- [ ] Step 5 — Mint Flow
- [ ] Step 6 — Gallery & Verifier
- [ ] Step 7 — Testing
- [ ] Step 8 — CI/CD
- [ ] Step 9 — Deployment
- [ ] Step 10 — Acceptance Checklist

### 4.2 Detailed Tasks
- [ ] 1.1 — Generate contract
- [ ] 1.2 — Write unit tests
- [ ] 1.3 — Create deployment scripts
- [ ] 2.1 — Set up Next.js with app router
- [ ] 2.2 — Install required dependencies
- [ ] 2.3 — Create file structure
- [ ] 2.4 — Implement basic components
- [ ] 3.1 — Create edge function for AI extraction
- [ ] 3.2 — Implement validation schema
- [ ] 4.1 — Set up NFT.Storage integration
- [ ] 4.2 — Implement SHA-256 hashing
- [ ] 5.1 — Implement mint function
- [ ] 5.2 — Create confirmation flow
- [ ] 6.1 — Build gallery component
- [ ] 6.2 — Create verifier component
- [ ] 7.1 — Write Vitest unit tests
- [ ] 7.2 — Create Playwright e2e tests
- [ ] 8.1 — Set up GitHub Actions workflow
- [ ] 9.1 — Deploy to Base Sepolia
- [ ] 9.2 — Deploy to Base Mainnet
- [ ] 9.3 — Deploy frontend to Vercel
- [ ] 10.1 — Run final acceptance tests

## 5 — Progress Log
### 2024-05-12 21:00
- ✅ Completed: Smart Contract Development → Generate contract
- 📄 Files changed: contracts/SlipVaultToken.sol
- 📝 Notes: Created ERC721 contract with mintReceipt function and MINTER_ROLE access control 
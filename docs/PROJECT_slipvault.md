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
- Dockerized deployment for easy setup and maintenance

## 4 — Development Plan
### 4.1 Big-Picture Steps
- [x] Step 1 — Smart Contract Development
- [x] Step 2 — Frontend Scaffold
- [x] Step 3 — AI Extraction Endpoint
- [x] Step 4 — IPFS + Hash Implementation
- [x] Step 5 — Mint Flow
- [x] Step 6 — Gallery & Verifier
- [ ] Step 7 — Testing
- [x] Step 8 — CI/CD
- [ ] Step 9 — Deployment
- [ ] Step 10 — Acceptance Checklist

### 4.2 Detailed Tasks
- [x] 1.1 — Generate contract
- [x] 1.2 — Write unit tests
- [x] 1.3 — Create deployment scripts
- [x] 2.1 — Set up Next.js with app router
- [x] 2.2 — Install required dependencies
- [x] 2.3 — Create file structure
- [x] 2.4 — Implement basic components
- [x] 3.1 — Create edge function for AI extraction
- [x] 3.2 — Implement validation schema
- [x] 4.1 — Set up NFT.Storage integration
- [x] 4.2 — Implement SHA-256 hashing
- [x] 5.1 — Implement mint function
- [x] 5.2 — Create confirmation flow
- [x] 6.1 — Build gallery component
- [x] 6.2 — Create verifier component
- [ ] 7.1 — Write Vitest unit tests
- [ ] 7.2 — Create Playwright e2e tests
- [x] 8.1 — Set up GitHub Actions workflow
- [ ] 9.1 — Deploy to Base Sepolia
- [ ] 9.2 — Deploy to Base Mainnet
- [x] 9.3 — Create Docker deployment
- [ ] 10.1 — Run final acceptance tests

## 5 — Progress Log
### 2024-05-12 21:00
- ✅ Completed: Smart Contract Development → Generate contract
- 📄 Files changed: contracts/SlipVaultToken.sol
- 📝 Notes: Created ERC721 contract with mintReceipt function and MINTER_ROLE access control

### 2024-05-12 21:10
- ✅ Completed: Smart Contract Development → Create deployment scripts
- 📄 Files changed: scripts/deploy.ts
- 📝 Notes: Created script to deploy contract and save address to contracts.json

### 2024-05-12 21:20
- ✅ Completed: Frontend Scaffold → Set up Next.js with app router
- 📄 Files changed: multiple files in web/ directory
- 📝 Notes: Initialized Next.js with TypeScript, Tailwind CSS, ESLint, and app router

### 2024-05-12 21:30
- ✅ Completed: Frontend Scaffold → Implement basic components
- 📄 Files changed: web/components/Dropzone.tsx, web/components/ReceiptCard.tsx
- 📝 Notes: Created components for file upload and receipt display

### 2024-05-12 21:40
- ✅ Completed: AI Extraction Endpoint → Create edge function
- 📄 Files changed: web/app/api/extract/route.ts
- 📝 Notes: Created API endpoint for extracting receipt data using OpenAI Vision

### 2024-05-12 21:50
- ✅ Completed: IPFS + Hash Implementation
- 📄 Files changed: web/lib/ipfs.ts
- 📝 Notes: Implemented functions for pinning to IPFS and creating SHA-256 hashes

### 2024-05-12 22:00
- ✅ Completed: Mint Flow Implementation
- 📄 Files changed: web/lib/mint.ts
- 📝 Notes: Implemented functions for minting NFTs on the Base L2

### 2024-05-12 22:10
- ✅ Completed: Gallery & Verifier Implementation
- 📄 Files changed: web/app/receipts/page.tsx, web/app/receipts/[id]/page.tsx
- 📝 Notes: Implemented gallery and verification components

### 2024-05-12 22:20
- ✅ Completed: CI/CD → Docker Deployment Setup
- 📄 Files changed: Dockerfile, docker-compose.yml, nginx configuration
- 📝 Notes: Created Docker and Nginx config for deployment on Hetzner server with Collify

### 2024-05-12 22:30
- ✅ Completed: Performance Tracking
- 📄 Files changed: web/lib/performance.ts
- 📝 Notes: Implemented performance tracking to ensure ≤60 second flow 
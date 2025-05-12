import { expect } from "chai";
import { ethers } from "hardhat";
import { SlipVaultToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("SlipVaultToken", function () {
  let slipVaultToken: SlipVaultToken;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  let minter: SignerWithAddress;
  const MINTER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("MINTER_ROLE"));
  const testUri = "ipfs://QmTest";
  const testHash = ethers.keccak256(ethers.toUtf8Bytes("test data"));

  beforeEach(async function () {
    [owner, user, minter] = await ethers.getSigners();
    
    const SlipVaultTokenFactory = await ethers.getContractFactory("SlipVaultToken");
    slipVaultToken = await SlipVaultTokenFactory.deploy();
    
    // Grant minter role to the minter account
    await slipVaultToken.grantRole(MINTER_ROLE, minter.address);
  });

  describe("Roles", function () {
    it("Owner should have the admin role", async function () {
      const hasRole = await slipVaultToken.hasRole(ethers.ZeroHash, owner.address);
      expect(hasRole).to.be.true;
    });

    it("Owner should have the minter role", async function () {
      const hasRole = await slipVaultToken.hasRole(MINTER_ROLE, owner.address);
      expect(hasRole).to.be.true;
    });

    it("Minter should have the minter role", async function () {
      const hasRole = await slipVaultToken.hasRole(MINTER_ROLE, minter.address);
      expect(hasRole).to.be.true;
    });
  });

  describe("mintReceipt", function () {
    it("Should allow minter to mint a receipt", async function () {
      await slipVaultToken.connect(minter).mintReceipt(user.address, testUri, testHash);
      
      expect(await slipVaultToken.ownerOf(1)).to.equal(user.address);
      expect(await slipVaultToken.tokenURI(1)).to.equal(testUri);
    });

    it("Should emit ReceiptMinted event", async function () {
      await expect(slipVaultToken.connect(minter).mintReceipt(user.address, testUri, testHash))
        .to.emit(slipVaultToken, "ReceiptMinted")
        .withArgs(user.address, 1, testHash);
    });

    it("Should revert when called by non-minter", async function () {
      await expect(
        slipVaultToken.connect(user).mintReceipt(user.address, testUri, testHash)
      ).to.be.revertedWithCustomError(
        slipVaultToken,
        "AccessControlUnauthorizedAccount"
      );
    });
  });
}); 
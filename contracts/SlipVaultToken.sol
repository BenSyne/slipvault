// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SlipVaultToken is ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
    // Event emitted when a receipt is minted
    event ReceiptMinted(address indexed to, uint256 indexed tokenId, bytes32 dataHash);

    constructor() ERC721("SlipVaultToken", "SVT") {
        // Grant the contract deployer the default admin role
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mintReceipt(address to, string memory uri, bytes32 dataHash) public onlyRole(MINTER_ROLE) {
        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        _mint(to, id);
        _setTokenURI(id, uri);
        emit ReceiptMinted(to, id, dataHash);
    }

    // Override required function for AccessControl
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
} 
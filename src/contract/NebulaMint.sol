
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NebulaMint is ERC721URIStorage, Ownable {
    using Strings for uint256;

    string private _contractName = "NebulaMint";
    string private _contractSymbol = "NBM";

    // Mapping from stringId to tokenId
    mapping(string => uint256) private _stringToTokenId;
    // Mapping from tokenId to token descriptions
    mapping(uint256 => string) private _tokenDescriptions;
    // Mapping from tokenId to token names
    mapping(uint256 => string) private _tokenNames;
    // Mapping from stringId to user balances
    mapping(string => mapping(address => uint256)) private _balancesByStringId;

    uint256 private _tokenIdCounter = 1;

    constructor() ERC721(_contractName, _contractSymbol) {
        transferOwnership(msg.sender);
    }

    function mint(
        address to,
        string memory stringId,
        string memory uri,
        string memory description,
        string memory tokenName,
        uint256 quantity
    ) public {
        require(_stringToTokenId[stringId] == 0, "String ID already used");
        require(quantity > 0, "Quantity must be greater than 0");

        // Mint the specified quantity and store additional data
        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = _tokenIdCounter++;
            _mint(to, tokenId);
            _setTokenURI(tokenId, uri);

            _stringToTokenId[stringId] = tokenId;
            _tokenDescriptions[tokenId] = description;
            _tokenNames[tokenId] = tokenName;

            emit Transfer(address(0), to, tokenId);
        }

        // Track quantity ownership by user for each stringId
        _balancesByStringId[stringId][to] += quantity;
    }

    // Function to get the token name by tokenId
    function getTokenName(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenNames[tokenId];
    }

    // Function to burn a specific token
    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only token owner can burn");
        _burn(tokenId);
    }

    // Function to transfer a specified quantity of NFTs associated with a stringId
    function transferNFT(
        address from,
        address to,
        string memory stringId,
        uint256 quantity
    ) external {
        require(quantity > 0, "Quantity must be greater than 0");
        require(_balancesByStringId[stringId][from] >= quantity, "Insufficient balance for transfer");

        uint256 tokenId = _stringToTokenId[stringId];
        require(tokenId != 0, "Invalid string ID");

        for (uint256 i = 0; i < quantity; i++) {
            require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
            _safeTransfer(from, to, tokenId, "");

            // Adjust balances after each transfer
            _balancesByStringId[stringId][from] -= 1;
            _balancesByStringId[stringId][to] += 1;
        }
    }

    // Function to get token description by tokenId
    function getTokenDescription(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenDescriptions[tokenId];
    }

    // Function to retrieve tokenId associated with a stringId
    function getTokenIdFromString(string memory stringId) public view returns (uint256) {
        uint256 tokenId = _stringToTokenId[stringId];
        require(tokenId != 0, "String ID not associated with any token");
        return tokenId;
    }

    // New function to get the owner of the NFT by stringId
    function getOwnerByStringId(string memory stringId) public view returns (address) {
        uint256 tokenId = _stringToTokenId[stringId];
        require(tokenId != 0, "String ID not associated with any token");
        return ownerOf(tokenId);
    }

    // New function to get the balance of a specific stringId for a user
    function getBalanceByStringId(address user, string memory stringId) public view returns (uint256) {
        return _balancesByStringId[stringId][user];
    }
}




































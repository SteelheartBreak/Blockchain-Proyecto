// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract WiseGuard is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    string private baseURI;

    constructor() ERC721("WiseGuard", "WGPUJ") Ownable(msg.sender) {
        baseURI = "ipfs://QmacZNwZUntzG8bUjrRSrz8TGk191pq88bfHSvNNy73yts";
    }

    function getNextTokenId() public view returns (uint256) {
        return _nextTokenId;
    }

    function safeMint() public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, baseURI);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
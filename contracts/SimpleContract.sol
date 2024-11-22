// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.26;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";


contract SimpleContract {
    uint public data;
    
    constructor() {
        data=2024;
    }

    function accumulateData(uint _data) public {
        data=data + _data;
    }

    function getData() public view returns(uint) {
        return data;
    }
}
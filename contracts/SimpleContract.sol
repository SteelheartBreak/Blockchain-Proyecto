// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./WiseGuard.sol";

contract Crowdfunding {
  struct Investor {
    address investorAddress;
    uint amountInvested;
    bool isType2;
  }

  WiseGuard public nftContract; // Instance of the NFT contract

  mapping(address => Investor) public investors;

  constructor(address _nftContractAddress) {
    nftContract = WiseGuard(_nftContractAddress);
  }

  function invest(uint _amount) public payable {
    require(msg.value == _amount, "Incorrect amount sent");
    // ... (Logic to verify investor existence, update amount, etc.)

    // If investor type 2 and threshold is met, mint NFT
    if (investors[msg.sender].isType2 && investors[msg.sender].amountInvested + _amount >= 0.001 ether) {
      nftContract.safeMint(); // Mint the NFT before transferring
    }
  }

  function claimRewards() public {
    // ... (Logic to calculate and transfer WiseCoins, verify claim eligibility)

    // Transfer NFT if investor is type 2
    if (investors[msg.sender].isType2) {
      nftContract.safeTransferFrom(address(this), msg.sender, nftContract.getNextTokenId() - 1); // Get the most recently minted token ID
    }
  }
}
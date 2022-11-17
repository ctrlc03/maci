// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import { VkRegistry } from "maci-contracts/contracts/VkRegistry.sol";

contract Factory {

  address public vkRegistryAddress;
  
  /*
  * Deploys a new VkRegistry contract
  * @param salt The salt for the CREATE2 call
  */
  function deploy(bytes32 salt) public payable {
      VkRegistry vkRegistry = new VkRegistry{salt: salt}();

      // transfer ownership to the deployer
      vkRegistry.transferOwnership(msg.sender);
      
      vkRegistryAddress = address(vkRegistry);
  }
}
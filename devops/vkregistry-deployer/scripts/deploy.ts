import { ethers } from "hardhat";
import { expect } from "chai"

const salt = "0x0000000000000000000000000000000000000000000000000000000000000001";

const deployVkRegistry = async () => {
    const _factoryContract = await ethers.getContractFactory("Factory");
    const factoryContract = await _factoryContract.deploy();
    const signer = (await ethers.getSigners())[0];
    const signerAddress = await signer.getAddress();
    await factoryContract.connect(signer).deploy(salt);
    
    const VkRegistryAddress = await factoryContract.vkRegistryAddress();
    const vkContract = await ethers.getContractAt("VkRegistry", VkRegistryAddress);
    const actualOwner = await vkContract.owner();
    // confirm the owner was set correctly
    expect(actualOwner).to.eq(signerAddress);

    console.log(`\nvkRegistry contract address: ${VkRegistryAddress}`);
    console.log(`deployer address: ${signerAddress}`);
    console.log(`contract owner: ${actualOwner}`)
    console.log(`factory contract address: ${factoryContract.address}`);
}

deployVkRegistry();
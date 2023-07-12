//SPDX-License-Identifier:MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract HellToken is ERC20Capped , ERC20Burnable{

    address payable public owner;

    constructor(uint256 cap) ERC20("HellToken" , "HT") ERC20Capped(cap * (10 ** decimals())){

        owner = payable(msg.sender);

        _mint(msg.sender , 69 * (10 ** decimals()));

    }

    function _mint(address account , uint256 amount) internal virtual override(ERC20Capped , ERC20){

        require(ERC20.totalSupply() + amount <= cap() , "ERC20Capped : cap exceeded");

        super._mint(account, amount);

    }


    function destroy() external {

        require(msg.sender == owner, "Only owner can access this function");

        selfdestruct(owner);

    }


}

//SPDX-License-Identifier:MIT

pragma solidity ^0.8.11;

interface IERC20 {

    function transfer(address to , uint256 amount) external;

    function balanceOf(address account) view external returns(uint256);

    event Transfer(address indexed from , address indexed to , uint256 amount);

}

contract tokenFaucet{

    address payable public owner;

    IERC20 public token;

    uint256 public withdrawlAmount;

    uint256 public nextAccessTime;


    mapping(address => uint256) nextRequestingTime;


    event Deposit(address indexed from , uint256 indexed amount);

    event Withdrawl(address indexed to , uint256 indexed amount);




    constructor(address tokenAddress){

        token = IERC20(tokenAddress);

        owner = payable(msg.sender);

        withdrawlAmount = 1 * (10 ** 18);

        nextAccessTime = 1 days;

    }

    modifier onlyOwner(){

        require(msg.sender == owner,"Only Owner can access this function");

        _;

    }

    function requestTokens() payable external{

        require(msg.sender != address(0) , "Please Enter A Valid Address");

        require(token.balanceOf(address(this)) >= withdrawlAmount , "Insuffient Tokens In Faucet Contract");

        require(block.timestamp >= nextRequestingTime[msg.sender] , "Please Wait For 24 Hours Before Requesting Again");
        
        nextRequestingTime[msg.sender] = block.timestamp + nextAccessTime;

        token.transfer(msg.sender, withdrawlAmount);

    }

    receive() payable external {

        emit Deposit(msg.sender, msg.value);

    }

    function getBalance() view external onlyOwner returns(uint256){

        return token.balanceOf(address(this));

    }

    function changeNextAccessTime(uint256 _nextAccessTime) external onlyOwner{

        nextAccessTime = _nextAccessTime * 1 minutes;

    }

    function changeWithdrawlAmount(uint256 _withdrawlAmount) external onlyOwner{

        withdrawlAmount = _withdrawlAmount * (10 ** 18);

    }

    function withdraw() external onlyOwner{

        token.transfer(msg.sender , token.balanceOf(address(this)));

        emit Withdrawl(msg.sender , token.balanceOf(address(this)));

    }


}
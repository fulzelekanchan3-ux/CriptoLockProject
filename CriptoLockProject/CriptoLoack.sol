// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoLock {

    mapping(address => uint) public balances;
    mapping(address => uint) public unlockTime;

    function deposit(uint _lockTime) public payable {

        require(msg.value > 0, "Send Ether");

        balances[msg.sender] += msg.value;

        unlockTime[msg.sender] = block.timestamp + _lockTime;
    }

    function withdraw() public {

        require(
            block.timestamp >= unlockTime[msg.sender],
            "Funds are locked"
        );

        uint amount = balances[msg.sender];

        require(amount > 0, "No balance");

        balances[msg.sender] = 0;

        payable(msg.sender).transfer(amount);
    }

    function getBalance() public view returns(uint){
        return balances[msg.sender];
    }

    function getUnlockTime() public view returns(uint){
        return unlockTime[msg.sender];
    }
}
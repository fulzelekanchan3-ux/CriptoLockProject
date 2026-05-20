const contractAddress="0xe514295dFFA9A41d6094E875AcFb467b3F522478";

const abi=[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_lockTime",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUnlockTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "unlockTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let web3;
let contract;
let accounts;

window.onload=async()=>{

if(window.ethereum){

web3=new Web3(window.ethereum);

await window.ethereum.request({
method:'eth_requestAccounts'
});

accounts=await web3.eth.getAccounts();

contract=new web3.eth.Contract(
abi,
contractAddress
);
}
};

async function deposit(){

const amount=
document.getElementById("amount").value;

const lockTime=
document.getElementById("lockTime").value;

await contract.methods.deposit(lockTime)
.send({
from:accounts[0],
value:web3.utils.toWei(amount,'ether')
});

document.getElementById("status")
.innerHTML="✅ Deposit Locked";
}

async function withdraw(){

try{

await contract.methods.withdraw()
.send({from:accounts[0]});

document.getElementById("status")
.innerHTML="✅ Withdraw Successful";

}
catch{

document.getElementById("status")
.innerHTML="❌ Funds Still Locked";
}
}
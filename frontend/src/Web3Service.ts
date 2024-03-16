import Web3 from 'web3';
import axios from 'axios';

export async function mint() {
  if (!window.ethereum) throw new Error(`No MetaMask found!`);

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if (!accounts || !accounts.length) throw new Error(`No account allowed!`);

  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/mint/${accounts[0]}`
  );
  return response.data;
}

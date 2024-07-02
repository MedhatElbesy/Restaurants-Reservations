
import { useState } from "react";
const VodafoneCash = ({ branchMobileNumber, total }) => {
  const [vodafoneCashNumber, setVodafoneCashNumber] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);

  const handleFileChange = (e) => {
    setPaymentProof(e.target.files[0]);
  };

  return (
    <div className="vodafone-cash-details">
      <p>Transfer {total} to: {branchMobileNumber}</p>
      <label htmlFor="vodafoneCashNumber">Your Vodafone Cash Number</label>
      <input
        type="text"
        id="vodafoneCashNumber"
        value={vodafoneCashNumber}
        onChange={(e) => setVodafoneCashNumber(e.target.value)}
      />
      <label htmlFor="paymentProof">Upload Payment Proof</label>
      <input type="file" id="paymentProof" onChange={handleFileChange} />
    </div>
  );
};

export default VodafoneCash;

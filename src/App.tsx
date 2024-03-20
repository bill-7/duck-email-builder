import { useState } from "react";

import "./App.css";

function App() {
  const [recipient, setRecipient] = useState("");
  const [userAddress, setUserAddress] = useState(
    localStorage.getItem("userAddress") ?? ""
  );

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const clean = (s: string) => s.trim().toLowerCase();

  const derivedEmail = () =>
    `${clean(recipient).replace("@", "_at_")}_${clean(userAddress)}`;

  return (
    <div className="container">
      <img src={"../duck.png"} alt="Duck" />
      <h2>Duck.com Email Builder</h2>
      <p>Recipient</p>
      <input
        type="text"
        placeholder=""
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <br></br>
      <p>Your email address</p>
      <input
        type="text"
        value={userAddress}
        onChange={(e) => {
          setUserAddress(e.target.value);
          localStorage.setItem("userAddress", e.target.value);
        }}
      />
      {clean(userAddress).includes("@duck.com") &&
        isValidEmail(clean(recipient)) && (
          <>
            <h3>{derivedEmail()}</h3>
            <button
              onClick={() => {
                navigator.clipboard.writeText(derivedEmail());
              }}
            >
              Copy
            </button>
          </>
        )}
    </div>
  );
}

export default App;

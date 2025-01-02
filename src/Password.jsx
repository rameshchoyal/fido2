import React, { useState } from "react";
import axios from "axios";

const Password = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState("x_GuFRpUr5tnCfHEGrmHLA");

  const handleCreate = async () => {
    const credential = await navigator.credentials.create({
      publicKey: {
        challenge: new Uint8Array(32), // Replace with a proper challenge generated by the server
        rp: {
          name: "localhost", // Replace with your relying party's name
        },
        user: {
          id: Uint8Array.from("test", (c) => c.charCodeAt(0)), // A unique identifier for the user (Uint8Array)
          name: "test@example.com", // Replace with the user's name
          displayName: "Test User", // Replace with the user's display name
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 }, //
        ],
        authenticatorSelection: {
          authenticatorAttachment: "cross-platform", // Adjust based on your requirements
          residentKey: "preferred",
          userVerification: "preferred",
        },
        timeout: 60000, // Timeout in milliseconds
      },
    });

    console.log("Created credential:", credential);
    setId(credential.id);
  };

  const handleRegister = async () => {
    const publicKeyCredentialRequestOptions = {
      challenge: Uint8Array.from("randomStringFromServer", (c) =>
        c.charCodeAt(0)
      ),
      allowCredentials: [
        {
          id: Uint8Array.from(id, (c) => c.charCodeAt(0)),
          type: "public-key",
          transports: ["hybrid", "internal"],
        },
      ],
      timeout: 60000,
    };

    const assertion = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions,
    });
    console.log("Assertion:", assertion);
    // try {
    //   console.log("username", username);
    //   const { data: publicKeyCredentialCreationOptions } = await axios.post(
    //     "http://localhost:3000/generate-registration-options",
    //     { email: username }
    //   );
    //   console.log(
    //     "publicKeyCredentialCreationOptions.challenge",
    //     publicKeyCredentialCreationOptions.challenge,
    //     publicKeyCredentialCreationOptions.user.id
    //   );

    //   publicKeyCredentialCreationOptions.challenge = Uint8Array.from(
    //     atob(publicKeyCredentialCreationOptions.challenge),
    //     (c) => c.charCodeAt(0)
    //   );

    //   // Decode the user ID (Base64 to Uint8Array)
    //   publicKeyCredentialCreationOptions.user.id = Uint8Array.from(
    //     atob(publicKeyCredentialCreationOptions.user.id),
    //     (c) => c.charCodeAt(0)
    //   );

    //   console.log("publicKey---challenge:", publicKeyCredentialCreationOptions);

    //   const credential = await navigator.credentials.create({
    //     publicKey: publicKeyCredentialCreationOptions,
    //   });

    //   console.log("Created credential:", credential);

    //   const response = await axios.post(
    //     "http://localhost:3000/verify-registration-response",
    //     {
    //       email: username,
    //       credential: credential,
    //     }
    //   );

    //   if (response.data.success) {
    //     setMessage("Registration and verification successful!");
    //   } else {
    //     setMessage("Verification failed.");
    //   }
    // } catch (error) {
    //   setMessage(`Error: ${error.response?.data?.error || error.message}`);
    //   console.log("ramesh errror", error);
    // }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>FIDO2 Registration</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      <br />
      <button onClick={handleRegister} style={{ padding: "5px 10px" }}>
        Register
      </button>
      <button onClick={handleCreate} style={{ padding: "5px 10px" }}>
        Create
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Password;
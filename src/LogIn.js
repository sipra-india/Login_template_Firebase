import React, { useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";

function Login() {
  const [nm, SetNm] = useState("");
  const [pass, SetPass] = useState("");
  const [data, SetData] = useState("");

  function onNmChange(e) {
    SetNm(e.target.value);
  }

  function onPassChange(e) {
    SetPass(e.target.value);
  }

  const Submit = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${nm}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          SetData(snapshot.val());
        } else {
          SetData("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="name">
        <name>Username: </name>
        <input type="text" value={nm} required onChange={onNmChange} />
      </div>
      <div className="password">
        <name>Password: </name>
        <input type="password" value={pass} required onChange={onPassChange} />
      </div>
      <button onClick={Submit}>Log In</button>
      <p>Reads data from database</p>
      <p>{"Username: " + data.nm}</p>
      <p>{"Email: " + data.Em}</p>
      <p>{"Password: " + data.pass}</p>
    </div>
  );
}

export default Login;

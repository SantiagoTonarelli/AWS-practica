import React, { useState } from "react";
import "./App.css";

// const URL = "http://localhost:3000";
const URL = "http://nodeapp-env.sdgdsfgdfgd.us-east-1.elasticbeanstalk.com";

function App() {
  const [users, setUsers] = useState([]);
  const loadUsers = async () => {
    const response = await fetch(URL + "/usuarios");
    const data = await response.json();
    setUsers(data);
  };

  const createUser = async () => {
    const response = await fetch(URL + "/registrar-usuario");
    const data = await response.json();
    setUsers([...users, data]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={loadUsers} style={{ marginTop: "20px" }}>
          Cargar usuarios
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {users.map((user) => (
            <div key={user.id} style={{ marginBottom: "10px" }}>
              <p>Nombre: {user.nombre}</p>
              <p>Email: {user.email}</p>
            </div>
          ))}
        </div>
        <button onClick={createUser} style={{ marginTop: "20px" }}>
          Crear usuario
        </button>
        <br />
      </header>
    </div>
  );
}

export default App;

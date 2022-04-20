import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleDataPost = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name: name, email: email };
    console.log(email, name);
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log(data);
      });
  };
  return (
    <div className="App">
      <form onSubmit={handleDataPost}>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="submit" value="submit" />
      </form>
      <h2>
        MY something people:{" "}
        {users.map((u) => (
          <li key={u.id}>
            Name:{u.name}
            Email:{u.email}
          </li>
        ))}
      </h2>
    </div>
  );
}

export default App;

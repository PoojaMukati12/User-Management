import React from 'react';
// import Login from './components/Login';
import Login from './Components/Login';
// import UsersList from './components/UsersList';
import UsersList from './Components/UserList';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<UsersList />} />
    </Routes>
  );
}

export default App;



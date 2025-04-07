import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';
import { ToastContainer, toast } from 'react-toastify';


export default function Login() {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/users');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
    }
  };

  const notify = () => toast("Login Successfull!");

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Password"
          required
        />
        <button type="submit" onClick={notify} className="bg-blue-500 text-white w-full py-2 rounded">Login</button>
        <ToastContainer />
      </form>
    </div>
  );
}

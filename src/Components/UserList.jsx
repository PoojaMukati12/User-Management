import React, { useEffect, useState } from 'react';
import api from '../Services/api';
// import UserForm from './UserForm';
import UserForm from './UserForm';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async (pg = 1) => {
    const res = await api.get(`/users?page=${pg}`);
    setUsers(res.data.data);
  };
  
  console.log('editingUser:', editingUser);
  console.log('UserForm:', UserForm);
  
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`);
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEdit = (user) => setEditingUser(user);

  const handleUpdate = async (updatedUser) => {
    const res = await api.put(`/users/${updatedUser.id}`, updatedUser);
    setUsers(users.map(u => u.id === updatedUser.id ? { ...u, ...res.data } : u));
    setEditingUser(null);
  };
 
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      {editingUser && (
        <UserForm user={editingUser} onSave={handleUpdate} onCancel={() => setEditingUser(null)} />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="border rounded p-4 shadow">
            <img src={user.avatar} alt={user.first_name} className="rounded-full w-16 h-16" />
            <h3 className="text-lg font-semibold">{user.first_name} {user.last_name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-2 space-x-2">
              <button onClick={() => handleEdit(user)} className="text-blue-500">Edit</button>
              <button onClick={() => handleDelete(user.id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} className="bg-gray-300 px-4 py-2 rounded">Prev</button>
        <button onClick={() => setPage(p => p + 1)} className="bg-gray-300 px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
}

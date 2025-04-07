import React, { useState } from 'react';

export default function UserForm({ user, onSave, onCancel }) {
  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: user.id, first_name, last_name, email });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-100">
      <h3 className="font-bold mb-2">Edit User</h3>
      <input
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
        className="mb-2 p-2 border w-full rounded"
        placeholder="First Name"
      />
      <input
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
        className="mb-2 p-2 border w-full rounded"
        placeholder="Last Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 p-2 border w-full rounded"
        placeholder="Email"
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  );
}

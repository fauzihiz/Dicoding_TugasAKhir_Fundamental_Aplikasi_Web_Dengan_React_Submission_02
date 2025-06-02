import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Nav from '../../component/Nav';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';

function AddNote({ onAdd }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://notes-api.dicoding.dev/v1/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title || '(untitled)',
          body,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Gagal menambahkan catatan');
        return;
      }

      if (onAdd) onAdd(data.data);
      setTitle('');
      setBody('');
      navigate('/home');
    } catch (err) {
      console.error('Error adding note:', err);
      setError('Terjadi kesalahan saat menambahkan catatan.');
    }
  };

  return (
    <div>
      <Link to="/home">
        <h1>Personal Notes</h1>
      </Link>
      <Nav />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Isi catatan"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit">Tambah Catatan</button>
      </form>
    </div>
  );
}

AddNote.propTypes = {
  onAdd: PropTypes.func, 
};

export default AddNote;

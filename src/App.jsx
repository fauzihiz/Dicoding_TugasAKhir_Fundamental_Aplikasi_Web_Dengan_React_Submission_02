import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import pages
import Home from './pages/Home';
import Arsip from './pages/Arsip';
import NoteDetail from './pages/NoteDetail';
import NotFound from './pages/NotFound';
import AddNote from './pages/AddNote';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App () {
  const [notes, setNotes] = useState([]);
  const { token } = useAuth(); 

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('https://notes-api.dicoding.dev/v1/notes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        if (json.status === 'success') {
          setNotes(json.data);
        }
      } catch (error) {
        console.error('Gagal mengambil data notes:', error);
      }
    };

    if (token) {
      fetchNotes();
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://notes-api.dicoding.dev/v1/notes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();
      if (json.status === 'success') {
        setNotes(prev => prev.filter(note => note.id !== id));
      } else {
        alert('Gagal menghapus catatan');
      }
    } catch (error) {
      console.error('Gagal menghapus:', error);
    }
  };

  const handleArchive = async (id) => {
    try {
      const response = await fetch(`https://notes-api.dicoding.dev/v1/notes/${id}/archive`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();
      if (json.status === 'success') {
        setNotes(prev =>
          prev.map(note =>
            note.id === id ? { ...note, archived: true } : note
          )
        );
      } else {
        alert('Gagal mengarsipkan');
      }
    } catch (error) {
      console.error('Gagal mengarsipkan:', error);
    }
  };

  const handleUnarchive = async (id) => {
    try {
      const response = await fetch(`https://notes-api.dicoding.dev/v1/notes/${id}/unarchive`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (json.status === 'success') {
        setNotes((prev) => prev.filter((note) => note.id !== id));
      } else {
        console.error('Gagal mengembalikan catatan:', json.message);
      }
    } catch (error) {
      console.error('Gagal mengembalikan catatan:', error);
    }
  };


  const onAdd = async (note) => {
    try {
      const response = await fetch('https://notes-api.dicoding.dev/v1/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });

      const json = await response.json();

      if (json.status === 'success') {
        setNotes((prev) => [...prev, json.data]);
      } else {
        console.error('Gagal menambahkan catatan:', json.message);
      }
    } catch (error) {
      console.error('Gagal menambahkan catatan:', error);
    }
  };


  function RequireAuth({ children }) {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return children;
  }

  return (
    <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home onDelete={handleDelete} onArchive={handleArchive} onUnarchive={handleUnarchive} />
              </RequireAuth>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home onDelete={handleDelete} onArchive={handleArchive} onUnarchive={handleUnarchive} />
              </RequireAuth>
            }
          />
          <Route
            path="/note"
            element={
              <RequireAuth>
                <Home onDelete={handleDelete} onArchive={handleArchive} onUnarchive={handleUnarchive} />
              </RequireAuth>
            }
          />
          <Route
            path="/arsip"
            element={
              <RequireAuth>
                <Arsip onDelete={handleDelete} onArchive={handleArchive} onUnarchive={handleUnarchive} />
              </RequireAuth>
            }
          />
          <Route
            path="/note/:id"
            element={
              <RequireAuth>
                <NoteDetail notes={notes} />
              </RequireAuth>
            }
          />
          <Route
            path="/add"
            element={
              <RequireAuth>
                <AddNote onAdd={onAdd} />
              </RequireAuth>
            }
          />
        </Routes>
    </BrowserRouter>
  )
};

export default App;
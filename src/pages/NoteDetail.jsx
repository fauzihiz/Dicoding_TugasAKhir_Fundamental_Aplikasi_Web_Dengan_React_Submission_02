import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { showFormattedDate } from '../utils/index';
import Nav from '../../component/Nav';
import { useAuth } from '../contexts/AuthContext';

function NoteDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`https://notes-api.dicoding.dev/v1/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await response.json();

        if (json.status === 'success') {
          setNote(json.data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Gagal mengambil catatan:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, token]);

  if (loading) return <p>Loading...</p>;
  if (notFound || !note) return <p>Catatan tidak ditemukan</p>;

  return (
    <div id="noteDetail">
      <Link to="/home">
        <h1>Personal Notes</h1>
      </Link>
      <Nav />
      <h2>{note.title}</h2>
      <small>{showFormattedDate(note.createdAt)}</small>
      <p>{note.body}</p>
    </div>
  );
}

export default NoteDetail;

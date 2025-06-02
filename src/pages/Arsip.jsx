import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NoteList from '../../component/NoteList';
import Nav from '../../component/Nav';
import Search from '../../component/Search';
import Loading from '../../component/Loading';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import PropTypes from 'prop-types';

function Arsip({ onDelete, onArchive, onUnarchive }) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword')?.toLowerCase() || '';
  
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { token } = useAuth();
  const { getText } = useLanguage();

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch('https://notes-api.dicoding.dev/v1/notes/archived', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const json = await response.json();
        
        if (json.status === 'success') {
          setNotes(json.data);
        } else {
          setError('Failed to fetch archived notes');
        }
      } catch (err) {
        console.error('Failed to fetch archived notes:', err);
        setError('Network error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchArchivedNotes();
    }
  }, [token]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword)
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <Link to="/home" className="page-title-link">
          <h1 className="page-title">{getText('personalNotes')}</h1>
        </Link>
      </header>

      <Nav />

      <Search />

      <main className="page-content">
        <section className="notes-section">
          <h2 className="section-title">{getText('archivedNotes')}</h2>
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
          <NoteList
            notes={filteredNotes}
            onDelete={onDelete}
            onArchive={onArchive}
            archived={true}
            onUnarchive={onUnarchive}
          />
        </section>
      </main>
    </div>
  );
}

// PropTypes untuk validasi props
Arsip.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default Arsip;
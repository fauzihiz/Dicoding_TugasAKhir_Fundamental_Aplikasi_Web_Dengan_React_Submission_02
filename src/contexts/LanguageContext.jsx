import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  id: {
    // Navigation
    personalNotes: 'Personal Notes',
    activeNotes: 'Catatan Aktif',
    addNote: 'Tambah Catatan',
    archivedNotes: 'Catatan Arsip',
    logout: 'Keluar',
    
    // Forms
    title: 'Judul',
    content: 'Isi catatan',
    name: 'Nama',
    email: 'Email',
    password: 'Password',
    login: 'Masuk',
    register: 'Daftar',
    
    // Buttons
    delete: 'Hapus',
    archive: 'Arsipkan',
    unarchive: 'Kembalikan',
    addNoteButton: 'Tambah Catatan',
    
    // Messages
    emptyNotes: 'Tidak ada catatan',
    emptyArchive: 'Arsip Kosong',
    noteNotFound: 'Catatan tidak ditemukan',
    loading: 'Memuat...',
    
    // Auth
    loginTitle: 'Masuk',
    registerTitle: 'Daftar',
    noAccount: 'Belum punya akun?',
    hasAccount: 'Sudah punya akun?',
    registerHere: 'Daftar di sini',
    loginHere: 'Masuk di sini',
    
    // Search
    searchPlaceholder: 'Cari catatan...',
    
    // 404
    notFound: 'Halaman tidak ditemukan'
  },
  en: {
    // Navigation
    personalNotes: 'Personal Notes',
    activeNotes: 'Active Notes',
    addNote: 'Add Note',
    archivedNotes: 'Archived Notes',
    logout: 'Logout',
    
    // Forms
    title: 'Title',
    content: 'Note content',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    register: 'Register',
    
    // Buttons
    delete: 'Delete',
    archive: 'Archive',
    unarchive: 'Unarchive',
    addNoteButton: 'Add Note',
    
    // Messages
    emptyNotes: 'No notes available',
    emptyArchive: 'Archive is empty',
    noteNotFound: 'Note not found',
    loading: 'Loading...',
    
    // Auth
    loginTitle: 'Login',
    registerTitle: 'Register',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    registerHere: 'Register here',
    loginHere: 'Login here',
    
    // Search
    searchPlaceholder: 'Search notes...',
    
    // 404
    notFound: 'Page not found'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'id';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'id' ? 'en' : 'id');
  };

  const getText = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    getText,
    isIndonesian: language === 'id'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};
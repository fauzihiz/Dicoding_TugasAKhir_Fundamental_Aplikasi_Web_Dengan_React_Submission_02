import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider ({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('accessToken') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://notes-api.dicoding.dev/v1/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        if (json.status === 'success') {
          setUser(json.data);
        } else {
          logout(); 
        }
      } catch (err) {
        console.error(err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchUser();
  }, [token]);

  // Register
  const register = async (name, email, password) => {
    const response = await fetch('https://notes-api.dicoding.dev/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    if (json.status !== 'success') {
      throw new Error(json.message);
    }
  };

  // Login
  const login = async (email, password) => {
    setLoading(true);  

    const res = await fetch('https://notes-api.dicoding.dev/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const json = await res.json();

    if (json.status === 'success') {
      const token = json.data.accessToken;
      localStorage.setItem('accessToken', token);
      setToken(token);

      // Ambil user langsung
      const userRes = await fetch('https://notes-api.dicoding.dev/v1/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userJson = await userRes.json();
      if (userJson.status === 'success') {
        setUser(userJson.data);
      }

    } else {
      throw new Error(json.message);
    }

    setLoading(false); 
  };

  const logout = () => {
  try {
    localStorage.removeItem('accessToken');
    setUser(null);
    setToken(null);
    setLoading(false);      // reset loading state juga
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const value = {
    user,
    login,
    logout, 
    register,
  };



  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook 
export const useAuth = () => useContext(AuthContext);

export { AuthProvider };
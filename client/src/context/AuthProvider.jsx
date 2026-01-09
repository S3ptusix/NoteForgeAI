/* eslint-disable react-refresh/only-export-components */

import { useState, useEffect, createContext } from 'react';
import { loadUser } from '../services/authServices';

export const UserContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setUserDetails = async () => {
            try {
                const result = await loadUser();
                setUser(result);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        setUserDetails();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isAuthenticated: !!user, loading }}>
            {children}
        </UserContext.Provider>
    );
}

import React, { createContext, useState, useEffect, useContext } from 'react';

interface UserResponse {
    token: string;
    user: {
        name: string;
        email: string;
    };
}

interface AuthContextData {
    signed: boolean;
    user: object | null;
    loading: boolean;
    signIn(response: UserResponse): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState<object | null>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const storagedUser = localStorage.getItem('@HPAuth:user');
        const storagedToken = localStorage.getItem('@HPAuth:token');

        if(storagedUser && storagedToken) {
            setUser(JSON.parse(storagedUser));
        }
        setLoading(false);
    }, []);

    async function signIn(response: UserResponse) {
        setUser(response.user);

        localStorage.setItem('@HPAuth:user', JSON.stringify(response.user));
        localStorage.setItem('@HPAuth:token', response.token);
        
        setLoading(false);
    }

    function signOut() {
        localStorage.removeItem('@HPAuth:user');
        localStorage.removeItem('@HPAuth:token');

        setUser(null);
        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
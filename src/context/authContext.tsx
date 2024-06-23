// @ts-ignore
import React, { useState, createContext, useEffect } from 'react';

type AuthType = {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    user: any | null; // Ensure user can be null
};

interface MyContextValue {
    register: (formData: FormInputData) => Promise<void>;
    login: (formData: FormData) => Promise<void>;
    getTodo: () => Promise<void>;
    logout: () => void;
    auth: AuthType;
    todo: any;
    apiUrl: string;
}

type FormData = {
    email: string;
    password: string;
};

type FormInputData = {
    username: string;
    email: string;
    password: string;
};

const AuthContext = createContext<MyContextValue>({
    // @ts-expect-error
    register: async (formData: FormInputData) => {},
    // @ts-expect-error
    login: async (formData: FormData) => {},
    logout: () => {},
    auth: {
        token: null,
        isAuthenticated: false,
        loading: true,
        user: null,
    },
    todo: {},
    getTodo: async () => {},
    apiUrl: "",
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const apiUrl = 'production' ? "https://todo-backend-xujo.onrender.com" : 'http://localhost:5000';
    const [auth, setAuth] = useState<AuthType>({
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: true,
        user: null,
    });
    const [todo, setTodo] = useState<any>(null);

    useEffect(() => {
        if (auth.token) {
            getTodo();
        } else {
            setAuth((prevAuth) => ({ ...prevAuth, loading: false }));
        }
    }, [auth.token]);

    const getTodo = async () => {
        try {
            const res = await fetch(`${apiUrl}/todo`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": auth.token || "",
                },
            });
            const data = await res.json();
            setTodo(data);
            setAuth((prevAuth) => ({
                ...prevAuth,
                isAuthenticated: true,
                loading: false,
                user: data,
            }));
        } catch (error) {
            console.error('Error fetching todos:', error);
            localStorage.removeItem('token');
            setAuth((prevAuth) => ({
                ...prevAuth,
                token: null,
                isAuthenticated: false,
                loading: false,
            }));
        }
    };

    const register = async (formData: FormInputData) => {
        try {
            await fetch(`${apiUrl}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            window.location.href = "/login";
        } catch (error) {
            console.error('Error registering user:', error);
            localStorage.removeItem('token');
            setAuth((prevAuth) => ({
                ...prevAuth,
                token: null,
                isAuthenticated: false,
                loading: false,
            }));
        }
    };

    const login = async (formData: FormData) => {
        try {
            const res = await fetch(`${apiUrl}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            localStorage.setItem('token', data.token);
            setAuth((prevAuth) => ({
                ...prevAuth,
                token: data.token,
                isAuthenticated: true,
                loading: false,
            }));
            window.location.href = "/mytodo";
        } catch (error) {
            console.error('Error logging in:', error);
            localStorage.removeItem('token');
            setAuth((prevAuth) => ({
                ...prevAuth,
                token: null,
                isAuthenticated: false,
                loading: false,
            }));
        }
    };

    const logout = () => {
        localStorage.clear();
        setAuth((prevAuth) => ({
            ...prevAuth,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
        }));
    };

    return (
        <AuthContext.Provider value={{ register, logout, apiUrl, getTodo, auth, todo, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
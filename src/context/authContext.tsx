
import {useState, createContext, useEffect} from 'react'

type AuthType = {
        token: string | null;
        isAuthenticated: boolean;
        loading: boolean;
        user: any;
}
interface MyContextValue {
    register: (formData: any) => Promise<void>;
    login: (formData: any) => Promise<void>;
    getTodo: () => Promise<void>;
    logout: () => void;
    auth: AuthType;
    todo: any;
}

type FormData = {
    email: string;
    password: string;
}
type FormInputData = {
    username: string;
    email: string;
    password: string;
}

const AuthContext = createContext<MyContextValue>({
    register: (formData: any) => new Promise<void>((resolve, reject) => {}),
    login: (formData: any) => new Promise<void>((resolve, reject) => {}),
    logout: () => {},
    auth: {
        token: null,
        isAuthenticated: false,
        loading: true,user: null,
    },
    todo: {},
    getTodo: () => new Promise<void>((resolve, reject) => {})
});

const AuthProvider = ({children} : {children : React.ReactNode}) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: true,
        user: null,
    });
    const [todo, setTodo] = useState()
    

    useEffect(() => {
        if(auth.token){
            getTodo()
        }else{
            setAuth((prevAuth) => ({ ...prevAuth, loading: false }));
        }
    },[auth.token])

    const getTodo = async () => {
        try {
            const res = await fetch("http://localhost:5000/todo", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": auth.token
                }
            })
            const data = await res.json()
            setTodo(data)
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
    }

    const register = async (formData :  FormInputData) => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            
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
    }
    const login = async (formData : FormData) => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            
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
    }
    const logout = () => {
        localStorage.clear();
        setAuth((prevAuth) => ({
            ...prevAuth,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
        }));
    }

    return(
        <AuthContext.Provider value={{register, logout, getTodo, auth, todo, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext,AuthProvider}

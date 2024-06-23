import './App.css'
import { Hero } from './_components/hero'
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './_components/navbar'
import Todo from './_components/listTodo';
import RegisterForm from './_components/register-form';
import LoginForm from './_components/login-form';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <>
    <div className='bg-[#1A1A1A] h-[100vh]'>
    <Navbar />
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Hero />}/>
        <Route path="/mytodo" element={<Todo />}/>
        <Route path="/register" element={<RegisterForm />}/>
        <Route path="/login" element={<LoginForm />}/>
      </Routes>
    </AuthProvider>
    </div>
    </>
  )
}

export default App

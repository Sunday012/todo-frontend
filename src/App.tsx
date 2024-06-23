import './App.css'
import { Hero } from './_components/hero'
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './_components/navbar'
import MyTodo from './pages/mytodo';
import Login from './pages/login';
import Register from './pages/register';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <>
    <div className='bg-[#1A1A1A] h-[100vh]'>
    <Navbar />
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Hero />}/>
        <Route path="/mytodo" element={<MyTodo />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </AuthProvider>
    </div>
    </>
  )
}

export default App

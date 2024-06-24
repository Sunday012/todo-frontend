import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/authContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({username: "",email: "", password:""});
    const {username, email, password} = formData;
    const {register} = useContext(AuthContext)
    const onChange = (e : any) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    } 

    const RegisterUser = async (e : any) => {
        e.preventDefault()
        console.log(formData)
        await register(formData)
        navigate("/login")
    }
  return (
    <div className="w-full flex items-center justify-center">
    <form action="" onSubmit={RegisterUser} className="flex flex-col w-[50%] gap-4 items-center justify-center mt-10">
        <div className="w-full space-y-2">
        <Label htmlFor="text" className="text-white font-semibold">UserName</Label>
        <Input type="text" placeholder="UserName" id="name" name="username" value={username} onChange={onChange} />
        </div>
        <div className="w-full space-y-2">
        <Label htmlFor="email" className="text-white font-semibold">Email</Label>
        <Input type="email" placeholder="Email" id="email" name="email" value={email} onChange={onChange}/>
        </div>
        <div className="w-full space-y-2">
        <Label htmlFor="password" className="text-white font-semibold">Password</Label>
        <Input type="password" placeholder="Password" id="password" name="password" value={password} onChange={onChange} />
        </div>
        <Button type="submit" className="bg-gradient-to-r w-full from-[#4EA8DE] to-[#5E60CE] text-white mt-2 py-2">Register</Button>
        <div className="flex gap-2">
            <p className="text-white">Have an account already?</p>
            <Link to="/login" className="text-white">
             Login
            </Link>
        </div>
    </form>
    </div>
  )
}

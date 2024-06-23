import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
// type TokenDataType = {
//     id: string;
//     username: string;
// }
// interface TokenType {
//     token: TokenDataType
// }
export default function LoginForm() {
    const [formData, setFormData] = useState({email:"", password:""})
    const {email, password} = formData

    const onChange = (e : any) => setFormData({...formData, [e.target.name]:e.target.value})
    const {login} = useContext(AuthContext)
    const LoginUser = async (e : any) => {
        e.preventDefault()
        login(formData)
        // window.location.href = "/mytodo"
    }
  return (
    <div className="w-full flex items-center justify-center">
    <form action="" onSubmit={LoginUser} className="flex flex-col w-[50%] gap-4 items-center justify-center mt-10">
        <div className="w-full space-y-2">
        <Label htmlFor="email" className="text-white font-semibold">Email</Label>
        <Input type="email" placeholder="Email" id="email" name="email" value={email} onChange={onChange}/>
        </div>
        <div className="w-full space-y-2">
        <Label htmlFor="password" className="text-white font-semibold">Password</Label>
        <Input type="password" placeholder="Password" id="password" name="password" value={password} onChange={onChange} />
        </div>
        <Button type="submit" className="bg-gradient-to-r w-full from-[#4EA8DE] to-[#5E60CE] text-white mt-2 py-2">Login</Button>
        <div className="flex gap-2">
            <p className="text-white">Don't have an account already?</p>
            <Link to="/register" className="text-white">
             Register
            </Link>
        </div>
    </form>
    </div>
  )
}

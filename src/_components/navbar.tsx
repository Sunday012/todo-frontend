import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Logout } from "./logout"
import { InputTodo } from "./inputTodo"
export const Navbar = () => {
  const token = window.localStorage.getItem('token')
  if(token){
    console.log(token)
  }
  return (
    <div className="bg-[#0D0D0D] w-full h-14 flex items-center justify-center">
        <div className="w-full flex items-center justify-between px-4">
            <div>
              <Link to="/">
                <h1 className="text-white font-bold text-xl">Todo App</h1>
              </Link>
            </div>
            {token ? (
              <div className="flex gap-4 items-center">
              <InputTodo />
              <Logout />
            </div>
            ): (
              <div className="flex gap-4">
              <Button variant="outline">
              <Link to="/login">
                Login
                </Link>
              </Button>
              <Button className="bg-gradient-to-r from-[#4EA8DE] to-[#5E60CE] text-white py-2">
                <Link to="/register">
                Register
                </Link>
              </Button>
            </div>
            )}
        </div>
    </div>
  )
}

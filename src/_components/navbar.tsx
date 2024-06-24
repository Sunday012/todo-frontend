import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { InputTodo } from "./inputTodo";
import { useEffect, useState } from "react";
export const Navbar = () => {
  const [tokenState, setTokenState] = useState(false);
  const location = useLocation();

  useEffect(() => {
  const token = localStorage.getItem("token");
    if(token){
      setTokenState(!!token)
      console.log(token);
    }
  }, []);

  

  const handleLogout = () => {
    localStorage.clear();
    setTokenState(false);
    window.location.href = "/"
  };

  return (
    <div className="bg-[#0D0D0D] w-full h-14 flex items-center justify-center">
      <div className="w-full flex items-center justify-between px-4">
        <div>
          <Link to="/">
            <h1 className=" text-blue-200 font-bold text-4xl">Doet</h1>
          </Link>
        </div>
        {
          tokenState || location.pathname === "/mytodo" ? (
            <div className="flex gap-4 items-center">
              <InputTodo />
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          ) :  (
            <div className="flex gap-4">
              <Button variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-gradient-to-r from-[#4EA8DE] to-[#5E60CE] text-white py-2">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )
        }
        {/* {tokenState && location.pathname !== "/mytodo" ? (
            <div className="flex gap-4 items-center">
            <InputTodo />
            <Button onClick={handleLogout}>Logout</Button>
          </div>
          ) : (
            <div className="flex gap-4">
              <Button variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-gradient-to-r from-[#4EA8DE] to-[#5E60CE] text-white py-2">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )} */}
      </div>
    </div>
  );
};

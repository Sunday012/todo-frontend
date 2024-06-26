import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = formData;
  const { register, auth } = useContext(AuthContext);
  const { token } = auth;

  useEffect(() => {
      if (token) {
          navigate("/")
      }
  }, [token]);
  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const RegisterUser = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);
    await register(formData);
    navigate("/login");
  };
  return (
    <div className="w-full flex items-center justify-center">
      <form
        action=""
        onSubmit={RegisterUser}
        className="flex flex-col w-[50%] gap-4 items-center justify-center mt-10"
      >
        <div className="w-full space-y-2">
          <Label htmlFor="text" className="text-white font-semibold">
            UserName
          </Label>
          <Input
            type="text"
            placeholder="UserName"
            id="name"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className="w-full space-y-2">
          <Label htmlFor="email" className="text-white font-semibold">
            Email
          </Label>
          <Input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="w-full space-y-2">
          <Label htmlFor="password" className="text-white font-semibold">
            Password
          </Label>
          <Input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <Button
          type="submit"
          className="bg-gradient-to-r w-full from-[#4EA8DE] to-[#5E60CE] text-white mt-2 py-2"
        >
          Register
        </Button>
        <div className="flex gap-2">
          <p className="text-white">Have an account already?</p>
          <Link to="/login" className="text-white">
            Login
          </Link>
        </div>
      </form>
      {isloading ? (
        <div className=" mt-24 absolute flex h-screen w-full items-center justify-center">
          <div className=" mt-16 absolute w-full h-full bg-black/30 inset-0" />
          <div className="h-10 w-10 animate-pulse rounded-full border-4 border-blue-500 border-opacity-50"></div>
        </div>
      ) : null}
    </div>
  );
}

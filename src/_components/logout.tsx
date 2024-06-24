import { Button } from "@/components/ui/button"
// import { useNavigate } from "react-router-dom";

export const Logout = () => {
  // const navigate = useNavigate()
    const handleLogout = () => {
      localStorage.clear()
      window.location.href = "/"
    };
  return (
    <Button onClick={handleLogout}>
        Logout
    </Button>
  )
}

import { Button } from "@/components/ui/button"

export const Logout = () => {
    const handleLogout = () => {
      window.localStorage.clear()
      window.location.href ="/"
    };
  return (
    <Button onClick={handleLogout}>
        Logout
    </Button>
  )
}

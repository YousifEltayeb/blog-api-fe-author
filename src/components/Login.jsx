const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (formData) => {
    await fetch(`${VITE_SERVER_URL}/auth/login`, {
      mode: "cors",
      method: "POST",
      body: new URLSearchParams(formData),
    })
      .then((response) => {
        if (response.status !== 200) {
          return <div>Error: {response.statusText}</div>;
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        window.localStorage.setItem("token", json.token);
        navigate("/");
        navigate(0);
      })
      .catch((err) => console.error(err));
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default Login;

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
function Signup() {
  const navigate = useNavigate();
  const handleSignup = async (formData) => {
    await fetch(`${VITE_SERVER_URL}/auth/signup`, {
      mode: "cors",
      method: "POST",
      body: new URLSearchParams(formData),
    })
      .then((response) => {
        if (response.status !== 201) {
          return <div>Error: {response.statusText}</div>;
        }
        alert("Signup successfuly");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };
  return (
    <Card className="text-left w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your details below to create an account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => navigate("/")}>
            Login
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form action={handleSignup}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" name="password" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
              </div>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                required
              />
            </div>
          </div>
          <Button type="submit" className="mt-4 w-full">
            Signup
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Signup;

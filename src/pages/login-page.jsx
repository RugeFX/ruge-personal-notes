import { useAuthContext } from "@/contexts/auth-context";
import { useLocaleContext } from "@/contexts/locale-context";
import useInput from "@/hooks/use-input";
import { authentication, invalid_inputs } from "@/lib/localized-content";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { locale } = useLocaleContext();
  const { login } = useAuthContext();
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [isLoading, setIsLoading] = useState(false);

  const onLoginClick = async () => {
    setIsLoading(true);
    if (email === "" || password === "") {
      toast.error(invalid_inputs[locale]);
      return;
    }

    await login({ email, password });
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-full h-full min-h-screen grid place-items-center">
        <Card className="w-full max-w-xl bg-background border border-border">
          <CardHeader variant="filled" className="mb-4 grid h-28 place-items-center bg-accent">
            <Typography variant="h1" className="text-3xl text-foreground">
              {authentication[locale].login}
            </Typography>
          </CardHeader>
          <CardBody className="px-10 space-y-4">
            <Input
              label={authentication[locale].email}
              type="email"
              size="lg"
              className="text-foreground"
              color="blue"
              labelProps={{
                className:
                  "text-blue-gray-500 after:!border-accent peer-focus:!text-accent-foreground peer-focus:after:!border-accent-foreground",
              }}
              value={email}
              onChange={onEmailChange}
            />
            <Input
              label={authentication[locale].password}
              type="password"
              size="lg"
              className="text-foreground"
              color="blue"
              labelProps={{
                className:
                  "text-blue-gray-500 after:!border-accent peer-focus:!text-accent-foreground peer-focus:after:!border-accent-foreground",
              }}
              value={password}
              onChange={onPasswordChange}
            />
          </CardBody>
          <CardFooter className="px-10 text-center space-y-2">
            <Button
              size="lg"
              variant="gradient"
              color="blue"
              fullWidth
              className="flex gap-4 items-center justify-center"
              disabled={isLoading}
              onClick={onLoginClick}
            >
              {authentication[locale].login}
              {isLoading && <Spinner className="w-5 h-5" />}
            </Button>
            <Typography variant="small" className="text-foreground">
              {authentication[locale].no_account.text}
              <Link to="/register" className="text-primary underline">
                {authentication[locale].no_account.link}
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}

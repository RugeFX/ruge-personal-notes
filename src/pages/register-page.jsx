import { register } from "@/api/auth";
import { useLocaleContext } from "@/contexts/locale-context";
import useInput from "@/hooks/use-input";
import { actions, authentication, invalid_inputs } from "@/lib/localized-content";
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
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { locale } = useLocaleContext();
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");
  const [isLoading, setIsLoading] = useState(false);

  const onRegisterClick = async () => {
    setIsLoading(true);

    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      toast.error(invalid_inputs[locale]);
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(
        locale === "id"
          ? "Password tidak cocok dengan konfirmasi!"
          : "Password doesn't match with confirmation!"
      );
      setIsLoading(false);
      return;
    }

    const { data, error } = await register({ name, email, password });

    setIsLoading(false);

    if (error) {
      toast.error(`${actions[locale].register.fail}, ${data}`);
      return;
    }

    navigate("/login");
  };

  return (
    <>
      <div className="w-full h-full min-h-screen grid place-items-center">
        <Card className="w-full max-w-xl bg-background border border-border">
          <CardHeader variant="filled" className="mb-4 grid h-28 place-items-center bg-accent">
            <Typography variant="h1" className="text-3xl text-foreground">
              {authentication[locale].register}
            </Typography>
          </CardHeader>
          <CardBody className="px-10 space-y-4">
            <Input
              label={authentication[locale].name}
              size="lg"
              className="text-foreground"
              color="blue"
              labelProps={{
                className:
                  "text-blue-gray-500 after:!border-accent peer-focus:!text-accent-foreground peer-focus:after:!border-accent-foreground",
              }}
              value={name}
              onChange={onNameChange}
            />
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
            <Input
              label={authentication[locale].confirm}
              type="password"
              size="lg"
              className="text-foreground"
              color="blue"
              labelProps={{
                className:
                  "text-blue-gray-500 after:!border-accent peer-focus:!text-accent-foreground peer-focus:after:!border-accent-foreground",
              }}
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
            />
          </CardBody>
          <CardFooter className="px-10 text-center space-y-2">
            <Button
              size="lg"
              variant="gradient"
              color="blue"
              fullWidth
              onClick={onRegisterClick}
              className="flex gap-4 items-center justify-center"
              disabled={isLoading}
            >
              {authentication[locale].register}
              {isLoading && <Spinner className="w-5 h-5" />}
            </Button>
            <Typography variant="small" className="text-foreground">
              {authentication[locale].have_account.text}
              <Link to="/login" className="text-primary underline">
                {authentication[locale].have_account.link}
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}

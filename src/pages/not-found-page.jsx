import { Typography } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <span className="block text-5xl text-primary font-bold">404</span>
      <Typography variant="h1" className="text-2xl font-light">
        Page <span className="font-bold">&quot;{pathname}&quot;</span> Not Found
      </Typography>
    </div>
  );
}

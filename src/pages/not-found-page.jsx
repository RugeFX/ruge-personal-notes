import { useLocaleContext } from "@/contexts/locale-context";
import { not_found } from "@/lib/localized-content";
import { Typography } from "@material-tailwind/react";

export default function NotFoundPage() {
  const { locale } = useLocaleContext();
  return (
    <div className="flex flex-col w-full h-full min-h-screen justify-center items-center">
      <span className="block text-5xl text-primary font-bold">404</span>
      <Typography variant="h1" className="text-2xl font-light">
        {not_found[locale]}
      </Typography>
    </div>
  );
}

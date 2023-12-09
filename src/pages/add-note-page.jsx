import { addNote } from "@/api/notes";
import { useLocaleContext } from "@/contexts/locale-context";
import useInput from "@/hooks/use-input";
import { actions, add_note, invalid_inputs } from "@/lib/localized-content";
import { Button, Input, Spinner, Typography } from "@material-tailwind/react";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddNotePage() {
  const { locale } = useLocaleContext();
  const [title, onTitleChange] = useInput("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onBodyInput = (e) => {
    setBody(e.currentTarget.innerText);
  };

  const onSaveClick = async () => {
    if (title === "" || body === "") {
      toast.error(invalid_inputs[locale]);
      return;
    }

    setIsLoading(true);

    const { error, data } = await addNote({ title, body });

    if (error) {
      toast.error(`${actions[locale].add.fail}, ${data}`);
      setIsLoading(false);
      return;
    }

    toast.success(`${actions[locale].add.success}`);
    setIsLoading(false);
    navigate("/");
  };

  return (
    <>
      <Typography variant="h1" className="text-2xl mb-4">
        {add_note[locale].heading}
      </Typography>
      <div className="space-y-4">
        <Input
          variant="static"
          label={add_note[locale].title.label}
          size="lg"
          placeholder={add_note[locale].title.placeholder}
          className="!text-3xl text-foreground !font-bold"
          labelProps={{
            className:
              "text-blue-gray-500 after:!border-accent peer-focus:!text-accent-foreground peer-focus:after:!border-accent-foreground",
          }}
          value={title}
          onChange={onTitleChange}
        />
        <div className="flex flex-col-reverse">
          <div
            id="body"
            role="textbox"
            className={`peer w-full h-full min-h-[24rem] text-2xl font-normal tracking-wide border-b border-blue-gray-200 outline-none focus:border-foreground transition-colors before:text-gray-400 before:content-[attr(data-placeholder)] ${
              body ? "before:hidden" : "before:block"
            }`}
            aria-label="body"
            data-placeholder={add_note[locale].body.placeholder}
            contentEditable
            onInput={onBodyInput}
          />
          <Typography
            variant="small"
            as="label"
            htmlFor="body"
            className="text-blue-gray-500 peer-focus:text-white transition-colors"
          >
            {add_note[locale].body.label}
          </Typography>
        </div>
        <div className="w-full flex justify-end">
          <Button
            size="lg"
            variant="gradient"
            color="blue"
            className="group relative flex items-center gap-3 overflow-hidden pl-[72px]"
            onClick={onSaveClick}
            disabled={isLoading}
          >
            {add_note[locale].save}
            {isLoading ? (
              <Spinner className="p-3 w-12 h-full absolute left-0 grid place-items-center" />
            ) : (
              <CheckIcon className="p-3 w-12 h-full absolute left-0 grid place-items-center bg-blue-600 transition-colors group-hover:bg-blue-700" />
            )}
          </Button>
        </div>
      </div>
    </>
  );
}

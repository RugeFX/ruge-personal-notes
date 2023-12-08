import { addNote } from "@/lib/note-utils";
import { Button, Input, Typography } from "@material-tailwind/react";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddNotePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();

  const onTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onBodyInput = (e) => {
    setBody(e.currentTarget.innerText);
  };

  const onSaveClick = () => {
    if (title === "" || body === "") {
      toast.error("Please fill in the inputs first!", {
        position: "bottom-right",
      });
      return;
    }

    toast.success("Successfully added note!", { position: "bottom-right" });
    addNote({ title, body });
    navigate("/");
  };

  return (
    <>
      <Typography variant="h1" className="text-2xl mb-4">
        Add a new Note
      </Typography>
      <div className="space-y-4">
        <Input
          variant="static"
          label="Title"
          size="lg"
          placeholder="Your title..."
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
            data-placeholder="Your note..."
            contentEditable
            onInput={onBodyInput}
          />
          <Typography
            variant="small"
            as="label"
            htmlFor="body"
            className="text-blue-gray-500 peer-focus:text-white transition-colors"
          >
            Body
          </Typography>
        </div>
        <div className="w-full flex justify-end">
          <Button
            size="lg"
            variant="gradient"
            color="blue"
            className="group relative flex items-center gap-3 overflow-hidden pl-[72px]"
            onClick={onSaveClick}
          >
            Save
            <CheckIcon className="p-3 w-12 h-full absolute left-0 grid place-items-center bg-blue-600 transition-colors group-hover:bg-blue-700" />
          </Button>
        </div>
      </div>
    </>
  );
}

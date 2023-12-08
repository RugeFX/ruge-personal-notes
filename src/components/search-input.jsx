import { Input } from "@material-tailwind/react";
import { SearchIcon } from "lucide-react";
import PropTypes from "prop-types";

export default function SearchInput({ keyword, onChange }) {
  return (
    <Input
      label="Search note"
      size="lg"
      className="text-foreground"
      color="blue"
      defaultValue={keyword}
      labelProps={{
        className:
          "text-blue-gray-500 after:!border-accent peer-focus:!text-accent-foreground peer-focus:after:!border-accent-foreground",
      }}
      icon={<SearchIcon />}
      onChange={onChange}
    />
  );
}

SearchInput.propTypes = {
  keyword: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

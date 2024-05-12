import { FC, useState } from "react";
import Button from "../ToolBar/Button";
import { BsLink45Deg } from "react-icons/bs";
import LinkForm, { linkOption } from "./LinkForm";

interface Props {
  onSubmit(link: linkOption): void;
}

const InserLink: FC<Props> = ({ onSubmit }): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleSubmit = (link: linkOption) => {
    if (!link.url.trim()) return hideForm();

    onSubmit(link);
    hideForm();
  };

  const hideForm = () => {
    setVisible(false);
  };

  const showForm = () => {
    setVisible(true);
  };

  return (
    <div
      onKeyDown={({ key }) => {
        if (key === "Escape") hideForm();
      }}
      className="relative"
    >
      <Button onClick={visible ? hideForm : showForm}>
        <BsLink45Deg />
      </Button>

      <div className="absolute top-full right-0 mt-4 z-50">
        <LinkForm visible={visible} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default InserLink;

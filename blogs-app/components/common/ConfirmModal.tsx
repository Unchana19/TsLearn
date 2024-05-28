import { FC } from "react";
import ModalContainer, { ModalProps } from "./ModalContainer";
import classNames from "classnames";
import { ImSpinner3 } from "react-icons/im";

interface Props extends ModalProps {
  title: string;
  subTitle: string;
  busy?: boolean;
  onCancel?(): void;
  onConfirm?(): void;
}

const commonBtnClasses = "px-3 py-1 rounded-xl";

const ConfirmModal: FC<Props> = ({
  visible,
  busy = false,
  onClose,
  onCancel,
  onConfirm,
  title,
  subTitle,
}): JSX.Element => {
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="bg-primary-dark dark:bg-primary rounded p-3 max-w-[380px]">
        {/* title */}
        <p className="dark:text-primary-dark text-primary font-semibold text-lg">
          {title}
        </p>

        {/* sub title */}
        <p className="dark:text-primary-dark text-primary">{subTitle}</p>

        {/* button */}
        {busy && (
          <div className="flex items-center space-x-2 dark:text-primary-dark text-primary">
            <ImSpinner3 className="animate-spin" />
            <span>Please wait</span>
          </div>
        )}
        {!busy && (
          <div className="flex items-center">
            <button
              onClick={onCancel}
              className={classNames(commonBtnClasses, "text-red-500")}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={classNames(commonBtnClasses, "bg-red-500 text-white")}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;

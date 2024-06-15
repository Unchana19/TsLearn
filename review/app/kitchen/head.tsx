import { FC } from "react";
import AppHead from "../../components/AppHead";

interface Props {}

const KitchenHead: FC<Props> = (props): JSX.Element => {
  return (
    <AppHead
      desc="Get authentic product review for kitchen products"
      title="Kitchen"
    />
  );
};

export default KitchenHead;

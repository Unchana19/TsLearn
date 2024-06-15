import HeadClient from "@/components/HeadClient";
import { loadProductList } from "@/utils/helper";
import { NextPage } from "next";

interface Props {
  params: { subCategory: string };
}

const ElectronicsSubCat: NextPage<Props> = ({ params }: Props) => {
  const { subCategory } = params;
  const { products } = loadProductList(subCategory);

  return (
    <HeadClient subCategory={subCategory}>
      ElectronicsSubCat: {subCategory}
      {products.map((item) => {
        return <div>{item.title}</div>;
      })}
    </HeadClient>
  );
};

export default ElectronicsSubCat;

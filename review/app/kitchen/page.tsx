import { NextPage } from "next";
import ProductCategoryList from "../../components/ProductCategoryList";
import { loadCategories } from "@/utils/helper";

interface Props {}

const Kitchen: NextPage<Props> = () => {
  const { product_category } = loadCategories("kitchen");

  return (
    <div>
      <ProductCategoryList slugPrefix="kitchen" categories={product_category} />
    </div>
  );
};

export default Kitchen;

import { NextPage } from "next";
import ProductCategoryList from "../../components/ProductCategoryList";
import { loadCategories } from "@/utils/helper";

interface Props {}

const Apparel: NextPage<Props> = () => {
  const { product_category } = loadCategories("apparel");

  return (
    <div>
      <ProductCategoryList slugPrefix="apparel" categories={product_category} />
    </div>
  );
};

export default Apparel;

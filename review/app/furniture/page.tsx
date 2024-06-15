import { NextPage } from "next";
import ProductCategoryList from "../../components/ProductCategoryList";
import { loadCategories } from "@/utils/helper";

interface Props {}

const Furniture: NextPage<Props> = () => {
  const { product_category } = loadCategories("furniture");

  return (
    <div>
      <ProductCategoryList
        slugPrefix="furniture"
        categories={product_category}
      />
    </div>
  );
};

export default Furniture;

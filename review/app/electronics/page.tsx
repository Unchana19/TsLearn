import { NextPage } from "next";
import ProductCategoryList from "../../components/ProductCategoryList";
import { loadCategories } from "@/utils/helper";

interface Props {}

const Electronics: NextPage<Props> = () => {
  const { product_category } = loadCategories("electronics");

  return (
    <div>
      <ProductCategoryList
        slugPrefix="electronics"
        categories={product_category}
      />
    </div>
  );
};

export default Electronics;

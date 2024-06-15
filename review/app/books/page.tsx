import { NextPage } from "next";
import ProductCategoryList from "../../components/ProductCategoryList";
import { loadCategories } from "@/utils/helper";

interface Props {}

const Books: NextPage<Props> = () => {
  const { product_category } = loadCategories("books");

  return (
    <div>
      <ProductCategoryList slugPrefix="books" categories={product_category} />
    </div>
  );
};

export default Books;

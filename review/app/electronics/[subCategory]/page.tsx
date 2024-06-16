import HeadClient from "@/components/HeadClient";
import ProductCategoryList from "@/components/ProductCategoryList";
import { loadCategories, loadProductList } from "@/utils/helper";
import { NextPage } from "next";

interface Props {
  params: { subCategory: string };
}

export const generateStaticParams = () => {
  const { product_category } = loadCategories("electronics");
  const slugs = product_category.map(({ slug }) => {
    return {
      subCategory: slug,
    };
  });

  return slugs;
};

const ElectronicsSubCat: NextPage<Props> = ({ params }: Props) => {
  const { subCategory } = params;
  const { products } = loadProductList(subCategory);

  return (
    <HeadClient subCategory={subCategory}>
      {products.map((item) => {
        return (
          <ProductCategoryList
            key={item.slug}
            slugPrefix={subCategory}
            categories={products}
          />
        );
      })}
    </HeadClient>
  );
};

export default ElectronicsSubCat;

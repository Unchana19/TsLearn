import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductCategory } from "@/utils/helper";

interface Props {
  categories: ProductCategory;
  slugPrefix: string;
}

const ProductCategoryList: FC<Props> = ({
  categories,
  slugPrefix,
}): JSX.Element => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 max-w-4xl">
      {categories.map((item) => {
        return (
          <Link href={`${slugPrefix}/${item.slug}`} key={item.slug}>
            <div className="w-full aspect-video relative rounded-lg overflow-hidden">
              <Image
                fill
                src={item.thumbnail}
                alt={item.title}
                sizes="(max-width: 896px) 262px, 390px"
                priority
              />
            </div>
            <div className="mt-3">
              <h1 className="text-lg font-semibold">{item.title}</h1>
              <p>{item.subtitle}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductCategoryList;

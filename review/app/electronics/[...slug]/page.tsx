import { loadAllProduct } from "@/utils/helper";
import { FC } from "react";

interface Props {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const products = loadAllProduct();
  const slugs = [];

  for (let key in products) {
    const productByCategory = products[key];

    for (let product of productByCategory) {
      slugs.push({
        slug: [key, product.slug],
      });
    }
  }

  return slugs;
}

const ElectronicsDetail: FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="font-semibold text-lg">
      Electronics Detail {props.params.slug[0]} / {props.params.slug[1]}
    </div>
  );
};

export default ElectronicsDetail;

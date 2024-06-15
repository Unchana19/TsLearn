"use client";

import { APP_NAME } from "@/components/AppHead";
import { NextPage } from "next";
import { useEffect } from "react";

interface Props {
  params: { subCategory: string };
}

const KitchenSubCat: NextPage<Props> = ({ params }) => {
  const { subCategory } = params;

  useEffect(() => {
    document.title = `${subCategory} | ${APP_NAME}`;
  }, []);

  return <div>KitchenSubCat: {subCategory}</div>;
};

export default KitchenSubCat;

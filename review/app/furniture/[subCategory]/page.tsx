"use client";

import { APP_NAME } from "@/components/AppHead";
import { NextPage } from "next";
import { useEffect } from "react";

interface Props {
  params: { subCategory: string };
}

const FurnitureSubCat: NextPage<Props> = ({ params }: Props) => {
  const { subCategory } = params;

  useEffect(() => {
    document.title = `${subCategory} | ${APP_NAME}`;
  }, []);

  return <div>FurnitureSubCat: {subCategory}</div>;
};

export default FurnitureSubCat;

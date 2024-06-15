"use client";

import { APP_NAME } from "@/components/AppHead";
import { NextPage } from "next";
import { useEffect } from "react";

interface Props {
  params: { subCategory: string };
}

const ApparelSubCat: NextPage<Props> = ({ params }: Props) => {
  const { subCategory } = params;

  useEffect(() => {
    document.title = `${subCategory} | ${APP_NAME}`;
  }, []);

  return <div>ApparelSubCat: {subCategory}</div>;
};

export default ApparelSubCat;

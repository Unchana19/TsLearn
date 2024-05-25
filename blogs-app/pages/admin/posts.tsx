import AdminLayout from "@/components/layout/AdminLayout";
import { NextPage } from "next";

interface Props {}

const Posts: NextPage<Props> = (): JSX.Element => {
  return (
    <AdminLayout>
      <div>Post</div>
    </AdminLayout>
  );
};

export default Posts;

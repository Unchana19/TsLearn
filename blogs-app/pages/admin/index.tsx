import AdminLayout from "@/components/layout/AdminLayout";
import { NextPage } from "next";

interface Props {}

const Admin: NextPage<Props> = (): JSX.Element => {
  return (
    <AdminLayout>
      <div>admin</div>
    </AdminLayout>
  );
};

export default Admin;

import Editor from "@/components/editor";
import AdminLayout from "@/components/layout/AdminLayout";
import { NextPage } from "next";

interface Props {}

const Create: NextPage<Props> = (): JSX.Element => {
  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor
          onSubmit={(post) => {
            console.log(post);
          }}
          initialValue={{
            title: "test",
            meta: "test",
            content: "<h1>test</h1>",
            slug: "test",
            tags: "javascript",
            thumbnail:
              "https://images.unsplash.com/photo-1715520045597-de56a8639058?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
      </div>
    </AdminLayout>
  );
};

export default Create;

import Editor, { FinalPost } from "@/components/editor";
import AdminLayout from "@/components/layout/AdminLayout";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { generateFormData } from "@/utils/helper";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import axios from "axios";
import { useState } from "react";

interface PostResponse extends FinalPost {
  id: string;
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Update: NextPage<Props> = ({ post }): JSX.Element => {
  const [updating, setUpdating] = useState(false);

  const handleSubmit = async (post: FinalPost) => {
    setUpdating(true);
    try {
      // we have to generate FormData
      const formData = generateFormData(post);

      // submit our post
      const { data } = await axios.patch(`/api/posts/${post.id}`, formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
    setUpdating(false);
  };

  return (
    <AdminLayout title="Update">
      <div className="max-w-4xl mx-auto">
        <Editor
          onSubmit={handleSubmit}
          btnTitle="Update"
          initialValue={post}
          busy={updating}
        />
      </div>
    </AdminLayout>
  );
};

interface ServerSideResponse {
  post: PostResponse;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async (context) => {
  try {
    const slug = context.query.slug as string;

    await dbConnect();
    const post = await Post.findOne({ slug });
    if (!post)
      return {
        notFound: true,
      };

    const { _id, meta, title, content, thumbnail, tags } = post;

    return {
      props: {
        post: {
          id: _id.toString(),
          meta,
          title,
          content,
          tags: tags.join(","),
          thumbnail: thumbnail?.url || "",
          slug,
        },
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default Update;

import ConfirmModal from "@/components/common/ConfirmModal";
import InfiniteScrollPosts from "@/components/common/InfiniteScrollPosts";
import AdminLayout from "@/components/layout/AdminLayout";
import { formatPosts, readPostsFromDB } from "@/lib/utils";
import { filterPosts } from "@/utils/helper";
import { PostDetail } from "@/utils/types";
import axios from "axios";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useState } from "react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

let pageNo = 0;
const limit = 9;

const Posts: NextPage<Props> = ({ posts }): JSX.Element => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePost, setHasMorePosts] = useState(true);

  const fetchMorePosts = async () => {
    try {
      pageNo++;
      const { data } = await axios(
        `/api/posts?limit=${limit}&pageNo=${pageNo}`
      );
      if (data.posts.length < limit) {
        setHasMorePosts(false);
      }
      setPostsToRender([...postsToRender, ...data.posts]);
    } catch (error) {
      setHasMorePosts(false);
      console.log(error);
    }
  };

  return (
    <>
      <AdminLayout>
        <InfiniteScrollPosts
          hasMore={hasMorePost}
          next={fetchMorePosts}
          dataLength={postsToRender.length}
          posts={postsToRender}
          showControls
          onPostRemoved={(post) => {
            setPostsToRender(filterPosts(posts, post));
          }}
        />
      </AdminLayout>
    </>
  );
};

interface ServerSideResponse {
  posts: PostDetail[];
}

export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async () => {
  try {
    //read posts
    const posts = await readPostsFromDB(limit, pageNo);

    //format posts
    const formattedPosts = formatPosts(posts);
    return {
      props: {
        posts: formattedPosts,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default Posts;

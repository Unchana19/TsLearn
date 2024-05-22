import InfiniteScrollPosts from "@/components/common/InfiniteScrollPosts";
import DefaultLayout from "@/components/layout/DefaultLayout";
import { formatPosts, readPostsFromDB } from "@/lib/utils";
import { filterPosts } from "@/utils/helper";
import { PostDetail, UserProfile } from "@/utils/types";
import axios from "axios";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

let pageNo = 0;
const limit = 9;

const Home: NextPage<Props> = ({ posts }): JSX.Element => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePost, setHasMorePosts] = useState(posts.length >= limit);

  const { data } = useSession();
  const profile = data?.user as UserProfile;

  const isAdmin = profile && profile.role === "admin";

  const fetchMorePosts = async () => {
    try {
      pageNo++;
      const { data } = await axios(
        `/api/posts?limit=${limit}&skip=${postsToRender.length}`
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
    <DefaultLayout>
      <div className="pb-20">
        <InfiniteScrollPosts
          hasMore={hasMorePost}
          next={fetchMorePosts}
          dataLength={postsToRender.length}
          posts={postsToRender}
          showControls={isAdmin}
          onPostRemoved={(post) => {
            setPostsToRender(filterPosts(posts, post));
          }}
        />
      </div>
    </DefaultLayout>
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

export default Home;

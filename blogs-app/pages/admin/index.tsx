import ContentWrapper from "@/components/admin/ContentWrapper";
import LatestCommentListCard from "@/components/admin/LatestCommentListCard";
import LatestPostListCard from "@/components/admin/LatestPostListCard";
import LatesUserTable from "@/components/admin/LatestUserTable";
import AdminLayout from "@/components/layout/AdminLayout";
import { LatestComment, LatestUserProfile, PostDetail } from "@/utils/types";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface Props {}

const Admin: NextPage<Props> = (): JSX.Element => {
  const [latestPosts, setLatestPost] = useState<PostDetail[]>();
  const [latestComments, setLatestComments] = useState<LatestComment[]>();
  const [latestUsers, setLatestUsers] = useState<LatestUserProfile[]>();

  useEffect(() => {
    axios
      .get("/api/posts?limit=5&skip=0")
      .then(({ data }) => {
        setLatestPost(data.posts);
      })
      .catch((err) => console.log(err));

    axios
      .get("/api/comment/latest")
      .then(({ data }) => {
        setLatestComments(data.comments);
      })
      .catch((err) => console.log(err));

    axios
      .get("/api/user")
      .then(({ data }) => {
        setLatestUsers(data.users);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(latestComments);
  return (
    <AdminLayout>
      <div className="flex space-x-10">
        <ContentWrapper seeAllRoute="/admin/posts" title="Latest Post">
          {latestPosts?.map(({ id, title, meta, slug }) => {
            return (
              <LatestPostListCard
                key={id}
                title={title}
                meta={meta}
                slug={slug}
              />
            );
          })}
        </ContentWrapper>

        <ContentWrapper seeAllRoute="/admin/comments" title="Latest Comment">
          {latestComments?.map((comment: any) => {
            return <LatestCommentListCard comment={comment} key={comment.id} />;
          })}
        </ContentWrapper>
      </div>

      {/* Latest Users */}
      <div className="max-w-[500px]">
        <ContentWrapper title="Latest Users" seeAllRoute="/admin/users">
          <LatesUserTable users={latestUsers} />
        </ContentWrapper>
      </div>
    </AdminLayout>
  );
};

export default Admin;

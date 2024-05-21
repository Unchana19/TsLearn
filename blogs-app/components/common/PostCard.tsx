import { PostDetail } from "@/utils/types";
import dateformat from "dateformat";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  post: PostDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?(): void;
}

const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) return text;
  return text.substring(0, trimBy).trim() + "...";
};

const PostCard: FC<Props> = ({
  controls = false,
  post,
  busy,
  onDeleteClick,
}): JSX.Element => {
  const { title, slug, meta, tags, thumbnail, createdAt } = post;
  return (
    <div className="rounded shadow-sm shadow-secondary-dark overflow-hidden dark:bg-primary-dark bg-primary transition flex flex-col h-full">
      {/* thumbnail */}
      <Link href={`/${slug}`}>
        <div className="aspect-video relative">
          {!thumbnail ? (
            <div className="w-full h-full flex items-center justify-center text-secondary-dark opacity-50 font-semibold">
              {" "}
              No image{" "}
            </div>
          ) : (
            <Image src={thumbnail} sizes="20" fill alt="Thumbnail" priority />
          )}
        </div>
      </Link>

      {/* Post Info */}
      <div className="p-2 flex-1 flex flex-col">
        <Link href={`/${slug}`}>
          <div className="flex items-center justify-between text-sm text-primary-dark dark:text-primary">
            <div className="flex items-center space-x-1">
              {tags.map((tag, index) => (
                <span key={tag + index}>#{tag}</span>
              ))}
            </div>
            <span>{dateformat(createdAt, "d-mmm-yyyy")}</span>
          </div>
        </Link>

        <h1 className="font-semibold text-primary-dark dark:text-primary">
          {trimText(title, 50)}
        </h1>
        <p className="text-secondary-dark">{trimText(meta, 70)}</p>
        {controls && (
          <div className="flex justify-end items-center h-8 mt-auto space-x-4 text-primary-dark dark:text-primary">
            {busy ? (
              <span className="animate-pulse">Removing</span>
            ) : (
              <>
                <Link
                  className="hover:underline"
                  href={`/admin/posts/update/${slug}`}
                >
                  Edit
                </Link>
                <button onClick={onDeleteClick} className="hover:underline">
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;

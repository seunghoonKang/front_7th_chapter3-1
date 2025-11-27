import { PostCards } from "@/components/PostCards";
import type { Post } from "@/services/postService";

const PostPage = ({ data }: { data: Post[] }) => {
  return (
    <div>
      <PostCards posts={data as Post[]} />
    </div>
  );
};

export default PostPage;

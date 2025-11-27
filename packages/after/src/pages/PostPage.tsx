import { getColumns, DataTable } from "@/components/post/table";
import { PostCards } from "@/components/PostCards";
import type { Post } from "@/services/postService";

interface PostPageProps {
  data: Post[];
  onEdit?: (post: Post) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

const PostPage = ({
  data,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}: PostPageProps) => {
  const columns = getColumns({
    onEdit,
    onDelete,
    onPublish,
    onArchive,
    onRestore,
  });

  return (
    <div className="space-y-6">
      <PostCards posts={data as Post[]} />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PostPage;

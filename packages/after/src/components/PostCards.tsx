import { Card, CardContent, CardHeader } from "./ui/card";
import type { Post } from "@/services/postService";

export const PostCards = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="grid grid-cols-5 grid-cols-auto-fit minmax-130px minmax-1fr gap-3 mb-4">
      <Card>
        <CardHeader>전체</CardHeader>
        <CardContent>{posts.length}</CardContent>
      </Card>
      <Card variant="success">
        <CardHeader>게시됨</CardHeader>
        <CardContent>
          {posts.filter((post) => post.status === "published").length}
        </CardContent>
      </Card>
      <Card variant="warning">
        <CardHeader>임시저장</CardHeader>
        <CardContent>
          {posts.filter((post) => post.status === "draft").length}
        </CardContent>
      </Card>
      <Card variant="danger">
        <CardHeader>보관됨</CardHeader>
        <CardContent>
          {posts.filter((post) => post.status === "archived").length}
        </CardContent>
      </Card>
      <Card variant="secondary">
        <CardHeader>총 조회수</CardHeader>
        <CardContent>
          {posts.reduce((sum, post) => sum + post.views, 0)}
        </CardContent>
      </Card>
    </div>
  );
};

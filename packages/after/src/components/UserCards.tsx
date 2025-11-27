import { Card, CardContent, CardHeader } from "./ui/card";
import type { User } from "@/services/userService";

export const UserCards = ({ users }: { users: User[] }) => {
  return (
    <div className="grid grid-cols-5 grid-cols-auto-fit minmax-130px minmax-1fr gap-3 mb-4">
      <Card>
        <CardHeader>전체</CardHeader>
        <CardContent>{users.length}</CardContent>
      </Card>
      <Card variant="success">
        <CardHeader>활성</CardHeader>
        <CardContent>
          {users.filter((user) => user.status === "active").length}
        </CardContent>
      </Card>
      <Card variant="warning">
        <CardHeader>비활성</CardHeader>
        <CardContent>
          {users.filter((user) => user.status === "inactive").length}
        </CardContent>
      </Card>
      <Card variant="danger">
        <CardHeader>정지</CardHeader>
        <CardContent>
          {users.filter((user) => user.status === "suspended").length}
        </CardContent>
      </Card>
      <Card variant="secondary">
        <CardHeader>관리자</CardHeader>
        <CardContent>
          {users.filter((user) => user.role === "admin").length}
        </CardContent>
      </Card>
    </div>
  );
};

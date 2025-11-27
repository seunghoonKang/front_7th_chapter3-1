import { getColumns, DataTable } from "@/components/user/table";
import { UserCards } from "@/components/UserCards";
import type { User } from "@/services/userService";

interface UserPageProps {
  data: User[];
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
}

const UserPage = ({ data, onEdit, onDelete }: UserPageProps) => {
  const columns = getColumns({
    onEdit,
    onDelete,
  });

  return (
    <div className="space-y-6">
      <UserCards users={data as User[]} />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default UserPage;

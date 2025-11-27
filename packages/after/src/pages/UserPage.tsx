import { columns } from "@/components/user/table/columns";
import { DataTable } from "@/components/user/table/data-table";
import { UserCards } from "@/components/UserCards";
import type { User } from "@/services/userService";

const UserPage = ({ data }: { data: User[] }) => {
  return (
    <div>
      <UserCards users={data as User[]} />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default UserPage;

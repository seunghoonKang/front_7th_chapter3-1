import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { User } from "@/services/userService";
import type { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";

const roleConfig = {
  admin: {
    variant: "danger" as const,
    label: "관리자",
  },
  moderator: {
    variant: "warning" as const,
    label: "운영자",
  },
  user: {
    variant: "primary" as const,
    label: "사용자",
  },
} as const;

type RoleType = keyof typeof roleConfig;

const getRoleConfig = (role: unknown) => {
  const roleKey = role as RoleType;
  return roleConfig[roleKey] || roleConfig.user;
};

const statusConfig = {
  active: {
    variant: "success" as const,
    label: "게시됨",
  },
  suspended: {
    variant: "danger" as const,
    label: "거부됨",
  },
};

type StatusType = keyof typeof statusConfig;

const getStatusConfig = (status: unknown) => {
  const statusKey = status as StatusType;
  return statusConfig[statusKey] || statusConfig.active;
};

interface ColumnsProps {
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
}

export const getColumns = ({
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<User>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "사용자명",
  },
  {
    accessorKey: "email",
    header: "이메일",
  },
  {
    accessorKey: "role",
    header: "역할",
    cell: ({ row }) => {
      const role = row.getValue("role");
      const config = getRoleConfig(role);
      return (
        <Badge variant={config.variant} shape="square">
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const config = getStatusConfig(status);
      return (
        <Badge variant={config.variant} shape="square">
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "생성일",
  },
  {
    accessorKey: "lastLogin",
    header: "마지막 로그인",
    cell: ({ row }) => {
      const lastLogin = row.getValue("lastLogin") as string | undefined;
      return <span>{lastLogin || "-"}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "관리",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit?.(user)}
            title="수정"
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete?.(user.id)}
            title="삭제"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];

// 하위 호환성을 위한 기본 columns export
export const columns = getColumns({});

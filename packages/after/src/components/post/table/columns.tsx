import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Post } from "@/services/postService";
import type { ColumnDef } from "@tanstack/react-table";
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  ArchiveIcon,
  RefreshCwIcon,
} from "lucide-react";

const statusConfig = {
  draft: {
    variant: "warning" as const,
    label: "임시저장",
  },
  published: {
    variant: "success" as const,
    label: "게시됨",
  },
  archived: {
    variant: "secondary" as const,
    label: "보관됨",
  },
} as const;

type StatusType = keyof typeof statusConfig;

const getStatusConfig = (status: unknown) => {
  const statusKey = status as StatusType;
  return statusConfig[statusKey] || statusConfig.draft;
};

const categoryConfig = {
  development: {
    variant: null,
    label: "development",
  },
  design: {
    variant: "info" as const,
    label: "design",
  },
  accessibility: {
    variant: "danger" as const,
    label: "accessibility",
  },
} as const;

type CategoryType = keyof typeof categoryConfig;

const getCategoryConfig = (category: unknown) => {
  const categoryKey = category as CategoryType;
  return categoryConfig[categoryKey] || categoryConfig.development;
};

interface ColumnsProps {
  onEdit?: (post: Post) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const getColumns = ({
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}: ColumnsProps): ColumnDef<Post>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "제목",
  },
  {
    accessorKey: "author",
    header: "작성자",
  },
  {
    accessorKey: "category",
    header: "카테고리",
    cell: ({ row }) => {
      const category = row.getValue("category");
      const config = getCategoryConfig(category);
      return (
        <Badge variant={config.variant} shape="pill">
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
    accessorKey: "views",
    header: "조회수",
  },
  {
    accessorKey: "createdAt",
    header: "작성일",
  },
  {
    accessorKey: "actions",
    header: "관리",
    cell: ({ row }) => {
      const post = row.original;
      const status = post.status;

      return (
        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit?.(post)}
            title="수정"
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          {status === "draft" && (
            <Button
              variant="success"
              size="sm"
              onClick={() => onPublish?.(post.id)}
              title="게시"
            >
              <CheckIcon className="w-4 h-4" />
            </Button>
          )}
          {status === "published" && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onArchive?.(post.id)}
              title="보관"
            >
              <ArchiveIcon className="w-4 h-4" />
            </Button>
          )}
          {status === "archived" && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onRestore?.(post.id)}
              title="복원"
            >
              <RefreshCwIcon className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete?.(post.id)}
            title="삭제"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];

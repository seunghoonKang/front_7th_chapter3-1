import { Button } from "./ui/button";

interface EntityTypeSelectorProps {
  entityType: "user" | "post";
  setEntityType: (entityType: "user" | "post") => void;
}

export const EntityTypeSelector = ({
  entityType,
  setEntityType,
}: EntityTypeSelectorProps) => {
  return (
    <div className="mb-4 border-b-2 border-gray-300 pb-2 flex gap-1">
      <Button
        variant={entityType === "post" ? "primary" : "secondary"}
        size="sm"
        onClick={() => setEntityType("post")}
      >
        게시글
      </Button>
      <Button
        variant={entityType === "user" ? "primary" : "secondary"}
        size="sm"
        onClick={() => setEntityType("user")}
      >
        사용자
      </Button>
    </div>
  );
};

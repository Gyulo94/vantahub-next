import { EllipsisIcon, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  content: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function NoteActionsSection({
  content,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex items-start justify-between w-full gap-2">
      <p className="min-w-0 flex-1 wrap-break-word whitespace-pre-wrap">
        {content}
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <EllipsisIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="flex flex-col text-muted-foreground"
          align="start"
        >
          <DropdownMenuItem
            onClick={onEdit}
            className="p-2 flex items-center gap-2 hover:bg-accent rounded cursor-pointer text-white"
          >
            <Edit className="size-4" /> <span>Editar</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            className="p-2 flex items-center gap-2 hover:bg-destructive/30! text-destructive rounded cursor-pointer"
          >
            <Trash2 className="size-4" /> <span>Eliminar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
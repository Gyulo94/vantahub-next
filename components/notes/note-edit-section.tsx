import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  editingTextareaRef: RefObject<HTMLTextAreaElement | null>;
  editingContent: string;
  onSave: () => void;
  onCancel: () => void;
}

export default function NoteEditSection({
  editingTextareaRef,
  editingContent,
  onSave,
  onCancel,
}: Props) {
  return (
    <div className="space-y-2">
      <Textarea
        ref={editingTextareaRef}
        className="w-full border rounded p-2 bg-background text-foreground resize-none"
        rows={3}
        defaultValue={editingContent}
      />
      <div className="flex items-center justify-end gap-2">
        <Button size="sm" onClick={onSave}>
          Editar
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}
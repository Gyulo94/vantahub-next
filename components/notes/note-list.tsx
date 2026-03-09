import { useRef, useState } from "react";
import { highlightPlugin } from "@react-pdf-viewer/highlight";
import { Note } from "@/lib/types/note";
import { useUpdateNote } from "@/lib/queries";
import NoteEditSection from "./note-edit-section";
import NoteActionsSection from "./note-actions-section";
import { ScrollArea } from "../ui/scroll-area";
import { useDeleteNote } from "@/lib/queries";

interface Props {
  highlightPluginInstance: ReturnType<typeof highlightPlugin>;
  notes: Note[];
}

export default function NoteList({ highlightPluginInstance, notes }: Props) {
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const editingTextareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutate: updateNote } = useUpdateNote();
  const { mutate: deleteNote } = useDeleteNote();

  function startEditNote(noteId: string) {
    const note = notes.find((n) => n.id === noteId);
    if (note) {
      setEditingNoteId(noteId);
      setEditingContent(note.content);
    }
  }

  function saveEditNote() {
    const nextContent = editingTextareaRef.current?.value.trim() ?? "";
    const editingNote = notes.find((note) => note.id === editingNoteId);

    if (nextContent !== "" && editingNote) {
      updateNote({
        id: editingNote.id,
        values: {
          content: nextContent,
          bookId: editingNote.bookId || 0,
          pageIndex: editingNote.pageIndex || 0,
          quote: editingNote.quote,
          highlightAreas: editingNote.highlightAreas,
        },
      });
      setEditingNoteId(null);
      setEditingContent("");
    }
  }

  function handleDeleteNote(noteId: string) {
    deleteNote(noteId);
  }

  function cancelEditNote() {
    setEditingNoteId(null);
    setEditingContent("");
  }

  return (
    <div className="flex w-full h-full overflow-hidden pt-2">
      <ScrollArea className="w-full p-1 pr-2">
        {notes.length === 0 && <div className="text-center">No hay notas</div>}
        {notes.map((note) => {
          return (
            <div
              className="border-b border-b-accent-foreground/10 p-2 cursor-pointer mb-2"
              key={note.id}
              onClick={() =>
                editingNoteId !== note.id &&
                highlightPluginInstance.jumpToHighlightArea(
                  note.highlightAreas[0],
                )
              }
            >
              <blockquote className="border-l-4 border-muted-foreground italic text-muted-foreground text-sm leading-6 mb-2 pl-2 text-justify rounded-sm p-4 cursor-pointer bg-accent">
                {note.quote}
                <p className="text-right">pagina: {note.pageIndex}</p>
              </blockquote>
              {editingNoteId === note.id ? (
                <NoteEditSection
                  editingTextareaRef={editingTextareaRef}
                  editingContent={editingContent}
                  onSave={saveEditNote}
                  onCancel={cancelEditNote}
                />
              ) : (
                <NoteActionsSection
                  content={note.content}
                  onEdit={() => startEditNote(note.id)}
                  onDelete={() => handleDeleteNote(note.id)}
                />
              )}
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
}

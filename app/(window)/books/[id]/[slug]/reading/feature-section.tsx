"use client";

import {
  Worker,
  Viewer,
  SpecialZoomLevel,
  LocalizationMap,
} from "@react-pdf-viewer/core";
import { useFindBookById } from "@/lib/queries";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import {
  HighlightArea,
  highlightPlugin,
  MessageIcon,
} from "@react-pdf-viewer/highlight";

import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import es_ES from "@react-pdf-viewer/locales/lib/es_ES.json";
import { renderToolbar } from "@/components/viewer/tool-bar";
import {
  renderHighlightTarget,
  HighlightContent,
  HighlightAreaList,
} from "@/components/viewer/highlight";
import { useRef, useState } from "react";
import { Edit, EllipsisIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Notes from "@/components/viewer/notes";

interface Props {
  id: number;
}

export interface Note {
  id: string;
  content: string;
  highlightAreas: HighlightArea[];
  quote: string;
  pageIndex?: number;
}

export default function FeatureSection({ id }: Props) {
  const { data: book } = useFindBookById(id);
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const editingTextareaRef = useRef<HTMLTextAreaElement>(null);

  function deleteNote(noteId: string) {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  }

  function startEditNote(noteId: string) {
    const note = notes.find((n) => n.id === noteId);
    if (note) {
      setEditingNoteId(noteId);
      setEditingContent(note.content);
    }
  }

  function saveEditNote() {
    const nextContent = editingTextareaRef.current?.value.trim() ?? "";
    if (nextContent !== "") {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNoteId ? { ...note, content: nextContent } : note,
        ),
      );
      setEditingNoteId(null);
      setEditingContent("");
    }
  }

  function cancelEditNote() {
    setEditingNoteId(null);
    setEditingContent("");
  }

  function SidebarNotes() {
    return (
      <div className="flex w-full h-full overflow-hidden pt-2">
        <div className="w-full">
          {notes.length === 0 && (
            <div className="text-center">No hay notas</div>
          )}
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
                  <div className="space-y-2">
                    <Textarea
                      ref={editingTextareaRef}
                      className="w-full border rounded p-2 bg-background text-foreground resize-none"
                      rows={3}
                      defaultValue={editingContent}
                    />
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" onClick={saveEditNote}>
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={cancelEditNote}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between w-full gap-2">
                    <p className="min-w-0 flex-1 wrap-break-word whitespace-pre-wrap">
                      {note.content}
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
                          onClick={() => startEditNote(note.id)}
                          className="p-2 flex items-center gap-2 hover:bg-accent rounded cursor-pointer text-white"
                        >
                          <Edit className="size-4" /> <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteNote(note.id)}
                          className="p-2 flex items-center gap-2 hover:bg-destructive/30! text-destructive rounded cursor-pointer"
                        >
                          <Trash2 className="size-4" /> <span>Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: (defaultTabs) => [
      defaultTabs[0],
      {
        content: <Notes highlightPluginInstance={highlightPluginInstance} />,
        icon: <MessageIcon />,
        title: "Notas",
      },
    ],
  });

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    renderHighlightContent: (props) => (
      <HighlightContent {...props} setNotes={setNotes} />
    ),
    renderHighlights: (props) => <HighlightAreaList {...props} notes={notes} />,
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl={book?.pdf?.url || ""}
          plugins={[defaultLayoutPluginInstance, highlightPluginInstance]}
          theme={"dark"}
          localization={es_ES as unknown as LocalizationMap}
          defaultScale={SpecialZoomLevel.PageWidth}
        />
      </Worker>
    </div>
  );
}

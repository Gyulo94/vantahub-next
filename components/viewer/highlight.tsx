import { Position, Tooltip } from "@react-pdf-viewer/core";
import {
  MessageIcon,
  RenderHighlightContentProps,
  RenderHighlightsProps,
  RenderHighlightTargetProps,
} from "@react-pdf-viewer/highlight";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import React, { useState } from "react";
import { Note } from "@/lib/types";
import { useCreateNote } from "@/lib/queries";

interface HighlightContentProps extends RenderHighlightContentProps {
  bookId: number;
}

export function HighlightContent({ bookId, ...props }: HighlightContentProps) {
  const [message, setMessage] = useState("");
  const { mutate: createNote } = useCreateNote();
  function onSubmit() {
    if (message.trim() !== "") {
      createNote({
        content: message.trim(),
        bookId,
        pageIndex: props.selectionRegion.pageIndex + 1,
        quote: props.selectedText,
        highlightAreas: props.highlightAreas,
      });
      props.cancel();
    }
  }

  return (
    <div
      className="bg-card border rounded-md shadow-md min-w-xs p-2 absolute"
      style={{
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        zIndex: 1,
      }}
    >
      <div>
        <Textarea
          rows={3}
          className="border resize-none w-full max-w-75.5"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="flex mt-2  justify-end">
        <div className="mr-2">
          <Button onClick={onSubmit}>Agregar</Button>
        </div>
        <Button variant={"ghost"} onClick={props.cancel}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export function HighlightAreaList({
  notes,
  ...props
}: RenderHighlightsProps & { notes: Note[] }) {
  return (
    <div>
      {notes.map((note) => (
        <React.Fragment key={note.id}>
          {note.highlightAreas
            .filter((area) => area.pageIndex === props.pageIndex)
            .map((area, idx) => (
              <div
                key={idx}
                style={Object.assign(
                  {},
                  {
                    background: "yellow",
                    opacity: 0.4,
                  },
                  props.getCssProperties(area, props.rotation),
                )}
              />
            ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export function renderHighlightTarget(props: RenderHighlightTargetProps) {
  return (
    <div
      style={{
        background: "#eee",
        display: "flex",
        position: "absolute",
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: "translate(0, 8px)",
        zIndex: 1,
      }}
    >
      <Tooltip
        position={Position.TopCenter}
        target={
          <Button onClick={props.toggle}>
            <MessageIcon />
          </Button>
        }
        content={() => <div className="w-25">Add a note</div>}
        offset={{ left: 0, top: -8 }}
      />
    </div>
  );
}

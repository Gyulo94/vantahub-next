"use client";

import {
  Worker,
  Viewer,
  SpecialZoomLevel,
  LocalizationMap,
} from "@react-pdf-viewer/core";
import { useFindBookById, useFindNotesByBookId } from "@/lib/queries";
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
  const { data } = useFindNotesByBookId(id);
  const notes = data || [];

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: (defaultTabs) => [
      defaultTabs[0],
      {
        content: (
          <Notes
            highlightPluginInstance={highlightPluginInstance}
            notes={notes}
          />
        ),
        icon: <MessageIcon />,
        title: "Notas",
      },
    ],
  });

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    renderHighlightContent: (props) => (
      <HighlightContent {...props} bookId={id} />
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

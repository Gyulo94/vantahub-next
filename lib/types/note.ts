import { HighlightArea } from "@react-pdf-viewer/highlight";

export type Note = {
  id: string;
  content: string;
  highlightAreas: HighlightArea[];
  quote: string;
  pageIndex?: number;
  bookId?: number;
  userId?: string;
};

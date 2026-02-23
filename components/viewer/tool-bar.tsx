import { ToolbarProps, ToolbarSlot } from "@react-pdf-viewer/default-layout";
import { ReactElement } from "react";

export const renderToolbar = (
  Toolbar: (props: ToolbarProps) => ReactElement,
) => (
  <Toolbar>
    {(slots: ToolbarSlot) => {
      const {
        CurrentPageInput,
        GoToNextPage,
        GoToPreviousPage,
        NumberOfPages,
        ShowSearchPopover,
        Zoom,
        ZoomIn,
        ZoomOut,
      } = slots;
      return (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            width: "100%",
            padding: "0px 40px",
          }}
        >
          <div style={{ padding: "0px 2px" }}>
            <ShowSearchPopover />
          </div>
          <div style={{ padding: "0px 2px" }}>
            <ZoomIn />
          </div>
          <div style={{ padding: "0px 2px" }}>
            <ZoomOut />
          </div>
          <div style={{ padding: "0px 2px" }}>
            <Zoom />
          </div>
          <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
            <GoToPreviousPage />
          </div>
          <div style={{ padding: "0px 2px", width: "4rem" }}>
            <CurrentPageInput />
          </div>
          <div
            style={{
              padding: "0px 2px",
              color: "white",
              paddingLeft: "8px",
            }}
          >
            <NumberOfPages />
          </div>
          <div style={{ padding: "0px 2px" }}>
            <GoToNextPage />
          </div>
        </div>
      );
    }}
  </Toolbar>
);

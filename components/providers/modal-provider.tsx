"use client";
import CreateAuthorSheet from "../admin/author/create-author-sheet";
import SidebarSheet from "../shared/sidebar/sidebar-sheet";

export default function ModalProvider() {
  return (
    <>
      <SidebarSheet />
      <CreateAuthorSheet />
    </>
  );
}

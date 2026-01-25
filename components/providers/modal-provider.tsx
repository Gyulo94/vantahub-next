"use client";
import CreateAuthorSheet from "../admin/authors/create-author-sheet";
import EditAuthorSheet from "../admin/authors/edit-author-sheet";
import CreateBookSheet from "../admin/books/create-book-sheet";
import EditBookSheet from "../admin/books/edit-book-sheet";
import CreateCategorySheet from "../admin/categories/create-category-sheet";
import EditCategorySheet from "../admin/categories/edit-category-sheet";
import SidebarSheet from "../shared/sidebar/sidebar-sheet";

export default function ModalProvider() {
  return (
    <>
      <SidebarSheet />
      <CreateAuthorSheet />
      <EditAuthorSheet />
      <CreateCategorySheet />
      <EditCategorySheet />
      <CreateBookSheet />
      <EditBookSheet />
    </>
  );
}

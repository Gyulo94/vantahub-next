import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNote, findNotesByBookId } from "../actions";
import { Note } from "../types";
import z from "zod/v3";
import { NoteFormSchema } from "../validations";
import toast from "react-hot-toast";

export function useFindNotesByBookId(bookId: number) {
  const query = useQuery<Note[]>({
    queryKey: ["notes", { bookId }],
    queryFn: () => findNotesByBookId(bookId),
  });
  return query;
}

export function useCreateNote() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof NoteFormSchema>) => createNote(values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["notes", { bookId: data.bookId }],
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

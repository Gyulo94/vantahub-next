import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNote,
  deleteNote,
  findNoteById,
  findNotesByBookId,
  updateNote,
} from "../actions";
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
    onMutate: async (values) => {
      const queryKey = ["notes", { bookId: values.bookId }] as const;
      await queryClient.cancelQueries({ queryKey });

      const previousNotes = queryClient.getQueryData<Note[]>(queryKey);
      const optimisticNote: Note = {
        id: `temp-${Date.now()}`,
        content: values.content,
        quote: values.quote,
        highlightAreas: values.highlightAreas,
        pageIndex: values.pageIndex,
        bookId: values.bookId,
      };

      queryClient.setQueryData<Note[]>(queryKey, (old = []) => [
        optimisticNote,
        ...old,
      ]);

      return { previousNotes, queryKey };
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error, _values, context) => {
      if (context && context.previousNotes !== undefined) {
        queryClient.setQueryData(context.queryKey, context.previousNotes);
      }

      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSettled: (_data, _error, values) => {
      queryClient.invalidateQueries({
        queryKey: ["notes", { bookId: values.bookId }],
      });
    },
  });
  return mutation;
}

export function useFindNoteById(id: string) {
  const query = useQuery({
    queryKey: ["note", { id }],
    queryFn: () => findNoteById(id),
  });
  return query;
}

export function useUpdateNote() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: z.infer<typeof NoteFormSchema>;
    }) => updateNote(values, id),
    onMutate: async ({ id, values }) => {
      const queryKey = ["notes", { bookId: values.bookId }] as const;
      await queryClient.cancelQueries({ queryKey });

      const previousNotes = queryClient.getQueryData<Note[]>(queryKey);

      queryClient.setQueryData<Note[]>(queryKey, (old = []) =>
        old.map((note) =>
          note.id === id
            ? {
                ...note,
                content: values.content,
                quote: values.quote,
                highlightAreas: values.highlightAreas,
                pageIndex: values.pageIndex,
                bookId: values.bookId,
              }
            : note,
        ),
      );

      return { previousNotes, queryKey };
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error, _values, context) => {
      if (context && context.previousNotes !== undefined) {
        queryClient.setQueryData(context.queryKey, context.previousNotes);
      }

      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["notes", { bookId: variables.values.bookId }],
      });
    },
  });
  return mutation;
}

export function useDeleteNote() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
    onError: (error, _variables, context) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

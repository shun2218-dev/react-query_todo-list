import React from "react";
import { useMutation } from "react-query";
import { Task } from "../types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNotification } from "./useNotification";

export const useMutateTask = () => {
  const { successNotification, errorNotification } = useNotification();

  const createTaskMutation = useMutation(
    async (task: Task) => {
      try {
        const ref = collection(db, "tasks");
        const { id } = await addDoc(ref, task);
        const docRef = doc(db, "tasks", id);
        await updateDoc(docRef, { id });
      } catch (e: unknown) {
        if (e instanceof Error) {
          throw new Error(e.message);
        }
      }
    },
    {
      onSuccess: () => {
        successNotification({
          title: "Task created",
          message: "Completed successfully",
        });
      },
      onError: (error: unknown) => {
        errorNotification(error, {
          title: "Failed to add task",
        });
      },
    }
  );

  const updateTaskMutation = useMutation(
    async ({ id, is_done }: Pick<Task, "id" | "is_done">) => {
      try {
        const ref = doc(db, "tasks", id!);
        await updateDoc(ref, { is_done, updated_at: serverTimestamp() });
      } catch (e: unknown) {
        if (e instanceof Error) {
          throw new Error(e.message);
        }
      }
    },
    {
      onSuccess: () => {
        successNotification({
          title: "Task updated",
          message: "Completed successfully",
        });
      },
      onError: (error: unknown) => {
        errorNotification(error, {
          title: "Failed to update task",
        });
      },
    }
  );
  const deleteTaskMutation = useMutation(
    async ({ id }: Pick<Task, "id">) => {
      try {
        const ref = doc(db, "tasks", id!);
        await deleteDoc(ref);
      } catch (e: unknown) {
        if (e instanceof Error) {
          throw new Error(e.message);
        }
      }
    },
    {
      onSuccess: () => {
        successNotification({
          title: "Task deleted",
          message: "Completed successfully",
        });
      },
      onError: (error: unknown) => {
        errorNotification(error, {
          title: "Failed to delete task",
        });
      },
    }
  );

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};

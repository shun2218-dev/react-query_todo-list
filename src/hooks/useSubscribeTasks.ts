import React, { useEffect } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useStore } from "../store";
import { Task } from "../types";
import { useQueryClient } from "react-query";

export const useSubscribeTasks = () => {
  const queryClient = useQueryClient();
  const setTasks = useStore((state) => state.setTasks);
  const session = useStore((state) => state.session);

  const handleRecordAdded = (payload: Task[]) => {
    let previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);
    if (!previousTasks) previousTasks = [];
    queryClient.setQueryData(["tasks"], [...payload]);
    setTasks([...payload]);
  };
  const q = query(
    collection(db, "tasks"),
    where("uid", "==", session!.uid),
    orderBy("created_at", "asc")
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      //   setTasks(snapshot.docs.map((doc) => ({ ...doc.data() } as Task)));
      const tasks = snapshot.docs.map((doc) => ({ ...doc.data() } as Task));
      handleRecordAdded(tasks);
    });
    return () => {
      unsubscribe();
    };
  }, [queryClient]);
};

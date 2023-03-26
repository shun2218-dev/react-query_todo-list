import React from "react";
import { collection, getDocs, orderBy, where } from "firebase/firestore";
import { query } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useQuery } from "react-query";
import { Task } from "../types";
import { useStore } from "../store";

export const useQueryTasks = () => {
  const session = useStore((state) => state.session);
  const getTasks = async () => {
    const q = query(
      collection(db, "tasks"),
      orderBy("created_at", "asc"),
      where("uid", "==", session!.uid)
    );
    try {
      const data = await getDocs(q);
      return data.docs.map((doc) => ({ ...doc.data() } as Task));
    } catch (e: any) {
      throw new Error(e.message);
    }
  };
  return useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: Infinity,
  });
};

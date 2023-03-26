import React, { useEffect, useState } from "react";
import { useQueryTasks } from "./useQueryTasks";
import { Task } from "../types";
import { useStore } from "../store";

export const useDisplayTasks = () => {
  const { data: tasks } = useQueryTasks();
  const [display, setDisplay] = useState<Task[] | null>(null);
  const searchWords = useStore((state) => state.searchWords);
  const filter = useStore((state) => state.filter);

  useEffect(() => {
    if (!!tasks) {
      setDisplay(tasks);
    }
  }, [tasks]);
  useEffect(() => {
    if (tasks && tasks.length !== 0) {
      const searchResult = tasks.filter((task) =>
        searchWords.some((word) => task.content.includes(word))
      );
      if (!!searchResult.length) {
        setDisplay(searchResult);
      } else {
        setDisplay(null);
      }
    }
  }, [searchWords]);
  useEffect(() => {
    console.log(filter, !tasks || tasks.length === 0);
    if (!tasks || tasks.length === 0) {
      console.log(-1);
      return;
    } else {
      if (filter === null) {
        const noFiltered = tasks.map((task) => task);
        setDisplay(noFiltered);
      } else if (searchWords.length > 0) {
        const searched = tasks.filter((task) =>
          searchWords.some((word) => task.content.includes(word))
        );
        const filtered = searched.filter(
          (task) => task.is_done === filter.is_done
        );
        setDisplay(filtered);
      } else if (display !== null) {
        const filtered = tasks.filter(
          (task) => task.is_done === filter.is_done
        );
        setDisplay(filtered);
      }
    }
  }, [filter]);
  return { display };
};

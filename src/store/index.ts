import { User } from "firebase/auth";
import { create } from "zustand";
import { Filter, Task } from "../types";

type Session = User | null;
type State = {
  session: Session | null;
  setSession: (payload: Session) => void;
  tasks: Task[] | null;
  setTasks: (payload: Task[] | null) => void;
  searchWords: string[];
  setSearchWords: (qeury: string) => void;
  filter: Filter | null;
  setFilter: (payload: Filter | null) => void;
};

const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  tasks: [],
  setTasks: (payload) => set({ tasks: payload }),
  searchWords: [],
  setSearchWords: (words) => set({ searchWords: words.split(" ") }),
  filter: null,
  setFilter: (payload) => set({ filter: payload }),
}));

export { useStore };

import { FieldValue, Timestamp } from "firebase/firestore";
import { ChangeEvent } from "react";

type Task = {
  id?: string;
  uid: string;
  content: string;
  is_done: boolean;
  created_at: FieldValue;
  updated_at?: FieldValue;
};

type InputProps = {
  input: string;
  setInput: (value: string | ChangeEvent<any> | null | undefined) => void;
};

type Filter = {
  is_done: boolean;
};
export type { Task, InputProps, Filter };

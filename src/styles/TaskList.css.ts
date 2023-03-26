import { style } from "@vanilla-extract/css";

const listItem__inner = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const listItem = style({
  listStyle: "none",
  padding: 15,
});

export { listItem, listItem__inner };

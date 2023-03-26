import { style } from "@vanilla-extract/css";

const header = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 20,
});

export { header };

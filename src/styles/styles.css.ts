import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const flexContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const container = style({
  height: calc.subtract("100vh", "100px"),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
});

const fullwidth = style({
  width: "100%",
});

const textBold = style({
  fontWeight: "bold",
});

export { flexContainer, container, fullwidth, textBold };

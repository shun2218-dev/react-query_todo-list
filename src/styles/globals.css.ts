import { globalStyle } from "@vanilla-extract/css";

// global style
globalStyle("*", {
  boxSizing: "border-box",
});
globalStyle(":root", {
  fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  lineHeight: 1.5,
  fontWeight: 400,
  colorScheme: "light dark",
  fontSynthesis: "none",
  textRendering: "optimizeLegibility",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  WebkitTextSizeAdjust: "100%",
});

globalStyle("body", {
  margin: 0,
  display: "flex",
  placeItems: "center",
  minWidth: 320,
  minHeight: "100vh",
});

globalStyle("th", {
  textAlign: "center",
});

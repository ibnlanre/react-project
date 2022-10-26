import { ButtonStylesParams, MantineProvider } from "@mantine/core";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "./styles/index.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <MantineProvider
    withNormalizeCSS
    theme={{
      components: {
        Button: {
          styles: (theme, params: ButtonStylesParams) => ({
            root: {
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
            label: {
              fontWeight: 400,
            },
          }),
        },
      },
    }}
  >
    <App />
  </MantineProvider>
);

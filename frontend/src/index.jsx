// @ts-check

import React from "react";
import ReactDOM from "react-dom/client";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import init from "./init.jsx";

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  const vdom = await init();
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

app();

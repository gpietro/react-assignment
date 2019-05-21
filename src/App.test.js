import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, cleanup } from "react-testing-library";
import App, { MySelector } from "./App";
import { exportAllDeclaration } from "@babel/types";

it("test selector", () => {
  const { getByText, getByRole, container } = render(<MySelector />);

  const options = container.querySelector("select");
  console.log("options", options);
  expect(options.length).toBe(4);
  fireEvent.click(container);

  //const display = getByRole("");
});

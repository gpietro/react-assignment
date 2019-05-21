import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "react-testing-library";
import MySelector from "./MySelector";

afterEach(cleanup);

test("test model selector is disabled", async () => {
  const { getByTestId, getByText, container } = render(<MySelector />);

  expect(await waitForElement(() => getByText("0 - 0"))).toBeTruthy();

  const modelSelector = await waitForElement(() =>
    getByTestId("model-selector")
  );
  expect(modelSelector.disabled).toBe(true);
  // console.log(getByText("BMW"));
  const option = await waitForElement(() => getByText("BMW"));

  fireEvent.change(option, { target: { value: "bmw" } });

  expect(await waitForElement(() => getByText("0 - 0"))).toBeTruthy();

  const modelSelector2 = await waitForElement(() =>
    getByTestId("model-selector")
  );
  expect(modelSelector2.disabled).toBe(false);
  //expect(modelSelector2.disabled).toBe(false);

  // const makerOption = await findByText("BMW");
  // expect(makerOption.value).toBe("bmw");
  // fireEvent.focus(makerOption);
  // fireEvent.keyDown(makerOption);

  // fireEvent.change(getByText("BMW"));
  // expect(modelSelector.disabled).toBe(false);
});

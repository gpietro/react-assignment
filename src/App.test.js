import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  getNodeText
} from "react-testing-library";
import MySelector from "./MySelector";

afterEach(cleanup);

test("test selectors", async () => {
  const { getByText, getByTestId } = render(<MySelector />);
  const beforeMakerSelector = await waitForElement(() =>
    getByTestId("maker-selector")
  );
  // Model selecor is disabled when marker is not selected
  const beforeModelSelector = await waitForElement(() =>
    getByTestId("model-selector")
  );
  expect(beforeModelSelector.disabled).toBe(true);

  const beforeTitle = await waitForElement(() => getByTestId("title"));
  expect(getNodeText(beforeTitle)).toBe(" - ");

  fireEvent.change(beforeMakerSelector, { target: { value: "bmw" } });
  //expect(beforeMakerSelector.value).toBe("BMW");

  // Model selecor is ensabled when marker is selected
  const afterModelSelector = await waitForElement(() =>
    getByTestId("model-selector")
  );
  expect(afterModelSelector.disabled).toBe(false);

  // verify the model i3 is available
  expect(getByText("i3")).toBeTruthy();
  fireEvent.change(afterModelSelector, { target: { value: "i3" } });

  const afterTitle = await waitForElement(() => getByTestId("title"));

  expect(getNodeText(afterTitle)).toBe("bmw - i3");

  // const { getByTestId, getByText, container } = render(<MySelector />);

  // expect(getByText("0 - 0")).toBeTruthy();

  // const makerSelector = getByTestId("maker-selector");
  // const modelSelector = getByTestId("model-selector");
  // expect(modelSelector.disabled).toBe(true);
  // fireEvent.click(makerSelector);

  // const option = await waitForElement(() => getByText("BMW"));

  // fireEvent.click(option);

  // expect(getByText("BMW - 0")).toBeTruthy();

  // const modelSelector2 = await waitForElement(() =>
  //   getByTestId("model-selector")
  // );
  // expect(modelSelector2.disabled).toBe(false);
  //expect(modelSelector2.disabled).toBe(false);

  // const makerOption = await findByText("BMW");
  // expect(makerOption.value).toBe("bmw");
  // fireEvent.focus(makerOption);
  // fireEvent.keyDown(makerOption);

  // fireEvent.change(getByText("BMW"));
  // expect(modelSelector.disabled).toBe(false);
});

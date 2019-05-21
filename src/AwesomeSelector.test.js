import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  getNodeText
} from "react-testing-library";
import { FetchMock } from '@react-mock/fetch';
import MySelector from "./AwesomeSelector";

afterEach(cleanup);

test("test awesome selectors", async () => {
  const { getByText, getByTestId } = render(
    <FetchMock
    mocks={[
      { matcher: '/api/makes', response: [
        {
          "id": 1095,
          "key": "ac",
          "name": "AC"
        },
        {
          "id": 1045,
          "key": "aixam",
          "name": "Aixam"
        },
        {
          "id": 1024,
          "key": "alfa-romeo",
          "name": "Alfa Romeo"
        },
        {
          "id": 1014,
          "key": "alpine",
          "name": "Alpine"
        }]},
      { matcher: '/api/makes/key/alfa-romeo/models', response: [
      {
        "id": 2151,
        "key": "145",
        "name": "145"
      },
      {
        "id": 2150,
        "key": "146",
        "name": "146"
      },
      {
        "id": 1009,
        "key": "147",
        "name": "147"
      },
      {
        "id": 2152,
        "key": "155",
        "name": "155"
      } ]}
    ]}
  ><MySelector />
  </FetchMock>);
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

  fireEvent.change(beforeMakerSelector, { target: { value: "alfa-romeo" } });
  console.log('value', beforeMakerSelector.value)
  expect(beforeMakerSelector.value).toBe("alfa-romeo");

  // Model selecor is ensabled when marker is selected
  const afterModelSelector = await waitForElement(() =>
    getByTestId("model-selector")
  );
  expect(afterModelSelector.disabled).toBe(false);

  // verify the model 146 is available
  expect(getByText("146")).toBeTruthy();
  fireEvent.change(afterModelSelector, { target: { value: "146" } });

  const afterTitle = await waitForElement(() => getByTestId("title"));

  expect(getNodeText(afterTitle)).toBe("alfa-romeo - 146");

});

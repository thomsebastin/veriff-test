import { render, screen } from "@testing-library/react";
import Button from "../components/Button/Button";
import { fetchChecks } from "../tests/mock/api";
import { isSubmitEnabled } from "../utils/utils";
import { updateResponse } from "./mock/utils";

test("submit button to be disabled on initial render", () => {
  render(<Button isSubmitEnabled={() => false}>Submit</Button>);
  expect(screen.getByRole("button", { name: /Submit/ })).toBeDisabled();
});

test("Submit button to be enabled when all are checked", () => {
  return fetchChecks().then((res) => {
    const allChecked = updateResponse(res).map((item) => {
      return {
        ...item,
        enabled: true,
        checked: true,
      };
    });

    render(
      <Button isSubmitEnabled={() => isSubmitEnabled(allChecked)}>
        Submit
      </Button>
    );
    expect(screen.getByRole("button", { name: /Submit/ })).toBeEnabled();
  });
});

test("Submit button to be enabled when at least one is unchecked", () => {
  return fetchChecks().then((res) => {
    const atleastOneChecked = updateResponse(res).map((item, index) => {
      if (index === 0) {
        return {
          ...item,
          checked: true,
          enabled: true,
        };
      }
      return {
        ...item,
        checked: false,
      };
    });

    render(
      <Button isSubmitEnabled={() => isSubmitEnabled(atleastOneChecked)}>
        Submit
      </Button>
    );
    expect(screen.getByRole("button", { name: /Submit/ })).toBeEnabled();
  });
});

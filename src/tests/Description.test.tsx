import { render, screen } from "@testing-library/react";
import Description from "../components/Description/Description";

test("Should render same text passed into description prop", async () => {
  render(<Description description={"my description"} />);
  const pElement = await screen.findByText(/my description/i);
  expect(pElement).toBeInTheDocument();
});

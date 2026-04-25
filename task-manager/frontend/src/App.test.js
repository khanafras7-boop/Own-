import { render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders task manager heading", async () => {
  render(<App />);
  expect(
    await screen.findByText(/task manager that looks polished/i)
  ).toBeInTheDocument();
});

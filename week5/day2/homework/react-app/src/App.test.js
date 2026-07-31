import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import App from "./App";

beforeEach(() => {
  window.history.pushState({}, "", "/");
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("opens the inventory list from the home screen", async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => [],
  });

  render(<App />);
  fireEvent.click(
    screen.getByRole("link", { name: "Manage Inventory List" }),
  );

  expect(
    await screen.findByRole("heading", { name: "Inventory List" }),
  ).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:8080/api/inventories",
    expect.objectContaining({
      headers: expect.objectContaining({
        "Content-Type": "application/json",
      }),
    }),
  );
});

test("renders inventory data returned by the API", async () => {
  window.history.pushState({}, "", "/inventories");
  global.fetch.mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => [
      {
        _id: "inventory-1",
        prodname: "notebook",
        qty: 50,
        price: 8,
        status: "T",
      },
    ],
  });

  render(<App />);

  expect(await screen.findByText("notebook")).toBeInTheDocument();
  expect(screen.getByText("50")).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Edit" }),
  ).toHaveAttribute("href", "/inventories/inventory-1");
});

test("submits a new inventory item", async () => {
  window.history.pushState({}, "", "/inventories/new");
  global.fetch
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        _id: "inventory-2",
        prodname: "planner",
        qty: 12,
        price: 7,
        status: "R",
      }),
    })
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => [],
    });

  render(<App />);

  fireEvent.change(screen.getByLabelText("Product Name"), {
    target: { value: "planner" },
  });
  fireEvent.change(screen.getByLabelText("Quantity"), {
    target: { value: "12" },
  });
  fireEvent.change(screen.getByLabelText("Price"), {
    target: { value: "7" },
  });
  fireEvent.change(screen.getByLabelText("Status"), {
    target: { value: "R" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Save" }));

  await waitFor(() =>
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/inventory",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          prodname: "planner",
          qty: "12",
          price: "7",
          status: "R",
        }),
      }),
    ),
  );
});

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import App from "./App";

beforeEach(() => {
  window.history.pushState({}, "", "/");
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("shows the book list immediately without top navigation", async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => [],
  });

  render(<App />);

  expect(
    await screen.findByRole("heading", { name: "Book List" }),
  ).toBeInTheDocument();
  expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:8080/api/books",
    expect.objectContaining({
      headers: expect.objectContaining({
        "Content-Type": "application/json",
      }),
    }),
  );
});

test("renders book data returned by the MongoDB API", async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => [
      {
        _id: "book-1",
        title: "Da Vinci Code",
        author: "Dan Brown",
      },
    ],
  });

  render(<App />);

  expect(await screen.findByText("Da Vinci Code")).toBeInTheDocument();
  expect(screen.getByText("Dan Brown")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Edit" })).toHaveAttribute(
    "href",
    "/books/book-1",
  );
});

test("submits a new book", async () => {
  window.history.pushState({}, "", "/books/new");
  global.fetch
    .mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => ({
        _id: "book-2",
        title: "Dune",
        author: "Frank Herbert",
      }),
    })
    .mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => [],
    });

  render(<App />);

  fireEvent.change(screen.getByLabelText("Book Title"), {
    target: { value: "Dune" },
  });
  fireEvent.change(screen.getByLabelText("Author"), {
    target: { value: "Frank Herbert" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Save" }));

  await waitFor(() =>
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/book",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          title: "Dune",
          author: "Frank Herbert",
        }),
      }),
    ),
  );
});

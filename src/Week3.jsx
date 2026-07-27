import { useMemo, useState } from "react";
import { products, starterBooks } from "./coursework";
import { cartQuantity, cartTotal, sortProducts } from "./lib";
import { Notice, Section } from "./components";

function OAuthDemo({ provider }) {
  const isGithub = provider === "GitHub";
  const clientId = isGithub
    ? import.meta.env.VITE_GITHUB_CLIENT_ID
    : import.meta.env.VITE_FACEBOOK_APP_ID;
  const [profile, setProfile] = useState(null);
  const authorizationUrl = isGithub
    ? `https://github.com/login/oauth/authorize?client_id=${clientId || ""}`
    : "#facebook-demo";
  return (
    <article className="demo-card oauth-card">
      <div className="avatar">{profile ? "JC" : isGithub ? "GH" : "FB"}</div>
      <h3>{provider} OAuth</h3>
      <p>
        {clientId
          ? "Client ID is configured. Authorization can begin."
          : "No local client ID is configured, so this safe demo does not transmit credentials."}
      </p>
      {isGithub && clientId ? (
        <a className="button-link" href={authorizationUrl}>
          Authorize with GitHub
        </a>
      ) : (
        <button
          type="button"
          onClick={() =>
            setProfile({ name: "JhiNResH", email: "student@example.com" })
          }
        >
          {profile ? "Signed in" : `Demo ${provider} sign in`}
        </button>
      )}
      {profile && (
        <p className="result">
          Welcome, {profile.name}. {profile.email}
        </p>
      )}
    </article>
  );
}

function CrudDemo() {
  const [books, setBooks] = useState(starterBooks);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editing, setEditing] = useState(null);

  const save = (event) => {
    event.preventDefault();
    if (!title.trim() || !author.trim()) return;
    if (editing) {
      setBooks((items) =>
        items.map((item) =>
          item.id === editing ? { ...item, title, author } : item,
        ),
      );
    } else {
      setBooks((items) => [...items, { id: Date.now(), title, author }]);
    }
    setEditing(null);
    setTitle("");
    setAuthor("");
  };

  return (
    <div className="crud-shell">
      <form className="add-form" onSubmit={save}>
        <input
          aria-label="Book title"
          placeholder="Book title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          aria-label="Book author"
          placeholder="Author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <button type="submit">{editing ? "Update" : "Create"}</button>
      </form>
      <div className="data-list">
        {books.map((book) => (
          <article key={book.id}>
            <div>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
            <div className="button-row">
              <button
                type="button"
                onClick={() => {
                  setEditing(book.id);
                  setTitle(book.title);
                  setAuthor(book.author);
                }}
              >
                Update
              </button>
              <button
                className="danger"
                type="button"
                onClick={() =>
                  setBooks((items) =>
                    items.filter((item) => item.id !== book.id),
                  )
                }
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Shop() {
  const [quantities, setQuantities] = useState({});
  const [sortOrder, setSortOrder] = useState("normal");
  const [screen, setScreen] = useState("shop");
  const sortedProducts = useMemo(
    () => sortProducts(products, sortOrder),
    [sortOrder],
  );
  const quantity = cartQuantity(quantities);
  const total = cartTotal(products, quantities);

  const update = (id, change) => {
    setQuantities((current) => ({
      ...current,
      [id]: Math.max(0, (current[id] || 0) + change),
    }));
  };

  if (screen === "signin") {
    return (
      <div className="checkout-screen">
        <h3>Sign in before checkout</h3>
        <p>The original assignment uses Facebook Login API.</p>
        <button type="button" onClick={() => setScreen("checkout")}>
          Demo Facebook sign in
        </button>
        <button type="button" onClick={() => setScreen("shop")}>
          Continue shopping
        </button>
      </div>
    );
  }

  if (screen === "checkout") {
    return (
      <div className="checkout-screen">
        <h3>{quantity ? "Checkout" : "Your cart is empty"}</h3>
        <p>
          {quantity
            ? `${quantity} items · $${total.toFixed(2)}`
            : "Add an item before checking out."}
        </p>
        <button type="button" onClick={() => setScreen("shop")}>
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="shop-toolbar">
        <label className="field">
          Sort by price
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </label>
        <div>
          <strong>{quantity} items</strong> · ${total.toFixed(2)}
          {quantity > 0 && (
            <button type="button" onClick={() => setScreen("signin")}>
              Check Out
            </button>
          )}
        </div>
      </div>
      <div className="product-grid">
        {sortedProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <span className="product-emoji">{product.emoji}</span>
            <h3>{product.name}</h3>
            <p>★ {product.rating}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <div className="stepper">
              <button type="button" onClick={() => update(product.id, -1)}>
                −
              </button>
              <span>{quantities[product.id] || 0}</span>
              <button type="button" onClick={() => update(product.id, 1)}>
                +
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function PortfolioShell() {
  return (
    <div className="portfolio-shell">
      <p className="eyebrow">Portfolio shell · Part 2 research artifact</p>
      <h3>JhiNResH — Product engineer</h3>
      <p>
        A lightweight shell with room for a bio, project screenshots, live demos,
        GitHub links, contact information, and a downloadable résumé.
      </p>
      <div className="portfolio-grid">
        <span>About</span>
        <span>Projects</span>
        <span>Skills</span>
        <span>Contact</span>
      </div>
    </div>
  );
}

export default function Week3() {
  return (
    <>
      <Section
        id="w3d1-exercise"
        eyebrow="Week 3 · Day 1 · Exercise"
        title="OAuth and APIs"
        description="GitHub Authorization Code setup and client ID handling without committing credentials."
      >
        <span id="w3d1-homework" className="anchor-target" />
        <div className="two-column">
          <OAuthDemo provider="GitHub" />
          <OAuthDemo provider="Facebook" />
        </div>
      </Section>

      <Section
        id="w3d2-exercise"
        eyebrow="Week 3 · Day 2 · Exercise + Homework"
        title="RESTful CRUD"
        description="GET/list, POST/create, PUT/update, and DELETE behavior. This in-browser implementation mirrors the json-server flow and remains deterministic for local QA."
      >
        <span id="w3d2-homework" className="anchor-target" />
        <Notice>
          The UI uses local React state for verification. The original exercise’s
          json-server endpoints are documented in the requirements file.
        </Notice>
        <CrudDemo />
      </Section>

      <Section
        id="w3d3-assignment"
        eyebrow="Week 3 · Day 3 · Assignment"
        title="Shop 2 React + portfolio shell"
        description="Part 1 adds checkout, Facebook login handoff, empty-cart behavior, and the later price-sort requirement recovered from the original local history."
      >
        <Shop />
        <PortfolioShell />
      </Section>
    </>
  );
}

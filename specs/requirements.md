# WEB603 Module 5 requirement matrix

This local project consolidates the supplied Module 5 PDFs into one buildable coursework lab.
Review decks are reference material and do not add a separate code submission.

| Deliverable | Implemented behavior |
| --- | --- |
| W1 D1 Homework | React Todo List V1, seven daily lists, conditional day selection |
| W1 D2 Exercise | React state and event-handler demos |
| W1 D2 Homework | Todo List V2, reusable mapped list, item notes, dismiss button |
| W2 D1 Exercise | Controlled form, uncontrolled ref, file input |
| W2 D1 Homework | Router navigation, nested topics, route parameter |
| W2 D2 Exercise | Same router implementation because the supplied PDFs are identical |
| W2 D2 Homework | Todo List V4, external data shape, add/toggle, Today and All Lists |
| W3 D1 Exercise | GitHub OAuth authorization URL and non-secret client ID setup |
| W3 D1 Homework | Facebook login UI with local safe fallback |
| W3 D2 Exercise | REST list read behavior |
| W3 D2 Homework | Create, update, and delete list items |
| W3 D3 Assignment | Checkout button, sign-in handoff, checkout/empty-cart screen, portfolio shell |
| W4 D1 Exercise | DOM append, body-style attributes, click target IDs |
| W4 D1 Homework | OpenWeather request, Kelvin conversion, temperature/status/location display |
| W4 D2 Exercise | quicksort, factorial, linear/list behavior, delete property |
| W4 D2 Homework | Todo List V5 ascending/descending localeCompare sorting |

## External configuration

Copy `.env.example` to `.env` only when live API credentials are available. Never commit `.env`.

- `VITE_OPENWEATHER_API_KEY`: enables live weather search.
- `VITE_GITHUB_CLIENT_ID`: enables the GitHub authorization link.
- `VITE_FACEBOOK_APP_ID`: documents the Facebook app boundary; the local demo remains non-transmitting.

## Original json-server contract

The Week 3 Day 2 UI models the lesson’s `json-server` operations:

- `GET /lists`
- `POST /lists`
- `PUT /lists/:id`
- `DELETE /lists/:id`

For local verification in this consolidated project, CRUD state stays in the browser and does not require a second process.


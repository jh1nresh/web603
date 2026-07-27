export function sortTodos(items, direction = "asc") {
  const multiplier = direction === "asc" ? 1 : -1;
  return [...items].sort(
    (current, next) => multiplier * current.text.localeCompare(next.text),
  );
}

export function quickSort(values) {
  if (values.length <= 1) return [...values];
  const pivot = values[Math.floor(values.length / 2)];
  return [
    ...quickSort(values.filter((value) => value < pivot)),
    ...values.filter((value) => value === pivot),
    ...quickSort(values.filter((value) => value > pivot)),
  ];
}

export function factorial(value) {
  if (!Number.isInteger(value) || value < 0) {
    throw new TypeError("factorial expects a non-negative integer");
  }
  if (value <= 1) return 1;
  return value * factorial(value - 1);
}

export function sortProducts(items, direction = "normal") {
  const sorted = [...items];
  switch (direction) {
    case "lowest":
      return sorted.sort((a, b) => a.price - b.price);
    case "highest":
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted.sort((a, b) => a.id - b.id);
  }
}

export function cartQuantity(items) {
  return Object.values(items).reduce((total, quantity) => total + quantity, 0);
}

export function cartTotal(products, quantities) {
  return products.reduce(
    (total, product) => total + product.price * (quantities[product.id] || 0),
    0,
  );
}

export function kelvinToFahrenheit(kelvin) {
  return Math.round((kelvin - 273.15) * 1.8 + 32);
}


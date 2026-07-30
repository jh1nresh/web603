export function getMissingNo(array) {
  const n = array.length;
  let total = 1;

  for (let i = 2; i <= n + 1; i += 1) {
    total += i;
    total -= array[i - 2];
  }

  return total;
}

const array = [1, 2, 3, 5];

if (typeof document !== "undefined") {
  document.querySelector("#result").textContent = getMissingNo(array);
}

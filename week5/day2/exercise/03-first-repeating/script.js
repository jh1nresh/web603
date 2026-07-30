export function getFirstRepeating(array) {
  let firstRepeatingIndex = -1;
  const seen = new Set();

  for (let i = array.length - 1; i >= 0; i -= 1) {
    if (seen.has(array[i])) {
      firstRepeatingIndex = i;
    } else {
      seen.add(array[i]);
    }
  }

  return firstRepeatingIndex === -1 ? null : array[firstRepeatingIndex];
}

const array = [10, 5, 3, 4, 3, 5, 6];
const answer = getFirstRepeating(array);

if (typeof document !== "undefined") {
  document.querySelector("#result").textContent =
    answer === null
      ? "There are no repeating elements."
      : `The first repeating element is ${answer}.`;
}

export function get2Smallest(array) {
  if (array.length < 2) {
    return null;
  }

  let first = Number.MAX_VALUE;
  let second = Number.MAX_VALUE;

  for (const value of array) {
    if (value < first) {
      second = first;
      first = value;
    } else if (value < second && value !== first) {
      second = value;
    }
  }

  if (second === Number.MAX_VALUE) {
    return null;
  }

  return { first, second };
}

const array = [12, 13, 1, 10, 34, 1];
const answer = get2Smallest(array);

if (typeof document !== "undefined") {
  document.querySelector("#result").textContent = answer
    ? `The smallest element is ${answer.first} and second smallest element is ${answer.second}.`
    : "There is no second smallest element.";
}

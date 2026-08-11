let index = 1;

const randomNum = () => 20 + Math.floor(80 * Math.random());

function getInitialData() {
  let data = [];
  for (let i = 0; i < 10; i += 1) {
    data = getAppendedData(data);
  }
  return data;
}

function getAppendedData(data) {
  const result = data.map((item) => item);
  result.push({
    id: `id-${index}`,
    value: randomNum(),
    name: `Item ${index}`
  });
  index += 1;
  return result;
}

function getTruncatedData(data) {
  return data.map((item) => item).slice(1);
}

function getUpdatedData(data) {
  return data.map((item) => ({
    id: item.id,
    value: randomNum(),
    name: item.name
  }));
}

export { getInitialData, getAppendedData, getTruncatedData, getUpdatedData };

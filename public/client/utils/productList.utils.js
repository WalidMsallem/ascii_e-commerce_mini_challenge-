const createRandomizedAdNumbers = (count) => {
  const indexes = Array.from({ length: count }, (_, i) => i);
  const randomFactors = Array.from({ length: count }, () => Math.random());

  return indexes.sort((a, b) => randomFactors[a] - randomFactors[b]);
};

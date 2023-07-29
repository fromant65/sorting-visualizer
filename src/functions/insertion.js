export default function insertionSortArray(array, iteration) {
  iteration = iteration < 1 ? 1 : iteration;
  let j = iteration;
  let contadorComparaciones = 0;
  while (j > 0 && array[j - 1] > array[j] && j < array.length) {
    contadorComparaciones++;
    [array[j], array[j - 1]] = [array[j - 1], array[j]];
    j -= 1;
  }
  if (iteration === array.length - 1) return [true, 0];
  return [array, contadorComparaciones];
}

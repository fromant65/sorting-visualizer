export default function selectionSortArray(array, iteration) {
  let minIndex, minValue;
  if (iteration === -1) return [array, iteration + 1];
  let i; //Cantidad de comparaciones en esta iteración
  for (i = iteration; i < array.length; i++) {
    if (iteration === array.length - 1) return [true, 0];
    if (i === iteration || array[i] < minValue) {
      minValue = array[i];
      minIndex = i;
    }
  }
  [array[minIndex], array[iteration]] = [array[iteration], array[minIndex]];
  //La cantidad de comparaciones es i-iteración
  return [array, i - iteration];
}

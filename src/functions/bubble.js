export default function bubbleSortArray(array, iteration) {
  let i; //Cantidad de comparaciones en esta iteración
  let swap = false;
  for (i = 0; i < array.length - iteration; i++) {
    if (array[i] > array[i + 1]) {
      [array[i + 1], array[i]] = [array[i], array[i + 1]];
      swap = true;
    }
  }
  if (swap) return [array, i];
  else return [true, i];
}

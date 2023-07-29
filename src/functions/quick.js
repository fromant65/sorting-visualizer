export default function quickSortArray(arr, stack, it) {
  // Creamos un stack para almacenar los sub-arrays a ordenar
  if (it === -1) {
    stack.push(0);
    stack.push(arr.length - 1);
  }
  // Mientras haya sub-arrays en el stack, los vamos dividiendo y ordenando
  if (stack.length > 0) {
    const high = stack.pop();
    const low = stack.pop();
    const [pivotIndex, comparaciones] = partition(arr, low, high);
    if (pivotIndex - 1 > low) {
      stack.push(low);
      stack.push(pivotIndex - 1);
    }
    if (pivotIndex + 1 < high) {
      stack.push(pivotIndex + 1);
      stack.push(high);
    }
    return [arr, stack, comparaciones];
  } else {
    return [true, [], 0];
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return [i + 1, high - low];
}

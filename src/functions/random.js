export default function randomizeArray(e, longitud) {
  e.preventDefault();
  let sortedArray = [];
  let unsortedArray = [];
  for (let i = 0; i < longitud; i++) {
    sortedArray.push(i + 1);
  }
  for (let i = 0; i < longitud; i++) {
    let randomIndex = Math.floor(Math.random() * sortedArray.length);
    let x = sortedArray.splice(randomIndex, 1);
    if (i === 0) unsortedArray[0] = x[0];
    else unsortedArray.push(x[0]);
  }
  return unsortedArray;
}

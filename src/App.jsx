import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [array, setArray] = useState([]);
  const [algoritmo, setAlgoritmo] = useState("Bubble Sort");
  const [longitud, setLongitud] = useState(0);
  const [isSorting, setIsSorting] = useState(-1);
  const [sortingTimes, setSortingTimes] = useState([]);
  const [comparisonCount, setComparisonCount] = useState(0);
  const [comparisonTimes, setComparisonTimes] = useState([]);
  useEffect(() => {
    let sortedArray, comparisons;
    switch (algoritmo) {
      case "Bubble Sort":
        [sortedArray, comparisons] = bubbleSortArray(array, isSorting);
        break;
      case "Selection Sort":
        [sortedArray, comparisons] = selectionSortArray(array, isSorting);
        break;
      case "Insertion Sort":
        [sortedArray, comparisons] = insertionSortArray(array, isSorting);
        break;
      default:
        break;
    }

    setTimeout(() => {
      if (sortedArray === true || !array.length || isSorting === -1) {
        if (sortedArray === true && isSorting != -1) {
          setSortingTimes([...sortingTimes, isSorting]);
          setComparisonTimes([...comparisonTimes, comparisonCount]);
          setIsSorting(-1);
          setComparisonCount(0);
        }
        return;
      }
      setArray(sortedArray);
      setIsSorting(isSorting + 1);
      setComparisonCount(comparisonCount + comparisons);
    }, 1000 / longitud);
  }, [isSorting, array]);

  return (
    <div className="App">
      <form
        id="array-setter"
        onSubmit={(e) => setArray(randomizeArray(e, longitud))}
      >
        <div>
          <label htmlFor="number">Ingrese el largo del array</label>
          <input
            type="number"
            id="number"
            value={longitud}
            onChange={(e) => setLongitud(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="algoritmo">Seleccione el algoritmo</label>
          <select
            id="algoritmo"
            value={algoritmo}
            onChange={(e) => {
              setAlgoritmo(e.target.value);
            }}
          >
            <option value="Bubble Sort">Bubble Sort</option>
            <option value="Selection Sort">Selection Sort</option>
            <option value="Insertion Sort">Insertion Sort</option>
          </select>
        </div>

        <button type="submit" className="generar-lista">
          Generar lista desordenada
        </button>
      </form>
      <div className="bar-container">
        {array.map((element, i) => {
          return (
            <div
              className="bar"
              key={i}
              id={i}
              style={{
                width: "20px",
                height: `${(element * 300) / longitud}px`,
                margin: "1px",
                background: element === i + 1 ? "#0f0" : "#f00",
              }}
            ></div>
          );
        })}
      </div>
      <button onClick={(e) => setIsSorting(0)}>Ordenar!</button>
      {/*
        <div className="iteraciones">
          Iteraciones: {isSorting === -1 ? 0 : isSorting}
        </div>*/}

      <div className="estadisticas">
        <div className="tiempos-ordenamiento">
          <b>Cantidad de iteraciones:</b>
          {sortingTimes.map((item, i) => {
            return <div key={i}>{item}</div>;
          })}
        </div>
        <div className="comparaciones">
          <b>Cantidad de comparaciones:</b>
          {comparisonTimes.map((item, i) => {
            return <div key={i}>{item}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

function randomizeArray(e, longitud) {
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

function bubbleSortArray(array, iteration) {
  let i; //Cantidad de comparaciones en esta iteración
  let swap = false;
  for (i = 0; i < array.length - iteration; i++) {
    if (array[i] > array[i + 1]) {
      let x = array[i];
      array[i] = array[i + 1];
      array[i + 1] = x;
      swap = true;
    }
  }
  if (swap) return [array, i];
  else return [true, i];
}

function selectionSortArray(array, iteration) {
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
  let aux = array[minIndex];
  array[minIndex] = array[iteration];
  array[iteration] = aux;
  return [array, i - iteration];
}

function insertionSortArray(array, iteration) {
  //let j = iteration + 2;
  iteration = iteration < 1 ? 1 : iteration;
  let j = iteration;
  let contadorComparaciones = 0;
  while (j > 0 && array[j - 1] > array[j] && j < array.length) {
    contadorComparaciones++;
    let aux = array[j];
    array[j] = array[j - 1];
    array[j - 1] = aux;
    j -= 1;
  }
  if (iteration === array.length - 1) return [true, 0];

  return [array, contadorComparaciones];
}

export default App;

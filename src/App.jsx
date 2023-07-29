import { useEffect, useState } from "react";
import "./App.css";
import bubbleSortArray from "./functions/bubble";
import selectionSortArray from "./functions/selection";
import insertionSortArray from "./functions/insertion";
import quickSortArray from "./functions/quick";
import randomizeArray from "./functions/random";
function App() {
  //Array a ordenar
  const [array, setArray] = useState([]);
  //Algoritmo de ordenamiento elegido
  const [algoritmo, setAlgoritmo] = useState("Bubble Sort");
  //Longitud del array
  const [longitud, setLongitud] = useState(0);
  //Cantidad de iteraciones (llamadas a la funcion de ordenamiento)
  const [isSorting, setIsSorting] = useState(-1);
  //Historial de la cantidad de iteraciones de cada ordenamiento de la sesión
  const [sortingTimes, setSortingTimes] = useState([]);
  //Cantidad de comparaciones hechas en el ordenamiento actual
  const [comparisonCount, setComparisonCount] = useState(0);
  //Historial del cantidad de comparaciones de cada ordenamiento de la sesión
  const [comparisonTimes, setComparisonTimes] = useState([]);
  //Stack para ordenamientos recursivos
  const [stack, setStack] = useState([]);

  useEffect(() => {
    let sortedArray = [],
      comparisons,
      newStack = [];

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
      case "Quick Sort":
        [sortedArray, newStack, comparisons] = quickSortArray(
          array,
          stack,
          isSorting
        );
        break;
      default:
        break;
    }
    setTimeout(() => {
      if (sortedArray === true || !array.length || isSorting === -1) {
        //Este if se ejecuta si el array está ordenado, si está recien generado o si no está generado

        if (sortedArray === true && isSorting != -1) {
          //Este if se ejecuta cuando el array ya está ordenado
          setSortingTimes([...sortingTimes, isSorting]);
          setComparisonTimes([...comparisonTimes, comparisonCount]);
          setComparisonCount(0);
          toggleGenerarLista();
          enableInputs();
        }
        return;
      }
      if (algoritmo === "Quick Sort") {
        setStack(newStack);
      }
      setArray(sortedArray);
      setIsSorting(isSorting + 1);
      setComparisonCount(comparisonCount + comparisons);
    }, 1000 / longitud);
  }, [isSorting, array]);

  function toggleGenerarLista() {
    const generarLista = document.querySelector(".generar-lista");
    generarLista.disabled = !generarLista.disabled;
  }

  function enableOrdenar() {
    if (longitud > 0) {
      const sortButton = document.querySelector(".sort-button");
      sortButton.disabled = false;
    }
  }

  function disableOrdenar() {
    const sortButton = document.querySelector(".sort-button");
    sortButton.disabled = true;
  }

  function enableInputs() {
    const quantityInput = document.getElementById("number");
    const algorithmInput = document.getElementById("algoritmo");
    quantityInput.disabled = false;
    algorithmInput.disabled = false;
  }

  function disableInputs() {
    const quantityInput = document.getElementById("number");
    const algorithmInput = document.getElementById("algoritmo");
    quantityInput.disabled = true;
    algorithmInput.disabled = true;
  }

  return (
    <div className="App">
      <form
        id="array-setter"
        onSubmit={(e) => {
          setArray(randomizeArray(e, longitud));
          setIsSorting(-1);
          enableOrdenar();
        }}
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
            <option value="Quick Sort">Quick Sort</option>
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
                margin: longitud > 200 ? "0px" : "1px",
                background: element === i + 1 ? "#0f0" : "#f00",
              }}
            ></div>
          );
        })}
      </div>
      <button
        className="sort-button"
        onClick={(e) => {
          setIsSorting(0);
          toggleGenerarLista();
          disableOrdenar();
          disableInputs();
        }}
      >
        Ordenar!
      </button>

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

export default App;

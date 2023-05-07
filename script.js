//Referencias
const botonesNumeros = Array.from(document.getElementsByClassName("numero"));
const botonesOperaciones = Array.from(document.getElementsByClassName("operacion"));
const pantallaElement = document.getElementById("pantalla");
const indicadorOperacion = document.getElementById("indicadorOperacion");

//Otras variables
let pantalla = 0;
let numeroAnterior;
let numeroReinicia = false;

//Eventos
botonesNumeros.forEach((boton) => {
  boton.addEventListener("click", (e) =>
    numeroClickado(parseInt(e.target.textContent))
  );
});
botonesOperaciones.forEach((boton) => {
  boton.addEventListener("click", (e) =>
    operacionClickeada(e.target.textContent)
  );
});
document.getElementById("clear").addEventListener("click", limpiarNumeroActual);
document.getElementById("allClear").addEventListener("click", reset);
document.getElementById("punto").addEventListener("click", punto);
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      numeroClickado(parseInt(e.key));
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      operacionClickeada(e.key);
      break;
    case "Enter":
      operacionClickeada("=");
      break;
		case "Escape":
			reset()
			break;
		case "Backscape":
      limpiarNumeroActual()
      break;
		case ".":
      punto()
      break;
  }
});

//Funciones
function numeroClickado(numero) {
  if (numeroReinicia) {
    pantalla = 0;
    numeroReinicia = false;
  }
  numeroPantalla = parseFloat(pantalla);
  if (!isNaN(numeroPantalla)) {
    pantalla = parseFloat(pantalla.toString() + numero);
    actualizarPantalla();
  }
}
function operacionClickeada(operacion) {
    if (!numeroAnterior) {
      if (pantalla === 0) return; //Operación sin tener número
      if (operacion === '=') return; //Igual sin tener operación
      numeroAnterior = pantalla;
      indicadorOperacion.textContent = operacion;
      numeroReinicia = true;
    } else {
      let resultado;
      switch (indicadorOperacion.textContent) {
        case "+":
          resultado = numeroAnterior + pantalla;
          break;
        case "-":
          resultado = numeroAnterior - pantalla;
          break;
        case "*":
          resultado = numeroAnterior * pantalla;
          break;
        case "/":
          resultado = numeroAnterior / pantalla;
          break;
      }
      if (operacion === "=") {
        indicadorOperacion.textContent = "";
        numeroAnterior = undefined;
      } else {
        indicadorOperacion.textContent = operacion;
        numeroAnterior = resultado;
      }
      pantalla = resultado;
      actualizarPantalla();
      numeroReinicia = true;
    }
}

function actualizarPantalla(mensaje = pantalla) {
  pantalla = mensaje;
  pantallaElement.textContent = pantalla;
}

function limpiarNumeroActual() {
  actualizarPantalla(0);
}

function reset() {
  limpiarNumeroActual();
  (numeroAnterior = undefined),
    (indicadorOperacion.textContent = undefined);
}

function punto(){
	if(Number.isInteger(pantalla)) actualizarPantalla(pantalla += ".");
}
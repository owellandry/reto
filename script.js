const objetos = {
    "a": ["torre_1", "torre_2", "torre_3"]
  };
  const torresTotales = 3;
  
  let contador = 0;
  
  function main() {
    pintar("a");
    inicio();
  }
  
  function inicio() {
    console.log("Juego cargado");
    const torres = document.querySelectorAll("div#contenedor > div > div");
    const soltar = document.querySelectorAll("div#contenedor > div");
    for(const torre of torres) {
      torre.addEventListener("dragstart", arrastradoInicial);
      torre.addEventListener("dragend", finalizado);
    }
    for(const destino of soltar) {
      destino.addEventListener("dragenter", e => e.preventDefault());
      destino.addEventListener("dragover", e => e.preventDefault());
      destino.addEventListener("drop", dropFinal);
    }
  }
  
  function arrastradoInicial(e) {
    const padre = e.target.parentNode;
    if(padre.childNodes[0].id === e.target.id) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData("Text", e.target.id);
    }
  }
  
  function finalizado(e) {
    e.preventDefault();
    const final = document.getElementById("c");
    const ganar = document.querySelector("div#salida > div");
    if(final.childNodes.length === torresTotales) {
      ganar.innerHTML = "HAS GANADO UN PREMIO :)";
    }
  }
  
  function dropFinal(e) {
    e.preventDefault();
    const destino = e.target;
    if(!destino.id.startsWith("torre_")) return; // Si no es una torre, no hacer nada
  
    const piezas = Array.from(destino.children).map(child => parseInt(child.id.split("_")[1]));
    const item = e.dataTransfer.getData("Text");
    const numItem = parseInt(item.split("_")[1]);
    if(isNaN(numItem)) return; // Si el id del item no tiene formato válido, no hacer nada
  
    if(piezas.length === 0 || numItem < piezas[0]) {
      const itemElement = document.getElementById(item);
      itemElement.parentNode.removeChild(itemElement);
      destino.prepend(itemElement);
      contador++;
    }
  
    const sal = document.querySelector("div#salida span");
    sal.innerHTML = contador;
  }
  
  function pintar(p) {
    const cajas = document.getElementById(p);
    cajas.innerHTML = '';
    for(const torre of objetos[p]) {
      cajas.innerHTML += `<div id="${torre}" draggable="true"></div>`;
    }
  }
  
  window.addEventListener("load", main);
  
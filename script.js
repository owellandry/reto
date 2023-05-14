var objetos = {
    "a": ["torre_1", "torre_2", "torre_3", "torre_4", "torre_5", "torre_6"]
}
var torresTotales = 3;
var contador = 0;
function main() {
    pintar("a");
    inicio();
}
function inicio() {
    console.log("Juego cargardo");
    var torres = document.querySelectorAll("#contenedor > div > div");
    var soltar = document.querySelectorAll("#contenedor > div");
    for(var i = 0; i < torres.length; i++) {
        torres[i].addEventListener("dragstart", arrastradoInicial, false);
        torres[i].addEventListener("dragend", finalizado, false);
    }
    for(var i = 0; i < soltar.length; i++) {
        soltar[i].addEventListener("dragenter", (e)=>e.preventDefault(), false);
        soltar[i].addEventListener("dragover", (e)=>e.preventDefault(), false);
        soltar[i].addEventListener("drop", dropFinal, false);
    }
    
}
function arrastradoInicial(e) {
    var padre = e.target.parentNode;
    if(padre.childNodes[0].id === e.target.id) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData("Text", e.target.id);        
    }
}
function finalizado(e) {
    e.preventDefault();
    var final = document.getElementById("c");
    var ganar = document.querySelector("div#salida > div");
    if(final.childNodes.length === torresTotales) {
        ganar.innerHTML = "HAS GANADO UN PREMIO :)";
    }
}
function dropFinal(e) {
    e.preventDefault();
    var puntero = e.target;
    var padre = document.getElementById(puntero.id).childNodes;   
    var item = e.dataTransfer.getData("Text");
    var puedoPoner = cortaCompa(padre, item);
    if(puntero.id != "torre_1" && puntero.id != "torre_2" && puntero.id != "torre_3" && item != '' &&  puedoPoner) {
        var quitar = document.getElementById(item);
        quitar.parentNode.removeChild(quitar);
        puntero.innerHTML = '<div id="'+item+'" draggable="true"></div>' + puntero.innerHTML;
        contador++;
    }
    var sal = document.querySelector("div#salida span");
    sal.innerHTML = contador;
    inicio();
}
function pintar(p) {
    var cajas = document.getElementById(p);const objetos = {
        "a": ["torre_1", "torre_2", "torre_3", "torre_4", "torre_5", "torre_6"]
      };
      const torresTotales = 3;
      
      let contador = 0;
      
      function main() {
        pintar("a");
        inicio();
      }
      function inicio() {
        console.log("Juego cargardo");
        const torres = document.querySelectorAll("#contenedor > div > div");
        const soltar = document.querySelectorAll("#contenedor > div");
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
        var puntero = e.target;
        var padre = document.getElementById(puntero.id).childNodes;   
        var item = e.dataTransfer.getData("Text");
        var puedoPoner = cortaCompa(padre, item);
        
        if (puntero.id != "torre_1" && puntero.id != "torre_2" && puntero.id != "torre_3" && item != '' && puedoPoner) {
          // Si la torre de destino tiene bloques
          if (padre.length > 0) {
            // Obtenemos el tamaño del bloque que se va a mover y el de la cima de la torre de destino
            var tamanoBloque = parseInt(item.split('_')[1]);
            var tamanoBloqueDestino = parseInt(padre[0].id.split('_')[1]);
      
            // Si el bloque que se va a mover es más grande que el que se encuentra en la cima de la torre de destino, reiniciamos la partida
            if (tamanoBloque > tamanoBloqueDestino) {
              alert('Has movido un bloque grande encima de uno pequeño. La partida se reiniciará');
              location.reload();
              return;
            }
          }
      
          // Movemos el bloque normalmente si todo está correcto
          var quitar = document.getElementById(item);
          quitar.parentNode.removeChild(quitar);
          puntero.innerHTML = '<div id="'+item+'" draggable="true"></div>' + puntero.innerHTML;
          contador++;
        }
        
        var sal = document.querySelector("div#salida span");
        sal.innerHTML = contador;
        inicio();
      }
        
      function pintar(p) {
        const cajas = document.getElementById(p);
        cajas.innerHTML = '';
        for(const torre of objetos[p]) {
          cajas.innerHTML += `<div id="${torre}" draggable="true"></div>`;
        }
      }
      window.addEventListener("load", main);
    cajas.innerHTML = '';
    for(var i = 0; i < objetos[p].length; i++) {
        cajas.innerHTML += '<div id="'+objetos[p][i]+'" draggable="true"></div>';
    }
}
function cortaCompa(primero, segundo) {
    if(primero[0] == undefined) {
        salida = true;
    } else {
        var salida = ( segundo.split("_")[1] < primero[0].id.split("_")[1] ) ? true: false;
      }
      console.log(contador);
    return salida;
}
window.addEventListener("load", main, false);
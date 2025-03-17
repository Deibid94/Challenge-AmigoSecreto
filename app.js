let participantes = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();
    const listaAmigos = document.getElementById("listaAmigos");

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (participantes.includes(nombre)) {
        alert("Este nombre ya ha sido agregado.");
        return;
    }

    participantes.push(nombre);
    
    // Agregar nombre a la lista en la interfaz
    const li = document.createElement("li");
    li.textContent = nombre;
    listaAmigos.appendChild(li);

    input.value = ""; // Limpiar el campo después de agregar
}

function sortearAmigo() {
    if (participantes.length < 2) {
        alert("Deben haber al menos 2 participantes para sortear.");
        return;
    }

    let mezclados = [...participantes].sort(() => Math.random() - 0.5);
    let resultado = {};

    for (let i = 0; i < mezclados.length; i++) {
        let amigoSecreto = mezclados[(i + 1) % mezclados.length];
        resultado[mezclados[i]] = amigoSecreto;
    }

    mostrarResultados(resultado);
}

function mostrarResultados(resultado) {
    const resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = ""; // Limpiar resultados previos

    for (let participante in resultado) {
        const li = document.createElement("li");
        li.textContent = `${participante} → ${resultado[participante]}`;
        resultadoLista.appendChild(li);
    }
}
function reiniciarJuego() {
    participantes = []; // Vaciar la lista de participantes
    
    // Limpiar la interfaz
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    
    alert("El juego ha sido reiniciado. Puedes agregar nuevos participantes.");
}

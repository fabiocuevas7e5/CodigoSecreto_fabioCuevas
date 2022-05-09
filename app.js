//initial VARs
const codigo = [];
const maxIntentos = 5;
let attempts = 0;
var userGuess = document.getElementById("numero").value;
let arrayUserGuess = Array.from(userGuess);
let resultSection = document.getElementById("Result");
const lifesDiv = document.getElementById('hearts');
const heart = "❤️";
const brokenHeart = "💔";
const botoncheckGuess = document.getElementById('check');
infoPar = document.getElementById('info');
var userGuesstoCompare = arrayUserGuess.map(function (x) {
    return parseInt(x, 10);
});

// Función para crear código secreto de 5 cifras
function codigoSecreto() {
    for (let i = 0; i < 5; i++) {
        codigo[i] = Math.floor((Math.random() * 10));
    }
}
codigoSecreto();
console.log(`Codigo secreto: ${codigo}`);

//Div para generar las 5 vidas iniciales
lifesDiv.innerHTML = `Vidas restantes: ${heart.repeat(maxIntentos)}`


function checkGuess() {
    var userGuess = document.getElementById("numero").value;
    let arrayUserGuess = Array.from(userGuess);
    let userGuessToStrings = arrayUserGuess.map(String)
    var resultSection = document.getElementById("Result");
    let codigoSection = document.getElementById("codigo");
    let codigoToStrings = codigo.map(String)
    var userGuesstoCompare = arrayUserGuess.map(function (x) {return parseInt(x, 10);});
    infoPar = document.getElementById('info');

    if (arrayUserGuess.length === 5) {
        for (i = 0; i < 5; i++) {
            let numberPosition = codigoToStrings.indexOf(userGuessToStrings[i])
            let cells = resultSection.children[0].children[i].children[0];

            //rellenar las celdas con la guess del usuario
            cells.innerHTML = arrayUserGuess[i]

            //colorear las celdas
            if (numberPosition === -1) {
                cells.style.backgroundColor = '#606060';
            } else {
                if (userGuessToStrings[i] == codigo[i]) {
                    cells.style.backgroundColor = '#00FF07'
                } else {
                    cells.style.backgroundColor = '#Fff900'
                }
                codigoToStrings[numberPosition] = "#"
            }
        }
        console.log(`User guess: ${arrayUserGuess}`)
    }

    if (arrayUserGuess.length === 5) {
        if (checkArrayEquality(userGuesstoCompare, codigo) === true) {
            
            //actualizar el estado de info y desvelar el código secreto si lo adivina
            infoPar.innerHTML = `Has acertado, enhorabuena!!`;
            for (i = 0; i < 5; i++) {
                let guessedCode = codigoSection.children[0].children[i].children[0];
                guessedCode.innerHTML = codigo[i];
            }
        }
        else {
            wrongGoAgain()
            //actualizar el estado de info y desvelar el código secreto si no quedan vidas restantes
            if (attempts >= maxIntentos) {
                infoPar.innerText = `Has perdido`;
                userGuess.disabled = true;
                botoncheckGuess.disabled = true;
                for (i = 0; i < 5; i++) {
                    let guessedCode = codigoSection.children[0].children[i].children[0];
                    guessedCode.innerHTML = codigo[i];
                }
            }
            createRow()
        }

    }
    else {
        infoPar.innerText = 'Introduce un número válido'
    }
    if (attempts === 5) {
        resultSection.removeChild(document.getElementsByClassName("rowResult w100 flex wrap")[0]);
    }
}

//Cuando ya haya ganado/perdido se eliminará la fila vacía que indicia que podemos seguir adivinando
function hideFirstRow() {
    var y = document.getElementsByClassName("rowResult w100 flex wrap")
    var x = y[0]
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

//Suma intentos y resta vidas
function wrongGoAgain() {
    attempts += 1;
    infoPar.innerText = 'Inténtalo de nuevo';
    lifesDiv.innerHTML = `Vidas restantes: ${heart.repeat(maxIntentos - attempts)}`;
    lifesDiv.innerHTML += brokenHeart.repeat(attempts);

}

//Comparar el input del usuario y el código secreto generado
function checkArrayEquality(userGuesstoCompare, _array2) {
    if (userGuesstoCompare === null || _array2 === null)
        return false;
    if (userGuesstoCompare.length !== _array2.length)
        return false;
    for (var i = 0; i < userGuesstoCompare.length; ++i) {
        if (userGuesstoCompare[i] !== _array2[i])
            return false;
    }
    return true;
}

//función que introduce una nueva fila si no es adivinado el codigo secreto
function createRow() {
    if (attempts <= 5) {
        const nuevaFila = `<div class="rowResult w100 flex wrap">
<div class="w20">
    <div class="celResult flex"></div>
</div>
<div class="w20">
    <div class="celResult flex"></div>
</div>
<div class="w20">
    <div class="celResult flex"></div>
</div>
<div class="w20">
    <div class="celResult flex"></div>
</div>
<div class="w20">
    <div class="celResult flex"></div>
</div>
</div>`;
        resultSection.innerHTML = nuevaFila + resultSection.innerHTML
    }
}
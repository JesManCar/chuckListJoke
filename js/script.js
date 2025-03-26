const btnJoke = document.getElementById("fetchJoke");
const listJoke = document.getElementById("jokeList");
const clearAll = document.getElementById("clearAll");

const ENDPOINT = "https://api.chucknorris.io/jokes/random";

function clearJokes (){
    listJoke.innerHTML ="";
    localStorage.removeItem("chistes");
    localStorage.removeItem("lastIndexJokes");
}

clearAll.addEventListener("click", () => {
    clearJokes();
})

//printAll Argument
//TRUE => Print ALL
//FALSE => Print Last
function printJokes (printAll = true){
    if (localStorage.getItem("chistes")){
        const chistes = localStorage.getItem("chistes");
        const arrayChistes = JSON.parse(chistes);
        if(printAll){
            arrayChistes.forEach((element,i) => {
            listJoke.innerHTML += `
            <li>
            <p>${element[1]}</p>
            <button id="eliminar${element[0]}" class="eliminar" onclick="rmElement(${element[0]})">Eliminar</button>
            </li>
            `
        });}
        else {
            const i = arrayChistes.length-1;
            listJoke.innerHTML += `
            <li>
            <p>${arrayChistes[i][1]}</p>
            <button id="eliminar${arrayChistes[i][0]}" class="eliminar" onclick="rmElement(${arrayChistes[i][0]})">Eliminar</button>
            </li>
            `
        }
    }
}

/*
 [    [0, chiste ] ,  [ 1, chiste] ,   [ 2  , chiste]   ]
*/

function rmElement(i){
    const element = document.getElementById(`eliminar${i}`).parentElement;
    element.remove();
    //TRAER LOCAL STORAGE
    chistes = localStorage.getItem("chistes");
    arrayChistes = JSON.parse(chistes);
    //BORRAMOS ELEMENTO
    arrayChistes.forEach((element,j) => {
        if (element[0]===i){
            arrayChistes.splice(j,1)
        }
    })
    //SUBIMOS NUEVO ARRAY AL LOCAL STORAGE
    localStorage.setItem("chistes", JSON.stringify(arrayChistes));
}

printJokes();

// FETCH NUEVO CHISTE -> LEER STORAGE -> GUARDAR AL FINAL DEL STORAGE
btnJoke.addEventListener("click", () => {
    fetch(ENDPOINT)
    .then((response) => {
        if (!response.ok) throw new Error('Error en la solicitud');
        return response.json();
    })
    .then((data) => {
        let chistes = "";
        let arrayChistes = [];
        let i = 0;
        if (localStorage.getItem("chistes")){
            //Traemos el Local Storage y el indice del siguiente elemento
            chistes = localStorage.getItem("chistes");
            arrayChistes = JSON.parse(chistes);
            i = parseInt(localStorage.getItem("lastIndexJokes"));
            console.log(i);
        }
        // Añadimos el ultimo elemento
        arrayChistes.push([i,data.value]);
        // Guardamos el Local Storage
        localStorage.setItem("chistes", JSON.stringify(arrayChistes));
        localStorage.setItem("lastIndexJokes",i+1)
        //console.log(localStorage);

        // Mostramos por pantalla el ultimo elemento añadido
        printJokes(false);
   });
})
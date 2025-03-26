const btnJoke = document.getElementById("fetchJoke");
const listJoke = document.getElementById("jokeList");
const clearAll = document.getElementById("clearAll");

const ENDPOINT = "https://api.chucknorris.io/jokes/random";

function clearJokes (){
    listJoke.innerHTML ="";
    localStorage.removeItem("chistes");
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
            <button id="eliminar${i}" class="eliminar" onclick="rmElement(${i})">Eliminar</button>
            </li>
            `
        });}
        else {
            const i = arrayChistes.length-1;
            listJoke.innerHTML += `
            <li>
            <p>${arrayChistes[i][1]}</p>
            <button id="eliminar${i}" class="eliminar" onclick="rmElement(${i})">Eliminar</button>
            </li>
            `
        }
    }
}


//////
/*

 [    [0, chiste ] ,  [ 1, chiste] ,   [ 2  , chiste]    ]   <-- Array Princial (LocalStorage)


*/

function rmElement(i){
    const element = document.getElementById(`eliminar${i}`).parentElement;
    element.remove();
    //TRAER LOCAL STORAGE
    chistes = localStorage.getItem("chistes");
    arrayChistes = JSON.parse(chistes);

    const index = arrayChistes.indexOf()
     
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
            chistes = localStorage.getItem("chistes");
            arrayChistes = JSON.parse(chistes);
            i = arrayChistes.length; //TODO: REFACTOR
        }
        arrayChistes.push([i,data.value]);
        localStorage.setItem("chistes", JSON.stringify(arrayChistes));
        console.log(localStorage);
        printJokes(false);
   });
})


//const btnEliminar = document.getElementById("eliminar");
const btnEliminar = document.querySelector("#eliminar");

btnEliminar.addEventListener("click", () =>{
    console.log("hllo")
})
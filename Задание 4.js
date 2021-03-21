/*Задание 4.

Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки,
второе — высота.
Пример: если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
После получения данных вывести ниже картинку на экран.*/

const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
let result = document.querySelector(".result");

btn2.addEventListener("click", ()=> {
    result.textContent = "";
    result.style.color = "black";
})

btn1.addEventListener("click", (event) => {
    event.preventDefault();

    let width = document.querySelector('#input1').value;
    let height = document.querySelector('#input2').value;

    if (100 > width || width > 300 || 100 > height || height > 300) {
    result.textContent = "Одно из чисел вне диапазона от 100 до 300";
    result.style.color = "red";
        } else {
            fetch(`https://picsum.photos/${width}/${height}`)
                .then((response) => {
                    let img = document.createElement("img");
                    img.setAttribute("src", response.url);
                    img.style.margin = "5px";
                    result.appendChild(img);
                })
                .catch((error) => {
                    console.log("error", error)
                });
        }
});


//Альтернативный вариант проверки значения:
// function validateRange(a) {
//     return a < 300 && a > 100;
// }
//
// const array = [width, height]
// for(const item of array) {
//     if (!validateRange(item)) {
//         result.textContent = "Одно из чисел вне диапазона от 100 до 300";
//         result.style.color = "red";
//
//     } else {
//         fetch(`https://picsum.photos/${width}/${height}`)
//             .then((response) => {
//                 let img = document.createElement("img");
//                 img.setAttribute("src", response.url);
//                 img.style.margin = "5px";
//                 result.appendChild(img);
//             })
//             .catch((error) => {
//                 console.log("error", error)
//             });
//     }
// }
// });
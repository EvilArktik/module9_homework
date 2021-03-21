/*Задание 3.

Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число.
При клике на кнопку происходит следующее:
    Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
    Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10,
    где get-параметр limit — это введённое число.
    Пример: если пользователь ввёл 5, то запрос будет вида https://picsum.photos/v2/list?limit=5.
    После получения данных вывести ниже картинки на экран. */


const btn = document.querySelector(".btn");
const result = document.querySelector(".result");

btn.addEventListener("click", (event) => {
    event.preventDefault();

    let value = document.querySelector('input').value;
    if (value < 1 || value > 10) {
        result.textContent = "Число вне диапазона от 1 до 10";
        result.style.color = "red";
    } else {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://picsum.photos/v2/list?limit=${value}`, true);

        xhr.onload = function () {
            let data = JSON.parse(xhr.response);
            let pics = "";
            data.forEach(item => {
                const picWrapper = `
                <div class="pic"">
                    <img src="${item.download_url}" style="padding-right: 20px; width: 400px; height: 400px"/>
                    <p>${item.author}</p>
                </div>`;
                pics = pics + picWrapper;
            });
            result.innerHTML = pics;
            result.style.color = "black";
        };

        xhr.onerror = function () {
            console.log("error occurred", xhr.status);
        };
        xhr.send();
    }
});


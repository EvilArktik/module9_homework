/*Задание 5.

Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).*/

//находим все наши кнопки, инпуты и поле вывода результата
const result = document.querySelector(".result");
const requestBtn = document.querySelector(".requestBtn");
const resetBtn = document.querySelector(".resetBtn");
let pageInput = document.querySelector("#input1");
let limitInput = document.querySelector("#input2");

//Выдёргиваем сохраненные картинки и значения полей из локального хранилища, если они есть
let data = localStorage.getItem("savedPic");
pageInput.value = localStorage.getItem("pageNumber");
limitInput.value = localStorage.getItem("limitNumber");

//кнопка сброс, которая очищает страницу и хранилище
resetBtn.addEventListener("click", () => {
    result.textContent = "";
    localStorage.clear();
})

//кнопка запроса. Удаляет текст ошибки, если она была до этого и делает fetch запрос
requestBtn.addEventListener("click", (event) => {
    event.preventDefault();
    result.innerText = "";
//достаем значение обоих полей
    let page = pageInput.value;
    let limit = limitInput.value;
//если значение вне диапазона то выдается ошибка в разных вариантах
    if ((page < 1 || page > 10) && (limit < 1 || limit > 10)) {
        result.textContent = "Номер страницы и лимит вне диапазона от 1 до 10";
    } else if (limit < 1 || limit > 10) {
        result.textContent = "Лимит вне диапазона от 1 до 10";
    } else if (page < 1 || page > 10) {
        result.textContent = "Номер страницы вне диапазона от 1 до 10";
    } else {
        //если всё ок отправляем запрос, вставляя результат из обоих полей в ссылку
        fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
            .then((response) => {
                return response.json();
            })
            //после получания ответа засовываем картинку в локальное хранилище и вызываем функцию, отображающую картинки
            .then((data) => {
                localStorage.setItem("savedPic", JSON.stringify(data));
                localStorage.setItem("pageNumber", page);
                localStorage.setItem("limitNumber", limit);
                showPic(data);
            })
            //в случае ошибки запроса вываливаем в консоль текст ошибки
            .catch((error) => {
                console.log(error);
            });
    }
});

//для каждого элемента в хранилище создаем элемент img и назначаем ссылку на него из параметра download_url, а так же назначаем другие параметры картинки.
function showPic(data) {
    if (data) {
        data.forEach((item) => {
            let img = document.createElement("img");
            img.setAttribute("src", item.download_url);
            img.style.margin = "5px";
            img.style.width = "400px";
            img.style.height = "400px";
            result.appendChild(img);
        })
    }
}
//вызываем предыдущую функцию, в качестве аргумента передаем распарсеный json, который мы запросили через fetch
showPic(JSON.parse(data));

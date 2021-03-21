/*Задание 1.

Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и
выводить его в консоль.*/

const xmlString = `<list>
<student>
<name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
    </student>
    <student>
    <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
    </student>
    </list>`;



const parser = new DOMParser();

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const students = xmlDOM.querySelectorAll("student");

let result = {"list": []};

for (let i = 0; i < students.length; i++) {
    let student = students[i],
        firstName = student.querySelector("first").textContent;
    secondName = student.querySelector("second").textContent;
    age = student.querySelector("age").textContent;
    prof = student.querySelector("prof").textContent;
    lang = student.querySelector("name").getAttribute("lang");

    let buffer ={
        name: `${firstName} ${secondName}`,
        age: age,
        prof: prof,
        lang: lang
    };

    result.list.push(buffer);
}

console.log(result);




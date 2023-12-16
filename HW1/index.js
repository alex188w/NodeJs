'use strict';

const http = require('http');
let countMain = 0;
let countAbout = 0;
const server = http.createServer((reg, res) => {

    console.log('Запрос получен');
    switch (reg.url) {
        case "/":
            res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end(`
            <h1>Добро пожаловать на мой новый сайт!</h1>
            <a href="about">About Page</a>
            </br>
            <h2>Количество посещений страницы: ${countMain++}</h2>
        `);
            break;
        case "/about":
            res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end(`
            <h1>Добро пожаловать на страницу обо мне!</h1>
            <a href="/">Главная страница</a>
            </br>
            <h2>Количество посещенией страницы: ${countAbout++}</h2>
        `);
            break;
        default:
            res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end(`
            <h1>404 Страница не найдена</h1>
            <a href="/">Главная страница</a>
            `);
            break;
    }
});
const port = 3000;

server.listen(port, () => {
    console.log('Сервер запущен на порту ${port)');
});
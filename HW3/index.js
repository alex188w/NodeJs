// Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

// — На каждой странице реализован счетчик просмотров
// — Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
// — Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
// — Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const pathTooFile = path.join(__dirname, 'count.json');

app.get('/', (reg, res) => {
    let date = JSON.parse(fs.readFileSync(pathTooFile, 'utf-8'));
    date.countHome += 1;
    fs.writeFileSync(pathTooFile, JSON.stringify(date, null, 2));
    res.send(`<h1>Главная страница<h1></br><a href="/about">Ссылка на страницу: AboutPage</a></br><p>Количество просмотров: ${ date.countHome }`);
});
app.get('/about', (reg, res) => {
    let date = JSON.parse(fs.readFileSync(pathTooFile, 'utf-8'));
    date.countAbout += 1;
    fs.writeFileSync(pathTooFile, JSON.stringify(date, null, 2));
    res.send(`<h1>Страница About<h1></br><a href="/">ссылка на страницу /</a></br><p>Количество просмотров: ${ date.countAbout }`);
});
app.listen(3000);
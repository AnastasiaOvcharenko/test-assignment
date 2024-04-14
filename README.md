# Инструкция по запуску
Запуск проекта на Windows:
1. npm install
2. Команда формата **$env:TOKEN = '<ВАШ ТОКЕН>'; npm run start** 

Возможно, на ОС Linux или еще какой-либо сработает запуск в формате TOKEN=<your api token> npm run start, однако, для Windows мною не было найдено решения для реализации конкретно такой команды. Поэтому токен передаем как указано выше.

**Проверку фейковой авторизации можно произвести с помощью логина test@example.com и пароля qwerty. Для удобства они уже введены в форму авторизации в качестве дефолтных параметров.**

## Решение возникших проблем
Проблема: отсутствие поиска и по фильтрам, и по названию одновременно. Решение: сделать два разных поиска :)
   
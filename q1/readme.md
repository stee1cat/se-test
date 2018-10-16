# Simple forum DB

## SQL

`sql/query.sql` - query for getting active last 10 topics

`sql/schema.sql` - DB schema

## Generate fake datasets

```
npm i
npm run geenerate:users
npm run geenerate:forums
npm run geenerate:topics
npm run geenerate:messages
```

## Task

**Задание:** Спроектировать схему БД для простого публичного форума, без учета администрирования, на форуме могут быть разделы, темы, текстовые сообщения (каждое сообщение принадлежит какому-то пользователю).

**Дополнительное задание:** Написать SQL который вернет список из последних 10 тем (по времени) с их последним сообщением и его автором, в которых отписалось больше 3 пользователей. Результат: тема | сообщение | автор | дата.

*Решение должно быть представлено в виде ссылки на [db-fiddle.com](https://db-fiddle.com/) или [sqlfiddle.com](https://sqlfiddle.com/).*
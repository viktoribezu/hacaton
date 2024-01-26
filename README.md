[![image](https://github.com/viktoribezu/hacaton/assets/65026452/97953212-9c7f-4d86-a11e-457eca389fa7)](https://i.moscow/lct)
<!--- # Проект 10 для [хакатона](leaders2023.innoagency.ru) --->

# Хакатон [Лидеры Цифровой Трансформации](https://i.moscow/lct) 2023
## Задача 10 "Сервис прогнозирования работ по содержанию и ремонту объектов городского хозяйства"
### Описание
Прогноз текущих работ на объектах ЖКХ на основании данные об объектах, истории инцидентов и выполненных работ.

### Как запустить
`docker-compose up --build`

Создать суперпользователя

`docker-compose exec backend python manage.py createsuperuser`

Если таблиц нет

`docker-compose exec backend python manage.py makemigrations api`

Если это первый запуск, то после выполнения миграции надо выдать пользователю для мл доступ на работу с таблицей предсказаний. 
По очереди запускаем следующие команды:

`docker exec -it postgres_db bash`

```
psql -h localhost -p 5432 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB"  <<-EOSQL
GRANT INSERT ON api_predict TO $POSTGRES_ML_USER;
EOSQL
```

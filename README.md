<!--- # Проект 10 для [хакатона](leaders2023.innoagency.ru) --->
# Проект 10 для [хакатона](https://i.moscow/lct)
## Как запустить
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

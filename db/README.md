# Setup Base de Datos

Para ejecutar la base de datos utilizamos postgreSQL. Asegurarse de que se tenga acceso al comando `psql` desde la terminal.

En la terminal ejecutar:

`psql -U postgres -f ./db/NotifyDB.sql`

para crear las tablas, después ejectuar:

`psql -U postgres -d notifydb -f ./db/inserts.sql` para popular las tablas.

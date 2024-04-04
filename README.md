# Configuracion de cli

Primero configura un nuevo usuario, en este caso "asp":

> `aws configure --profile asp`

De ahora en adelante todos los comandos que se corran desde esta consola deberan tener la flag al final 
> `--profile asp`

Para ver las credenciales en mac podemos abrir el archivo utilizando el comando 

> `open ~/.aws/credentials`

en windows normalmente se encuentran en:

> `C:\NOMBRE_DE_TU_USUARIO\.aws\credentials`

# Crear una base de datos y crearle tablas

> `psql --host=database-1.dsfsdfsdfsdf.us-east-1.rds.amazonaws.com --port=5432 --username=postgres --password`

Luego creamos las tablas:

>`CREATE TABLE usuarios ( usuario_id SERIAL PRIMARY KEY, nombre VARCHAR(100), email VARCHAR(100) UNIQUE NOT NULL );`

>`CREATE TABLE detalles_usuario (detalle_id SERIAL PRIMARY KEY, usuario_id INT UNIQUE NOT NULL, direccion VARCHAR(255), telefono VARCHAR(50), FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id) );`

y para poder ver las tablas creadas

>`\dt` 

ahora vamos a borrara las tablas

>`DROP TABLE detalles_usuario;`

>`DROP TABLE usuarios;`

# Elastick Beanstalk

Primero analizar la aplicacion y que hace.

Para crear una aplicacion en Elastic Beanstalk, primero debemos crear un archivo zip con el contenido de nuestra aplicacion, en este caso el archivo se llama `node-app.zip` y contiene los archivos.

Tambien en el .env pondremos todas las variables de entorno que necesitamos para que la aplicacion funcione correctamente. Recordar que no es buena practica subir las variables de entorno a un repositorio publico.


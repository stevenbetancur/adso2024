# adso2024

En este repositorio encontramos dos proyectos

BackEnd - NodeJS: employee-backend
FrontEnd - React: employee-management-frontend

Para poder probar cada uno, primero debe ingresar a cada carpeta y ejecutar npm install.
NOTA: Recuerden que deben tener instalado NodeJS como vimos en clase.

Para que el back funcione debe crear una base de datos con el nombre: employee_db

Y crear una tabla con la siguiente estructura:

CREATE TABLE `employees` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`email` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`position` VARCHAR(255) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `email` (`email`) USING BTREE
);

Con solo estos pasos debería funcionar forma correcta una aplicación que consulte y cree empleados.

Al ejecutar el npm install en cada uno, debemos ejecutar cada aplicación

El back de node sube ejecutando el comando: node server.js
NOTA: Recuerde que esto lo debe ejecutar como vimos en clase en una consola de Git o CMD y estar en la carpeta employee-backend

El Front de React, sube ejecutando el comando: npm start
NOTA: Recuerde que esto lo debe ejecutar como vimos en clase en una consola de Git o CMD y estar en la carpeta employee-management-frontend

Quiere decir que debe tener dos consolas, cada una debe subir el servicio de una aplicación.

El back está subiendo el servicio por el puerto 3001 y el front sube por el puerto 3000

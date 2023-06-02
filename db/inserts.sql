	-- usuarios
INSERT INTO usuario(
	 nombre, email, is_admin)
	VALUES ('us1', 'test1@test.com', true);
	
INSERT INTO usuario(
	 nombre, email, is_admin)
	VALUES ('us2', 'test2@test.com', false);
	
INSERT INTO usuario(
	 nombre, email, is_admin)
	VALUES ('us3', 'test3@test.com', false);
	
INSERT INTO usuario(
	 nombre, email, is_admin)
	VALUES ('us4', 'test4@test.com', false);

INSERT INTO usuario(
	 nombre, email, is_admin)
	VALUES ('us5', 'test5@test.com', false);
	
	--temas
INSERT INTO temas(
	 admin_id, titulo, descripcion, accessomensajesprev, cod)
	VALUES (1, 'Convencion Comics 23', 'DESC Convencion Comics 23', 'false', 'cc23');
	
INSERT INTO temas(
	 admin_id, titulo, descripcion, accessomensajesprev, cod)
	VALUES (1, 'Feria del libro 23', 'DESC Feria del libro 23', 'false', 'fl23');
	
INSERT INTO temas(
	 admin_id, titulo, descripcion, accessomensajesprev, cod)
	VALUES (1, 'Linea Produccion 112', 'DESC Linea Produccion 112', 'true', 'lp112');
	
INSERT INTO temas(
	 admin_id, titulo, descripcion, accessomensajesprev, cod)
	VALUES (1, 'Junta Proyecto Inov', 'DESC Junta Proyecto Inov', 'true', 'jpi');
	
-- tema-sus

INSERT INTO tema_sus(
	temas_id, suscriptor_id, recibirpushnot, frecmsj)
	VALUES (3, 1, 'true', 1);

INSERT INTO tema_sus(
	temas_id, suscriptor_id, recibirpushnot, frecmsj)
	VALUES (1, 2, 'true', 1);

INSERT INTO tema_sus(
	temas_id, suscriptor_id, recibirpushnot, frecmsj)
	VALUES (2, 3,'true', 1);

INSERT INTO tema_sus(
	temas_id, suscriptor_id, recibirpushnot, frecmsj)
	VALUES (3, 4, 'true', 1);

INSERT INTO tema_sus(
	temas_id, suscriptor_id, recibirpushnot, frecmsj)
	VALUES (4, 5, 'true', 1);

INSERT INTO tema_sus(
	temas_id, suscriptor_id, recibirpushnot, frecmsj)
	VALUES (2, 5, 'true', 1);

INSERT INTO tema_sus(
	temas_id, suscriptor_id, recibirpushnot, frecmsj)
	VALUES (2, 2, 'true', 1);

INSERT INTO tema_sus(
	temas_id, suscriptor_id, recibirpushnot, frecmsj)
	VALUES (3, 2, 'false', 1);

INSERT INTO tema_sus(
	temas_id, suscriptor_id, recibirpushnot, frecmsj)
	VALUES (4, 4, 'true', 1);

INSERT INTO tema_sus(
	temas_id, suscriptor_id, recibirpushnot, frecmsj)
	VALUES (4, 2, 'true', 1);
	
-- mensajes
INSERT INTO mensajes(
	 tema_id, mensaje)
	VALUES (1, 'prueba');

INSERT INTO mensajes(
	 tema_id, mensaje)
	VALUES (2, 'Bienvenido al tema');

INSERT INTO mensajes(
	 tema_id, mensaje)
	VALUES (3, 'dato x');

INSERT INTO mensajes(
	 tema_id, mensaje)
	VALUES (4, 'Minuta de la junta');

INSERT INTO mensajes(
	 tema_id, mensaje)
	VALUES (3, 'dato y');

INSERT INTO mensajes(
	 tema_id, mensaje)
	VALUES (3, 'dato z');

INSERT INTO mensajes(
	 tema_id, mensaje)
	VALUES (1, 'inicio de convencion en marzo');

INSERT INTO mensajes(
	 tema_id, mensaje)
	VALUES (2, 'mensaje mediano de prueba');

INSERT INTO mensajes(
	 tema_id, mensaje)
	VALUES (2, 'este es un mensaje de mayor tamaño para pruebas en la base');

INSERT INTO mensajes(
	 tema_id, mensaje)
	VALUES (4, 'nueva junta el viernes');

Select * from mensajes
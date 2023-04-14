INSERT INTO public.administrador(
	id, name)
	VALUES (101, 'admin1');
	
INSERT INTO public.administrador(
	id, name)
	VALUES (102, 'admin2');
	
--temas
INSERT INTO public.temas(
	id, admin_id, titulo, descripcion, accessomensajesprev, cod, fechacreacion)
	VALUES (301, 101, 'Convencion Comics 23', 'DESC Convencion Comics 23', 'false', 'cc23', '01-02-2023');
	
INSERT INTO public.temas(
	id, admin_id, titulo, descripcion, accessomensajesprev, cod, fechacreacion)
	VALUES (302, 101, 'Feria del libro 23', 'DESC Feria del libro 23', 'false', 'fl23', '01-02-2023');
	
INSERT INTO public.temas(
	id, admin_id, titulo, descripcion, accessomensajesprev, cod, fechacreacion)
	VALUES (303, 102, 'Linea Produccion 112', 'DESC Linea Produccion 112', 'true', 'lp112', '02-20-2023');
	
INSERT INTO public.temas(
	id, admin_id, titulo, descripcion, accessomensajesprev, cod, fechacreacion)
	VALUES (304, 101, 'Junta Proyecto Inov', 'DESC Junta Proyecto Inov', 'true', 'jpi', '02-11-2023');
	
-- suscriptores
INSERT INTO public.suscriptor(
	id, name)
	VALUES (201, 'us1');
	
INSERT INTO public.suscriptor(
	id, name)
	VALUES (202, 'us2');
	
INSERT INTO public.suscriptor(
	id, name)
	VALUES (203, 'us3');
	
INSERT INTO public.suscriptor(
	id, name)
	VALUES (204, 'us4');

INSERT INTO public.suscriptor(
	id, name)
	VALUES (205, 'us5');
	
-- tema-sus

INSERT INTO public.tema_sus(
	temas_id, suscriptor_id, fechasuscripcion)
	VALUES (301, 201, '01-10-2023');

INSERT INTO public.tema_sus(
	temas_id, suscriptor_id, fechasuscripcion)
	VALUES (301, 202, '01-21-2023');

INSERT INTO public.tema_sus(
	temas_id, suscriptor_id, fechasuscripcion)
	VALUES (303, 203, '03-07-2023');

INSERT INTO public.tema_sus(
	temas_id, suscriptor_id, fechasuscripcion)
	VALUES (303, 204, '03-09-2023');

INSERT INTO public.tema_sus(
	temas_id, suscriptor_id, fechasuscripcion)
	VALUES (304, 205, '02-15-2023');

INSERT INTO public.tema_sus(
	temas_id, suscriptor_id, fechasuscripcion)
	VALUES (302, 205, '01-10-2023');

INSERT INTO public.tema_sus(
	temas_id, suscriptor_id, fechasuscripcion)
	VALUES (302, 202, '01-12-2023');

INSERT INTO public.tema_sus(
	temas_id, suscriptor_id, fechasuscripcion)
	VALUES (303, 202, '03-10-2023');

INSERT INTO public.tema_sus(
	temas_id, suscriptor_id, fechasuscripcion)
	VALUES (304, 204, '02-15-2023');

INSERT INTO public.tema_sus(
	temas_id, suscriptor_id, fechasuscripcion)
	VALUES (304, 202, '02-15-2023');
	
-- mensajes
INSERT INTO public.mensajes(
	id, tema_id, mensaje, fechaenvio)
	VALUES (1, 301, 'prueba', '01-11-2023');

INSERT INTO public.mensajes(
	id, tema_id, mensaje, fechaenvio)
	VALUES (2, 302, 'Bienvenido al tema', '01-11-2023');

INSERT INTO public.mensajes(
	id, tema_id, mensaje, fechaenvio)
	VALUES (3, 303, 'dato x', '02-21-2023');

INSERT INTO public.mensajes(
	id, tema_id, mensaje, fechaenvio)
	VALUES (4, 304, 'Minuta de la junta', '02-26-2023');

INSERT INTO public.mensajes(
	id, tema_id, mensaje, fechaenvio)
	VALUES (5, 303, 'dato y', '02-22-2023');

INSERT INTO public.mensajes(
	id, tema_id, mensaje, fechaenvio)
	VALUES (6, 303, 'dato z', '02-23-2023');

INSERT INTO public.mensajes(
	id, tema_id, mensaje, fechaenvio)
	VALUES (7, 301, 'inicio de convencion en marzo', '02-05-2023');

INSERT INTO public.mensajes(
	id, tema_id, mensaje, fechaenvio)
	VALUES (8, 302, 'mensaje mediano de prueba', '03-18-2023');

INSERT INTO public.mensajes(
	id, tema_id, mensaje, fechaenvio)
	VALUES (9, 302, 'este es un mensaje de mayor tamaño para pruebas en la base', '03-11-2023');

INSERT INTO public.mensajes(
	id, tema_id, mensaje, fechaenvio)
	VALUES (10, 304, 'nueva junta el viernes', '03-01-2023');

Select * from public.mensajes
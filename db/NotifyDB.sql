-- Database: NotifyDB

-- DROP DATABASE IF EXISTS "NotifyDB";

CREATE DATABASE "NotifyDB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
CREATE TABLE administrador (
	id int PRIMARY KEY,
	nombre text NOT NULL
)

CREATE TABLE temas (
	id int PRIMARY KEY,
	admin_id int NOT NULL,
	titulo text NOT NULL,
	descripcion text,
	accessoMensajesPrev bool NOT NULL,
	cod text NOT NULL,
	fechaCreacion date NOT NULL,
	CONSTRAINT fk_admin FOREIGN KEY(admin_id) REFERENCES administrador(id)
)

CREATE TABLE mensajes (
	id int PRIMARY KEY,
	tema_id int NOT NULL,
	mensaje text NOT NULL,
	fechaEnvio date NOT NULL,
	CONSTRAINT fk_tema FOREIGN KEY(tema_id) REFERENCES temas(id)
)

CREATE TABLE suscriptor (
	id int PRIMARY KEY,
	nombre text NOT NULL
)

CREATE TABLE tema_sus (
	temas_id int,
	suscriptor_id int,
	fechaSuscripcion date,
	PRIMARY KEY (temas_id, suscriptor_id),
  	CONSTRAINT fk_temas FOREIGN KEY(temas_id) REFERENCES temas(id),
  	CONSTRAINT fk_suscriptor FOREIGN KEY(suscriptor_id) REFERENCES suscriptor(id)
)

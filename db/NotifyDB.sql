-- Database: NotifyDB

-- DROP DATABASE IF EXISTS notifyDB;

-- CREATE DATABASE notifyDB
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'C'
--     LC_CTYPE = 'C'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     TEMPLATE = template0;

-- \c notifydb

DROP TABLE IF EXISTS usuario CASCADE;
DROP SEQUENCE IF EXISTS usuario;

CREATE TABLE usuario (
	id SERIAL PRIMARY KEY,
	nombre text NOT NULL,
	email text NOT NULL,
	is_admin BOOLEAN DEFAULT false,
	created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

DROP TABLE IF EXISTS temas CASCADE;
DROP SEQUENCE IF EXISTS temas;
CREATE TABLE temas (
	id SERIAL PRIMARY KEY,
	admin_id int NOT NULL,
	titulo text NOT NULL,
	descripcion text,
	accessoMensajesPrev BOOLEAN NOT NULL,
	cod text NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_admin FOREIGN KEY(admin_id) REFERENCES usuario(id)
);

DROP TABLE IF EXISTS mensajes CASCADE;
DROP SEQUENCE IF EXISTS mensajes;

CREATE TABLE mensajes (
	id SERIAL PRIMARY KEY,
	tema_id int NOT NULL,
	mensaje text NOT NULL,
	push_enabled BOOLEAN DEFAULT false,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_tema FOREIGN KEY(tema_id) REFERENCES temas(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS tema_sus CASCADE;
DROP SEQUENCE IF EXISTS tema_sus;

CREATE TABLE tema_sus (
	temas_id int,
	suscriptor_id int,
	recibirpushnot BOOLEAN NOT NULL,
	frecmsj int NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	PRIMARY KEY (temas_id, suscriptor_id),
  	CONSTRAINT fk_temas FOREIGN KEY(temas_id) REFERENCES temas(id) ON DELETE CASCADE,
  	CONSTRAINT fk_suscriptor FOREIGN KEY(suscriptor_id) REFERENCES usuario(id) ON DELETE CASCADE
);

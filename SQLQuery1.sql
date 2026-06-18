create database SuperNova
go

use SuperNova
go

create table TipoAlimento(
	IdTipoAlimento uniqueIdentifier primary key default ((newId())),
	Nome varchar(100) not null
);


create table Usuario(
	IdUsuario uniqueIdentifier primary key default ((newId())),
	Nome  varchar(100) not null,
	Email varchar(256) unique not null,
	Senha varchar(60) not null,
);

ALTER TABLE Usuario
ADD TipoUsuario VARCHAR(20);

create table Alimento(
	IdAlimento uniqueIdentifier primary key default ((newId())),
	Nome varchar(100) not null,
	Descricao text not null,
	Imagem varchar(255),
	Preco decimal(10, 2) not null default 0.00,
	
	IdTipoAlimento uniqueidentifier foreign key references TipoAlimento (IdTipoAlimento),
);

UPDATE Usuario
SET TipoUsuario = 'Admin'
WHERE Email = 'walyson.m.sousa@aluno.senai.br';

UPDATE Usuario
SET TipoUsuario = 'Cliente'
WHERE TipoUsuario IS NULL;

SELECT Nome, Email, TipoUsuario
FROM Usuario;
create table usuarios(
id serial not null,
usuario varchar(50) not null,
password varchar(100) not null,
nombres varchar(100) not null,
apellidos varchar(100) not null,
edad int,
sexo char,
peso real,
estatura real,
coach int,
primary key(id),
foreign key (coach)
	references usuarios(id)
);

create table registros(
id_usuario int not null,
registro timestamp not null,
tipo char not null,
medicion real not null,
primary key (id_usuario, registro),
foreign key (id_usuario)
	references usuarios(id)
);
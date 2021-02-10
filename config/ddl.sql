create table usuarios(
id serial not null unique,
usuario varchar(50) not null unique,
password varchar(100) not null,
nombres varchar(100) not null,
apellidos varchar(100) not null,
edad int,
sexo char,
peso real,
estatura real,
coach int,
primary key(id, usuario),
foreign key (coach)
	references usuarios(id)
);


drop table registros;
create table registros(
id_usuario int not null,
registro timestamp not null,
tipo char not null,
medicion real not null,
primary key (id_usuario, registro, tipo),
foreign key (id_usuario)
	references usuarios(id)
);

select * from usuarios;



(
	select * from usuarios A where usuario = 'aldoh'
)
union
(
	select B.* from usuarios A
	inner join usuarios B on A.id = B.coach
	where A.usuario = 'aldoh'
) order by coach DESC;


update usuarios set coach = 
(
	select id from usuarios A where usuario = 'aldoh'
)
where usuario = 'honaje';


select * from registros;
select * from usuarios;

--- QUERIES PARA RITMO CARDIACO
select id_usuario, registro, medicion 
from registros 
where tipo = 'C' 
and id_usuario = 3 
and registro between '2021-02-01' and '2021-02-28'
order by 2 asc;

select id_usuario, registro, medicion 
from registros 
where tipo = 'C' and id_usuario = 3
order by 2 asc;

select id_usuario, avg(medicion)
from registros 
where tipo = 'C' and id_usuario = 3
group by 1;

---QUERIES PARA TEMPERATURA
select id_usuario, registro, medicion 
from registros 
where tipo = 'T' 
and id_usuario = 3 
and registro between '2021-02-01 15:00' and '2021-02-01 15:30'
order by 2 asc;

select id_usuario, registro, medicion 
from registros 
where tipo = 'T' and id_usuario = 3
order by 2 asc;

select id_usuario, avg(medicion)
from registros 
where tipo = 'T' and id_usuario = 3
group by 1;

insert into registros 
values 
(3, '2021-02-08 15:30:27.569874', 'T', 37.2),
(3, '2021-02-07 15:45:27.569874', 'T', 38.2),
(3, '2021-02-06 15:34:27.569874', 'T', 37),
(3, '2021-02-05 15:12:27.569874', 'T', 37.5),
(3, '2021-02-04 15:36:27.569874', 'T', 37.7),
(3, '2021-02-03 15:45:27.569874', 'T', 37.9),
(3, '2021-02-02 15:02:27.569874', 'T', 37.5),
(3, '2021-02-01 15:14:27.569874', 'T', 36.4),
(3, '2021-01-29 15:36:27.569874', 'T', 36.9)
;

insert into registros 
values 
(3, '2021-02-08 15:30:27.569874', 'O', 75),
(3, '2021-02-07 15:45:27.569874', 'O', 92),
(3, '2021-02-06 15:34:27.569874', 'O', 79),
(3, '2021-02-05 15:12:27.569874', 'O', 82),
(3, '2021-02-04 15:36:27.569874', 'O', 100),
(3, '2021-02-03 15:45:27.569874', 'O', 102),
(3, '2021-02-02 15:02:27.569874', 'O', 78),
(3, '2021-02-01 15:14:27.569874', 'O', 88),
(3, '2021-01-29 15:36:27.569874', 'O', 83)
;

insert into registros 
values 
(3, '2021-02-08 15:30:27.569874', 'C', 75),
(3, '2021-02-07 15:45:27.569874', 'C', 92),
(3, '2021-02-06 15:34:27.569874', 'C', 79),
(3, '2021-02-05 15:12:27.569874', 'C', 82),
(3, '2021-02-04 15:36:27.569874', 'C', 100),
(3, '2021-02-03 15:45:27.569874', 'C', 102),
(3, '2021-02-02 15:02:27.569874', 'C', 78),
(3, '2021-02-01 15:14:27.569874', 'C', 88),
(3, '2021-01-29 15:36:27.569874', 'C', 83)
;


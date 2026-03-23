create database st_enroll_14
use st_enroll_14

create table student(
regno varchar(10) primary key,
fname varchar(10),
major char(10),
bdate datetime
)

INSERT INTO student VALUES
('111','Aman','academic','1989-11-09') ,
('112','Riya','academic','1990-05-14'),
('113','Karan','academic','1988-03-22'),
('114','Neha','academic','1991-07-30'),
('115','Arjun','academic','1989-12-18');

create table course(
course int primary key,
cname varchar(15),
dept char(20)
)
INSERT INTO course VALUES
(101, 'DBMS',        'CS'),
(102, 'OS',          'CS'),
(103, 'DataStruct',  'CS'),
(201, 'Thermo',      'MECH'),
(202, 'Dynamics',    'MECH'),
(203, 'MachineDes',  'MECH'),
(301, 'Circuits',    'ENC'),
(302, 'Signals',     'ENC');

create table textbook(
bookisbn int primary key,
title varchar(50),
publisher varchar(20),
author char(20)
)
INSERT INTO textbook VALUES
(1001, 'Database Systems','McGraw', 'Dan'),
(1002, 'Operating Systems','McGraw', 'Rama'),
(1003, 'Computer Networks','McGraw', 'Navathe'),
(1004, 'Software Engineering','Pearson', 'Pressman'),
(1005, 'Data Structures','McGraw', 'Weiss');

create table book_adaption(
course int,
sem int,
bookisbn int,
primary key(course, sem, bookisbn),
foreign key(course) references course(course) on delete cascade on update cascade,
foreign key(bookisbn) references textbook(bookisbn) on delete cascade on update cascade
)

INSERT INTO book_adaption VALUES
(101, 1, 1001),   
(102, 2, 1002),
(103, 2, 1005),   
(301, 3, 1003),   
(201, 4, 1004),
(101, 2, 1005),  
(102, 3, 1003);

create table enroll(
regno varchar(10),
course int,
sem int,
marks int,
primary key(regno, course, sem),
foreign key(course) references course(course) on delete cascade on update cascade,
foreign key(regno) references student(regno) on delete cascade on update cascade
)

INSERT INTO enroll VALUES
('111', 101, 1, 85),
('111', 102, 2, 78),
('112', 101, 1, 88),
('113', 103, 2, 82),
('114', 201, 3, 75),
('115', 301, 4, 80);


select a.bookisbn, b.course, b.cname from textbook a , course b, book_adaption c
where a.bookisbn=c.bookisbn and b.course=c.course and b.dept='CS' and b.course in 
(select course from book_adaption group by course having count(*)>=2) order by a.title 

select c.dept from course c , book_adaption b , textbook a 
where c.course = b.course and b.bookisbn = a.bookisbn group by c.dept having count(distinct b.bookisbn) >= all
(select count(distinct d.bookisbn) from course f, book_adaption d , textbook e where f.course = d.course
and d.bookisbn= e.bookisbn group by f.dept)

select distinct c.dept from course c where not exists(select bookisbn from book_adaption where course in(select course from course where dept=c.dept)
and bookisbn not in( select t.bookisbn from textbook t where t.publisher='McGraw')) 
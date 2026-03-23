create database bank_14
use bank_14

create table branch(
branch_name varchar(20) primary key,
branch_city varchar(10),
assets real )

insert into branch values('axis-karla','karkala',1000000)
insert into branch values('hdfc-udupi','udupi',2000000)
insert into branch values('sbi-karla','karkala',5000000)
insert into branch values('canara-nitte','nitte',8000000)
insert into branch values('bob-karla','karkala',3000000)

select * from branch

create table account(
accno int ,
branch_name varchar(20),
balance real 
primary key(accno),
foreign key(branch_name) references branch(branch_name) on delete cascade on update cascade
)
insert into account values(1,'axis-karla',10000),
						  (2,'axis-karla',20000),
						  (3,'hdfc-udupi',30000),
						  (4,'hdfc-udupi',35000),
						  (5,'sbi-karla',30000),
						  (6,'sbi-karla',50000),
						  (7,'canara-nitte',55000),
						  (8,'canara-nitte',57500),
						  (9,'bob-karla',65000),
						  (10,'bob-karla',45000)
select * from account

create table customer(
cname varchar(20) primary key,
c_street varchar(20),
c_city varchar(20) 
)

insert into customer values('ramesh','lane-1','nitte'),
						   ('umesh','lane-2','karkala'),
						   ('mahesh','street-5','udupi'),
						   ('aditya','lane-3','manglore')

select * from customer

create table depositer(
cname varchar(20),
accno int,
primary key(cname,accno),
foreign key(cname) references customer(cname) on delete cascade on update cascade,
foreign key(accno) references account(accno) on delete cascade on update cascade
)


create table loan(
loan_no int primary key,
branch_name varchar(20),
amount real,
foreign key(branch_name) references branch(branch_name) on delete cascade on update cascade
)

create table borrower(
cname varchar(20),
loan_no int,
primary key(cname,loan_no),
foreign key(cname) references customer(cname) on delete cascade on update cascade,
foreign key(loan_no) references loan(loan_no) on delete cascade on update cascade
)

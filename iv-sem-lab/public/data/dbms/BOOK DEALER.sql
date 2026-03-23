create database book_shop14
use book_shop14

 create table AUTHOR
(
authorid int primary key,
aname varchar(20),
city varchar(20),
country varchar(20)
)
insert into AUTHOR values(110,'Elmasri','Houston','Canada')
insert into AUTHOR values(111,'sebesta','mangalore','India')
insert into AUTHOR values(112,'Elmasri','Houston','Canada')
insert into AUTHOR values(113,'Bharath K','Bangalore','India')
insert into AUTHOR values(114,'Willy Z','California','USA')
insert into AUTHOR values(115,'Salma','Dakha','Bangladesh')

select * from AUTHOR

create table PUBLISHER
(
pubid int primary key,
pname varchar(20),
city varchar(20),
country varchar(20)
)
insert into PUBLISHER values(201,'McGRAW','mangalore','India')
insert into PUBLISHER values(202,'Pearson','Bangalore','India')
insert into PUBLISHER values(203,'GKP','Bangalore','India')
insert into PUBLISHER values(204,'MediTech','Delhi','India')
insert into PUBLISHER values(205,'Sun','Ahmadbad','India')

select * from PUBLISHER

create table CATEGORY
(
catid int primary key ,
 descript varchar(30),
)
insert into CATEGORY values(1,'All children Books')
insert into CATEGORY values(2,'Cooking Books')
insert into CATEGORY values(3,'Popular Novels')
insert into CATEGORY values(4,'Small Story Books')
insert into CATEGORY values(5,'Medical Books')

create table CATALOGUE
(
bookid int primary key,
title varchar(20),
pubid int,
authorid int ,
catid int,
yr int,
price int,
foreign key(pubid) references PUBLISHER(pubid) on
delete cascade on update cascade,
foreign key(authorid) references AUTHOR(authorid) on
delete cascade on update cascade,
foreign key(catid) references CATEGORY(catid) on
delete cascade on update cascade
)


insert into CATALOGUE values(301,'Panchatantra',201,111,1,2000,300)
insert into CATALOGUE values(302,'Vegetables',202,111,2,2000,400)
insert into CATALOGUE values(303,'Yogasana',203,112,5,2002,600)
insert into CATALOGUE values(304,'Stories of Village',204,113,4,2005,100)
insert into CATALOGUE values(305,'Triangle',205,114,3,2008,1000)
insert into CATALOGUE values(306,'Naughtiest Girl',201,110,3,2007,1500)
insert into CATALOGUE values(307,'Cookery',205,115,2,2006,100)


create table ORDER_DET
(
ordno int ,
bookid int,
qty int,
primary key (ordno,bookid),
foreign key(bookid) references CATALOGUE(bookid) on
delete cascade on update cascade,
)
insert into ORDER_DET values(1,301,10)
insert into ORDER_DET values(1,302,6)
insert into ORDER_DET values(1,307,23)
insert into ORDER_DET values(2,301,15)
insert into ORDER_DET values(2,304,11)
insert into ORDER_DET values(3,304,15)
insert into ORDER_DET values(4,301,3)
insert into ORDER_DET values(4,305,8)
insert into ORDER_DET values(5,303,20)
insert into ORDER_DET values(5,306,6)
insert into ORDER_DET values(5,305,7)

select a.authorid, a.aname from AUTHOR a , CATALOGUE c,ORDER_DET o where a.authorid= c.authorid and 
c.bookid = o.bookid group by a.authorid,a.aname having sum(qty) >= all (select sum(qty) from ORDER_DET group by bookid)

update CATALOGUE set price=price*1.1 where pubid in (select pubid from publisher where pname = 'Pearson')
select * from CATALOGUE

select bookid from ORDER_DET group by bookid having sum(qty) <= all (select sum(qty) from ORDER_DET group by bookid)

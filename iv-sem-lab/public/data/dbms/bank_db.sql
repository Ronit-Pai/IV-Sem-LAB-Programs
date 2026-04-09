create database bank_14
use bank_14
create table branch(
    bname varchar(20) primary key,
    bcity varchar(20),
    assets real
);


insert into branch values('axis-karla','karkala',1000000);
insert into branch values('sbi-karla','karkala',2000000);
insert into branch values('bob-karla','karkala',3000000);
insert into branch values('hdfc-udupi','udupi',4000000);
insert into branch values('canara-nitte','nitte',5000000);

select * from branch;


create table account(
    accno int primary key,
    bname varchar(20),
    balance real,
    foreign key(bname) references branch(bname) on delete cascade on update cascade
);


insert into account values(1,'axis-karla',10000);
insert into account values(2,'axis-karla',15000);
insert into account values(3,'sbi-karla',20000);
insert into account values(4,'sbi-karla',25000);
insert into account values(5,'bob-karla',30000);
insert into account values(6,'bob-karla',35000);
insert into account values(7,'hdfc-udupi',40000);
insert into account values(8,'canara-nitte',45000);

select * from account;


create table customer(
    cname varchar(20) primary key,
    c_street varchar(20),
    c_city varchar(20)
);


insert into customer values('ramesh','lane-1','nitte');
insert into customer values('umesh','lane-2','karkala');
insert into customer values('mahesh','street-5','udupi');
insert into customer values('aditya','lane-3','manglore');

select * from customer;

create table depositer(
    cname varchar(20),
    accno int,
    primary key(cname,accno),
    foreign key(cname) references customer(cname) on delete cascade on update cascade,
    foreign key(accno) references account(accno) on delete cascade on update cascade
);


insert into depositer values('ramesh',1);  
insert into depositer values('ramesh',2);  
insert into depositer values('ramesh',3);  
insert into depositer values('ramesh',4);  
insert into depositer values('ramesh',5);  
insert into depositer values('ramesh',6);  
insert into depositer values('umesh',7);   
insert into depositer values('umesh',8);   
insert into depositer values('umesh',1);   
insert into depositer values('mahesh',7);  
insert into depositer values('aditya',8);  



create table loan(
    loan_no int primary key,
    bname varchar(20),
    amount real,
    foreign key(bname) references branch(bname) on delete cascade on update cascade
);


insert into loan values(101,'axis-karla',50000);
insert into loan values(102,'sbi-karla',75000);
insert into loan values(103,'bob-karla',100000);
insert into loan values(104,'hdfc-udupi',125000);
insert into loan values(105,'canara-nitte',90000);

select * from loan;


create table borrower(
    cname varchar(20),
    loan_no int,
    primary key(cname,loan_no),
    foreign key(cname) references customer(cname) on delete cascade on update cascade,
    foreign key(loan_no) references loan(loan_no) on delete cascade on update cascade
);


insert into borrower values('ramesh',101);
insert into borrower values('umesh',102);
insert into borrower values('mahesh',103);
insert into borrower values('aditya',104);
insert into borrower values('ramesh',105);

select * from borrower;


select C.cname 
from customer C
where not exists(
    select B.bname 
    from branch B 
    where B.bcity = 'karkala' 
      and B.bname not in (
        select distinct A.bname 
        from account A, depositer D
        where D.accno = A.accno
          and A.bname = B.bname
          and D.cname = C.cname
        group by A.bname 
        having count(*) >= 2
      )
);


select C.cname 
from customer C
where not exists(
    select distinct B.bcity 
    from branch B
    where not exists (
        select A.bname 
        from account A, depositer D
        where D.accno = A.accno
          and D.cname = C.cname 
          and A.bname in (
            select bname from branch where bcity = B.bcity
          )
    )
);


select C.cname 
from customer C
where exists(
    select count(distinct B.bname) 
    from branch B, account A, depositer D
    where A.bname = B.bname
      and D.accno = A.accno
      and B.bcity = 'karkala'
      and D.cname = C.cname
    group by B.bcity 
    having count(*) >= 2
);


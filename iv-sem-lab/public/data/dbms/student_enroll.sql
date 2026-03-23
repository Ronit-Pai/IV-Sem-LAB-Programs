create database st_enroll

use st_enroll


create table STUDENT (
   regno  varchar(10),
   fname  char(15),
   major  char(20),
   bdate  datetime,
   primary key(regno)
)

insert into STUDENT values ('111', 'ravi',    'academic', '1989-11-09')
insert into STUDENT values ('112', 'sudha',   'academic', '1979-07-04')
insert into STUDENT values ('113', 'kumar',   'academic', '1979-01-06')
insert into STUDENT values ('114', 'raju',    'academic', '1999-10-02')
insert into STUDENT values ('115', 'hemanth', 'academic', '1988-11-04')


create table COURSE (
   course int,
   cname  varchar(15),
   dept   char(20),
   primary key(course)
)

insert into COURSE values (1, 'DBMS',          'CS')
insert into COURSE values (2, 'COMPILER',       'CS')
insert into COURSE values (3, 'JAVA',           'CS')
insert into COURSE values (4, 'SIG PROCESSING', 'ENC')
insert into COURSE values (5, 'DIGTAL CIRCUITS','ENC')
insert into COURSE values (6, 'MACHINE DESIGN', 'MECH')
insert into COURSE values (7, 'THERMODYNAMICS', 'MECH')
insert into COURSE values (8, 'AUTOCAD',        'MECH')


create table TEXTBOOK (
   bookISBN  int,
   title     varchar(50),
   publisher varchar(20),
   author    char(20),
   primary key (bookISBN)
)

insert into TEXTBOOK values (201, 'Fundamentals of DBMS',    'McGraw', 'NAVATHE')
insert into TEXTBOOK values (202, 'Database Design',          'McGraw', 'Raghu Rama')
insert into TEXTBOOK values (203, 'Compiler design',          'Pearson','Ulman')
insert into TEXTBOOK values (204, 'JAVA complete Reference',  'McGraw', 'BALAGURU')
insert into TEXTBOOK values (205, 'Signals and Fundamentals', 'McGraw', 'NITHIN')
insert into TEXTBOOK values (206, 'Machine Theory',           'McGraw', 'Ragavan')
insert into TEXTBOOK values (207, 'Thermodynamics',           'McGraw', 'Alfred')
insert into TEXTBOOK values (208, 'Circuit design',           'McGraw', 'Rajkamal')
insert into TEXTBOOK values (209, 'Electronic Circuits',      'McGraw', 'Alfred')
insert into TEXTBOOK values (210, 'Circuits Theory',          'McGraw', 'Alfred')


create table BOOK_ADAPTION (
   course  int,
   sem     int,
   bookISBN int,
   primary key(course, sem, bookISBN),
   foreign key(course)   references COURSE(course) on delete cascade on update cascade,
   foreign key(bookISBN) references TEXTBOOK(bookISBN) on delete cascade on update cascade
)

insert into BOOK_ADAPTION values (1, 5, 201)
insert into BOOK_ADAPTION values (1, 7, 202)
insert into BOOK_ADAPTION values (2, 5, 203)
insert into BOOK_ADAPTION values (2, 6, 203)
insert into BOOK_ADAPTION values (3, 7, 204)
insert into BOOK_ADAPTION values (4, 3, 205)
insert into BOOK_ADAPTION values (4, 5, 209)
insert into BOOK_ADAPTION values (5, 5, 205)
insert into BOOK_ADAPTION values (5, 6, 208)
insert into BOOK_ADAPTION values (5, 2, 210)
insert into BOOK_ADAPTION values (6, 7, 206)
insert into BOOK_ADAPTION values (7, 3, 207)
insert into BOOK_ADAPTION values (7, 3, 206)
insert into BOOK_ADAPTION values (8, 3, 207)


create table ENROLL (
   regno  varchar(10),
   course int,
   sem    int,
   marks  int,
   primary key(regno, course, sem),
   foreign key(regno)  references STUDENT(regno) on delete cascade on update cascade,
   foreign key(course) references COURSE(course) on delete cascade on update cascade
)

insert into ENROLL values (111, 1, 5, 59)
insert into ENROLL values (111, 2, 5, 70)
insert into ENROLL values (111, 3, 5, 75)
insert into ENROLL values (112, 1, 5, 49)
insert into ENROLL values (113, 2, 5, 80)
insert into ENROLL values (114, 3, 7, 79)
insert into ENROLL values (115, 4, 3, 79)

1. Produce a list of text books (include Course #, Book-ISBN, Book-title) in the alphabetical order for courses offered by th 'CS' department that use more than two books.
SELECT 
    BA.course,
    T.bookISBN,
    T.title
FROM COURSE C
JOIN BOOK_ADAPTION BA ON C.course = BA.course
JOIN TEXTBOOK T ON BA.bookISBN = T.bookISBN
WHERE C.dept = 'CS'
  AND BA.course IN (
        SELECT course
        FROM BOOK_ADAPTION
        GROUP BY course
        HAVING COUNT(DISTINCT bookISBN) > 2
  )
ORDER BY T.title;

2. List any department that has all its adopted books published by a specific publisher
SELECT C.dept
FROM COURSE C
JOIN BOOK_ADAPTION BA ON C.course = BA.course
JOIN TEXTBOOK T ON BA.bookISBN = T.bookISBN
GROUP BY C.dept
HAVING COUNT(*) = COUNT(CASE WHEN T.publisher = 'McGraw' THEN 1 END);

3. List the bookISBNs and book titles of the department that has maximum number of students
SELECT DISTINCT 
    T.bookISBN,
    T.title
FROM TEXTBOOK T
JOIN BOOK_ADAPTION BA ON T.bookISBN = BA.bookISBN
JOIN COURSE C ON BA.course = C.course
WHERE C.dept = (
    SELECT TOP 1 C1.dept
    FROM COURSE C1
    JOIN ENROLL E ON C1.course = E.course
    GROUP BY C1.dept
    ORDER BY COUNT(DISTINCT E.regno) DESC
);
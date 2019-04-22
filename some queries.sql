USE SUPERMARKET;

select *from employee;
select *from BRANCH;
select *from product;
select *from CUSTOMER;
select *from bill;
select *from `transaction`;
select *from trigger_log;

SELECT * FROM EMPLOYEE where email='rakesh@gmail.com';

SELECT * FROM EMPLOYEE where BRANCH_ID=1;

SELECT * FROM CUSTOMER WHERE CUSTOMER_NAME='manish';

SELECT BRANCH_NAME FROM EMPLOYEE,BRANCH WHERE EMPLOYEE.BRANCH_ID=BRANCH.BRANCH_ID AND EMPLOYEE.EMP_ID=2;

-- Gets details of transactions of with each product in a row
SELECT T.TID,T.PID,P.PRODUCT_NAME,C.CUSTOMER_ID,CUSTOMER_NAME,C.PH_NO,T.QUANTITY FROM 
(`TRANSACTION` AS T,BILL AS B,CUSTOMER AS C, PRODUCT AS P) 
WHERE T.TID=B.TID AND 
B.CUSTOMER_ID=C.CUSTOMER_ID AND 
T.PID=P.PRODUCT_ID AND 
EXISTS (SELECT * FROM EMPLOYEE AS E WHERE E.EMP_ID=B.EMP_ID AND E.BRANCH_ID=2);


SELECT BRANCH_NAME FROM EMPLOYEE,BRANCH WHERE EMPLOYEE.BRANCH_ID=BRANCH.BRANCH_ID AND EMPLOYEE.EMP_ID=2;



create table trigger_log(id int(10) auto_increment primary key, trigger_type varchar(20), tablename varchar(20));

drop trigger if exists addcus;
delimiter //
create trigger addcus before insert on customer
for each row
begin
	insert into trigger_log(trigger_type,tablename) values('insert','customer');
end;//
delimiter ;

drop trigger if exists addbill;
delimiter //
create trigger addbill before insert on bill
for each row
begin
	insert into trigger_log(trigger_type,tablename) values('insert','bill');
    select 'hello';
end;//
delimiter ;

drop procedure if exists getTotalSales;
delimiter //
create procedure getTotalSales(OUT tot int)
begin
	select sum(amount) into tot from bill;
end//
delimiter ;

drop procedure if exists getAvSal;
delimiter //
create  procedure getAvSal(OUT avsal int)
begin
	select avg(salary) into avsal from employee;
end//
delimiter ;

drop function if exists getAvSal;
delimiter //
create  procedure getAvSal(OUT avsal int)
begin
	select avg(salary) into avsal from employee;
end//
delimiter ;

CALL simpleproc(@a);


CREATE TABLE SALESREP(PRODUCT_ID INT(10) PRIMARY KEY, PRODUCT_NAME VARCHAR(20), QUANTITY_SOLD INT, AMOUNT INT);

drop procedure if exists gensales;
delimiter //
create  procedure gensales(IN SALESDATE DATE)

begin
	declare	tamount INT;
	 select 'SALES OF EACH PRODUCT';
     SELECT DER.TID,DER.PID,DER.PRODUCT_NAME,DER.Q AS QUANTITY_SALED,DER.PR AS AMOUNT FROM (SELECT T.TID AS TID,T.PID,P.PRODUCT_NAME,SUM(T.QUANTITY) AS Q,p.price*sum(t.quantity) AS PR 
     FROM `transaction` AS T,PRODUCT AS P WHERE T.PID=P.PRODUCT_ID GROUP BY T.PID) AS DER, BILL AS B WHERE B.TID=DER.TID 
     AND DATE(DATETIME)=SALESDATE;
     
     select 'SALES BY EACH EMPLOYEE';
     SELECT E.EMP_ID,FIRST_NAME,LAST_NAME,SUM(AMOUNT) AS SALES FROM EMPLOYEE AS E,BILL AS B WHERE E.EMP_ID=B.EMP_ID group by E.EMP_ID;
     
     SELECT SUM(AMOUNT) INTO tamount FROM BILL;
     
     SELECT 'total revenue for the day =' as '',tamount as '';
end//
delimiter ;



CALL gensales(DATE('2019-04-22'));
    
SELECT T.PID,P.PRODUCT_NAME,SUM(T.QUANTITY),p.price*sum(t.quantity) FROM `transaction` AS T,PRODUCT AS P WHERE T.PID=P.PRODUCT_ID GROUP BY T.PID;

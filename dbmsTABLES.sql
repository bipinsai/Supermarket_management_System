CREATE DATABASE /*!32312 IF NOT EXISTS*/`SuperMarket` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `SuperMarket`;

 ALTER TABLE EMPLOYEE DROP FOREIGN KEY FK_BRANCH_ID;
 ALTER TABLE BRANCH DROP FOREIGN KEY FK_MGR_ID;
DROP TABLE IF EXISTS `EMPLOYEE`;

CREATE TABLE `EMPLOYEE` (
    `EMP_ID` INT(6) NOT NULL auto_increment,
    `FIRST_NAME` VARCHAR(20),
    `LAST_NAME` VARCHAR(20),
    `EMAIL` VARCHAR(30) NOT NULL,
    `PASSWORD` VARCHAR(20) NOT NULL,
    `STREET` VARCHAR(30) NOT NULL,
    `CITY` VARCHAR(30) NOT NULL,
    `STATE` VARCHAR(30) DEFAULT NULL,
    `PH_NO` VARCHAR(10) NOT NULL,
    `BRANCH_ID` INT(6) NOT NULL,
    `JOB_TITLE` VARCHAR(20) NOT NULL,
    `SALARY` INT(10) NOT NULL,
    PRIMARY KEY(`EMP_ID`)
    -- FOREIGN KEY (`BRANCH_ID`) REFERENCES `BRANCH`(`BRANCH_ID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;     

INSERT INTO EMPLOYEE(`FIRST_NAME`,`LAST_NAME`,`EMAIL`,`PASSWORD`,`STREET`,`CITY`,`STATE`,`PH_NO`,`BRANCH_ID`,`JOB_TITLE`,`SALARY`) VALUES
					('Rohith','Saranga','saranga.rohith@gmail.com','203rohith','Dilsukhnagar','Hyderabad','Telangana','7730866022',1,'MANAGER',50000),
                    ('Rakesh','Kumar','rakesh@gmail.com','qwerty','Secunderabad','Hyderabad','Telangana','7712345678',2,'MANAGER',50000),
                    ('Nikhil','-','nikhil@gmail.com','qwerty','Kothapet','Hyderabad','Telangana','1111111111',1,'BILLER',10000),
                    ('Swathi','-','swathi@gmail.com','qwerty','Secunderabad','Hyderabad','Telangana','2222222222',2,'BILLER',10000),
                    ('Vishal','Kumar','vishal@gmail.com','qwerty','LB Nagar','Hyderabad','Telangana','3333333333',1,'BILLER',10000),
                    ('Rajesh','Koothrapalli','rajesh@gmail.com','qwerty','Amberpet','Hyderabad','Telangana','4444444444',2,'BILLER',10000);
                    
-- ALTER TABLE BRANCH DROP FOREIGN KEY FK_MGR_ID;
DROP TABLE IF EXISTS `BRANCH`;

CREATE TABLE `BRANCH` (
    `BRANCH_ID` INT(6) NOT NULL auto_increment,
    `BRANCH_NAME` VARCHAR(30) NOT NULL,
    `STREET` VARCHAR(30) NOT NULL,
    `CITY` VARCHAR(30) NOT NULL,
    `STATE` VARCHAR(30) DEFAULT NULL,
    `MGR_ID` INT(6) NOT NULL,
    PRIMARY KEY(`BRANCH_ID`)
    -- FOREIGN KEY (`MGR_ID`) REFERENCES  `EMPLOYEE`(`EMP_ID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO BRANCH(`BRANCH_NAME`,`STREET`,`CITY`,`STATE`,`MGR_ID`) VALUES
					('DILSUKHNAGAR BRANCH','Dilsukhnagar','Hyderabad','Telangana',1),
                    ('Secunderabad BRANCH','Secunderabad','Hyderabad','Telangana',2);

DROP TABLE IF EXISTS `PRODUCT`;

CREATE TABLE `PRODUCT` (
    `PRODUCT_ID` INT(10) NOT NULL auto_increment,
    `PRODUCT_NAME` VARCHAR(50) NOT NULL,
    `QUANTITY` INT(10) NOT NULL,
    `BRAND` VARCHAR(50) NOT NULL,
    `PRICE` INT(10) NOT NULL,
    `WEIGHT` INT(10) NOT NULL,
    `BRANCH_ID` INT(10) NOT NULL,
    PRIMARY KEY(`PRODUCT_ID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;   


insert into `PRODUCT`(`PRODUCT_NAME`,`PRICE`,`BRAND`,`WEIGHT`,`QUANTITY`,`BRANCH_ID`) values 
('maggi noodles',25,'nestle',50,1500,1),
('kurkure',15,'HUL',20,1501,1),
('jersey milkshake',32,'JERSEY',25,1500,1),
('hersheys syrup',41,'HERSHEYS',35,1503,1),
('fevicol',25,'HUL',10,1500,1),
('cintol soap',22,'CINTHOL',50,1502,1),
('brittania cake',16,'BRITTANIA',60,1503,1),
('vicks vaporub',44,'VICKS',50,1504,1),
('oreo cookies',17,'CADBURY',30,1502,1),
('lays',53,'PARLE',20,1500,1),
('milton steel',12,'MILTON',1000,1503,1),
('classmate pens',43,'CLASSMATE',10,1504,1),
('colgate tooth paste',54,'COLGATE',100,1503,1),
('tang',27,'TANG',75,1501,1),
('parachute oil',19,'UNILEVER',65,1503,1),
('5 star',21,'CADBURY',20,1501,1),
('haldirams',33,'HALDIRAMS',30,1504,1),
('dairy milk silk',14,'DAIRY MILK',75,1500,1),
('nivia soft',26,'NIVIA',300,1503,1),
('lays',53,'PARLE',20,1500,2),
('fogg perfume',37,'FOGG',250,1501,2),
('5 star',21,'CADBURY',20,1501,2),
('oreo cookies',17,'CADBURY',30,1502,2),
('brittania cake',16,'BRITTANIA',60,1503,2),
('nivia soft',26,'NIVIA',300,1503,2);


DROP TABLE IF EXISTS `CUSTOMER`;

CREATE TABLE `CUSTOMER` (
    `CUSTOMER_ID` INT(6) NOT NULL auto_increment,
    `CUSTOMER_NAME` VARCHAR(50) NOT NULL,
    `PH_NO` VARCHAR(10) NOT NULL,
    PRIMARY KEY(`CUSTOMER_ID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `TRANSACTION`;

CREATE TABLE `TRANSACTION` (
    `TID` INT(10) NOT NULL,
    `PID` INT(10) NOT NULL,
    `QUANTITY` INT(10) NOT NULL,
    PRIMARY KEY(`TID`,`PID`)
    -- FOREIGN KEY(`PID`) REFERENCES `PRODUCT`(`PRODUCT_ID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `BILL`;

CREATE TABLE `BILL` (
    `TID` INT(10) NOT NULL,
    `EMP_ID` INT(6) NOT NULL,
    `CUSTOMER_ID` INT(6) NOT NULL,
    `AMOUNT` VARCHAR(10) NOT NULL,
    `DATETIME` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, /* FOR ONLY DATE `DATE` DATE NOT NULL*/
    PRIMARY KEY(`TID`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;  


ALTER TABLE EMPLOYEE ADD CONSTRAINT FK_BRANCH_ID FOREIGN KEY (`BRANCH_ID`) REFERENCES `BRANCH`(`BRANCH_ID`);

ALTER TABLE BRANCH ADD CONSTRAINT FK_MGR_ID FOREIGN KEY (`MGR_ID`) REFERENCES  `EMPLOYEE`(`EMP_ID`);

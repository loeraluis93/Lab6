-- Creating Users
DROP DATABASE iF EXISTS USERS_LAB5;
CREATE DATABASE USERS_LAB5;
USE USERS_LAB5;

CREATE TABLE Users (
	fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    passwrd VARCHAR(50) NOT NULL,
    mail VARCHAR(50) NOT NULL,
    gender VARCHAR(50) NOT NULL,
  	country VARCHAR(50) NOT NULL 
);

INSERT INTO Users(fName, lName, username, passwrd, mail, gender, country)
VALUES  ('Thomas', 'Omaley', 'thomas1961', '1961thomas','thoom1961@jourrapide.com', 'Male', 'Chile'),
		('Daniel','Vinick','daniel1952', '1952daniel','dinvis1952@teleworm.us','Male','U.S.A'),
		('Sara','Pattick','saps1963','1963saps','saps1963@einrot.com','Female','Japan'),
		('Oscar','Tunksten','TheOscar','1936osts','osts1936@fleckens.hu','Male','Hungary'),
		('Tobias','Notradame','tobias1972','1972tobias','turnot1972@rhyta.com','Male','Belgium');
--User coments
CREATE TABLE User_Comments (
    username VARCHAR(50) NOT NULL ,
    fecha DATETIME NOT NULL,
    comment VARCHAR(200) NOT NULL, 
    primary key (username, fecha),
	);

INSERT INTO User_Comments(username, fecha, comment)
VALUES  ( 'thomas1961','2000-01-01 00:00:00','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua [...]'),
		( 'saps1963', '2000-01-01 00:00:00','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua [...]'),
		('TheOscar','2000-01-01 00:00:00','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua [...]'),
		('daniel1952','2000-01-01 00:00:00','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua [...]'),
		('tobias1972','2000-01-01 00:00:00','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua [...]');



--Friendships
CREATE TABLE Friendships2 (
    username VARCHAR(50) NOT NULL ,
    is_friend_of VARCHAR(50) NOT NULL ,
    status VARCHAR(20) NOT NULL 
);

INSERT INTO Friendships(username, is_friend_of, status)
VALUES  ( 'thomas1961','saps1963','Accepted'),
		( 'thomas1961', 'TheOscar','Accepted'),
		('thomas1961','daniel1952','Accepted'),
		('thomas1961','tobias1972','Accepted'),

		( 'saps1963', 'TheOscar','Accepted'),
		('saps1963','daniel1952','Accepted'),
		('saps1963','tobias1972','Accepted'),

		('TheOscar','daniel1952','Accepted'),
		('TheOscar','tobias1972','Accepted'),
        
		('daniel1952','tobias1972','Accepted'),
        ('daniel1952','TheOscar','Accepted'),
        ('daniel1952','saps1963','Accepted');

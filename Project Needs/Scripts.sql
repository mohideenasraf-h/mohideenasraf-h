if(not exists (select 1 from sys.databases where name ='AsrafTestDB'))
begin
	create database AsrafTestDB;
end

use AsrafTestDB;

if(not exists (select 1 from sys.tables where name ='Contact'))
begin
	CREATE TABLE Contact (
	  contact_id int identity(1,1), 
	  FirstName VARCHAR(75),
	  LastName VARCHAR(75),
	  Email VARCHAR(100),
	  PhoneNumber VARCHAR(20),
	  [Address] VARCHAR(500),
	  City VARCHAR(75),
	  [State] VARCHAR(75),
	  Country VARCHAR(75),
	  PostalCode VARCHAR(20),
	  RecordStatus varchar(20),
	  CreatedDate datetime,
	  ModifiedDate datetime,
	  constraint pk_contact primary key(contact_id)
	);
end

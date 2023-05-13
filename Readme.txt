*********************************************************
Angular with .NET CORE combined Application
*********************************************************

Here i have created the angular application inside of the Web API .Net Core Application.
So whenever we run the .NET core application angular app will build along with that and serve automatically.

This document provides comprehensive details and instructions for this project. 
To successfully run the application, please read through the entire document carefully.


Steps To Run the Application:

Database Scripts: (SQL Server Management Studio	15.0.18386.0)

1. In this project i have used this 
	(SQL Server Management Studio 15.0.18386.0) (SQL Server Management Objects (SMO)	16.100.46437.65) Version.
2. Please find the scripts file under the "Project Needs" Folder. --> "Project Needs/Scripts.sql"
3. Run the Script in SQL
4. Ensure the scripts run without any error.


Web API and Angular 14:

Please ensure that the all the applications are installed and version is same on the system where you are going to run this project unless it will not run properly.

Please install necessary packages that given below.

Version: 
	.NET SDK 5.0.408
	.NET Core Runtime: 5.0.17
	.NET Core WEB API: 5
	Angular: 14.3.0
	Angular CLI: 14.2.11
	Node JS: 14.17.5.0
	NPM: 6.14.14
info : I have used to develop this application in VSCode IDE.

Run the APP through VSCode by right click the "ContactApp" Inside of the Project Folder and click open with VSCode. "Project/ContactApp".

1. Change the connection string with your's in "appsettings.Development.json" located at root folder.
	"Project/ContactApp/appsettings.Development.json" named as "con".
2. Change the connection string with your's in "appsettings.Production.json" located at root folder.
	"Project/ContactApp/appsettings.Production.json" named as "con".
	This will only necessary for when you make a publish build.
3. Now "Open integrated Terminal" that should points your dotnet root folder.
4. Type this command "dotnet restore". Once this done, then move to the next step.
5. You may notice that "ClientApp" Folder inside of "ContactApp" folder.
	That folder have our angular application.
6. Right click on the "ClientApp" folder and click "Open in Integrated Terminal" in VSCode.
7. Make sure the terminal path pointing that "ClientApp" Folder.
8. Now type the command "npm install" to install all nodemodules and it's necessary packages.
	What for a while it will take few minutes to complete. 
9. After that, type "ng b" to build the angular app. once it's complete without any error, there we go.
10. Once all the above steps were complete, then press F5 or in menu "Run -> Start Debugging" to run the project.



Implemented: 
	In this application, I have implemented Contact List Page to show the created contacts.
	Create page for create a new contacts, View the existing Contact and Update the existing Contact.
	
	Additionally, I have implemented user notification to show message, UI Error validation, and second level error validation in Middle-ware.
	
	I have attached the project UI screen shots for your reference. would be appreciated to spare some time and take a look for better ideo of our app.
	
	I haven't integrated Maps into my project because Google has recently switched to a paid version of its Google Maps API. Whenever I tried to activate my API, it redirects me to the billing system.
	
	Besides this, I believe that I have accomplished the majority of the tasks that were specified in the requirements document.
	
	Please don't hesitate to contact me if you require any additional assistance with running this project.
	





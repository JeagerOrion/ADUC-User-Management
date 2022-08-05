Active Directory User Creation Tool

A nodejs/Express website that puts Microsoft Active Directory Users and Computers (ADUC) account creation on rails for departments like Human Resources. 

What can it do? 

Create ADUC user accounts
Disable ADUC user accounts 

How? 

https://www.npmjs.com/package/ad and LDAP. 

The site creates objects from user imput and template user accounts and sends them to your Domain Controller via LDAP. 

Is that it? 

Basically, yes.
If you want email notifications you will need to set up nodemailer with your choice of SMTP or other provider. The current controller files are set up for a local SMTP server to send email whenever an account is created or disabled. Logging is handled with log4js and is broken down into security, accounts, and error log files.  

Any caviats? 

Absolutely. This being the first thing I've actually developed from scratch, there are definitely things that could be done more efficiently. I had some trouble with LDAP in the beginnging, so there are likely unused npm packages that I failed to uninstall. The app is curretnly using three different npm packages to perform similar LDAP functions. Ldapjs continuously times out and reconnects, but catching it and console.logging it is good enough for my use case. 

There certianly could be improvements, but I'll be moving on to other projects for the time being to build more development skills, as I'd like to get paid to do this one of these days. 

Sounds tolerable. I want it. How do I make this work for me? 

Because every Active Directory environment is different and people generally don't like sharing their Domain Controller configuration on the internet, there is a good amount of setup that you'll need to do. Your local .env file should do a lot of the heavy lifting, but some js files will need to be directly edited to work with your instance of ADUC. 

You will need: 
A Domain Controller with ADUC accepting LDAP or LDAPS connections
A user account authorized to bind LDAP connections
NodeJS for whatever server you're running this on
Template accounts in ADUC for this app to copy from

---Optional---
For notification emails:
An SMTP server (or other provider/nodemailer solution) linked to whatever email account is sending out emails

Fill out the .blankenv and rename it .env

In public/js/populateMenus.js replace the "mainOfficeJobs" and "regionalOfficeJobs" with value/text depending on how your ADUC is structured. 
Value will be the sAMAccount name of the template user account for that job.
text will be what the site user sees in the drop down menu for that job title. 
For the configureJobTitleMenu function, replace the "Main Office" "Regional Office One" etc with your ADUC Organizational Units. The controllers/create.js file is going to sort the user into an OU based on this string. If you only have one "Staff" OU then you'll probably want to either ditch the dropdowns or change the logic in controllers/create.js.

In views/create/create.ejsChange the values for the select lists to match what you have in public/js/populateMenus.js.

The app is styled with Bootstrap 5, so feel free to change the element classes around or ditch it and use your own. Style and brand away. 

I may be failing to mention some logic that needs changed/updated for the app to function for you. If someone out there does wind up trying this and has trouble, feel free to reach out. 
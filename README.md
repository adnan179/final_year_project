###Web portal for projects for GITAM university
##Tech stack:
1)Front-end: React JS
2)Back-end:Node Js, Express
3)Database: MongoDB, Firebase

##Dependancies:
Axios,React-hot-toast,react-router-dom,mongoose,body-parser,cors,firebase,jsonwebtoken,buffer,dotenv,multer,multer-firebase-storage

##Description:
A web portal to handle the projects process for final year students in GITAM university. The portal has three types of roles: 1.Admin, 2.Reviewer,3.users(students and guides). Each project has it's own firebase folder to store their documents.
#Admin Features:
1)Admin can create and delete projects from the database.
2)Admin can assign projects to reviewers according to their domain interests using the assign project form. 
3)Admins can send announcements to the users and reviewers on upcoming events,reviews and any important info regarding projects.
4)They can check on documents uploaded by the users of a project.
5)They can view the feedbacks given to project by their reviewers.

#Reviewer Features:
1)Reviewers can view all projects and their details.
2)They can grade the projects which are assigned them.
3)They can check on documents uploaded by the users of a project.
4)They can view the feedbacks given to project by their reviewers.
5)They can give feedbacks for the assigned projects.

#users Features:
1)Each user has their own dashboard where they can see who their guide is, who their reviewer is,upcoming review dates, files uploaded by their teamates and guide.
2)They can check their grades and feedback provided by the assigned reviewer.
3)They can check the announcements send by the admin to them.


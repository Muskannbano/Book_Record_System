## Book Record Management System

This is a book record management API Backend Application.

## Routes and Endpoints

There can be two endpoints:- Users and Books

### /users
POST: Create a New User
GET: Get all lists of users

### /users{id}
GET: Get a user by their Id
PUT: Update a user by Id
DELETE: Delete a user by Id(chck if he/she still have an issued book) && (is there any fine to be collected from the students)

### /users/subscription-details/{id}
GET: Get users subscription in details
1. Date of subscription
2. Valid till date
3. Fine if any

### /books
GET: Get all the books
POST: Create/Add a new book

### /books/{id}
GET: Get a book by id
PUT: Update a book by its Id

### /books/issued
GET: Get all the issued books

### /books/issued/withFine
GET: Get all the issued books with fine

### Subscription Types:
    >> Basic (3 months)
    >> Standard (6 months)
    >> Premium (12 months)

### Commands
    >> npm init
    >> npm i express
    >> npm i nodemon --save-dev
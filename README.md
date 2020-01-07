# DIGITAL CLASS

## [ Check out the deployed version on Firebase here! ](https://digital-class-app-2019.firebaseapp.com/)

## What this project is about

This is my own attempt to build a full stack React app for 4 days.

## Table of contents:

- **[Technologies used](#technologies-used)**
- **[Features](#features)**
- **[Installation](#installation)**

## Technologies used

#### 👀👇 Click links to view some samples in this project 👇👀

- **[react](./src/components/Batch.js)**
- **[redux](./src/reducers/students.js)**
- **[redux-thunk](./src/actions/students.js)**
- **[SASS](./src/sass/pages/_batch.scss)**

## Features

As a guess (without signup):

- You can sign up with your email and password
- You can see a list of classes, identified with class number, start date and end date (ie: Class 1)
- You can see a list of students in each class and the teachers' evaluations on their test results
- You can also see the progress of each class based on their last performance

As a teacher (account required)

- You can log in and log out with your account
- You can create a new class and delete a class
- You can add, edit and remove students in a class
- For each student, you can add evaluations to their performace of the tests, with RED equal to FAILED, YELLOW equal to PASSES, and GREEN equal to GOOD JOB.
- YOu can choose to ask students questions based only on their LATEST performance: students with RED will have 50% of chances, while those with YELLOW and GREEN card will get 33% and 17% respectively.

# Installation

1. First, make sure to set up the backend [Server](https://github.com/dung-phan/digital-class-server)

2. Git clone the [Front-end](https://github.com/dung-phan/digital-class-frontend)
   ```
   $ git clone
   $ cd ./digital-class-frontend
   $ npm install
   ```
3. Go to _constants.js_ and change the url to your local server.

4. Run the app:
   ```
   $ npm run start
   ```

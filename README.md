# DIGITAL CLASS

## [ Check out the deployed version on Firebase here! ](https://digital-class-app-2019.firebaseapp.com/)

## What this project is about

This is my own attempt to build a full stack React app for 4 days.
Note: For the purpose of demonstration, the authentication and validation from users have been removed (codes been commented out)

## Table of contents:

- **[Technologies used](#technologies-used)**
- **[Features](#features)**
- **[Installation](#installation)**

## Technologies used

#### 👀👇 Click links to view some samples in this project 👇👀

- **[react](./src/components/EvaluationPage.js)**
- **[redux](./src/reducers/evaluations.js)**
- **[redux-thunk](./src/actions/students.js)**
- **[Semantic UI](./src/components/SignUp.js)**

## Features

As a teacher:

- You can sign up with your email and password
- After signing in, you can see a list of classes, identified with class number, start date and end date (ie: Class #1)
- You can create a new class
- You can add, edit and remove students in a class
- When clicking on a class, you can see a list of students and the progress of that class (based on their last performance)
- For each student, you can add evaluations to their performace of the tests, with RED equal to FAILED, YELLOW equal to PASSES, and GREEN equal to GOOD JOB.
- You can only fill in one evaluation per day.
- YOu can choose to ask students questions, based on an algorithm calculation (based on their latest performance): students with RED will have 50% of chances, while those with YELLOW and GREEN card will get 33% and 17% respectively.

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

[![Netlify Status](https://api.netlify.com/api/v1/badges/8a91c235-7004-403c-9efb-2a3bc9065c70/deploy-status)](https://app.netlify.com/sites/dog-quiz/deploys)

# DIGITAL CLASS

## [ Check out the deployed version here! ](https://dog-quiz.netlify.com)

## What this project is about

This is my own attempt during 4 days to build a full stack React app.

## Table of contents:

- **[Technologies used](#technologies-used)**
- **[Features](#features)**
- **[create-react-app-docs](#create-react-app)**

## Technologies used

#### 👀👇 Click links to view some samples in this project 👇👀

- **[react](./src/components/EvaluationPage.js)**
- **[redux](./src/reducers/evaluations.js)**
- **[redux-thunk](./src/actions/students.js)**

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

## Create React App

This project was scaffolded using the create-react-app cli.

**[The standard create-react-app docs can be found in here](./create-react-app-docs.md)**

![alt text](./src/static/mugove_logo_doc.png)

# [WIP] Mugove Grading

![](https://img.shields.io/badge/version-1.0-blue)

## What it is

A Progressive Web Application(PWA) which works entrirely offline as a smart calculator helping teachers to analyze their students' performance on a graded exercise.
Teachers can be able to see information such as that to do with the performance on each and every topic that was included in the given exercise.

## Why

It is difficult and time consuming for teachers to manually grade students and then analyze their overall and individual performance using their scores.

## How

Teachers have to follow a few steps below when using the application

```
1️⃣Add a class
2️⃣Add students taking that class
3️⃣Add a syllabus for that class
4️⃣Add an exercise to be graded
5️⃣Add a grading scheme for that exercise
6️⃣Grade each and every student in the class
```


>Below is the information on the software development purpose and process of Mugove grading.
Pull requests are welcome

## Software Development Purpose 
- To learn the concepts of Object Oriented Design, and Analysis practically.

## Software Development Process

1. Requirements Gathering and Analysis

### Problem Statement
Godwin Dondo, our client, approached us with an application idea. He wants to use his mobile phone to grade his students and see the performance breakdown of his students’ scores on each question and topic included in every class practice exercise.

### Feature List

Godwin will be able to use the application to do the following:

1. Keep a record of the students taking classes with him
2. Keep a record of the scores of the students for all the subjects he is teaching
3. Show an analysis of the scores of everyone for all the subjects
4. Download the scores in PDF format

### Use case
> Actor -> Godwin, Goal -> to have a breakdown of scores for an exercise

Below are the use case steps, where the main step is numbered, and the  alternative step is a bullet point.

1. Godwin selectes a class from the home page of the applciation.
    *  Godwin creates a new class and save it to the Database
2. Godwin add a syllabus and deatails of students enrolled in the class.
    * Godwin selects already existing syllabus or student record to make corrections
3. Godwin creates a record for a new exercise.
    * Godwin selects an already existing exercise 
4. Godwin adds a new grading scheme to the selected exercise.
    * Godwin select an already existing grading scheme
5. Godwin starts grading the students one at a time until the last one
    * Godwin only wants to grade one student, maybe to make a correction on the student's score
6. Grading scores data is saved and Godwin can see the overall scores for all the students and also the individual scores for a students.
7. Godwin can download the scores onto his mobile device

### Class Diagrams

After decomposing the problem, the class diagrams for the app were created using [draw.io](https://app.diagrams.net/)

![mugove_class_diagrams_compressed](https://user-images.githubusercontent.com/87081585/170874179-d012b273-0c39-40bb-9626-82a51b78bd6c.jpg)

### Wireframes
Wireframes were also done using [draw.io](https://app.diagrams.net/)

![mugove_grading_wireframes](https://user-images.githubusercontent.com/87081585/170874190-bf522c4e-ea12-4287-bb59-f83b014de975.jpg)

### [WIP] UI Design
Adobe XD was ued to desing the UI.


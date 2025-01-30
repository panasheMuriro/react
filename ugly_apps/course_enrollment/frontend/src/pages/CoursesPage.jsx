import { useEffect, useState } from "react";
import { createCourse, getCourses } from "../api/courseApi";

const courses = [
  {
    name: "Mathematics",
    description: "Fundamental math concepts and problem-solving techniques.",
  },
  {
    name: "Physics",
    description: "Introduction to mechanics, electricity, and magnetism.",
  },
  {
    name: "Chemistry",
    description:
      "Basic principles of chemistry, including reactions and compounds.",
  },
  {
    name: "Biology",
    description: "Study of living organisms, genetics, and ecosystems.",
  },
  {
    name: "Computer Science",
    description:
      "Fundamentals of programming, algorithms, and data structures.",
  },
  {
    name: "English Literature",
    description: "Exploration of classic and modern literary works.",
  },
  {
    name: "History",
    description: "Overview of major historical events and civilizations.",
  },
  {
    name: "Psychology",
    description: "Understanding human behavior and mental processes.",
  },
  {
    name: "Economics",
    description: "Principles of supply, demand, and financial markets.",
  },
  {
    name: "Philosophy",
    description: "Introduction to philosophical thought and reasoning.",
  },
  {
    name: "Art",
    description: "Creative techniques in painting, drawing, and sculpture.",
  },
  {
    name: "Music",
    description: "Basic music theory, composition, and instrument practice.",
  },
  {
    name: "Sociology",
    description: "Study of society, culture, and social interactions.",
  },
  {
    name: "Environmental Science",
    description: "Impact of human activities on the environment.",
  },
  {
    name: "Political Science",
    description:
      "Government structures, policies, and international relations.",
  },
];

async function CoursesPage() {
  const data = await getCourses();
  //   console.log(courses);

  const [courses, setCourses] = useState([]);

  // const

  useEffect(() => {
    setCourses(data.data);
  }, []);
  //   useEffect(() => {
  //     courses.map((course) => {
  //       createCourse(course.name, course.description).then((x) => {
  //         console.log("creataed");
  //       });
  //     });
  //   }, []);

  // get all the courses from the db
  return (
    <div>
      <h2>All Courses</h2>
      {/* all courses */}

      {courses &&
        courses.map((index, x) => (
          <div key={index}>
            <p>{x.title}</p>
            <p>{x.description}</p>
          </div>
        ))}
    </div>
  );
}

export default CoursesPage;

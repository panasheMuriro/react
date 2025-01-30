import { useNavigate } from "react-router-dom"

function MyCoursesPage() {

 const navigate =  useNavigate();
  return (
    <div>
      <h2>My Courses</h2>
      <button onClick={()=> navigate("/add-courses")}>+ Add Course</button>
    </div>
  )
}

export default MyCoursesPage
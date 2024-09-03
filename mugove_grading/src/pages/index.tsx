import React, { useEffect, useState } from 'react'
import { } from '../components/UI/Buttons/Icons'
import CardCollector from '../components/UI/Cards/CardCollector'
import { CardTypes, ExerciseTypes } from '../components/UI/Cards/CardType'
import NavHeader from '../components/UI/Nav/NavHeader'
import AddGradingScheme from '../components/UI/Pages/AddGradingScheme'
import AddStudents from '../components/UI/Pages/AddStudents'
import AddSyllabusScoreGrades from '../components/UI/Pages/AddSyllabusScoreGrades'
import AddSyllabus from '../components/UI/Pages/AddSyllabusTopics'
import GradeStudents from '../components/UI/Pages/GradeStudents'
import IndividualStudentScore from '../components/UI/Pages/IndividualStudentScore'
import OverallStudentScores from '../components/UI/Pages/OverallStudentScores'
import { HomePage, Page, Pages } from '../components/UI/Pages/Page'
import StudentClassMain from '../components/UI/Pages/StudentClassMain'
import Popup from '../components/UI/Popup'
import 'animate.css';
import AboutPage from '../components/UI/Pages/AboutPage'


export default function MainPage() {


  const [showAboutPage, setShowAboutPage] = useState(false);
  const [showSubNav, setShowSubNav] = useState(false);
  const [showSyllabusPage, setShowSyllabusPage] = useState(false);
  const [showStudentsPage, setShowStudentsPage] = useState(false);
  const [showStudentClassPage, setShowStudentClassPage] = useState(false);
  const [showGradingSchemePage, setShowGradingSchemePage] = useState(false);
  const [showScoreGradesPage, setShowScoreGradesPage] = useState(false);
  const [showGradeStudentsPage, setShowGradeStudentsPage] = useState(false);
  const [showOverallScoresPage, setShowOverallScoresPage] = useState(false);
  const [showIndividualScoresPage, setShowIndividualScoresPage] = useState(false);
  const [showEditModalTrigger, setShowEditModalTrigger] = useState(0);
  const [showExerciseEditModalTrigger, setShowExerciseEditModalTrigger] = useState(0);
  const [showDeletePopupTrigger, setShowDeletePopupTrigger] = useState(0);
  const [showExerciseDeletePopupTrigger, setShowExerciseDeletePopupTrigger] = useState(0);
  const [cardEditID, setCardEditID] = useState("");
  const [cardDeleteID, setCardDeleteID] = useState("");
  const [exerciseCardDeleteID, setExerciseCardDeleteID] = useState("");
  const [selectedStudentClassID, setSelectedStudentClassID] = useState<string>();
  const [selectedExerciseID, setSelectedExerciseID] = useState<string>();
  const [selectedStudentID, setSelectedStudentID] = useState<string>()


  const getScrollPosition = (e) => {
    let navBarPosition = document.getElementById("main_nav_header").getBoundingClientRect().top;
    setShowSubNav(false)
    if (navBarPosition < -130) {
      setShowSubNav(true)
    }
  }


  useEffect(() => {
    if (document.getElementById("main_nav_header")) {
      let navBarPosition = document.getElementById("main_nav_header").getBoundingClientRect().top;
    }
  }, [])


  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [exerciseTooltipVisible, setExerciseTooltipVisible] = useState(false);

  const handleTooltipVisibility = (e) => {
    setTooltipVisible(e)
  }

  const componentSwitched = (e) => {

    setTooltipVisible(false);
    setExerciseTooltipVisible(false)

    document.querySelector('.ant-popover').style.visibility = 'hidden'

    setTooltipVisible(false)
    if (e.target.dataset.type == CardTypes.STUDENT_CLASS && e.target.dataset.action == "Edit") {
      setCardEditID(e.target.id)
      setCardDeleteID("")
      setShowEditModalTrigger(Math.random())
    } else if (e.target.dataset.type == CardTypes.STUDENT_CLASS && e.target.dataset.action == "Delete") {
      setCardEditID("")
      setCardDeleteID(e.target.id)
      setShowDeletePopupTrigger(Math.random())
    } else if (e.target.dataset.type == CardTypes.EXERCISE && e.target.dataset.action == "Edit") {
      // target
      setCardEditID(e.target.id)
      setCardDeleteID("")
      setShowExerciseEditModalTrigger(Math.random())

    } else if (e.target.dataset.type == CardTypes.EXERCISE && e.target.dataset.action == "Delete") {
      setCardEditID("")
      setExerciseCardDeleteID(e.target.id)
      setShowExerciseDeletePopupTrigger(Math.random())
    }
    else if (showStudentClassPage) {
      if (!showGradeStudentsPage && !showOverallScoresPage) {
        setSelectedExerciseID(e.target.parentElement.id);
      }
    } else if (showGradeStudentsPage) {
    } else {
      if (!showSyllabusPage) {
        setSelectedStudentClassID(e.target.parentElement.id);
      }
    }

    let id = e.target.id
    // handle the individual student scores
    if("student_score_name"){
      let studentID = e.target.getAttribute("data-student-id")
      setSelectedStudentID(studentID)
      setShowIndividualScoresPage(true)
    }
     else if (id == Pages.ADD_SYLLABUS_PAGE) {
      setShowSyllabusPage(true);
    } else if (id == Pages.ADD_STUDENTS_PAGE) {
      setShowStudentsPage(true);
    } else if (id == Pages.STUDENT_CLASS_PAGE) {
      setShowStudentClassPage(true);
    } else if (id == Pages.ADD_GRADING_SCHEME) {
      setShowGradingSchemePage(true);
    } else if (id == Pages.ADD_SCORE_GRADES) {
      setShowScoreGradesPage(true);
    } else if (id == Pages.GRADE_STUDENTS_PAGE) {
      setShowGradeStudentsPage(true);
    } else if (id == Pages.OVERALL_SCORES_PAGE) {
      setShowOverallScoresPage(true)
    }
    document.getElementsByTagName("h1")[0].click()
  }

  const [fetchTrigger, setFetchTrigger] = useState(0);

  const onPageClosed = () => {
    // ADD ANIMATION
    console.log("clicked")


    setFetchTrigger(Math.random())

    if (showAboutPage) {
      let currentClass = document.getElementById(Pages.ABOUT_PAGE).className
      currentClass += " animate__animated animate__slideOutRight animate__faster"
      document.getElementById(Pages.ABOUT_PAGE).className = currentClass
      setTimeout(() => {
        setShowAboutPage(false)
      }, 800)
    }
    else if (showScoreGradesPage) {
      let currentClass = document.getElementById(Pages.ADD_SCORE_GRADES).className
      currentClass += " animate__animated animate__slideOutRight animate__faster"
      document.getElementById(Pages.ADD_SCORE_GRADES).className = currentClass
      if (document.getElementById(Pages.ADD_SCORE_GRADES + " subnav")) {
        document.getElementById(Pages.ADD_SCORE_GRADES + " subnav").style.display = "none"
      }
      setTimeout(() => {
        setShowScoreGradesPage(false);
      }, 800)

    }
    else if (showSyllabusPage) {
      let currentClass = document.getElementById(Pages.ADD_SYLLABUS_PAGE).className
      currentClass += " animate__animated animate__slideOutRight animate__faster"
      document.getElementById(Pages.ADD_SYLLABUS_PAGE).className = currentClass
      if (document.getElementById(Pages.ADD_SYLLABUS_PAGE + " subnav")) {
        document.getElementById(Pages.ADD_SYLLABUS_PAGE + " subnav").style.display = "none"
      }
      setTimeout(() => {
        setShowSyllabusPage(false);
      }, 800)
    }
    else if (showIndividualScoresPage) {
      let currentClass = document.getElementById(Pages.INDIVIDUAL_SCORES_PAGE).className
      currentClass += " animate__animated animate__slideOutRight animate__faster"

      document.getElementById(Pages.INDIVIDUAL_SCORES_PAGE).className = currentClass

      if (document.getElementById(Pages.INDIVIDUAL_SCORES_PAGE + " subnav")) {
        document.getElementById(Pages.INDIVIDUAL_SCORES_PAGE + " subnav").style.display = "none"
      }
      setTimeout(() => {
        setShowIndividualScoresPage(false)
      }, 800)

    }
    else if (showOverallScoresPage) {
      let currentClass = document.getElementById(Pages.OVERALL_SCORES_PAGE).className
      currentClass += " animate__animated animate__slideOutRight animate__faster"
      document.getElementById(Pages.OVERALL_SCORES_PAGE).className = currentClass
      if (document.getElementById(Pages.OVERALL_SCORES_PAGE + " subnav")) {
        document.getElementById(Pages.OVERALL_SCORES_PAGE + " subnav").style.display = "none"
      }
      setTimeout(() => {
        setShowOverallScoresPage(false);
        setShowGradeStudentsPage(false)
      }, 800)

    } else if (showStudentsPage) {
      let currentClass = document.getElementById(Pages.ADD_STUDENTS_PAGE).className
      currentClass += " animate__animated animate__slideOutRight animate__faster"
      document.getElementById(Pages.ADD_STUDENTS_PAGE).className = currentClass
      if (document.getElementById(Pages.ADD_STUDENTS_PAGE + " subnav")) {
        document.getElementById(Pages.ADD_STUDENTS_PAGE + " subnav").style.display = "none"
      }
      setTimeout(() => {
        setShowStudentsPage(false);
      }, 800)
    }
    else if (showGradingSchemePage) {
      let currentClass = document.getElementById(Pages.ADD_GRADING_SCHEME).className
      currentClass += " animate__animated animate__slideOutRight animate__faster"
      document.getElementById(Pages.ADD_GRADING_SCHEME).className = currentClass
      if (document.getElementById(Pages.ADD_GRADING_SCHEME + " subnav")) {
        document.getElementById(Pages.ADD_GRADING_SCHEME + " subnav").style.display = "none"
      }
      setTimeout(() => {
        setShowGradingSchemePage(false);
      }, 800)
    }

    else if (showGradeStudentsPage) {
      let currentClass = document.getElementById(Pages.GRADE_STUDENTS_PAGE).className
      currentClass += " animate__animated animate__slideOutRight animate__faster"
      document.getElementById(Pages.GRADE_STUDENTS_PAGE).className = currentClass
      if (document.getElementById(Pages.GRADE_STUDENTS_PAGE + " subnav")) {
        document.getElementById(Pages.GRADE_STUDENTS_PAGE + " subnav").style.display = "none"
      }
      setTimeout(() => {
        setShowGradeStudentsPage(false)
      }, 800)
    }

    else if (showStudentClassPage) {
      let currentClass = document.getElementById(Pages.STUDENT_CLASS_PAGE).className
      currentClass += " animate__animated animate__slideOutRight animate__faster"
      document.getElementById(Pages.STUDENT_CLASS_PAGE).className = currentClass
      if (document.getElementById(Pages.STUDENT_CLASS_PAGE + " subnav")) {
        document.getElementById(Pages.STUDENT_CLASS_PAGE + " subnav").style.display = "none"
      }
      setTimeout(() => {
        setShowStudentClassPage(false);
      }, 800)
    }

    setCardEditID("") // clear the card edit id
    setExerciseCardDeleteID("") // clear the card delete id 
  }


  useEffect(()=>{
    console.log(cardDeleteID)
    console.log(cardDeleteID)
  },[cardEditID, exerciseCardDeleteID])


  const handleExerciseTooltipVisibility = (e) => {
    setExerciseTooltipVisible(e)
  }


  // handle open about page
  const openAboutPage = () => {
    console.log("open about")
    setShowAboutPage(true);
  }

  

  return (
    <HomePage onScroll={getScrollPosition} id="main_page" >
      {showAboutPage && <AboutPage onClick={onPageClosed} />}
      <NavHeader title="Mugove Grading" home id="main_nav_header" showSubNav={showSubNav} onOpenAboutPage={openAboutPage} />
      <CardCollector handleTooltipVisibility={handleTooltipVisibility} tooltipVisibility={false} fetchTrigger={fetchTrigger} cards={[]} cardType={CardTypes.STUDENT_CLASS} onComponentSwitched={componentSwitched} modalVisible={showEditModalTrigger} cardEditID={cardEditID} cardDeleteID={cardDeleteID} deleteTrigger={showDeletePopupTrigger} />
      {showSyllabusPage && <AddSyllabus selectedStudentClassID={selectedStudentClassID} onClick={onPageClosed} onComponentSwitched={componentSwitched} hideForm={showScoreGradesPage} />}
      {showScoreGradesPage && <AddSyllabusScoreGrades selectedStudentClassID={selectedStudentClassID} onClick={onPageClosed} />}
      {showStudentsPage && <AddStudents selectedStudentClassID={selectedStudentClassID} onClick={onPageClosed} />}
      {showStudentClassPage && <StudentClassMain handleExerciseTooltipVisibility={handleExerciseTooltipVisibility} exerciseTooltipVisibility={exerciseTooltipVisible} selectedStudentClassID={selectedStudentClassID} onClick={onPageClosed} fetchTrigger={fetchTrigger} onComponentSwitched={componentSwitched} showExerciseEditModalTrigger={showExerciseEditModalTrigger} cardEditID={cardEditID} exerciseCardDeleteID={exerciseCardDeleteID} exerciseDeleteTrigger={showExerciseDeletePopupTrigger} cardType={CardTypes.EXERCISE} />}
      {showGradingSchemePage && <AddGradingScheme selectedStudentClassID={selectedStudentClassID} selectedExerciseID={selectedExerciseID} onClick={onPageClosed} />}
      {showGradeStudentsPage && <GradeStudents selectedStudentClassID={selectedStudentClassID} selectedExerciseID={selectedExerciseID} onClick={onPageClosed} onComponentSwitched={componentSwitched} />}
      {showOverallScoresPage && <OverallStudentScores selectedStudentClassID={selectedStudentClassID} selectedExerciseID={selectedExerciseID} onClick={onPageClosed} onComponentSwitched={componentSwitched} />}
      {showIndividualScoresPage && <IndividualStudentScore selectedStudentClassID={selectedStudentClassID} selectedExerciseID={selectedExerciseID} selectedStudentID={selectedStudentID} onClick={onPageClosed} />}
    </HomePage>
  )
}

import React, { useState } from 'react'
import { DB } from '../../../classes/Database';
import { StudentClass } from '../../../classes/StudentClasses';
import CardCollector from '../Cards/CardCollector';
import { CardTypes } from '../Cards/CardType';
import NavHeader from '../Nav/NavHeader'
import SubNav from '../Nav/SubNav';
import { Page, Pages } from './Page'

export default function StudentClassMain(props) {
  let db = new DB();
  let selectedStudentClassID = props.selectedStudentClassID;
  let studentClass: StudentClass = db.getCollection(selectedStudentClassID)
  // TODO: handle the selected class id

  const [showSubNav, setShowSubNav] = useState(false);
  const getScrollPosition = (e) => {
     
      let navBarPosition = document.getElementById(e.target.id+" nav").getBoundingClientRect().top;
      console.log("scrolling", navBarPosition)
      setShowSubNav(false)
      if (navBarPosition < -125) {
          console.log("Yess sirr")
        setShowSubNav(true)
      }
  }
  
  return (
    <>
  
    {showSubNav && <SubNav title={studentClass.getTitle()} id={Pages.STUDENT_CLASS_PAGE+" subnav"} onClick={props.onClick} />}

    <Page zIndex={2} onScroll={getScrollPosition} id={Pages.STUDENT_CLASS_PAGE}  className="animate__animated animate__fadeInRight animate__faster">
      <NavHeader title={studentClass.getTitle()} id={Pages.STUDENT_CLASS_PAGE+" nav"} showSubNav={showSubNav} onClick={props.onClick} />
      <CardCollector handleExerciseTooltipVisibility={props.handleExerciseTooltipVisibility} exerciseTooltipVisibility={props.exerciseTooltipVisibility}  fetchTrigger={props.fetchTrigger} cardType={props.cardType} id={props.selectedStudentClassID} onComponentSwitched={props.onComponentSwitched} exerciseModalVisible={props.showExerciseEditModalTrigger} cardEditID={props.cardEditID} exerciseCardDeleteID={props.exerciseCardDeleteID} exerciseDeleteTrigger={props.exerciseDeleteTrigger} />
    </Page>
    </>
  )
}

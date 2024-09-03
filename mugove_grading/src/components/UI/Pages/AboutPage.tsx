import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Colors } from '../Colors'
import { FlexColumn, FlexRow } from '../Containers'
import NavHeader from '../Nav/NavHeader'
import { Padding } from '../Padding'
import { H3, H4, P2 } from '../Typography'
import { Page, Pages } from './Page'
// import {} from "../../../images"

export default function AboutPage(props) {
  return (
      <Page zIndex={3} id={Pages.ABOUT_PAGE}  className="animate__animated animate__fadeInRight animate__faster">
        <NavHeader centered title="Mugove Grading" onClick={props.onClick}/>
        <FlexRow center>
            <div style={{backgroundColor:"white", borderRadius: 30, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"}}>
            <StaticImage height={200}  src="../../../images/mugove_logo.png" alt="logo"/>
            </div>
        </FlexRow>
        <Padding>
            <P2>
                It is difficult and time consuming to manually grade students and then analyze their overall performance compared to the whole class. 
            </P2>
            <P2>
                It is very helpful to understand how the students are performing on each and every question, 
                and also on each and every topic they attempt so that their weaknesses can be exposed, 
                and this will make helping the student much easier.
            </P2>

            <P2>
               Mugove Grading applciation is just the right tool for this. The teacher will need to do the following few steps:
            </P2>
            
            <Padding style={{backgroundColor:Colors.GREY_SECONDARY, borderRadius: 30, marginBottom: 10}}>           
            <ol >
            <li>Add a class</li>
            <li>Add students taking that class</li>
            <li>Add a syllabus for that class</li>
            <li>Add an exercise to be graded</li>
            <li>Add a grading scheme for that exercise </li>
            <li>Grade each and every student in the class</li>
            </ol>
            </Padding>
        
            <P2>
            Mugove Grading application will then act as a smart calculator, 
            and generate score analysis data for every graded students the graded exercise. 
            The teacher can get quick stats about scores such as the topics that were underperformed for the exercise 
            </P2>

            
        </Padding>
        <Padding>
            <FlexRow center>
                <StaticImage height={100} src="../../../images/signature.jpg" alt="signature"/>
            </FlexRow>
            <H3 style={{textAlign: "center"}}>Mugove Grading</H3>
            <H4 style={{textAlign: "center"}}>© {new Date().getFullYear()}</H4>
        </Padding>
      </Page>
  )
}

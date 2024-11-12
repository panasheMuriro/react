import styled from "styled-components";

interface PageProps {
    zIndex?:number
}

export const HomePage = styled.div`
height: 100vh;
overflow-y: scroll;
/* position: relative; */
z-index: 1;
padding-bottom: 100px;
`

export const Page = styled.div<PageProps>`
height: 100vh;
overflow-y: scroll;
z-index: ${props => props.zIndex};
position: absolute;
/* position: relative; */
top: 0;
background-color: white;
width: 100vw;
padding-bottom: 100px;
`

export const PageContents = styled.div`
overflow-y: scroll;
`;

export enum Pages{
    ADD_SYLLABUS_PAGE = "add_syllabus_page",
    ADD_STUDENTS_PAGE = "add_students_page",
    STUDENT_CLASS_PAGE = "student_class_page",
    ADD_GRADING_SCHEME = "add_grading_scheme",
    ADD_SCORE_GRADES ="add_score_grades",
    GRADE_STUDENTS_PAGE = "grade_students_page",
    OVERALL_SCORES_PAGE = "overall_scores_page",
    INDIVIDUAL_SCORES_PAGE = "individual_scores_page",
    ABOUT_PAGE = "about_page"
}
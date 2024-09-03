import React, { useEffect, useState } from 'react'
import IconButton from '../Buttons/IconButton'
import { FlexColumn, FlexRow } from '../Containers'
import { Padding } from '../Padding'
import { H1, H2, H3, P3 } from '../Typography'
// import 'animate.css';
import AnimatedText from 'react-animated-text-content';


import { StaticImage } from "gatsby-plugin-image"

export default function NavHeader(props) {

    let title = props.title;
    if (title.length > 18) {
        title = title.substring(0, 18) + "..."
    }

    const getGreeting = ():string => { // Time is not updated
        let greeting: string;
        let date = new Date()
        let hour = date.getHours();

        if (hour <= 23 && hour > 16) {
            greeting = "Good evening."
        } else if (hour <= 16 && hour > 11) {
            greeting = "Good afternoon."
        } else if (hour <= 11 && hour >= 0) {
            greeting = "Good morning"
        }
        return greeting;
    }

    let messages = [
        "Welcome to, ",
        "Analyse students' performance with ease.",
        "Prioritize monitoring student scores",
        "See which topics need attention.",
    ];

    const [message, setMessage] = useState("Welcome to, ");

    useEffect(()=>{
        let currentIndex = 0
        setInterval(()=>{
            setMessage(messages[currentIndex])
            if(currentIndex < messages.length-1){
                currentIndex +=1
            }else{
                currentIndex = 0
            }
        },4000)
    },[])

    return (
        <div>
            <FlexColumn id={props.id} style={{ height: 140, backgroundColor: "white", justifyContent: "inherit" }}>
                <Padding>
                    {props.home ? <FlexRow style={{ height: 45, justifyContent: "end" }}>
                        <div onClick={props.onOpenAboutPage}>
                            <StaticImage onClick={props.onOpenAboutPage} height={45} src="../../../images/mugove_logo.png" alt="Logo" />
                        </div>
                    </FlexRow> : <IconButton back muted left onClick={props.onClick} />}
                    {props.home && <P3>
                      
<AnimatedText
  type="words" // animate words or chars
  animation={{
    x: '200px',
    y: '-20px',
    scale: 1.1,
    ease: 'ease-in-out',
  }}
  animationType="blocks"
  interval={0.06}
  duration={0.8}
  tag="p"
  className="animated-paragraph"
  includeWhiteSpaces
  threshold={0.1}
  rootMargin="20%"
>
  {message}
</AnimatedText>
          
                    </P3>}
                    {props.centered ? <H1 style={{ margin: "15px 0", textAlign: "center" }}>{props.title}</H1> : <H1 style={{ margin: "15px 0" }}>{props.title}</H1>}
                </Padding>
            </FlexColumn>
        </div>
    )
}

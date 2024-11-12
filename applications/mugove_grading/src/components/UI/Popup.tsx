import { IoCheckmarkCircleOutline } from '@react-icons/all-files/io5/IoCheckmarkCircleOutline';
import { IoInformationCircleOutline } from '@react-icons/all-files/io5/IoInformationCircleOutline';
import React from 'react';
import { PrimaryButton } from './Buttons/ButtonTemplate'
import IconButton from './Buttons/IconButton'
import { Colors } from './Colors';
import { FlexColumn, FlexRow } from './Containers'
import { Padding } from './Padding'
import { ModalBackground, StyledModaBox } from './StyledModalBox'
import { H2, P2 } from './Typography'

export default function Popup(props) {

    let iconStyles: React.CSSProperties = {
        fontSize: "50px",
        margin: "15px auto",
        color: props.warning? Colors.RED_PRIMARY: Colors.TEAL_PRIMARY
    }

    let icon: JSX.Element;

    props.success && (icon = <IoCheckmarkCircleOutline style={iconStyles} />)
    props.warning && (icon = <IoInformationCircleOutline style={iconStyles}/>)

    return (
        <ModalBackground>
            <Padding>
                <StyledModaBox className="animate__animated animate__zoomIn animate__faster" id={props.id}>
                    <Padding>
                        <FlexColumn between>
                            <FlexRow between>
                                {props.warning && <>
                                    <div></div>
                                    <IconButton left cancel text title="cancel" onClick={props.onClose}/>
                                </>}
                            </FlexRow>
                            <div></div>
                            {icon}
                            <H2 style={{ textAlign: "center" }}>{props.title}</H2>
                            <P2 style={{ textAlign: "center" }}>{props.message} </P2>
                            <PrimaryButton style={{backgroundColor: props.warning && Colors.RED_PRIMARY }} onClick={props.onClick} id={props.id}>{props.buttonTitle}</PrimaryButton>
                        </FlexColumn>
                    </Padding>
                </StyledModaBox>
            </Padding>
        </ModalBackground>
    )
}

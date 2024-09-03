import React from 'react';
import { IoEllipseSharp } from "@react-icons/all-files/io5/IoEllipseSharp";
import { Colors } from './Colors';


export default function Status(props) {
    /**
     * Success
     * Warning
     * Danger
     * 
     * IoEllipseSharp
     */
    let color: Colors;
    props.success && (color = Colors.GREEN_PRIMARY);
    props.danger && (color = Colors.RED_PRIMARY);

    let iconStyles: React.CSSProperties = {
        color: color,
        marginRight: 5
    }

    return (
        <IoEllipseSharp style={iconStyles} />
    )
}

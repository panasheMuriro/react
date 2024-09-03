import React, { useEffect } from 'react'
import { FormHandler } from '../../../classes/Form'
import { PrimaryButton } from '../Buttons/ButtonTemplate'
import { Colors } from '../Colors'

export default function Form(props) {

    useEffect(() => {

        let formValues: Array<object> = [];

        document.getElementById("form_button").addEventListener('click', (e) => {
            let formHandler = new FormHandler(props.children);
            formHandler.setFormElementsClean();
            let formValues = formHandler.createFormValues();
            FormHandler.setFormValues(formValues);
            console.log(formValues)
        })
    }, [])


    return (
        <div data-values={[]} id="current_form">
            {props.children}
        </div>
    )
}

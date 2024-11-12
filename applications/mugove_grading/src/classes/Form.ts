import { Colors } from "../components/UI/Colors"

export class FormHandler {
  private formElementsRaw: any
  private formElementsClean: Array<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
  private static formValues: string // stringified list
  private areInputsValid: boolean = true
  private static formElementsCleanEdit: Array<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >

  constructor(children: any) {
    this.formElementsRaw = children
  }

  public setFormElementsClean(): void {
    let elements = []
    for (let i = 0; i < this.formElementsRaw.length; i++) {
      if (
        this.formElementsRaw[i].props &&
        this.formElementsRaw[i].props.label
      ) {
        let formElement:
          | HTMLInputElement
          | HTMLSelectElement
          | HTMLTextAreaElement = document.getElementById(
          this.formElementsRaw[i].props.label
        ) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        if (formElement) {
          elements.push(formElement)
        }
      }
    }
    this.formElementsClean = elements
    FormHandler.formElementsCleanEdit = this.formElementsClean
  }

  private validateInputs(): void {
    for (let i = 0; i < this.formElementsClean.length; i++) {
      if (
        !this.formElementsClean[i].value &&
        this.formElementsClean[i].required
      ) {
        document.getElementById(
          "helperText_" + this.formElementsClean[i].id
        ).innerHTML = `Please enter ${this.formElementsClean[i].id} here`
        document.getElementById(
          "helperText_" + this.formElementsClean[i].id
        ).style.color = Colors.RED_PRIMARY
        this.areInputsValid = false
      } else {
        document.getElementById(
          "helperText_" + this.formElementsClean[i].id
        ).innerHTML = ""
      }
    }
  }

  public getAreInputsValid(): boolean {
    this.validateInputs()
    return this.areInputsValid
  }

  public createFormValues(): string {
    if (!this.getAreInputsValid()) {
      return ""
    }
    let formValuesArray: Array<object> = []
    for (let i = 0; i < this.formElementsClean.length; i++) {
      // handle middles names
      if (this.formElementsClean[i].id == "Middle Names") {
        formValuesArray.push({
          value: this.formElementsClean[i].value.split(",").map(x => x.trim()),
          name: this.formElementsClean[i].id,
        })
      } else if (this.formElementsClean[i].id == "Topics") {
        //.getAttribute
        formValuesArray.push({
          value: this.formElementsClean[i].getAttribute("data-selected-topics"),
          name: this.formElementsClean[i].id,
        })
      } else {
        formValuesArray.push({
          value: this.formElementsClean[i].value.trim(),
          name: this.formElementsClean[i].id,
        })
      }
      this.formElementsClean[i].value = ""
    }
    return JSON.stringify(formValuesArray)
  }

  public static setFormValues(values: string): void {
    this.formValues = values
  }

  public static getFormValues(): string {
    return this.formValues
  }

  public static editFormValues(values: any): void {
    values.map(x => {
      try {
        let field = document.getElementById(x.label) as HTMLInputElement
        field.value = x.value
      } catch (e) {
        console.log(e)
      }
    })

  }
}

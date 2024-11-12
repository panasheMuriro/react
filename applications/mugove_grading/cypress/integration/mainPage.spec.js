describe('Main Page test', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.viewport(375, 667)
    cy.visit('http://localhost:8000/')
  })

  it('shows initial components on the main page', () => {
    cy.contains('Mugove Grading').should('exist')
    cy.contains('Your Classes').should('exist')
    cy.contains('Help').should('exist')
  })

  it('can open and close the class modal',()=>{
    cy.contains('Add').click();
    cy.contains('Add Class').should('exist');
    cy.contains('cancel').click()
    cy.contains("Add Class").should('not.exist')
  })

  it('can report missing fields on adding a class', ()=>{
    cy.contains('Add').click();
    cy.contains('Submit').click();
    cy.contains('cancel').should('exist')
    cy.contains('Please').should('exist')
  })


  it("can add a student class",()=>{ //FIXME: Not adding class in one try
    cy.contains('Add').should('exist');
    cy.contains('Add').click();
    cy.get('#Title').type(`Mathematics`);
    cy.get('#Grade').type(`4C`);
    cy.contains('Submit').click();
    cy.contains('Help').should('not.exist');
    cy.contains('Mathematics').should('exist')
    cy.contains('Please add syllabus').should('exist');
    cy.contains('Please add students').should('exist');
  })

  // it("can open add some syllabus topics", ()=>{
  //   // cy.get("#open_tooltip").click();
  // })

  })


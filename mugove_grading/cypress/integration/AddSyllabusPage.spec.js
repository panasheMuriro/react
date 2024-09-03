describe('Add Syllabus Page test', () => {
        beforeEach(() => {
          // Cypress starts out with a blank slate for each test
          // so we must tell it to visit our website with the `cy.visit()` command.
          // Since we want to visit the same URL at the start of all our tests,
          // we include it in our beforeEach function so that it runs before each test
          cy.viewport(375, 667)
          cy.visit('http://localhost:8000/')
          cy.contains('Add').click();
          cy.get('#Title').type(`Mathematics`);
          cy.get('#Grade').type(`4C`);
          cy.contains('Submit').click();
          cy.contains('Submit').should('not.exist');
          cy.wait(1000)
          cy.contains('Add').click();
          cy.get('#Title').type(`Mathematics`);
          cy.get('#Grade').type(`4C`);
          cy.contains('Submit').click();

        })

        it("can open the add syllabus page", () => {
            cy.get("#open_tooltip").click();
            
            cy.contains('Add Syllabus').click()
            let topics = ["Addition, Subtraction, Multiplication, Division"];
            topics.map( x=>{
                cy.get("#Topic").type(x)
                cy.get("#form_button").click();
                cy.wait(200)
            })

        })

    
    
    })
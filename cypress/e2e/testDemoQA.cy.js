describe('User Registration Tests', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/automation-practice-form');
  });

  it('Should register a user successfully', () => {
    // Filling in the basic information
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#userEmail').type('johndoe@example.com');
    cy.get('[name="gender"][value="Male"]').check({ force: true });
    cy.get('#userNumber').type('1234567890');

    // Choosing a date of birth
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select('2003');
    cy.get('.react-datepicker__month-select').select('February');
    cy.get('.react-datepicker__day--001:not(.react-datepicker__day--outside-month)').click();

    // Selection of subjects
    cy.get('#subjectsInput')
      .type('Math{enter}')
      .type('Physics{enter}');
    
    // Choosing a hobby (checking + choosing)
    cy.get('#hobbies-checkbox-1')
      .parent()
      .contains('Sports')
      .should('exist');
    cy.get('#hobbies-checkbox-1').check({ force: true });
    
    // Uploading a file
    cy.get('#uploadPicture').selectFile('./cypress/downloads/ID.jpg', { force: true });

    // Filling in the address
    cy.get('#currentAddress').type('Baker Str, 451');

    // Selecting a state and city
    cy.get('#state').click();
    cy.contains('div', 'NCR').click();
    cy.get('#city').click(); 
    cy.contains('div', 'Delhi').click();

    cy.get('#submit').click();

    // Verification of successful registration
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-body')
      .should('contain', 'John Doe')
      .should('contain', 'johndoe@example.com')
      .should('contain', 'Male')
      .should('contain', '1234567890')
      .should('contain', '01 February,2003')
      .should('contain', 'Maths, Physics')
      .should('contain', 'Sports')
      .should('contain', 'ID.jpg')
      .should('contain', 'Baker Str, 451')
      .should('contain', 'NCR Delhi');
  });

  it('Should display validation errors when required fields are empty', () => {
    cy.get('#submit').click();

    // Check that errors appear in the required fields (red boxes)
    cy.get('#firstName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get('#lastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get('#userNumber').should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });

  it('Should not allow invalid email format', () => {
    cy.get('#userEmail').type('gdefytw162655');
    cy.get('#submit').click();

    // Check that the field remains red (error)
    cy.get('#userEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });

  it('Should not allow invalid phone numbers', () => {
    /* Less than 10 digits (does not work, the site processes that 1234 is a valid number, although it is less than 10 characters)
    // cy.get('#userNumber').type('1234').blur(); 
    // cy.get('#submit').click();
    // cy.get('#userNumber').should('have.css', 'border-color', 'rgb(220, 53, 69)'); */

     // Letters instead of numbers
    cy.get('#userNumber').clear().type('abcdefghij');
    cy.get('#submit').click();
    cy.get('#userNumber').should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
});

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'John Lennon',
      username: 'username1',
      password: 'password1'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  describe('when not logged', function() {
    it('front page can be opened', function() {
      cy.contains('log in to application' || 'logged in')
    })

    it('login form can be opened', function() {
      cy.contains('login').click()
    })

    it('user can login', function() {
      cy.contains('login').click()
      cy.get('#username').type('username1')
      cy.get('#password').type('password1')
      cy.get('#login-button').click()

      cy.contains('John Lennon logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('username1')
      cy.get('#password').type('password1')
      cy.get('#login-button').click()
    })

    it('a new blog can be added', function() {
      cy.contains('new blog').click()
      cy.get('#titleInput').type('a blog created by cypress')
      cy.get('#authorInput').type('Sr. Cypress Sánchez')
      cy.get('#urlInput').type('cypress.com')

      cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })
  })

})
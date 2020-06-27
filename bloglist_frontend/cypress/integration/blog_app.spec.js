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

    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.contains('login').click()
        cy.get('#username').type('username1')
        cy.get('#password').type('password1')
        cy.get('#login-button').click()

        cy.contains('John Lennon logged in')
      })

      it('fails with wrong credentials, with red notification', function() {
        cy.contains('login').click()
        cy.get('#username').type('xaxaxasf')
        cy.get('#password').type('tatatasf')
        cy.get('#login-button').click()
        cy.get('.info').should('have.css', 'color', 'rgb(255, 0, 0)')
        cy.contains('wrong username or password')
      })
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('username1')
      cy.get('#password').type('password1')
      cy.get('#login-button').click()

      cy.contains('new blog').click()
      cy.get('#titleInput').type('template blog 1')
      cy.get('#authorInput').type('Sr. Cypress Sánchez')
      cy.get('#urlInput').type('cypress.com')
      cy.contains('save').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#titleInput').type('a blog created by cypress')
      cy.get('#authorInput').type('Sr. Cypress Sánchez')
      cy.get('#urlInput').type('cypress.com')
      cy.contains('save').click()

      cy.contains('a blog created by cypress')
      cy.get('.info').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('A blog can be liked', function() {
      cy.contains('view').click().then(() => {
        cy.get('#likes').contains('Likes: 0')
        cy.contains('like').click().then(() => {
          cy.get('#likes').contains('Likes: 1')
        })
      })
    })

    it('Blog can be deleted by proper user', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('.info').contains('has been successfully removed')
      cy.contains('view').should('not.exist')
    })

    it('Blog can NOT be deleted by other user', function() {
      cy.contains('logout').click()
      const user = {
        name: 'Leo Messi',
        username: 'username2',
        password: 'password2'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('#username').type('username2')
      cy.get('#password').type('password2')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })

    it('blogs are ordered by likes, descending', function() {
      cy.get('.showHide').click()
      cy.get('#titleInput').type('this post should have more likes')
      cy.get('#authorInput').type('Sr. Cypress Sánchez')
      cy.get('#urlInput').type('cypress2.com')
      cy.contains('save').click()
      cy.contains('this post should have more likes')
      cy.contains('view').click()
      cy.get('.showHide:last').click()
      cy.contains('hide').click()
      cy.get('.likeButton').eq(1).click()
      cy.get('.blogTaser').eq(0).should('contain', 'this post should have more likes')
      /*cy.contains('hide').click()
      cy.contains('like').click()*/
    })

  })
})
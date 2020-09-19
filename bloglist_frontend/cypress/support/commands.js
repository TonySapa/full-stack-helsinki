// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/login", {
    username, password
  }).then(({ body }) => {
    localStorage.setItem("loggedInUser", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("createBlog", ({ author, title, url }) => {
  cy.request({
    url: "http://localhost:3001/api/blogs",
    method: "POST",
    body: {
      author,
      title,
      url
    },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("loggedInUser")).token}`
    }
  }).then(() => cy.visit("http://localhost:3000"));
});

Cypress.Commands.add("addManyBlogsWithRandomVotes", () => {
  const blogsToAdd = [
    {
      author: "Author One",
      title: "Blog One",
      url: "https://docs.cypress.io/api/commands/request.html#Options",
      votesCount: 2
    },
    {
      author: "Author Two",
      title: "Blog Two",
      url: "https://docs.cypress.io/api/commands/request.html#Options",
      votesCount: 235
    },
    {
      author: "Author Three",
      title: "Blog Three",
      url: "https://docs.cypress.io/api/commands/request.html#Options",
      votesCount: 32
    },
    {
      author: "Author Four",
      title: "Blog Four",
      url: "https://docs.cypress.io/api/commands/request.html#Options",
      votesCount: 5
    }
  ];

  blogsToAdd.forEach((blogToAdd) => {
    cy.request({
      url: "http://localhost:3001/api/blogs",
      method: "POST",
      body: {
        author: blogToAdd.author,
        title: blogToAdd.title,
        url: blogToAdd.url,
        votesCount: Math.floor(Math.random() * 100)
      },
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("loggedInUser")).token}`
      }
    });
  });
  cy.visit("http://localhost:3000");
});

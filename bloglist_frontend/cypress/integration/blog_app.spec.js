describe("Blog app", () => {
  beforeEach(() => {
    // Clear the test database and add two initial users.
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const users = [
      {
        name: "Alan Turing",
        username: "Prof12",
        password: "finite alphabet"
      },
      {
        name: "Claude Shannon",
        username: "bitB0ss",
        password: "michigan!!"
      }
    ];
    users.forEach((user) => cy.request("POST", "http://localhost:3001/api/users/", user));
    cy.visit("http://localhost:3000");
  });

  it("Login from is shown", () => {
    cy.get("#loginHeading")
      .should("contain", "log in to application");
    cy.get("#loginForm")
      .should("contain", "username")
      .and("contain", "password");
  });

  // Log in using GUI instead of direct HTTP request to test it fully. Later using commands.
  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.get("input[name='Username']").type("Prof12");
      cy.get("input[name='Password']").type("finite alphabet");
      cy.get("#loginButton").click();

      cy.get("html")
        .should("not.contain", "log in to application")
        .and("contain", "Alan Turing")
        .and("contain", "logged in");
      cy.get("#logoutButton"); // `.get()` expects the element to eventually exist in the DOM
    });

    it("fails with wrong credentials", () => {
      cy.get("input[name='Username']").type("Prof12");
      cy.get("input[name='Password']").type("wrong password");
      cy.get("#loginButton").click();

      /* Note to self:
      The error notification's CSS must be asserted with `background-color` instead
      of `background` even though the latter is used in the actual CSS (`App.css`).
      Property `background` apparently has other values too than just the color:
      `rgb(151, 63, 63) none repeat scroll 0% 0% / auto padding-box border-box`.
      Presumably this is due to some inheritance like behavior that is yet quite
      unknown to me. */
      cy.get(".failure")
        .should("contain", "invalid username or password (401)")
        .and("have.css", "background-color", "rgb(151, 63, 63)");

      cy.get("html")
        .should("contain", "log in to application")
        .and("not.contain", "Alan Turing")
        .and("not.contain", "logged in");
    });
  });

  describe("When logged in", () => {
    beforeEach(() => {
      cy.login({ username: "Prof12", password: "finite alphabet" });
    });

    it("A blog can be created", () => {
      cy.contains("Submit a new blog").click();
      cy.get("form").as("submitForm");

      // fill fields and click submit
      cy.get("#titleInput")
        .type("Testiblogi");
      cy.get("#authorInput")
        .type("Teemu Testaaja");
      cy.get("#urlInput")
        .type("https://fullstackopen.com/osa5/end_to_end_testaus#tehtavat-5-17-5-22");
      cy.get("@submitForm").find("button").should("contain", "Submit").click();

      // confirm new blog render
      cy.get(".blog")
        .should("contain", "Testiblogi")
        .and("contain", "Teemu Testaaja");
    });

    it("A blog can be liked", () => {
      // Blog creation using the form tested before, now using command shortcut.
      cy.createBlog({
        author: "Tiina Tykätty",
        title: "Ihastuttava blogi",
        url: "https://ilmatieteenlaitos.fi/saa/turku?forecast=short"
      });
      cy.get(".blog").as("blogToLike")
        .find("#toggleButton").click();

      cy.get("@blogToLike").find("li").should("contain", "votes: 0");
      cy.get("@blogToLike")
        .find("#voteButton").click();
      cy.get("@blogToLike").find("li").should("contain", "votes: 1");
    });
  });

  describe("Removing blogs", () => {
    beforeEach(() => {
      cy.login({ username: "Prof12", password: "finite alphabet" });
      cy.createBlog({
        author: "Tiina Tykätty",
        title: "Ihastuttava blogi",
        url: "https://ilmatieteenlaitos.fi/saa/turku?forecast=short"
      });
      cy.get("#logoutButton").click();
    });

    it("Allowed for logged in submitter", () => {
      // log in blog's submitter
      cy.login({ username: "Prof12", password: "finite alphabet" });

      // toggle details
      cy.get(".blog")
        .should("contain", "Ihastuttava blogi").as("blogToRemove")
        .find("#toggleButton")
        .click();

      // attempt removing
      cy.get("@blogToRemove").find(".removeButton").click();
      cy.get("html").should("not.contain", "@blogToRemove");
    });

    it("Not allowed for other logged in user", () => {
      // log in other user than blog's submitter
      cy.login({ username: "bitB0ss", password: "michigan!!" });

      // toggle details
      cy.get(".blog")
        .should("contain", "Ihastuttava blogi").as("blogToRemove")
        .find("#toggleButton")
        .click();

      // attempt removing via UI
      cy.get("@blogToRemove").should("not.contain", ".removeButton");

      // attempt removing directly via HTTP
      cy.request({ // get ID for the blog to remove
        url: "http://localhost:3001/api/blogs",
        method: "GET"
      })
        .then(({ body }) => {
          cy.request({ // make delete request to the received ID
            url: `http://localhost:3001/api/blogs/${body[0].id}`,
            method: "DELETE",
            headers: {
              Authorization: `bearer ${JSON.parse(localStorage.getItem("loggedInUser")).token}`
            },
            failOnStatusCode: false // don't fail the test for code 4xx
          }).then((response) => expect(response.status).to.eq(401)); // expect "401 Unauthorized"
        });
    });
  });

  describe("Blogs are rendered in order by votes", () => {
    beforeEach(() => {
      cy.login({ username: "Prof12", password: "finite alphabet" });
      Promise.all(cy.addManyBlogsWithRandomVotes())
        .then(() => cy.visit("http://localhost:3000"));
    });

    it("Four blogs with random votes counts", () => {
      /* Iterate through all blog elements (selector `.blog`), parse
      their votes counts and compare so that next must always less
      than previous. */
      let previousVotes = Number.MAX_SAFE_INTEGER;
      cy.get(".blog").each((value) => {
        // pick only part of `value` to be inspected (in case title contains numbers)
        const relevantPart = value
          .children()[2] // togglable details (0: title, 1: author, 2: this)
          .textContent
          .split(" ")[3]; // ["Show", "detailsHide", "detailsvotes:", "59votesubmitted", "by", "Alan", "TuringlinkRemove", "blog"]

        const r = /\d+/; // 1 or more digits
        const votesCount = parseInt(relevantPart.match(r)[0], 10); // 10 is radix
        // TODO: What if there are two blogs with the same votes count?
        expect(votesCount).to.be.lessThan(previousVotes);
        previousVotes = votesCount;
      });
    });
  });
});

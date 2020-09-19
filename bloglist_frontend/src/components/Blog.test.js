import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;
  const mockVoteClickHandler = jest.fn(); // mock handler

  beforeEach(() => {
    const loggedInUser = { name: "Leevi Lähettäjä", username: "leevil" };
    component = render(
      <Blog
        blog={{
          title: "Testiblogi",
          author: "Teemu Testaaja",
          url: "http://www.google.com",
          user: { name: "Leevi Lähettäjä", username: "leevil" }
        }}
        loggedInUser={loggedInUser}
        voteClickHandler={mockVoteClickHandler}
      />
    );
  });

  test("renders blog's title and author", () => {
    expect(component.container).toHaveTextContent("Testiblogi");
    expect(component.container).toHaveTextContent("Teemu Testaaja");
  });
  test("does not initially render URL or likes", () => {
    const listItemNodes = component.container.querySelectorAll("li");
    listItemNodes.forEach((element) => {
      if (element.textContent.includes("votes") || element.textContent.includes("link")) {
        expect(element).not.toBeVisible();
      }
    });
  });
  test("renders URL and likes once toggle is clicked", () => {
    const toggleButton = component.getByText("Show details");
    fireEvent.click(toggleButton);

    const listItemNodes = component.container.querySelectorAll("li");
    listItemNodes.forEach((element) => {
      if (element.textContent.includes("votes") || element.textContent.includes("link")) {
        expect(element).toBeVisible();
      }
    });
  });
  test("vote handler is called twice if vote button is clicked twice", () => {
    const voteButton = component.getByText("vote");
    fireEvent.click(voteButton);
    fireEvent.click(voteButton);
    expect(mockVoteClickHandler.mock.calls).toHaveLength(2);
  });
});

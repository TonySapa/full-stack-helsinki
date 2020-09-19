import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import CreateBlog from "./CreateBlog";

describe("<CreateBlog />", () => {
  let component;
  const mockHandleNewBlogSubmit = jest.fn();

  beforeEach(() => {
    component = render(
      <CreateBlog
        handleNewBlogSubmit={mockHandleNewBlogSubmit}
      />
    );
  });

  test("form submit handler is called with correct params", () => {
    const form = component.container.querySelector("form");
    const titleField = component.container.querySelector("#title");
    const authorField = component.container.querySelector("#author");
    const urlField = component.container.querySelector("#url");
    fireEvent.change(titleField, {
      target: { value: "Meikäläisblogi" }
    });
    fireEvent.change(authorField, {
      target: { value: "Matti Meikäläinen" }
    });
    fireEvent.change(urlField, {
      target: { value: "https://developer.mozilla.org" }
    });
    fireEvent.submit(form);

    /* [0][2] = 1st call's 3rd arg (order defined at the actual call
    at `components/CreateBlog.js` & `services/blog.js`) */
    const submittedData = mockHandleNewBlogSubmit.mock.calls[0][2];

    expect(submittedData.title).toBe("Meikäläisblogi");
    expect(submittedData.author).toBe("Matti Meikäläinen");
    expect(submittedData.url).toBe("https://developer.mozilla.org");
  });
});

import React from "react";
import { shallow } from "enzyme";
import Note from "./Note";

import Enzyme, { mount } from "enzyme";

describe("Note Component", () => {
  const dataMock = {
    id: 0,
    content: "hey",
    data_created: "",
    isCompleted: false,
  };

  const actionsMock = {
    updateNote: jest.fn((x) => x),
    deleteNote: jest.fn((x) => x),
    setComplete: jest.fn((x) => x),
  };

  let note;

  beforeEach(() => {
    note = mount(<Note data={dataMock} actions={actionsMock} />);
  });

  test("render note", () => {
    expect(note).toMatchSnapshot();
  });

  test("edit button", () => {
    note.find("button#edit").simulate("click");
    expect(note).toMatchSnapshot();
  });

  test("delete button", () => {
    note.find("button#delete").simulate("click");
    expect(note).toMatchSnapshot();
  });

  test("confirm edit button", () => {
    note.find("button#edit").simulate("click");

    note.update();

    note.find("button#edit-confirm").simulate("click");
    expect(note).toMatchSnapshot();
  });

  test("cancel edit button", () => {
    note.find("button#edit").simulate("click");

    note.update();

    note.find("button#cancel").simulate("click");
    expect(note).toMatchSnapshot();
  });

  test("confirm delete button", () => {
    note.find("button#delete").simulate("click");

    note.update();

    note.find("button#delete-confirm").simulate("click");
    expect(note).toMatchSnapshot();
  });

  test("cancel delete button", () => {
    note.find("button#delete").simulate("click");

    note.update();

    note.find("button#cancel").simulate("click");
    expect(note).toMatchSnapshot();
  });

  test("checkbox", () => {
    note.find("input#complet").simulate("click");
    expect(note).toMatchSnapshot();
  });
});

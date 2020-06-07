import React, { useState, useReducer } from "react";
import Button from "@material-ui/core/Button";
import Note from "./Note";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import uniqueId from "lodash/uniqueId";

export const ActionType = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  SET: "SET",
};

const FilterOption = {
  ALL: "ALL",
  COMPLETED: "COMPLETED",
  IN_PROGRESS: "IN_PROGESS",
  RECENT: "RECENT",
  OLD: "OLD",
};

const reducer = (state, action) => {
    console.log(action, state);
    let index;
    switch (action.type) {
      case ActionType.ADD:
        const note = {
          id: uniqueId('note-'),
          content: action.payload.content,
          date_created: new Date(),
          isCompleted: false,
        };
        return [...state, note];

      case ActionType.UPDATE:
        index = state.findIndex(({ id }) => id === action.payload.id);
        state[index].content = action.payload.content;
        return [...state];

      case ActionType.DELETE:
        return state.filter(({ id }) => id !== action.payload.id);

      case ActionType.SET:
        index = state.findIndex(({ id }) => id === action.payload.id);
        state[index].isCompleted = action.payload.value;
        return [...state];

      default:
        return state;
    }
  }

const App = () => {

  const [filter, setFilter] = useState({
    progress: FilterOption.ALL,
    date: FilterOption.RECENT,
  });

  const [notes, dispatchNote] = useReducer(reducer, []);

  const renderNotes = () => {
    let notesToRender = notes;

    switch (filter.progress) {
      case FilterOption.COMPLETED:
        notesToRender = notesToRender.filter(({ isCompleted }) => isCompleted);
        break;
      case FilterOption.IN_PROGRESS:
        notesToRender = notesToRender.filter(({ isCompleted }) => !isCompleted);
        break;
      default:
        break;
    }

    switch (filter.date) {
      case FilterOption.RECENT:
        notesToRender.sort((d1, d2) => d2.date_created - d1.date_created);
        break;
      case FilterOption.OLD:
        notesToRender.sort((d1, d2) => d1.date_created - d2.date_created);
        break;
      default:
        break;
    }

    return notesToRender.map((note) => (
      <Note key={note.id} id={note.id} data={note} dispatch={dispatchNote} />
    ));
  };

  return (
    <div>
      <Container>
        <Typography
          variant="h1"
          align="center"
          style={{ fontFamily: "Fredericka the Great" }}
        >
          My Do-To List
        </Typography>
      </Container>
      <Container id="menu" maxWidth={"md"} style={{ marginTop: "20px" }}>
        <AppBar position="static">
          <Toolbar
            style={{
              background:
                "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
            }}
          >
            <Button
              id="create-note"
              style={{ color: "white" }}
              onClick={() =>
                dispatchNote({
                  type: ActionType.ADD,
                  payload: { content: "Edit this text!" },
                })
              }
            >
              Create Note
            </Button>
            <div style={{ flexGrow: "1" }} />
            <FormControl id="date-filter" style={{ minWidth: "120px" }}>
              <InputLabel id="select-date" style={{ color: "black" }}>
                By Date
              </InputLabel>
              <Select
                id="select-date"
                style={{ color: "black" }}
                value={filter.date}
                onChange={(event) =>
                  setFilter({ ...filter, date: event.target.value })
                }
              >
                <MenuItem value={FilterOption.RECENT}>Recent</MenuItem>
                <MenuItem value={FilterOption.OLD}>Old</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              id="progress-filter"
              style={{ minWidth: "120px", marginLeft: "10px" }}
            >
              <InputLabel id="select-progress" style={{ color: "black" }}>
                By Progress
              </InputLabel>
              <Select
                id="select-progress"
                style={{ color: "black" }}
                value={filter.progress}
                onChange={(event) =>
                  setFilter({ ...filter, progress: event.target.value })
                }
              >
                <MenuItem value={FilterOption.ALL}>All</MenuItem>
                <MenuItem value={FilterOption.COMPLETED}>Completed</MenuItem>
                <MenuItem value={FilterOption.IN_PROGRESS}>
                  In Progress
                </MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
      </Container>
      <Container id="list" maxWidth={"md"}>
        <Paper>
          <List>{renderNotes()}</List>
        </Paper>
      </Container>
    </div>
  );
};

export default App;

/*
  const [notes, setNotes] = useState([]);
  const createNote = (content) => {
    const note = {
      id: getId(),
      content: content,
      date_created: new Date(),
      isCompleted: false,
    };
    notes.unshift(note);
    setNotes([...notes]);
  };

  const updateNote = (idNote, content) => {
    const index = notes.findIndex(({ id }) => id === idNote);
    notes[index].content = content;
    setNotes([...notes]);
  };

  const deleteNote = (idNote) => {
    setNotes(notes.filter(({ id }) => id !== idNote));
  };

  const setComplete = (idNote, value) => {
    const index = notes.findIndex(({ id }) => id === idNote);
    notes[index].isCompleted = value;
    setNotes([...notes]);
  };
*/

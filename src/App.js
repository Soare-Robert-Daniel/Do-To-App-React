import React, { useState } from "react";
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

const FilterOption = {
  ALL: 0,
  COMPLETED: 1,
  IN_PROGRESS: 2,
  RECENT: 3,
  OLD: 4,
};

const App = () => {
  const [id, setId] = useState(0);
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState({
    type: FilterOption.ALL,
    date: FilterOption.RECENT,
  });

  const getId = () => {
    setId(id + 1);
    return id;
  };

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

  const renderNotes = () => {
    let notesToRender = notes;
    switch (filter.type) {
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
              <Note
                key={note.id}
                data={note}
                actions={{updateNote, deleteNote, setComplete }}
              />));
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
              style={{ color: "white" }}
              onClick={() => createNote("Replace this text!")}
            >
              Create Note
            </Button>
            <div style={{ flexGrow: "1" }} />
            <FormControl id="date-filter" style={{ minWidth: "120px" }}>
              <InputLabel id="select-date" style={{ color: "black" }}>
                Date
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
              id="type-filter"
              style={{ minWidth: "120px", marginLeft: "10px" }}
            >
              <InputLabel id="select-type" style={{ color: "black" }}>
                Type
              </InputLabel>
              <Select
                id="select-type"
                style={{ color: "black" }}
                value={filter.type}
                onChange={(event) =>
                  setFilter({ ...filter, type: event.target.value })
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
          <List>
            {
                renderNotes()
            }
          </List>
        </Paper>
      </Container>
    </div>
  );
};

export default App;

import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const Mode = {
  SHOW: 1,
  EDIT: 2,
  DELETE: 3,
};

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const Note = ({ data, actions }) => {
  const [mode, setMode] = useState(Mode.SHOW);
  const [content, setContent] = useState(data.content);
  const [inputFocus, setInputFocus] = useFocus();

  const renderActions = () => {
    switch (mode) {
      case Mode.SHOW:
        return (
          <>
            <IconButton
              edge="end"
              aria-label="delete"
              style={{ color: "magenta" }}
              onClick={() => {
                console.log(inputFocus);
                setInputFocus();
                setMode(Mode.EDIT);
              }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => setMode(Mode.DELETE)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );

      case Mode.EDIT:
        return (
          <>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                actions.updateNote(data.id, content);
                setMode(Mode.SHOW);
              }}
            >
              Confirm Edit
            </Button>

            <Button
              size="small"
              onClick={() => {
                setContent(data.content); // reset to the original value
                setMode(Mode.SHOW);
              }}
            >
              Cancel
            </Button>
          </>
        );
      case Mode.DELETE:
        return (
          <>
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                actions.deleteNote(data.id);
                setMode(Mode.SHOW);
              }}
            >
              Confirm Delete
            </Button>

            <Button
              size="small"
              onClick={() => {
                setMode(Mode.SHOW);
              }}
            >
              Cancel
            </Button>
          </>
        );
      default:
        break;
    }
  };

  return (
    <ListItem divider>
      <Checkbox
        checked={data.isCompleted}
        onChange={(event) => actions.setComplete(data.id, event.target.checked)}
      />
      <InputBase
        inputRef={inputFocus}
        id={`content${data.id}`}
        value={content}
        multiline
        fullWidth
        readOnly={mode !== Mode.EDIT}
        style={{ color: mode === Mode.EDIT ? "magenta" : "black" }}
        onChange={(event) => setContent(event.target.value)}
        onDoubleClick={() => setMode(Mode.EDIT)}
        onFocus={(event) => event.target.select()}
      />

      {renderActions()}
    </ListItem>
  );
};

export default Note;

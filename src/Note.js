import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { ActionType } from "./App";

const Mode = {
  SHOW: "SHOW",
  EDIT: "EDIT",
  DELETE: "DELETE",
};

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const Note = ({ data, dispatch }) => {
  const [mode, setMode] = useState(Mode.SHOW);
  const [content, setContent] = useState(data.content);
  const [inputFocus, setInputFocus] = useFocus();

  const getTextColor = (modeType) => {
    switch (modeType) {
      case Mode.SHOW:
        return "black";
      case Mode.EDIT:
        return "magenta";
      case Mode.DELETE:
        return "darkgrey";
      default:
        return "black";
    }
  };

  const renderActions = () => {
    switch (mode) {
      case Mode.SHOW:
        return (
          <>
            <IconButton
              edge="end"
              id="edit"
              aria-label="delete"
              style={{ color: "magenta" }}
              onClick={() => {
                setInputFocus();
                setMode(Mode.EDIT);
              }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              edge="end"
              id="delete"
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
              id="edit-confirm"
              onClick={() => {
                dispatch({
                  type: ActionType.UPDATE,
                  payload: { id: data.id, content },
                });
                setMode(Mode.SHOW);
              }}
            >
              Confirm Edit
            </Button>

            <Button
              size="small"
              id="cancel"
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
              id="delete-confirm"
              onClick={() => {
                dispatch({
                  type: ActionType.DELETE,
                  payload: { id: data.id },
                });
                setMode(Mode.SHOW);
              }}
            >
              Confirm Delete
            </Button>

            <Button
              size="small"
              id="cancel"
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
        id="complet"
        checked={data.isCompleted}
        onChange={(event) =>
          dispatch({
            type: ActionType.SET,
            payload: { id: data.id, value: event.target.checked },
          })
        }
      />
      <InputBase
        inputRef={inputFocus}
        id={`content-${data.id}`}
        value={content}
        multiline
        fullWidth
        readOnly={mode !== Mode.EDIT}
        style={{
          color: getTextColor(mode),
        }}
        onChange={(event) => setContent(event.target.value)}
        //onDoubleClick={() => setMode(Mode.EDIT)}
        onFocus={(event) => event.target.select()}
      />

      {renderActions()}
    </ListItem>
  );
};

export default Note;

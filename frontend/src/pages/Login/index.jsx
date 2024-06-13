import { Box, Stack, Input, Textarea, Button } from "@mui/joy";
import { Tab, Tabs } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { API } from "../../../constants";
import { loginAction } from "../../store/slices/auth";
import store from "../../store";
import { useNavigate } from "react-router-dom";

function Login() {
  const [type, setType] = useState("log");

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("male");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  function onClickButton() {
    const mainJson = {
      login: login,
      password: password,
    };
    axios
      .post(
        `${API}${type === "log" ? "/users/signin" : "/users/signup"}`,
        type === "log"
          ? mainJson
          : {
              ...mainJson,
              surname: surname,
              name: name,
              years: date,
              gender: gender,
              city: city,
            }
      )
      .then((resp) => {
        if (resp.data.status) {
          if (type === "log") {
            store.dispatch(loginAction({ ...{ user_id: resp.data.user_id } }));
            navigate("/");
          } else {
            setLogin("");
            setPassword("");
            setType("log");
          }
        } else {
          if (type === "log") {
            alert("Something went wrong!");
          } else {
            alert("This login is used!");
          }
        }
      });
  }

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Tabs
          onChange={(e, newValue) => {
            setType(newValue);
          }}
          value={type}
        >
          <Tab label="Sign in" value="log" />
          <Tab label="Sign up" value="reg" />
        </Tabs>
        <Input
          placeholder="Login"
          type="text"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {type === "reg" && (
          <>
            <Input
              placeholder="Surname"
              type="text"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            />
            <Input
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              placeholder="Years old"
              type="number"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <Input
              placeholder="City"
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <Tabs
              onChange={(e, newValue) => {
                setGender(newValue);
              }}
              value={gender}
            >
              <Tab label="Male" value="male" />
              <Tab label="Female" value="female" />
            </Tabs>
          </>
        )}
        <Button type="button" onClick={onClickButton}>
          {type === "log" ? "Sign in" : "Sign up"}
        </Button>
      </Stack>
    </Box>
  );
}

export default Login;

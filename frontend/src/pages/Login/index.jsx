import { Box, Stack, Input, Textarea, Button, Select, Option } from "@mui/joy";
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
  const [maritalStatus, setMaritalStatus] = useState("Not married");
  const [children, setChildren] = useState("");
  const [height, setHeight] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [profession, setProfession] = useState("");

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
            <Select
              sx={{ width: '15%' }}
              value={maritalStatus}
              placeholder="Marital"
              onChange={(e, newValue) => {
                setMaritalStatus(newValue);
              }}
            >
              <Option value="married">Married</Option>
              <Option value="not_married">Not Married</Option>
            </Select>
            <Input
              placeholder="Number of children"
              type="number"
              value={children}
              onChange={(e) => {
                setChildren(e.target.value);
              }}
            />
            <Input
              placeholder="Height (cm)"
              type="number"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
              }}
            />
            <Input
              placeholder="Hair Color"
              type="text"
              value={hairColor}
              onChange={(e) => {
                setHairColor(e.target.value);
              }}
            />
            <Input
              placeholder="Eye Color"
              type="text"
              value={eyeColor}
              onChange={(e) => {
                setEyeColor(e.target.value);
              }}
            />
            <Input
              placeholder="Profession"
              type="text"
              value={profession}
              onChange={(e) => {
                setProfession(e.target.value);
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

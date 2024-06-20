import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Autocomplete,
  Input,
  Select,
  Option,
  Slider,
  Button,
  Typography,
} from "@mui/joy";
import axios from "axios";
import { API } from "../../../constants";

function SearchBar({ setUsers }) {
  const [interestsData, setInterestsData] = useState([]);
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [years, setYears] = useState([0, 100]);
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [children, setChildren] = useState("");
  const [height, setHeight] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [profession, setProfession] = useState("");

  useEffect(() => {
    axios.get(`${API}/data/interests`).then((resp) => {
      setInterestsData(resp.data);
    });
  }, []);

  function handleOnClickButton() {
    const json = {
      surname: surname,
      name: name,
      gender: gender ? gender : "",
      years: years,
      city: city,
      maritalStatus: maritalStatus ? maritalStatus : "",
      children: children,
      height: height,
      hairColor: hairColor,
      eyeColor: eyeColor,
      profession: profession,
      interests: interests.map((interest) => {
        return interest.id;
      }),
    };
    axios.post(`${API}/data/users`, json).then((resp) => {
      setUsers(resp.data);
    });
  }

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      padding={2}
      style={{
        background: "black",
        borderRadius: "0 0 10px 10px",
        width: "80%",
      }}
    >
      <Stack direction="column" alignItems="center" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1} width="100%">
          <Input
            style={{ width: "50%" }}
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            style={{ width: "50%" }}
            placeholder="Surname"
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} width="100%">
          <Select
            value={gender}
            placeholder="Gender"
            onChange={(_, newValue) => {
              setGender(newValue);
            }}
            style={{ width: "50%" }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={-2}
            width="50%"
            style={{ marginTop: "-5px" }}
          >
            <Typography level="body-sm">Years old</Typography>
            <Slider
              style={{ width: "95%" }}
              getAriaLabel={() => "Years range"}
              valueLabelDisplay="auto"
              value={years}
              onChange={(_, newValue) => {
                setYears(newValue);
              }}
              getAriaValueText={(value) => {
                `${value} years old`;
              }}
            />
          </Stack>
        </Stack>
        <Autocomplete
          multiple
          placeholder="Interests"
          limitTags={1}
          value={interests}
          onChange={(_, value) => {
            setInterests(value);
          }}
          options={interestsData}
          getOptionLabel={(option) => option.interest}
          sx={{ width: "100%" }}
        />
        <Stack direction="row" alignItems="center" spacing={1} width="100%">
          <Input
            style={{ width: "50%" }}
            placeholder="City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <Input
            style={{ width: "50%" }}
            placeholder="Number of children"
            type="number"
            value={children}
            onChange={(e) => {
              setChildren(e.target.value);
            }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} width="100%">
          <Input
            style={{ width: "50%" }}
            placeholder="Height (cm)"
            type="number"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
            }}
          />
          <Input
            style={{ width: "50%" }}
            placeholder="Hair Color"
            type="text"
            value={hairColor}
            onChange={(e) => {
              setHairColor(e.target.value);
            }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} width="100%">
          <Input
            style={{ width: "50%" }}
            placeholder="Eye Color"
            type="text"
            value={eyeColor}
            onChange={(e) => {
              setEyeColor(e.target.value);
            }}
          />
          <Input
            style={{ width: "50%" }}
            placeholder="Profession"
            type="text"
            value={profession}
            onChange={(e) => {
              setProfession(e.target.value);
            }}
          />
        </Stack>
        <Select
          value={maritalStatus}
          placeholder="Marital Status"
          onChange={(e, newValue) => {
            setMaritalStatus(newValue);
          }}
          sx={{ width: "100%" }}
        >
          <Option value={true}>Married</Option>
          <Option value={false}>Not Married</Option>
        </Select>
        <Button
          sx={{ width: "100%" }}
          type="button"
          onClick={handleOnClickButton}
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
}

export default SearchBar;

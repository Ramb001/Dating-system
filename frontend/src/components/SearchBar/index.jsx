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
            style={{ width: "100%" }}
            placeholder="Surname"
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />
          <Input
            style={{ width: "100%" }}
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={1}
          width="100%"
        >
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
            width="100%"
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
              width="100%"
            >
              <Select
                value={gender}
                placeholder="Gender"
                onChange={(_, newValue) => {
                  setGender(newValue);
                }}
                style={{ width: "40%" }}
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
              </Select>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={-2}
                width="100%"
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
            <Input
              sx={{ width: "100%" }}
              placeholder="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </Stack>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1.7}
            width="100%"
          >
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
            <Button
              sx={{ width: "100%" }}
              type="button"
              onClick={handleOnClickButton}
            >
              Search
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default SearchBar;

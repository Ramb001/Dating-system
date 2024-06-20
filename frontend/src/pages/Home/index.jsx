import { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import styles from "./Home.module.scss";
import axios from "axios";
import { API } from "../../../constants";
import { Stack, Table, Typography, Box, CircularProgress } from "@mui/joy";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const json = {
      surname: "",
      name: "",
      gender: "",
      years: [0, 100],
      city: "",
      maritalStatus: "",
      children: "",
      height: "",
      hairColor: "",
      eyeColor: "",
      profession: "",
      interests: [],
    };
    axios.post(`${API}/data/users`, json).then((resp) => {
      setUsers(resp.data);
    });
  }, []);

  if (!users) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={"100%"}
        height={"100svh"}
      >
        <CircularProgress
          sx={{
            "&>svg": { "&>.MuiCircularProgress-progress": { stroke: "black" } },
          }}
        />
      </Box>
    );
  }

  return (
    <Stack direction="column" alignItems="center" spacing={5} padding="20px">
      <Stack direction="column" spacing={2}>
        <Typography level="title-lg">All users</Typography>
        <Table variant="plain">
          <thead>
            <tr>
              <th>Full name</th>
              <th>Years</th>
              <th>Gender</th>
              <th>City</th>
              <th>Marital status</th>
              <th>Profession</th>
              <th>Interests</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.surname + " " + user.name}</td>
                  <td>{user.years}</td>
                  <td>{user.gender}</td>
                  <td>{user.city}</td>
                  <td>{user.marital_status ? "Married" : "Not married"}</td>
                  <td>{user.profession}</td>
                  <td>
                    {user.expand.interests.map((interest) => {
                      return <span>{interest.interest + " "}</span>;
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Stack>
      <Stack direction="column" spacing={2}>
        <Typography level="title-lg">Males</Typography>
        <Table variant="plain">
          <thead>
            <tr>
              <th>Full name</th>
              <th>Years</th>
              <th>Gender</th>
              <th>City</th>
              <th>Marital status</th>
              <th>Profession</th>
              <th>Interests</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.gender === "male")
              .map((user) => {
                return (
                  <tr>
                    <td>{user.surname + " " + user.name}</td>
                    <td>{user.years}</td>
                    <td>{user.gender}</td>
                    <td>{user.city}</td>
                    <td>{user.marital_status ? "Married" : "Not married"}</td>
                    <td>{user.profession}</td>
                    <td>
                      {user.expand.interests.map((interest) => {
                        return <span>{interest.interest + " "}</span>;
                      })}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Stack>
      <Stack direction="column" spacing={2}>
        <Typography level="title-lg">Females</Typography>
        <Table variant="plain">
          <thead>
            <tr>
              <th>Full name</th>
              <th>Years</th>
              <th>Gender</th>
              <th>City</th>
              <th>Marital status</th>
              <th>Profession</th>
              <th>Interests</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.gender === "female")
              .map((user) => {
                return (
                  <tr>
                    <td>{user.surname + " " + user.name}</td>
                    <td>{user.years}</td>
                    <td>{user.gender}</td>
                    <td>{user.city}</td>
                    <td>{user.marital_status ? "Married" : "Not married"}</td>
                    <td>{user.profession}</td>
                    <td>
                      {user.expand.interests.map((interest) => {
                        return <span>{interest.interest + " "}</span>;
                      })}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Stack>
    </Stack>
  );
}

export default Home;

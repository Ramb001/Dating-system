import { Stack, Table, Typography } from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../../constants";

function Likes() {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/data/likes`, { user_id: localStorage.getItem("user_id") })
      .then((resp) => {
        setLikes(resp.data);
      });
  }, []);

  return (
    <Stack direction="column" padding="20px">
      <Typography level="title-lg">You was liked by</Typography>
      <Table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>City</th>
            <th>Marital Status</th>
            <th>Children</th>
            <th>Interests</th>
          </tr>
        </thead>
        <tbody>
          {likes.map((userLiked) => {
            return (
              <tr>
                <td>
                  <img
                    style={{ borderRadius: "50%" }}
                    src={`${POCKETBASE_API}/api/files/users/${userData?.id}/${userData?.avatar}`}
                    width={32}
                    height={32}
                  />
                </td>
                <td>{userLiked.surname + " " + userLiked.name}</td>
                <td>{userLiked.years}</td>
                <td>{userLiked.gender}</td>
                <td>{userLiked.city}</td>
                <td>{userLiked.marital_status ? "Married" : "Not married"}</td>
                <td>{userLiked.children}</td>
                <td>
                  {userLiked.expand.interests.map((interest) => {
                    return <span>{interest.interest}</span>;
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Stack>
  );
}

export default Likes;

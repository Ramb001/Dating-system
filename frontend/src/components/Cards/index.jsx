import { Box, CardCover, Stack, Card, CardContent, Typography } from "@mui/joy";
import { API, POCKETBASE_API } from "../../../constants";
import { useEffect, useState } from "react";
import Like from "../../assets/like.svg";
import Dislike from "../../assets/dislike.svg";
import { useSelector } from "react-redux";
import axios from "axios";

function UserCard({ user }) {
  const [status, setStatus] = useState(null);

  return (
    <Card sx={{ minHeight: "450px", width: 320, transition: "all 0.5s" }}>
      <CardCover>
        <img
          src={`${POCKETBASE_API}/api/files/users/${user.id}/${user.avatar}`}
          height={240}
          width={120}
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
        }}
      />
      <CardContent sx={{ justifyContent: "flex-end", gap: 0 }}>
        <Typography level="title-lg" textColor="#fff">
          {user.surname + " " + user.name}
        </Typography>
        <Typography textColor="neutral.300">
          {user.years + " years old, " + user.gender}
        </Typography>
        <Typography textColor="neutral.300">{user.city}</Typography>
      </CardContent>
    </Card>
  );
}

function Cards({ users, setUsers }) {
  const auth = useSelector((state) => state.auth);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [users]);

  function handleClick(status) {
    axios
      .post(`${API}/like`, {
        sender: auth.user_id,
        receiver: users[count].id,
        status: status,
      })
      .then((resp) => {
        if (resp.data.status) {
          if (users.length < count + 1) {
          } else {
            setCount(count + 1);
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
      style={{ marginBottom: "50px" }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        spacing={10}
        alignItems="center"
      >
        {users[count] && (
          <>
            <img
              src={Dislike}
              style={{
                background: "black",
                borderRadius: "50%",
                padding: "16px",
                cursor: "pointer",
              }}
              width={48}
              height={48}
              alt="dislike"
              onClick={() => {
                handleClick("dislike");
              }}
            />
            <UserCard user={users[count]} />
            <img
              src={Like}
              style={{
                background: "black",
                borderRadius: "50%",
                padding: "16px",
                cursor: "pointer",
              }}
              width={48}
              height={48}
              alt="like"
              onClick={() => {
                handleClick("like");
              }}
            />
          </>
        )}
      </Stack>
    </Box>
  );
}

export default Cards;

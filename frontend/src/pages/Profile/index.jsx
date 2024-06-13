import {
  Textarea,
  Box,
  Stack,
  Typography,
  CircularProgress,
  Divider,
  Card,
  Modal,
  ModalDialog,
  ModalClose,
  List,
  DialogTitle,
  ListItem,
  Checkbox,
  Input,
  Select,
  Option,
} from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API, POCKETBASE_API } from "../../../constants";
import EditIcon from "../../assets/edit-icon.svg";
import DoneIcon from "../../assets/done-icon.svg";

function Profile() {
  const auth = useSelector((state) => state.auth);

  const [userData, setUserData] = useState(null);
  const [userDublicate, setUserDublicate] = useState(userData);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/users/info`, { params: { user_id: auth.user_id } })
      .then((resp) => {
        setUserData(resp.data);
        axios.get(`${API}/data/interests`).then((resp) => {
          setInterests(resp.data);
        });
      });
  }, []);

  useEffect(() => {
    setUserDublicate(userData);
  }, [userData]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    axios
      .post(
        `${API}/users/edit/avatar`,
        { user_id: auth.user_id, file: file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [editDescription, setEditDescription] = useState(false);
  const [editInterests, setEditInterests] = useState(false);
  const [editInfo, setEditInfo] = useState(false);

  useEffect(() => {
    if (
      (!editDescription && userData !== userDublicate) ||
      (!editInfo && userData !== userDublicate)
    ) {
      axios.post(`${API}/users/edit/info`, userDublicate).then(() => {
        axios
          .get(`${API}/users/info`, { params: { user_id: auth.user_id } })
          .then((resp) => {
            setUserData(resp.data);
          });
      });
    }
  }, [editDescription, editInfo]);

  useEffect(() => {
    if (!editInterests && userData?.interests !== userDublicate?.interests) {
      axios
        .post(`${API}/users/edit/interests`, {
          user_id: auth.user_id,
          interests: userDublicate["interests"],
        })
        .then(() => {
          axios
            .get(`${API}/users/info`, { params: { user_id: auth.user_id } })
            .then((resp) => {
              setUserData(resp.data);
            });
        });
    }
  }, [editInterests]);

  if (!userData) {
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
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={0}
        divider={<Divider />}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          gap={4}
          padding={2}
        >
          {userData?.avatar ? (
            <img
              style={{ borderRadius: "50%" }}
              src={`${POCKETBASE_API}/api/files/users/${userData?.id}/${userData?.avatar}`}
              width={256}
              height={256}
            />
          ) : (
            <Input
              type="file"
              style={{ aspectRatio: 1 }}
              placeholder="Upload your avatar"
              onChange={handleFileUpload}
            />
          )}
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={5}
          >
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={!editInfo ? 0 : 1}
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                {!editInfo && auth.user_id === userData?.id ? (
                  <Typography level="h1">
                    {userData?.surname + " " + userData?.name}
                  </Typography>
                ) : (
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Input
                      size="md"
                      placeholder="Surname"
                      value={userDublicate?.surname}
                      onChange={(e) => {
                        setUserDublicate({
                          ...userDublicate,
                          surname: e.target.value,
                        });
                      }}
                    />
                    <Input
                      size="md"
                      placeholder="Name"
                      value={userDublicate?.name}
                      onChange={(e) => {
                        setUserDublicate({
                          ...userDublicate,
                          name: e.target.value,
                        });
                      }}
                    />
                  </Stack>
                )}
                <img
                  src={!editInfo ? EditIcon : DoneIcon}
                  width={24}
                  height={24}
                  alt="edit-icon"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setEditInfo(!editInfo);
                  }}
                />
              </Stack>
              {!editInfo && auth.user_id === userData?.id ? (
                <Typography level="body-lg">
                  {userData?.years} years old, {userData?.gender}
                </Typography>
              ) : (
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Input
                    type="number"
                    size="md"
                    placeholder="Years old"
                    value={userDublicate?.years}
                    onChange={(e) => {
                      setUserDublicate({
                        ...userDublicate,
                        years: e.target.value,
                      });
                    }}
                  />
                  <Select
                    value={userDublicate?.gender}
                    onChange={(e, newValue) => {
                      setUserDublicate({
                        ...userDublicate,
                        gender: newValue,
                      });
                    }}
                  >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                  </Select>
                </Stack>
              )}
              {!editInfo && auth.user_id === userData?.id ? (
                <Typography level="body-sm">{userData?.city}</Typography>
              ) : (
                <Input
                  size="md"
                  placeholder="City"
                  value={userDublicate?.city}
                  onChange={(e) => {
                    setUserDublicate({
                      ...userDublicate,
                      city: e.target.value,
                    });
                  }}
                />
              )}
            </Stack>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={1}
            >
              <Typography level="h3">Interests</Typography>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {userData?.expand?.interests.map((interest, idx) => {
                  return (
                    <Card variant="outlined" size="sm" key={interest.id}>
                      <Typography level="title-sm">
                        {interest.interest}
                      </Typography>
                    </Card>
                  );
                })}
                {auth.user_id === userData?.id && (
                  <Card
                    variant="outlined"
                    size="sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setEditInterests(!editInterests);
                    }}
                  >
                    <Typography level="title-sm">+</Typography>
                  </Card>
                )}
              </div>
            </Stack>
          </Stack>
        </Box>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={1}
          padding={2}
          width="auto"
        >
          <Stack direction="row" alignItems="center" spacing={1.5} padding={0}>
            <Typography level="h2">Description</Typography>
            <img
              src={!editDescription ? EditIcon : DoneIcon}
              width={24}
              height={24}
              alt="edit-icon"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setEditDescription(!editDescription);
              }}
            />
          </Stack>
          {!editDescription && auth.user_id === userData?.id ? (
            <div dangerouslySetInnerHTML={{ __html: userData?.description }} />
          ) : (
            auth.user_id === userData?.id && (
              <Textarea
                style={{ width: "95vw" }}
                value={userDublicate?.description}
                onChange={(e) => {
                  setUserDublicate({
                    ...userDublicate,
                    description: e.target.value,
                  });
                }}
              />
            )
          )}
        </Stack>
      </Stack>
      <Modal
        open={editInterests}
        onClose={() => {
          setEditInterests(false);
        }}
      >
        <ModalDialog>
          <ModalClose />
          <DialogTitle>Pick your interests</DialogTitle>
          <List
            sx={{
              overflow: "scroll",
              mx: "calc(-1 * var(--ModalDialog-padding))",
              px: "var(--ModalDialog-padding)",
            }}
          >
            {interests.map((interest, index) => {
              return (
                <ListItem key={index}>
                  <Checkbox
                    checked={userDublicate?.interests.includes(interest.id)}
                    onChange={(e) => {
                      let temp = [...userDublicate?.interests];
                      if (e.target.checked) {
                        temp.push(interest.id);
                      } else {
                        temp.splice(temp.indexOf(interest.id), 1);
                      }
                      setUserDublicate({ ...userDublicate, interests: temp });
                    }}
                  />
                  <span>{interest.interest}</span>
                </ListItem>
              );
            })}
          </List>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default Profile;

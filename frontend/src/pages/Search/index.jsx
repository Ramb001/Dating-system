import { Box, Stack } from "@mui/joy";
import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import Cards from "../../components/Cards";

function Search() {
  const [users, setUsers] = useState(null);

  return (
    <Stack
      display="flex"
      direction="column"
      spacing={5}
      alignItems="center"
      style={{ width: "100%" }}
    >
      <SearchBar setUsers={setUsers} />
      {users && <Cards users={users} setUsers={setUsers} />}
    </Stack>
  );
}

export default Search;

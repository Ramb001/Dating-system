import { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import styles from "./Home.module.scss";
import axios from "axios";
import { API } from "../../../constants";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const json = {
      surname: "",
      name: "",
      gender: "",
      years: "",
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

  return <></>;
}

export default Home;

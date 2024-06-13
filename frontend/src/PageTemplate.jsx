import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { useSelector } from "react-redux";

function PageTemplate() {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <NavigationBar user={auth.user_id} />
      <div style={{ marginTop: "68px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default PageTemplate;

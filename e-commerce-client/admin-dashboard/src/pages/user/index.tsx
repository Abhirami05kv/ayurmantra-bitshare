import { useState } from "react";
import UserTable from "./UserTable";
import { CustomDrawer } from "../../components/CustomDrawer";
import UserForm from "./UserForm";

function User() {
  const [mode, setMode] = useState<DrawerModeProps>({ isAdd: true });
  const [openDrawer, setDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const handleSetMode = (key: keyof DrawerModeProps, status: boolean) => {
    const temp = { ...mode };
    temp.isAdd = false;
    temp.isEdit = false;
    temp[key] = status;
    setMode(temp);
    setDrawer(true);
  };

  return (
    <>
      <UserTable changeMode={handleSetMode} setSelectedUser={setSelectedUser}/>
      <CustomDrawer
        open={openDrawer}
        onClose={() => setDrawer(false)}
        drawerHeading={
          mode.isAdd ? "Create User" : mode.isEdit ? "Edit User" : ""
        }
      >
        <UserForm onClose={() => setDrawer(false)} selectedUser={selectedUser} mode={mode}/>
      </CustomDrawer>
    </>
  );
}

export default User;

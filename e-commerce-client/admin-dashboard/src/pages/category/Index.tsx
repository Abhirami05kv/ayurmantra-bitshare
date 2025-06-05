import { Grid2 } from "@mui/material";
import CategoryTable from "./CategoryTable";
import { useState } from "react";
import { CustomDrawer } from "../../components/CustomDrawer";
import CategoryForm from "./CategoryForm";
import CustomButton from "../../components/CustomButton";






function Category() {
  const [openDrawer, setDrawer] = useState(false);
  const [mode, setMode] = useState<DrawerModeProps>({
    isEdit: false,
    isAdd: true,
  });
  const [selectedCategory, setSelectedCategory] = useState<CategoryDataProps | null>(null);
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
      <Grid2 container justifyContent="end" mb={5}>
        <CustomButton
          title="Add Category"
          onClick={() => handleSetMode("isAdd", true)}
        />
      </Grid2>
      <CategoryTable changeMode={handleSetMode} setSelectedCategory={setSelectedCategory}/>
      <CustomDrawer
        open={openDrawer}
        onClose={() => setDrawer(false)}
        drawerHeading={
          mode.isAdd ? "Create Category" : mode.isEdit ? "Edit Category" : ""
        }
      >
        <CategoryForm onClose={() => setDrawer(false)} mode={mode} selectedCategory={selectedCategory}/>
      </CustomDrawer>
    </>
  );
}

export default Category;

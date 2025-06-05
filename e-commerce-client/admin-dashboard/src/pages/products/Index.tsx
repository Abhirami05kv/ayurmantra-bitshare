import { useState } from "react";
import ProductTable from "./ProductTable";
import { CustomDrawer } from "../../components/CustomDrawer";
import {  Grid2 } from "@mui/material";
import ProductForm from "./ProductForm";
import CustomButton from "../../components/CustomButton";


function Products() {
  const [mode, setMode] = useState<DrawerModeProps>({ isAdd: true });
  const [openDrawer, setDrawer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
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
        <CustomButton title="Add Product" onClick={() => handleSetMode("isAdd", true)} />
      </Grid2>
      <ProductTable changeMode={handleSetMode} setSelectedProduct={setSelectedProduct}/>

      <CustomDrawer
        open={openDrawer}
        onClose={() => setDrawer(false)}
        drawerHeading={
          mode.isAdd ? "Create Product" : mode.isEdit ? "Edit Product" : ""
        }
      >
        <ProductForm onClose={() => setDrawer(false)} mode={mode} selectedProduct={selectedProduct}/>
      </CustomDrawer>
    </>
  );
}

export default Products;

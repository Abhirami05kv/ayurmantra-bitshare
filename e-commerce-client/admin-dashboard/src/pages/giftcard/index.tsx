import { Grid2 } from "@mui/material";
import GiftcardTable from "./GiftcardTable";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { CustomDrawer } from "../../components/CustomDrawer";
import GiftcardForm from "./GiftcardForm";

function GiftcardManagement() {
  const [openDrawer, setDrawer] = useState(false);
  const [mode, setMode] = useState<DrawerModeProps>({
    isEdit: false,
    isAdd: true,
  });
  const [selectedGiftCard, setSelectedGiftCard] = useState<GiftCard | null>(null);
  const handleSetMode = (key: keyof DrawerModeProps, status: boolean) => {
    const temp = { ...mode };
    temp.isAdd = false;
    temp.isEdit = false;
    temp[key] = status;
    setMode(temp);
    setDrawer(true);
  };
  return (
    <div>
      <Grid2 container justifyContent="end" mb={5}>
        <CustomButton
          title="Add Giftcard"
          onClick={() => handleSetMode("isAdd", true)}
        />
      </Grid2>
      <GiftcardTable changeMode={handleSetMode} setSelectedGiftCard={setSelectedGiftCard}/>
      <CustomDrawer
        open={openDrawer}
        onClose={() => setDrawer(false)}
        drawerHeading={
          mode.isAdd ? "Create Giftcard" : mode.isEdit ? "Edit Giftcard" : ""
        }
      >
        <GiftcardForm selectedGiftCard={selectedGiftCard} onClose={() => setDrawer(false)} mode={mode}/>
      </CustomDrawer>
    </div>
  );
}

export default GiftcardManagement;

import  { useState } from "react";
import CouponTable from "./CouponTable";
import CustomButton from "../../components/CustomButton";
import { CustomDrawer } from "../../components/CustomDrawer";
import { Grid2 } from "@mui/material";
import CouponForm from "./CouponForm";

function Coupon() {
  const [openDrawer, setDrawer] = useState(false);
  const [mode, setMode] = useState<DrawerModeProps>({
    isEdit: false,
    isAdd: true,
  });
  const [selectedCoupon, setSelectedCoupon] = useState<{
    coupon_code?: string;
    discount_percentage?: string;
    discount_type?: string;
    discount_value?: string;
    expiry_date?: string;
    id?: number;
    isUsed?: boolean;
    is_active?: boolean;
    min_purchase?: number;
    usage_limit?: number;
    used_count?: number;
  } >({});
  
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
          title="Add Coupon"
          onClick={() => handleSetMode("isAdd", true)}
        />
      </Grid2>
      <CouponTable changeMode={handleSetMode} setSelectedCoupon={setSelectedCoupon}/>
      <CustomDrawer
        open={openDrawer}
        onClose={() => setDrawer(false)}
        drawerHeading={
          mode.isAdd ? "Create Coupon" : mode.isEdit ? "Edit Coupon" : ""
        }
      >
        <CouponForm onClose={() => setDrawer(false)} mode={mode} selectedCoupon={selectedCoupon}/>
      </CustomDrawer>
    </>
  );
}

export default Coupon;

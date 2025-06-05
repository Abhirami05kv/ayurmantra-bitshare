import { useState } from "react";
import OrderDetails from "./OrderDetails";
import { CustomDrawer } from "../../../components/CustomDrawer";
import OrderForm from "./OrderForm";
import useSingleOrderList from "../../../hooks/useSingleOrderList";
import { useParams } from "react-router-dom";


function OrderInformation() {
  const [mode, setMode] = useState<DrawerModeProps>({ isAdd: true });
    const [openDrawer, setDrawer] = useState(false);
    const { id } = useParams();
    const handleSetMode = (key: keyof DrawerModeProps, status: boolean) => {
      const temp = { ...mode };
      temp.isAdd = false;
      temp.isEdit = false;
      temp[key] = status;
      setMode(temp);
      setDrawer(true);
    }
    const { data: order=[] } = useSingleOrderList(id || "");
    console.log(order);
    
  return (
    <>
      <OrderDetails   changeMode={handleSetMode} order={order.data}/>
      <CustomDrawer  open={openDrawer}
        onClose={() => setDrawer(false)}
        drawerHeading={
          mode.isEdit ? "Edit Order" : ""
        }
      >
        <OrderForm  onClose={() => setDrawer(false)} order={order.data}/>
      </CustomDrawer>
    </>
  );
}

export default OrderInformation;

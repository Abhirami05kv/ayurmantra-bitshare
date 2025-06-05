import DashboardTiles from "./DashboardTiles";
import { Grid2 } from "@mui/material";
import DashboardTable from "./DashboardTable";

function Dashboard() {
  return (
    <>
      <DashboardTiles />
      <Grid2 container>
        <Grid2 size={12}>
          <DashboardTable />
        </Grid2>
        {/* <Grid2 size={4}>
          <ProductLineChart />
        </Grid2> */}
      </Grid2>
    </>
  );
}

export default Dashboard;
  
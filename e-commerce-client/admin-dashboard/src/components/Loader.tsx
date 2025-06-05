import { CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <section className="flex justify-center items-center">
     <CircularProgress size="25px" />
    </section>
  );
};

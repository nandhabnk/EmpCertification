import { Backdrop, CircularProgress } from "@mui/material";

const BackdropOverlay = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropOverlay;

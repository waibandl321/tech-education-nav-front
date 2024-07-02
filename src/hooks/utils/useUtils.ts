import { useMediaQuery } from "@mui/material";

export default function useUtils() {
  const isWindowSizeSm = useMediaQuery("(max-width:600px)");
  const isWindowSizeMdSm = useMediaQuery("(max-width:900px)");
  const isWindowSizeMd = useMediaQuery("(max-width:1200px)");
  return {
    isWindowSizeSm,
    isWindowSizeMdSm,
    isWindowSizeMd,
  };
}

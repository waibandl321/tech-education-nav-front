import useUtils from "@/hooks/utils/useUtils";
import { Button } from "@mui/material";
/**
 * コンバージョンリンク
 */
export default function ConversionButton() {
  const { isWindowSizeSm } = useUtils();
  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      href="#reservationForm"
      sx={{
        py: 2,
        bgcolor: "#f9ac0c",
        color: "white",
        "&:hover": {
          bgcolor: "#f9ac0c",
          opacity: 0.9,
        },
        fontSize: isWindowSizeSm ? 20 : 24,
        fontWeight: "bold",
        borderRadius: 3,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      無料体験セッションを
      <br style={{ display: isWindowSizeSm ? "block" : "none" }} />
      受けてみる
    </Button>
  );
}

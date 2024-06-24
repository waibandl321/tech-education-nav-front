import { Button, useMediaQuery } from "@mui/material";
/**
 * コンバージョンリンク
 */
export default function ConversionButton() {
  const isMobile = useMediaQuery("(max-width:640px)");
  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      sx={{
        py: 3,
        fontSize: isMobile ? 20 : 24,
        fontWeight: "bold",
        borderRadius: 999,
      }}
    >
      無料体験セッションを
      <br style={{ display: isMobile ? "block" : "none" }} />
      受けてみる
    </Button>
  );
}

import { Button, useMediaQuery } from "@mui/material";
/**
 * コンバージョンリンク
 */
export default function ConversionButton({ isLightBg = false }) {
  const isMobile = useMediaQuery("(max-width:640px)");
  return (
    // <Button
    //   variant="contained"
    //   size="large"
    //   fullWidth
    //   sx={{
    //     py: 2,
    //     bgcolor: "#f9ac0c", // イエローをボタンの色にして目立たせる
    //     color: "#fff", // ダークブルーのテキストカラー
    //     "&:hover": {
    //       bgcolor: "#f9ac0c", // ホバー時も同じカラーを維持
    //     },
    //     fontSize: isMobile ? 20 : 24,
    //     fontWeight: "bold",
    //     borderRadius: 3,
    //     boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    //   }}
    // >
    //   無料体験セッションを
    //   <br style={{ display: isMobile ? "block" : "none" }} />
    //   受けてみる
    // </Button>
    <Button
      variant="contained"
      size="large"
      fullWidth
      sx={{
        py: 2,
        // bgcolor: isLightBg ? "#f9ac0c" : "#69d5cb",
        bgcolor: isLightBg ? "#f9ac0c" : "#f9ac0c",
        color: "white", // ボタンのテキストを白色に
        "&:hover": {
          // bgcolor: isLightBg ? "#f9ac0c" : "#69d5cb",
          bgcolor: isLightBg ? "#f9ac0c" : "#f9ac0c",
          opacity: 0.9,
        },
        fontSize: isMobile ? 20 : 24,
        fontWeight: "bold",
        borderRadius: 3,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // ほのかなシャドウで立体感を出す
      }}
    >
      無料体験セッションを
      <br style={{ display: isMobile ? "block" : "none" }} />
      受けてみる
    </Button>
  );
}

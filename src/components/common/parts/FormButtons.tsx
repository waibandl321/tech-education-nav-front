import { Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Formのボタン コンポーネント
 */
export default function FormButtons({
  submitText,
  backText,
  handleSubmit,
  handleBack,
}: {
  submitText?: string;
  backText?: string;
  handleSubmit?: () => void;
  handleBack?: () => void;
}) {
  // sp device
  const isSpDevice = useMediaQuery("(max-width:480px)");

  return (
    <>
      {submitText && (
        <Box textAlign="center" sx={{ mt: 4, px: 2 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              width: isSpDevice ? "100%" : 400,
              height: 60,
              fontSize: 20,
            }}
            onClick={handleSubmit}
          >
            {submitText}
          </Button>
        </Box>
      )}

      {backText && (
        <Box textAlign="center" sx={{ mt: 4, px: 2 }}>
          <Button
            color="inherit"
            variant="outlined"
            size="large"
            sx={{
              width: isSpDevice ? "100%" : 400,
              height: 60,
              fontSize: 20,
            }}
            onClick={handleBack}
          >
            {backText}
          </Button>
        </Box>
      )}
    </>
  );
}

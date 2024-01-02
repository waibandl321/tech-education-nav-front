import { Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Formのボタン コンポーネント
 */
export default function FormButtons({
  submitText,
  backText,
  isDisabled,
  handleSubmit,
  handleBack,
}: {
  submitText?: string;
  backText?: string;
  isDisabled?: boolean;
  handleSubmit?: () => void;
  handleBack?: () => void;
}) {
  // sp device
  const isSpDevice = useMediaQuery("(max-width:640px)");

  return (
    <>
      {submitText && (
        <Box textAlign="center" sx={{ mt: 4, px: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              width: isSpDevice ? "100%" : 400,
              height: 52,
              fontSize: 18,
            }}
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            {submitText}
          </Button>
        </Box>
      )}

      {backText && (
        <Box textAlign="center" sx={{ mt: 2, px: 2 }}>
          <Button
            color="inherit"
            variant="outlined"
            size="large"
            sx={{
              width: isSpDevice ? "100%" : 400,
              height: 52,
              fontSize: 18,
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

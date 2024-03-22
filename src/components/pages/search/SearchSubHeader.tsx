import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function SearchSubHeader({
  breadcrumbs,
  title,
}: {
  breadcrumbs: React.JSX.Element[];
  title?: string;
}) {
  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ px: 1, pt: 2, fontSize: 12 }}
      >
        {breadcrumbs}
      </Breadcrumbs>
      {title && (
        <Typography component={"h1"} padding={1} fontWeight={700}>
          {title}
        </Typography>
      )}
    </>
  );
}

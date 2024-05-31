import { Button, Container } from "@mui/material";
import Link from "next/link";

export default function ContentsIndex() {
  return (
    <Container>
      <Button LinkComponent={Link} href="/contents/educational-materials">
        学習コンテンツ
      </Button>
    </Container>
  );
}

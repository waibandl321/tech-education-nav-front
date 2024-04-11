import { useAppSelector } from "@/lib/hooks";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/router";

export default function ReduxPage() {
  const router = useRouter();
  const count = useAppSelector((state) => state.counter.value);

  return (
    <Container maxWidth="sm">
      {count}
      <Button variant="contained" onClick={() => router.push("/test/redux")}>
        Redux Test Top
      </Button>
    </Container>
  );
}

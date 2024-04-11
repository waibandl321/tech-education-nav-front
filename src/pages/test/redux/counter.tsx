import { decrement, increment } from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/router";

export default function ReduxPage() {
  const router = useRouter();
  // state` 引数はすでに `RootState` として正しく型付けされている
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Container maxWidth="sm">
      <div>
        <Button
          variant="contained"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
        <span>{count}</span>
        <Button
          variant="contained"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </Button>
      </div>
      <div>
        <Button onClick={() => router.push("/test/redux/counter2")}>
          別のページへ
        </Button>
      </div>
    </Container>
  );
}

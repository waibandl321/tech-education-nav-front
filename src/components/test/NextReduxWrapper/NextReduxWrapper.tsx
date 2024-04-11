import { useSearchDataSelector } from "@/lib/features/counter/searchDataSlice";
import { useAppSelector } from "@/lib/hooks";

export const NextReduxWrapper = () => {
  const postData = useSearchDataSelector();
  const count = useAppSelector((state) => state.counter.value);

  console.log(postData);
  console.log(count);

  return (
    <div>
      <div>{JSON.stringify(postData)}</div>
    </div>
  );
};

export default NextReduxWrapper;

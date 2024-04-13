import { useRouter } from "next/router";

export default function SearchTypeResults() {
  const router = useRouter();
  return <div>{router.pathname}の検索結果</div>;
}

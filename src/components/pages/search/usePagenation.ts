import { DEFAULT_LIMIT_PER_PAGE } from "@/const";
import { Course } from "@/types/APIDataType";
import { useState } from "react";

interface PostPagination {
  pageNum: number;
  totalCount: number;
}

export default function usePagenation(props: {
  courses: Course[];
  totalCount: number;
  totalPages: number;
}) {
  /**
   * ページネーションデータ管理
   */
  const [pagenation, setPagenation] = useState<PostPagination>({
    pageNum: 1,
    totalCount: props.totalCount,
  });

  /**
   * @returns 現在表示している件数（min ~ max）表示
   */
  const getDisplayCount = () => {
    const min = (pagenation.pageNum - 1) * DEFAULT_LIMIT_PER_PAGE + 1;
    let max = 0;
    if (props.totalPages === pagenation.pageNum) {
      max = props.totalCount;
    } else {
      max = pagenation.pageNum * DEFAULT_LIMIT_PER_PAGE;
    }
    return `${min} ~ ${max}件目`;
  };

  /**
   * ページング変更ハンドラ
   */
  const handleChangePagination = (event: React.ChangeEvent<unknown>, pageNum: number) => {
    setPagenation((prevValue) => ({
      ...prevValue,
      pageNum,
    }));
    scrollTo(0, 0);
  };

  return {
    pagenation,
    getDisplayCount,
    handleChangePagination,
  };
}

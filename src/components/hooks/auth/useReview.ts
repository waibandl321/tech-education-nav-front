import dayjs from "dayjs";

const steps = ["プロフィール", "受講情報", "投稿", "確認"];
export const initReviewFormData = {
  reviewTitle: "",
  reviewDetail: "",
  rating: 0,
  courseStartMonth: null as null | dayjs.Dayjs,
  courseEndMonth: null as null | dayjs.Dayjs,
  isPublished: false,
  isDeleted: false,
};
export type ReviewFormDataType = typeof initReviewFormData;

export default function useReview() {
  return {
    steps,
    initReviewFormData,
  };
}

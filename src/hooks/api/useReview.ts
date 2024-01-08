import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { CourseReview, CreateCourseReviewInput } from "@/API";
import useAPIResponse from "./useAPIResponse";

export default function useReview() {
  const { getErrorMessage } = useAPIResponse();
  const client = generateClient();

  // centerIdとcourseIdに一致するデータを取得
  const apiGetCourseReviewsByIds = async (
    centerId: string,
    courseId: string
  ): Promise<ApiResponse<Array<CourseReview>>> => {
    try {
      const result = await client.graphql({
        authMode: "apiKey",
        query: queries.listCourseReviews,
        variables: {
          filter: {
            learningCenterId: {
              eq: centerId,
            },
            learningCenterCourseId: {
              eq: courseId,
            },
            isPublished: {
              eq: true,
            },
          },
        },
      });
      return {
        isSuccess: true,
        data: result.data.listCourseReviews.items,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error: getErrorMessage(error),
      };
    }
  };

  // 作成
  const apiCreateCourseReview = async (
    reviewInput: CreateCourseReviewInput
  ) => {
    try {
      const result = await client.graphql({
        authMode: "apiKey",
        query: mutations.createCourseReview,
        variables: { input: reviewInput },
      });
      return {
        isSuccess: true,
        data: result.data.createCourseReview,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error: getErrorMessage(error),
      };
    }
  };

  return {
    apiGetCourseReviewsByIds,
    apiCreateCourseReview,
  };
}

import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import {
  CourseReview,
  CreateCourseReviewInput,
  DeleteLearningCenterCourseInput,
  GetCourseReviewQuery,
  LearningCenterCourse,
  UpdateCourseReviewInput,
  UpdateCourseReviewMutation,
} from "@/API";
import useAPIResponse from "./useAPIResponse";
import { ensureString } from "../utils/useConvertData";

export default function useReviewPost() {
  const { getErrorMessage } = useAPIResponse();
  const client = generateClient();
  // 全件取得
  const apiGetCourseReviews = async (): Promise<
    ApiResponse<Array<CourseReview>>
  > => {
    try {
      const result = await client.graphql({
        authMode: "apiKey",
        query: queries.listCourseReviews,
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

  // 詳細取得
  const apiGetCourseReviewById = async (
    id: string | string[]
  ): Promise<ApiResponse<GetCourseReviewQuery["getCourseReview"]>> => {
    try {
      const result = await client.graphql({
        authMode: "apiKey",
        query: queries.getCourseReview,
        variables: { id: ensureString(id) },
      });
      return {
        isSuccess: true,
        data: result.data.getCourseReview ?? null,
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
      const request: CreateCourseReviewInput = {
        ...reviewInput,
      };
      const result = await client.graphql({
        query: mutations.createCourseReview,
        variables: { input: request },
      });
      return {
        isSuccess: true,
        data: result.data.createCourseReview,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error: getErrorMessage(error),
      };
    }
  };

  // 更新
  const apiUpdateCourseReview = async (
    reviewInput: UpdateCourseReviewInput
  ): Promise<ApiResponse<UpdateCourseReviewMutation["updateCourseReview"]>> => {
    try {
      const result = await client.graphql({
        query: mutations.updateCourseReview,
        variables: { input: reviewInput },
      });
      return {
        isSuccess: true,
        data: result.data.updateCourseReview,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error: getErrorMessage(error),
      };
    }
  };

  // 削除
  const apiDeleteCourseReview = async (deleteItem: LearningCenterCourse) => {
    try {
      const request: DeleteLearningCenterCourseInput = {
        id: deleteItem.id,
      };
      const deletedResult = await client.graphql({
        query: mutations.deleteLearningCenterCourse,
        variables: { input: request },
      });
      return {
        isSuccess: true,
        data: deletedResult.data.deleteLearningCenterCourse,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error: getErrorMessage(error),
      };
    }
  };

  return {
    apiGetCourseReviews,
    apiGetCourseReviewsByIds,
    apiGetCourseReviewById,
    apiCreateCourseReview,
    apiUpdateCourseReview,
    apiDeleteCourseReview,
  };
}

import { generateClient } from "aws-amplify/api";
import {
  getLearningCenter,
  getLearningCenterCourse,
  listCourseReviews,
} from "@/graphql/queries";

const client = generateClient();

// centerIdとcourseIdから詳細情報をサーバーサイドで取得する
export const fetchSchoolCourseDetail = async (
  centerId: string,
  courseId: string
) => {
  try {
    const [getCenterResult, getCourseResult] = await Promise.all([
      client.graphql({
        query: getLearningCenter,
        variables: { id: centerId },
        authMode: "apiKey",
      }),
      client.graphql({
        query: getLearningCenterCourse,
        variables: { id: courseId },
        authMode: "apiKey",
      }),
    ]);
    return {
      center: getCenterResult.data.getLearningCenter,
      course: getCourseResult.data.getLearningCenterCourse,
    };
  } catch (error) {
    return {
      center: null,
      course: null,
    };
  }
};

// コースのレビュー一覧を取得する
export const fetchCourseReviews = async (
  centerId: string,
  courseId: string
) => {
  try {
    const result = await client.graphql({
      authMode: "apiKey",
      query: listCourseReviews,
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
      reviews: result.data.listCourseReviews.items,
    };
  } catch (error) {
    console.error("Error fetchCourseReviews:", error);
    return {
      reviews: [],
    };
  }
};

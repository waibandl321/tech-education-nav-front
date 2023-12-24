import { generateClient } from "aws-amplify/api";
import {
  listLearningCenterCourses,
  listLearningCenters,
} from "@/graphql/queries";
import config from "@/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";

Amplify.configure(config);
const client = generateClient();

// スクールとコースの一覧を取得する
export const fetchSchoolData = async () => {
  try {
    const [learningCentersResult, learningCenterCoursesResult] =
      await Promise.all([
        client.graphql({
          query: listLearningCenters,
          authMode: "apiKey",
        }),
        client.graphql({
          query: listLearningCenterCourses,
          authMode: "apiKey",
        }),
      ]);
    return {
      centers: learningCentersResult.data.listLearningCenters.items,
      courses: learningCenterCoursesResult.data.listLearningCenterCourses.items,
    };
  } catch (error) {
    console.error("Error fetching listLearningCenters:", error);
    // エラーハンドリングをここに追加
    return {
      centers: [],
      courses: [],
    };
  }
};

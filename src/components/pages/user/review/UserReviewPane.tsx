import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import useReviewPost from "@/hooks/api/useReviewPost";
import { useEffect, useState } from "react";
import { CourseReview } from "@/API";
import { useLoading } from "@/contexts/LoadingContext";
import dayjs from "dayjs";
import { CentersAndCoursesPropType } from "@/types/CommonType";
import { useAccountContext } from "@/contexts/AccountContext";

export default function UserReview({
  centers,
  courses,
}: CentersAndCoursesPropType) {
  const { accountInfomation } = useAccountContext();
  const { apiGetCourseReviewsByUserId } = useReviewPost();
  const [userReviews, setUserReviews] = useState<Array<CourseReview>>([]);
  const { setLoading } = useLoading();

  const fetchData = async () => {
    if (!accountInfomation.userId) return;
    setLoading(true);
    try {
      const result = await apiGetCourseReviewsByUserId(
        accountInfomation.userId
      );
      setUserReviews(result.data ?? []);
    } catch (error) {
      console.error(error);
      setUserReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accountInfomation.userId]);

  const getTargetCenterName = (learningCenterId: string) => {
    return centers.find((center) => center.id === learningCenterId)?.name ?? "";
  };
  const getTargetCourseName = (courseId: string) => {
    return courses.find((course) => course.id === courseId)?.courseName ?? "";
  };

  return (
    <Container maxWidth="md">
      {userReviews.map((item) => (
        <Card key={item.id} sx={{ mb: 4 }}>
          <CardContent>
            <Typography component="h3" fontWeight={700} variant="h6">
              スクール名: 「{getTargetCenterName(item.learningCenterId)}」
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              受講したコース: {getTargetCourseName(item.learningCenterCourseId)}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {dayjs(item.createdAt).format("YYYY-MM-DD")}にレビュー
            </Typography>
            <Divider sx={{ my: 2 }}></Divider>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">{item.reviewDetail}</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

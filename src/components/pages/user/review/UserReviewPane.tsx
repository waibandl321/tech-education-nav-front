import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import useReviewPost from "@/hooks/api/useReviewPost";
import { useEffect, useMemo, useState } from "react";
import { CourseReview } from "@/API";
import { useLoading } from "@/contexts/LoadingContext";
import dayjs from "dayjs";
import { CentersAndCoursesPropType } from "@/types/CommonType";

export default function UserReview({
  centers,
  courses,
}: CentersAndCoursesPropType) {
  const { apiGetCourseReviewsByUserId } = useReviewPost();
  const [userReviews, setUserReviews] = useState<Array<CourseReview>>([]);
  const { setLoading } = useLoading();

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await apiGetCourseReviewsByUserId();
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
  }, []);

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
              投稿日: {dayjs(item.createdAt).format("YYYY-MM-DD")}
            </Typography>
            <Divider sx={{ my: 2 }}></Divider>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">
                スクールを受講したことで得られた結果
              </Typography>
              <Typography variant="body1">{item.gotResults}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">
                これから受講する後輩へのメッセージ
              </Typography>
              <Typography variant="body1">{item.message}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">
                備考（スクールの改善点など）
              </Typography>
              <Typography variant="body1">{item.otherMemo}</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

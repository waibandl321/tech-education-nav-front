import { Card, CardContent, Rating, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import TerminalIcon from "@mui/icons-material/Terminal";
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
    <>
      <Typography component="h2" variant="h5" marginBottom={3}>
        あなたの投稿
      </Typography>
      {userReviews.length === 0 && (
        <Card sx={{ pb: 6 }} elevation={0}>
          <Typography>投稿はありません。</Typography>
        </Card>
      )}
      {userReviews.map((item) => (
        <Card key={item.id} sx={{ mb: 4 }}>
          <CardContent>
            <Typography fontWeight={700} display="flex" alignItems="center">
              <SchoolIcon sx={{ mr: 1 }} />
              <span>「{getTargetCenterName(item.learningCenterId)}」</span>
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              display="flex"
              alignItems="center"
            >
              <TerminalIcon sx={{ mr: 1 }} />
              <span>{getTargetCourseName(item.learningCenterCourseId)}</span>
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              marginTop={0.5}
            >
              {dayjs(item.createdAt).format("YYYY-MM-DD")}に口コミ
            </Typography>
            <Rating readOnly value={item.rating} size="small" sx={{ mt: 1 }} />
            <Typography variant="body1" marginTop={1} fontWeight={700}>
              {item.reviewTitle}
            </Typography>
            <Typography variant="body1" marginTop={1}>
              {item.reviewDetail}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

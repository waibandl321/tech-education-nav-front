import { CoursePlan, LearningCenter, LearningCenterCourse } from "@/API";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  Divider,
  ListItemText,
  Chip,
  Button,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { orderBy } from "lodash";
import React, { useMemo } from "react";
import { CourseDataBooleanMap } from "@/const";

export default function CourceDetailCard({
  center,
  course,
}: {
  center: LearningCenter;
  course: LearningCenterCourse;
}) {
  // 提供されたプランの中で最安の金額を算出する
  const findMinPlanPrice = (plans: (CoursePlan | null)[]): number | null => {
    // 最初にnullでない価格を持つプランをフィルタリングし、それらの価格から最小値を見つける
    const validPrices = plans
      .map((plan) => plan?.price)
      .filter((price) => price !== null || price !== undefined) as number[];
    if (validPrices.length === 0) {
      // 有効な価格が一つもない場合はnullを返す
      return null;
    }
    return Math.min(...validPrices);
  };

  const chips = useMemo(() => {
    return CourseDataBooleanMap.filter((item) => course[item.key] === true);
  }, [course]);

  return (
    <Card sx={{ m: 1, pb: 2 }} variant="outlined">
      <CardContent>
        <Box key={course.id}>
          <Typography fontSize={12} display="flex" align="center">
            <SchoolIcon sx={{ mr: 1, fontSize: 16 }} />
            <span>{center.name}</span>
          </Typography>
          <Typography fontWeight={700}>{course.courseName}</Typography>
          {course.plans && course.plans.length > 0 && (
            <Typography color="#f82055" fontWeight="bold" whiteSpace="pre-line">
              &yen;{findMinPlanPrice(course.plans)?.toLocaleString() ?? "---"}〜
            </Typography>
          )}

          {course.plans && course.plans.length > 0 && (
            <List>
              {orderBy(course.plans, "price", "asc").map(
                (plan, index) =>
                  plan && (
                    <React.Fragment key={plan.id || index}>
                      <Divider />
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primary={
                            <Typography fontWeight="bold" component="span">
                              {plan?.planName}
                            </Typography>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline", mr: 0.5 }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                受講期間:
                              </Typography>
                              {plan?.duration
                                ? `${plan?.duration}ヶ月`
                                : "無期限"}
                            </React.Fragment>
                          }
                        />
                        <Typography
                          color="#f82055"
                          fontWeight="bold"
                          margin={0}
                        >
                          &yen;{plan?.price?.toLocaleString()}
                        </Typography>
                      </ListItem>
                    </React.Fragment>
                  )
              )}
              <Divider />
            </List>
          )}
          <Box marginTop={2}>
            <Typography fontWeight={700}>コース詳細</Typography>
            <Typography fontSize={14} whiteSpace="pre-line" marginTop={1}>
              {course.couseDetail}
            </Typography>
            <Box marginTop={2}>
              {chips.map((item) => (
                <Chip
                  key={item.key}
                  label={item.name}
                  color={item.color}
                  sx={{ mr: 1, mb: 1, fontWeight: "bold" }}
                />
              ))}
            </Box>
          </Box>
          <Box marginTop={2}>
            <Button
              variant="outlined"
              href={course.courseURL ?? "#"}
              target="_blank"
              fullWidth
              size="large"
            >
              公式サイトを見る
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

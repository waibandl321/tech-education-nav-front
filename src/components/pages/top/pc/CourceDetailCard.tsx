import { CoursePlan, LearningCenter, LearningCenterCourse } from "@/API";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { orderBy } from "lodash";
import Link from "next/link";

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

  return (
    <>
      <Card key={center.id} sx={{ mb: 2, pb: 3 }} variant="outlined">
        <CardContent>
          <Box key={course.id}>
            <Typography fontSize={12} display="flex" align="center">
              <SchoolIcon sx={{ mr: 1, fontSize: 16 }} />
              <span>{center.name}</span>
            </Typography>
            <Typography fontWeight={700}>{course.courseName}</Typography>
            {course.plans && course.plans.length > 0 && (
              <Typography
                color="#f82055"
                fontWeight="bold"
                whiteSpace="pre-line"
                marginBottom={2}
              >
                &yen;{findMinPlanPrice(course.plans)?.toLocaleString() ?? "---"}
                〜
              </Typography>
            )}

            <Typography fontWeight={700}>料金プラン一覧</Typography>

            {course.plans && course.plans.length > 0 && (
              <TableContainer
                key={course.id}
                component={Paper}
                sx={{ mt: 1, border: "none" }}
                variant="outlined"
              >
                <Table size="small" sx={{ tableLayout: "fixed" }}>
                  <TableHead sx={{ backgroundColor: "#eee" }}>
                    <TableRow sx={{ whiteSpace: "nowrap" }}>
                      <TableCell>プラン名</TableCell>
                      <TableCell>受講期間</TableCell>
                      <TableCell>料金</TableCell>
                      <TableCell width={120}>---</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderBy(course.plans, "price", "asc").map(
                      (plan, index) =>
                        plan && (
                          <TableRow key={index}>
                            <TableCell>{plan?.planName}</TableCell>
                            <TableCell>
                              受講期間:{" "}
                              {plan?.duration
                                ? `${plan?.duration}ヶ月`
                                : "無期限"}
                            </TableCell>
                            <TableCell>
                              <Typography
                                color="#f82055"
                                fontWeight="bold"
                                margin={0}
                              >
                                &yen;{plan?.price?.toLocaleString()}
                              </Typography>
                              {/* <Typography fontSize={12}>
                                  月々
                                  {plan?.splitPrice?.toLocaleString()}
                                  円(24回払い)
                                </Typography> */}
                            </TableCell>
                            <TableCell>
                              <div>
                                {plan.planMemo && (
                                  <Link
                                    target="_blank"
                                    href={plan.planMemo}
                                    color="#1976d2"
                                  >
                                    詳細を見る
                                  </Link>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

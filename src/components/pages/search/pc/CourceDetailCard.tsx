import { School, Course } from "@/types/APIDataType";
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
  Chip,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { orderBy } from "lodash";
import Link from "next/link";
import { useMemo } from "react";
import useSearch from "@/hooks/useSearch";

export default function CourceDetailCard({
  center,
  course,
}: {
  center: School;
  course: Course;
}) {
  // hooks
  const {
    findMinPlanPrice,
    getChipsByCourse,
    getLanguageNameById,
    getFrameworkNameById,
    getLibraryNameById,
    getQualificationNameById,
    getJobTypeNameById,
    getDevToolNameById,
    getDevCategoryNameById,
    getDevProductNameById,
  } = useSearch();

  const chips = useMemo(
    () => getChipsByCourse(course),
    [course, getChipsByCourse]
  );

  return (
    <Card sx={{ mb: 2 }} variant="outlined">
      <CardContent>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Box>
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
                >
                  &yen;
                  {findMinPlanPrice(course.plans)?.toLocaleString() ?? "---"}〜
                </Typography>
              )}
            </Box>
            <Box>
              <Link href={course.courseURL ?? "#"} target="_blank">
                公式サイトを見る
              </Link>
            </Box>
          </Box>

          <Typography fontWeight={700} marginTop={2}>
            料金プラン一覧
          </Typography>

          {course.plans && course.plans.length > 0 && (
            <TableContainer
              key={course._id}
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

          <Box marginTop={2}>
            <Typography fontWeight={700}>コース詳細</Typography>
            <Typography fontSize={14} whiteSpace="pre-line" marginTop={1}>
              {course.couseDetail}
            </Typography>
          </Box>

          <Box marginTop={2}>
            <Typography fontWeight={700}>オプション</Typography>
            <Box marginTop={2}>
              {chips.map((item) => (
                <Chip
                  key={item.key}
                  label={item.optionName}
                  color={item.color}
                  sx={{ mr: 1, mb: 1, fontWeight: "bold" }}
                />
              ))}
            </Box>
          </Box>

          {course.jobTypes && course.jobTypes.length > 0 && (
            <Box marginTop={2}>
              <Typography fontWeight={700}>目指す職種</Typography>
              <Box marginTop={2}>
                {course.jobTypes?.map(
                  (v) =>
                    v && (
                      <Chip
                        key={v}
                        label={getJobTypeNameById(v)}
                        sx={{ mr: 1, mb: 1, fontWeight: "bold" }}
                      />
                    )
                )}
              </Box>
            </Box>
          )}

          {course.developmentCategories &&
            course.developmentCategories.length > 0 && (
              <Box marginTop={2}>
                <Typography fontWeight={700}>開発領域</Typography>
                <Box marginTop={2}>
                  {course.developmentCategories.map(
                    (v) =>
                      v && (
                        <Chip
                          key={v}
                          label={getDevCategoryNameById(v)}
                          sx={{ mr: 1, mb: 1, fontWeight: "bold" }}
                        />
                      )
                  )}
                </Box>
              </Box>
            )}

          {course.developmentProducts &&
            course.developmentProducts.length > 0 && (
              <Box marginTop={2}>
                <Typography fontWeight={700}>開発できるプロダクト</Typography>
                <Box marginTop={2}>
                  {course.developmentProducts?.map(
                    (v) =>
                      v && (
                        <Chip
                          key={v}
                          label={getDevProductNameById(v)}
                          sx={{ mr: 1, mb: 1, fontWeight: "bold" }}
                        />
                      )
                  )}
                </Box>
              </Box>
            )}

          {course.programmingLanguages &&
            course.programmingLanguages.length > 0 && (
              <Box marginTop={2}>
                <Typography fontWeight={700}>
                  学べるプログラミング言語
                </Typography>
                <Box marginTop={2}>
                  {course.programmingLanguages.map(
                    (v) =>
                      v && (
                        <Chip
                          key={v}
                          label={getLanguageNameById(v)}
                          sx={{ mr: 1, mb: 1, fontWeight: "bold" }}
                        />
                      )
                  )}
                </Box>
              </Box>
            )}

          {course.frameworks && course.frameworks.length > 0 && (
            <Box marginTop={2}>
              <Typography fontWeight={700}>学べるフレームワーク</Typography>
              <Box marginTop={2}>
                {course.frameworks.map(
                  (v) =>
                    v && (
                      <Chip
                        key={v}
                        label={getFrameworkNameById(v)}
                        sx={{ mr: 1, mb: 1, fontWeight: "bold" }}
                      />
                    )
                )}
              </Box>
            </Box>
          )}

          {course.libraries && course.libraries.length > 0 && (
            <Box marginTop={2}>
              <Typography fontWeight={700}>学べるライブラリ/API</Typography>
              <Box marginTop={2}>
                {course.libraries.map(
                  (v) =>
                    v && (
                      <Chip
                        key={v}
                        label={getLibraryNameById(v)}
                        sx={{ mr: 1, mb: 1, fontWeight: "bold" }}
                      />
                    )
                )}
              </Box>
            </Box>
          )}

          {course.developmentTools && course.developmentTools.length > 0 && (
            <Box marginTop={2}>
              <Typography fontWeight={700}>学べる開発ツール</Typography>
              <Box marginTop={2}>
                {course.developmentTools.map(
                  (v) =>
                    v && (
                      <Chip
                        key={v}
                        label={getDevToolNameById(v)}
                        sx={{ mr: 1, mb: 1, fontWeight: "bold" }}
                      />
                    )
                )}
              </Box>
            </Box>
          )}

          {course.qualifications && course.qualifications.length > 0 && (
            <Box marginTop={2}>
              <Typography fontWeight={700}>学べる資格</Typography>
              <Box marginTop={2}>
                {course.qualifications.map(
                  (v) =>
                    v && (
                      <Chip
                        key={v}
                        label={getQualificationNameById(v)}
                        sx={{ mr: 1, mb: 1, fontWeight: "bold" }}
                      />
                    )
                )}
              </Box>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

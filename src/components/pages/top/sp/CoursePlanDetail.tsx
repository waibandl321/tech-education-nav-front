import { CoursePlan, LearningCenterCourse } from "@/API";
import { Typography } from "@mui/material";
import Link from "next/link";

export default function CoursePlanDetail({
  course,
  plan,
}: {
  course: LearningCenterCourse;
  plan: CoursePlan;
}) {
  return (
    <>
      <Typography>{plan?.planName}</Typography>
      <div>受講期間: {plan?.duration ? `${plan?.duration}ヶ月` : "無期限"}</div>
      <div>
        <Typography color="#f82055" fontWeight="bold" margin={0}>
          &yen;{plan?.price?.toLocaleString()}
        </Typography>
        {/* <Typography fontSize={12}>
          月々
          {plan?.splitPrice?.toLocaleString()}
          円(24回払い)
        </Typography> */}
      </div>
      <div>
        {course.courseURL && (
          <Link target="_blank" href={course.courseURL ?? "#"} color="#1976d2">
            詳細を見る
          </Link>
        )}
      </div>
    </>
  );
}

import {
  Avatar,
  Rating,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Paper,
  useMediaQuery,
  Box,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountBox";
import React from "react";
import { CourseReview } from "@/API";
import { useFormOptions } from "@/hooks/utils/useFormOptions";
import Masonry from "@mui/lab/Masonry";
import dayjs from "dayjs";

export default function ReviewListSection({
  reviewList,
}: {
  reviewList: Array<CourseReview>;
}) {
  const isMobile = useMediaQuery("(max-width:640px)");
  const { getGenderText, getPrefectureText } = useFormOptions();
  const subHeaderText = (item: CourseReview) => {
    return `受講期間: ${item.studyLengthMonths}ヶ月/${
      item.userAge
    }歳/${getGenderText(item.userGender)}/${getPrefectureText(
      item.userPrefecture
    )}`;
  };

  return (
    <Box sx={{ marginLeft: -1, marginRight: -1 }}>
      <Masonry columns={isMobile ? 1 : 2} spacing={2} sx={{ margin: 0 }}>
        {reviewList.map((item) => (
          <Paper key={item.id} elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Card elevation={0}>
              <CardHeader
                avatar={
                  <Avatar aria-label="user icon">
                    <AccountCircle></AccountCircle>
                  </Avatar>
                }
                title={item.userDisplayId}
                subheader={subHeaderText(item)}
                sx={{ p: 0 }}
              />
              <CardContent sx={{ p: 0 }}>
                <Rating readOnly value={item.rating} sx={{ mt: 1 }} />
                <Typography fontWeight={700} marginTop={1}>
                  {item.reviewTitle}
                </Typography>
                <Typography marginTop={1} whiteSpace="pre-line">
                  {item.reviewDetail}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  marginTop={0.5}
                  textAlign="right"
                >
                  {dayjs(item.createdAt).format("YYYY-MM-DD")}に投稿
                </Typography>
              </CardContent>
              {/* <CardActions disableSpacing sx={{ px: 0 }}>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions> */}
            </Card>
          </Paper>
        ))}
      </Masonry>
    </Box>
  );
}

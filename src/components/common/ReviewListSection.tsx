import {
  Avatar,
  List,
  Rating,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountBox";
import React from "react";
import { CourseReview } from "@/API";
import { useFormOptions } from "@/hooks/utils/useFormOptions";

export default function ReviewListSection({
  reviewList,
}: {
  reviewList: Array<CourseReview>;
}) {
  const { getGenderText } = useFormOptions();
  const subHeaderText = (item: CourseReview) => {
    return `${item.userAge}歳 /${getGenderText(item.userGender)}/前職: ${
      item.userPreviousJob
    }`;
  };

  return (
    <List>
      {reviewList.map((item) => (
        <div key={item.id}>
          <Card elevation={0}>
            <CardHeader
              avatar={
                <Avatar aria-label="user icon">
                  <AccountCircle></AccountCircle>
                </Avatar>
              }
              title={item.userDisplayName}
              subheader={subHeaderText(item)}
              sx={{ px: 0 }}
            />
            <CardContent sx={{ p: 0 }}>
              <Rating readOnly value={item.rating} />
              <Typography fontWeight={700}>{item.reviewTitle}</Typography>
              <Typography sx={{ mt: 0.5 }}>{item.reviewDetail}</Typography>
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
          <Divider></Divider>
        </div>
      ))}
    </List>
  );
}

import { sortBy } from "lodash";
import ChevronRight from "@mui/icons-material/ChevronRight";
import {
  Container,
  Grid,
  Paper,
  useMediaQuery,
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  OutlinedInput,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  DevelopmentTool,
  Framework,
  JobType,
  LearningCenter,
  LearningCenterCourse,
  ProgrammingLanguage,
  PaymentMethod,
  CreditCard,
} from "@/API";
import React, { useMemo } from "react";
import {
  AttendanceTypeLabels,
  EspeciallyAudienceLabels,
  PurposeLabels,
  priceOptions,
} from "@/const";
import Image from "next/image";
import dummyImage from "@/assets/img/dirty-code.jpg";
import Link from "next/link";

export default function SearchPane({
  centers,
  courses,
  languages,
  frameworks,
  developmentTools,
  jobTypes,
  paymentMethods,
  creditCards,
}: {
  centers: Array<LearningCenter>;
  courses: Array<LearningCenterCourse>;
  languages: Array<ProgrammingLanguage>;
  frameworks: Array<Framework>;
  developmentTools: Array<DevelopmentTool>;
  jobTypes: Array<JobType>;
  paymentMethods: Array<PaymentMethod>;
  creditCards: Array<CreditCard>;
}) {
  const isMobile = useMediaQuery("(max-width:640px)");
  // スクールにコース一覧を紐付けたデータ
  const items = useMemo(() => {
    return centers.map((center) => {
      const coursesByCenter = courses.filter(
        (v) => v.learningCenterId === center.id
      );
      return {
        ...center,
        courses: coursesByCenter,
      };
    });
  }, [centers, courses]);

  // スクール > コースがplansを持っているかどうか
  const hasPlan = (centerId: string) => {
    return courses
      .filter((v) => v.learningCenterId === centerId)
      .some((course) => course.plans && course.plans.length > 0);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        pt: isMobile ? 3 : 5,
        borderRadius: 0,
        backgroundColor: "#f8f8f8",
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Card>
              <CardContent>{courses.length}件</CardContent>
            </Card>
            <Card sx={{ mt: 2 }}>
              <CardContent>
                {items.map(
                  (center) =>
                    hasPlan(center.id) && (
                      <Box key={center.id} sx={{ mb: 4, pb: 3 }}>
                        <Box>
                          <Typography fontWeight={700} fontSize={18}>
                            {center.name}
                          </Typography>
                          <Typography fontSize={14} sx={{ mt: 1 }}>
                            {center.memo}
                          </Typography>
                          <TableContainer
                            component={Paper}
                            sx={{ mt: 1 }}
                            variant="outlined"
                          >
                            <Table aria-label="simple table" size="small">
                              <TableHead sx={{ backgroundColor: "#eee" }}>
                                <TableRow sx={{ whiteSpace: "nowrap" }}>
                                  <TableCell>運営企業</TableCell>
                                  <TableCell>設立</TableCell>
                                  <TableCell>代表者</TableCell>
                                  <TableCell>---</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  <TableCell>
                                    {center.operatingCompany}
                                  </TableCell>
                                  <TableCell>
                                    {center.establishmentYear}年
                                  </TableCell>
                                  <TableCell>{center.representative}</TableCell>
                                  <TableCell>
                                    <Link
                                      target="_blank"
                                      href={center.websiteURL ?? "#"}
                                    >
                                      公式サイト
                                    </Link>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                        {center.courses.map(
                          (course) =>
                            course.plans &&
                            course.plans.length > 0 && (
                              <Box key={course.id} sx={{ ml: 2, mt: 3 }}>
                                <Typography fontWeight={700}>
                                  {course.courseName}
                                </Typography>
                                <Typography fontSize={14}>
                                  {course.couseDetail}
                                </Typography>
                                {course.plans && course.plans.length > 0 && (
                                  <TableContainer
                                    key={course.id}
                                    component={Paper}
                                    sx={{ mt: 1 }}
                                    variant="outlined"
                                  >
                                    <Table
                                      aria-label="simple table"
                                      size="small"
                                    >
                                      <TableHead
                                        sx={{ backgroundColor: "#eee" }}
                                      >
                                        <TableRow sx={{ whiteSpace: "nowrap" }}>
                                          <TableCell>プラン名</TableCell>
                                          <TableCell>受講期間</TableCell>
                                          <TableCell>料金</TableCell>
                                          <TableCell>
                                            分割料金（24回払い）
                                          </TableCell>
                                          <TableCell>---</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {course.plans.map((plan, index) => (
                                          <TableRow key={index}>
                                            <TableCell>
                                              {plan?.planName}
                                            </TableCell>
                                            <TableCell>
                                              {plan?.duration}ヶ月
                                            </TableCell>
                                            <TableCell>
                                              {plan?.price?.toLocaleString()}円
                                            </TableCell>
                                            <TableCell>
                                              月々{" "}
                                              {plan?.splitPrice?.toLocaleString()}
                                              円
                                            </TableCell>
                                            <TableCell>
                                              <Link
                                                target="_blank"
                                                href={course.courseURL ?? "#"}
                                              >
                                                詳細を見る
                                              </Link>
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                )}
                              </Box>
                            )
                        )}
                      </Box>
                    )
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography>検索条件</Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography>料金</Typography>
                  <Box sx={{ mt: 1 }} display="flex" alignItems="center">
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <InputLabel id="price-min-select-label">下限</InputLabel>
                      <Select
                        labelId="price-min-select-label"
                        id="price-min-select"
                        label="下限"
                      >
                        <MenuItem value="">
                          <em>下限なし</em>
                        </MenuItem>
                        {priceOptions.map((price) => (
                          <MenuItem key={price} value={price}>
                            {`${price}万円`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <span style={{ marginLeft: 8, marginRight: 8 }}>~</span>
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <InputLabel id="price-max-select-label">上限</InputLabel>
                      <Select
                        labelId="price-max-select-label"
                        id="price-max-select"
                        label="上限"
                      >
                        <MenuItem value="">
                          <em>上限なし</em>
                        </MenuItem>
                        {priceOptions.map((price) => (
                          <MenuItem key={price} value={price}>
                            {`${price}万円`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <FormControlLabel
                      control={<Checkbox name="isAvailableMoneyBack" />}
                      label="返金保証あり"
                    />
                  </Box>
                  <Box>
                    <FormControlLabel
                      control={<Checkbox name="isAvailableSubsidy" />}
                      label="補助金あり"
                    />
                  </Box>
                  <Box>
                    <FormControlLabel
                      control={<Checkbox name="onSale" />}
                      label="キャンペーン（クーポン/セール）あり"
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography>カリキュラム</Typography>
                  <Box>
                    <FormControlLabel
                      control={<Checkbox name="isMadeToOrder" />}
                      label="オーダーメイドカリキュラムあり"
                    />
                  </Box>
                  <Box>
                    <FormControlLabel
                      control={<Checkbox name="isJobIntroductionAvailable" />}
                      label="副業・フリーランス案件紹介あり"
                    />
                  </Box>
                  <Box>
                    <FormControlLabel
                      control={<Checkbox name="isJobHuntingSupport" />}
                      label="転職サポートあり"
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography>受講スタイル</Typography>
                  <Box>
                    <FormGroup sx={{ display: "flex", flexDirection: "unset" }}>
                      {Object.entries(AttendanceTypeLabels).map(
                        ([key, item]) => (
                          <FormControlLabel
                            key={key}
                            control={
                              <Checkbox
                                name="attendanceType"
                                value={item.value}
                              />
                            }
                            label={item.label}
                          />
                        )
                      )}
                    </FormGroup>
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography>受講目的</Typography>
                  <Box>
                    <FormGroup sx={{ display: "flex", flexDirection: "unset" }}>
                      {Object.entries(PurposeLabels).map(([key, purpose]) => (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox name="purposes" value={purpose.value} />
                          }
                          label={purpose.label}
                        />
                      ))}
                    </FormGroup>
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography>職種</Typography>
                  <Box>
                    <FormControl fullWidth>
                      <Select
                        id="select-job-types"
                        value={[""]}
                        name="jobTypes"
                        input={<OutlinedInput fullWidth />}
                        multiple
                      >
                        <MenuItem value="">
                          <em>指定しない</em>
                        </MenuItem>
                        {jobTypes.map((job) => (
                          <MenuItem key={job.id} value={job.id}>
                            {job.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography>プログラミング言語</Typography>
                  <Box>
                    <FormControl fullWidth>
                      <Select
                        id="select-languages"
                        name="programmingLanguages"
                        value={[""]}
                        input={<OutlinedInput fullWidth />}
                        multiple
                      >
                        <MenuItem value="">
                          <em>指定しない</em>
                        </MenuItem>
                        {sortBy(languages, ["name"]).map((language) => (
                          <MenuItem key={language.id} value={language.id}>
                            {language.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography>フレームワーク</Typography>
                  <Box>
                    <FormControl fullWidth>
                      <Select
                        id="select-frameworks"
                        name="frameworks"
                        value={[""]}
                        input={<OutlinedInput fullWidth />}
                        multiple
                      >
                        <MenuItem value="">
                          <em>指定しない</em>
                        </MenuItem>
                        {sortBy(frameworks, ["name"]).map((framework) => (
                          <MenuItem key={framework.id} value={framework.id}>
                            {framework.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography>開発ツール</Typography>
                  <FormControl fullWidth>
                    <Select
                      id="select-development-tools"
                      name="developmentTools"
                      value={[""]}
                      input={<OutlinedInput fullWidth />}
                      multiple
                    >
                      <MenuItem value="">
                        <em>指定しない</em>
                      </MenuItem>
                      {sortBy(developmentTools, ["name"]).map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography>支払い方法</Typography>
                  <Box>
                    <FormGroup sx={{ display: "flex", flexDirection: "unset" }}>
                      {paymentMethods.map((item) => (
                        <FormControlLabel
                          key={item.id}
                          control={
                            <Checkbox name="paymentOptions" value={item.id} />
                          }
                          label={item.name}
                        />
                      ))}
                    </FormGroup>
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography>クレジットカード</Typography>
                  <Box>
                    <FormGroup sx={{ display: "flex", flexDirection: "unset" }}>
                      {creditCards.map((item) => (
                        <FormControlLabel
                          key={item.id}
                          control={
                            <Checkbox name="creditCards" value={item.id} />
                          }
                          label={item.name}
                        />
                      ))}
                    </FormGroup>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ mt: 4 }}>
              <CardContent>
                <Typography>こだわりのテーマから探す</Typography>
                <List>
                  {Object.entries(EspeciallyAudienceLabels).map(
                    ([key, item]) => (
                      <ListItem
                        key={key}
                        secondaryAction={<ChevronRight />}
                        disablePadding
                      >
                        <ListItemButton sx={{ p: 2 }}>
                          {item.label}
                        </ListItemButton>
                      </ListItem>
                    )
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

import { sortBy } from "lodash";
import {
  useMediaQuery,
  Box,
  Card,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  OutlinedInput,
  SelectChangeEvent,
  ListItemText,
  TextField,
  InputAdornment,
  Paper,
  Button,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { AttendanceTypeLabels, PurposeOptions } from "@/const";
import { useAppSelector } from "@/lib/hooks";
import useSearch, { SearchFilter, initFilterResults } from "@/hooks/useSearch";
import { MasterDataBasicType } from "@/types/CommonType";
import { useRouter } from "next/router";
import { fetchCourseMaxPrice } from "@/hooks/server/fetchDataClone";
import { ParsedUrlQuery } from "querystring";

const PRICE_CONVERSION_RATE = 10000;

export default function SearchNavigation({
  drawerWidth,
  closeMobileNav,
}: {
  drawerWidth: number;
  closeMobileNav?: () => void;
}) {
  // hooks
  const router = useRouter();
  const { getMasterItemsByLang, getLanguagesById, getLanguageName } = useSearch();

  // store
  const searchData = useAppSelector((state) => state.searchData).data;

  // デバイス判定
  const isMobile = useMediaQuery("(max-width:640px)");

  // クエリパラメータに応じて、選択済みにする
  const searchConditions = useMemo(() => {
    return Object.entries(router.query)
      .filter(([key, value]) => value !== undefined && key !== "viewport" && key !== "searchType")
      .reduce<{ [key: string]: any }>((acc, [key, value]) => {
        if (typeof value === "string") {
          const valuesArray = value.split(",");
          if (
            valuesArray.length === 1 &&
            (valuesArray[0] === "true" || valuesArray[0] === "false")
          ) {
            acc[key] = valuesArray[0] === "true";
          } else if (key === "minPrice" || key === "maxPrice") {
            // クエリパラメータを「万円」の単位に変換
            acc[key] = Math.ceil(Number(value) / PRICE_CONVERSION_RATE);
          } else {
            acc[key] = valuesArray;
          }
        } else if (Array.isArray(value)) {
          acc[key] = value;
        }
        return acc;
      }, {});
  }, [router.query]);

  // state
  const [filterResult, setFilterResult] = useState<SearchFilter>({
    ...initFilterResults,
    ...searchConditions,
  });
  const [searchQuery, setSearchQuery] = useState<ParsedUrlQuery>(router.query);

  /**
   * クエリパラメーターの更新処理
   */
  const updateQueryParam = (name: string, value: any) => {
    const currentQuery = { ...router.query };

    if (Array.isArray(value) && value.length === 0) {
      delete currentQuery[name];
    } else if (Array.isArray(value) && value.length > 0) {
      currentQuery[name] = value.join(",");
    } else if (typeof value === "boolean" && value) {
      currentQuery[name] = value.toString();
    } else {
      delete currentQuery[name];
    }

    setSearchQuery(currentQuery);
  };

  /**
   * セレクトボックスとチェックボックスの変更ハンドラ
   * stateの更新と、検索クエリの生成を行っている。
   * @param event
   */
  const handlerFormChange = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[] | string>
  ) => {
    const target = event.target;
    const name = target.name;
    const value =
      target instanceof HTMLElement && target.type === "checkbox" ? target.checked : target.value;

    setFilterResult((prevFilterResult) => {
      const updatedFilterResults = {
        ...prevFilterResult,
        [name]: value,
      };
      return updatedFilterResults;
    });

    // クエリパラメーターを更新
    updateQueryParam(name, value);
  };

  /**
   * 価格変更ハンドラ
   * @param event
   */
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFilterResult((prevFilterResult) => ({
      ...prevFilterResult,
      [name]: value === "" ? null : Number(value),
    }));

    updateQueryParam(name, value === "" ? "" : String(Number(value) * PRICE_CONVERSION_RATE));
  };

  /**
   * searchConditionsの変更に応じてfilterResultを更新
   */
  useEffect(() => {
    setFilterResult((prevFilterResult) => ({
      ...prevFilterResult,
      ...searchConditions,
    }));
  }, [searchConditions]);

  /**
   * イベントリスナーを追加してURLの変更を監視
   * ブラウザバックの場合にURLの変更をリアクティブに検知するための処理
   */
  useEffect(() => {
    const handleRouteChange = () => {
      setFilterResult({
        ...initFilterResults,
        ...searchConditions,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, searchConditions]);

  /**
   * コース一覧の中で最高値を取得し、料金レンジのMaxにセットする
   */
  const fetchMaxPrice = async () => {
    const max = await fetchCourseMaxPrice();
    setFilterResult((prevFilterResult) => ({
      ...prevFilterResult,
      minPrice: prevFilterResult.minPrice, // min price
      maxPrice: max.maxPrice ? Math.ceil(max.maxPrice / PRICE_CONVERSION_RATE) : 0, // max price
    }));
  };

  /**
   * クエリの値を元に、minPrice, maxPriceをセットする
   */
  useEffect(() => {
    setFilterResult((prevFilterResult) => ({
      ...prevFilterResult,
      minPrice: router.query.minPrice
        ? Math.ceil(Number(router.query.minPrice) / PRICE_CONVERSION_RATE)
        : prevFilterResult.minPrice, // min price
      maxPrice: router.query.maxPrice
        ? Math.ceil(Number(router.query.maxPrice) / PRICE_CONVERSION_RATE)
        : prevFilterResult.maxPrice, // max price
    }));

    if (!router.query.minPrice && !router.query.maxPrice) {
      fetchMaxPrice();
    }
  }, [router.query]);

  /**
   * select 選択値の名称を返す
   * @param selectedValues 選択値
   * @param arr 選択オプションの配列
   */
  const getSelectValueText = <T extends MasterDataBasicType>(
    selectedValues: string[],
    arr: T[]
  ) => {
    return selectedValues.map((v) => arr.find((product) => product._id === v)?.name).join(", ");
  };

  /**
   * 検索実行
   */
  const handlerFilter = async () => {
    // 金額を再度「万円」の単位に変換して保存
    const updatedSearchQuery = {
      ...searchQuery,
      minPrice:
        filterResult.minPrice !== null
          ? String(filterResult.minPrice * PRICE_CONVERSION_RATE)
          : undefined,
      maxPrice:
        filterResult.maxPrice !== null
          ? String(filterResult.maxPrice * PRICE_CONVERSION_RATE)
          : undefined,
    };
    // URLを更新 (更新したクエリパラメータを含める)
    router.push(
      {
        pathname: router.pathname,
        query: updatedSearchQuery,
      },
      undefined
    );
    if (isMobile && closeMobileNav) {
      closeMobileNav();
    }
  };

  // 言語IDをkeyにしたオブジェクト配列
  const languagesById = useMemo(() => {
    return getLanguagesById(searchData.programmingLanguages);
  }, [searchData.programmingLanguages, getLanguagesById]);

  // 言語IDをkeyにしたオブジェクトフレームワーク配列
  const librariesByLang = useMemo(
    () => getMasterItemsByLang(searchData.programmingLanguages, searchData.libraries),
    [searchData.programmingLanguages, searchData.libraries, getMasterItemsByLang]
  );

  // プログラミング言語にフレームワークを紐付けたデータ
  const languageWithFrameworks = useMemo(
    () => getMasterItemsByLang(searchData.programmingLanguages, searchData.frameworks),
    [searchData.programmingLanguages, searchData.frameworks, getMasterItemsByLang]
  );

  return (
    <Card
      sx={
        isMobile
          ? { overflow: "auto", mb: 8, pb: 10, p: 2, position: "relative" }
          : {
              overflow: "auto",
              ml: 2,
              mb: 8,
              p: 2,
              position: "relative",
              pb: 10,
              overscrollBehavior: "none",
            }
      }
      variant="outlined"
    >
      <Box>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            受講料金
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }} display="flex" alignItems="center">
          <Box>
            <TextField
              value={filterResult.minPrice !== null ? filterResult.minPrice : ""}
              name="minPrice"
              type="number"
              size="small"
              onChange={(event) => handlePriceChange(event)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography fontSize={12}>万円</Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ mx: 1 }}>
            <span>〜</span>
          </Box>
          <Box>
            <TextField
              value={filterResult.maxPrice !== null ? filterResult.maxPrice : ""}
              name="maxPrice"
              type="number"
              size="small"
              onChange={(event) => handlePriceChange(event)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography fontSize={12}>万円</Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            スクールの特徴
          </Typography>
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                name="isAvailableMoneyBack"
                checked={filterResult.isAvailableMoneyBack}
                onChange={(event) => handlerFormChange(event)}
              />
            }
            label="返金保証あり"
          />
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                name="isAvailableSubsidy"
                checked={filterResult.isAvailableSubsidy}
                onChange={(event) => handlerFormChange(event)}
              />
            }
            label="補助金あり"
          />
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                name="isMadeToOrder"
                checked={filterResult.isMadeToOrder}
                onChange={(event) => handlerFormChange(event)}
              />
            }
            label="オーダーメイドカリキュラム"
          />
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                name="isJobIntroductionAvailable"
                checked={filterResult.isJobIntroductionAvailable}
                onChange={(event) => handlerFormChange(event)}
              />
            }
            label="案件紹介あり"
          />
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                name="isJobHuntingSupport"
                checked={filterResult.isJobHuntingSupport}
                onChange={(event) => handlerFormChange(event)}
              />
            }
            label="転職サポートあり"
          />
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                name="isJobHuntingGuarantee"
                checked={filterResult.isJobHuntingGuarantee}
                onChange={(event) => handlerFormChange(event)}
              />
            }
            label="転職保証あり"
          />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            受講スタイル
          </Typography>
        </Box>
        <FormControl fullWidth>
          <Select
            size="small"
            id="select-attendance-type"
            value={filterResult.attendanceType}
            name="attendanceType"
            input={<OutlinedInput fullWidth />}
            onChange={(event) => handlerFormChange(event)}
            renderValue={(selected) => getSelectValueText(selected, AttendanceTypeLabels)}
            multiple
          >
            {AttendanceTypeLabels.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                <Checkbox checked={filterResult.attendanceType.indexOf(item._id as never) > -1} />
                <ListItemText>{item.name}</ListItemText>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            受講目的
          </Typography>
        </Box>
        <FormControl fullWidth>
          <Select
            size="small"
            id="select-purposes"
            value={filterResult.purposes}
            name="purposes"
            input={<OutlinedInput fullWidth />}
            onChange={(event) => handlerFormChange(event)}
            renderValue={(selected) => getSelectValueText(selected, PurposeOptions)}
            multiple
          >
            {PurposeOptions.map((purpose) => (
              <MenuItem key={purpose._id} value={purpose._id}>
                <Checkbox checked={filterResult.purposes.indexOf(purpose._id as never) > -1} />
                <ListItemText>{purpose.name}</ListItemText>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            特別割引の対象者
          </Typography>
        </Box>
        <FormControl fullWidth>
          <Select
            size="small"
            id="select-benefit-user-categories"
            value={filterResult.benefitUserCategories}
            name="benefitUserCategories"
            input={<OutlinedInput fullWidth />}
            onChange={(event) => handlerFormChange(event)}
            renderValue={(selected) =>
              getSelectValueText(selected, searchData.benefitUserCategories)
            }
            multiple
          >
            <MenuItem value="">
              <em>指定しない</em>
            </MenuItem>
            {searchData.benefitUserCategories.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                <Checkbox
                  checked={filterResult.benefitUserCategories.indexOf(item._id as never) > -1}
                />
                <ListItemText>{item.name}</ListItemText>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            関わりたい開発分野
          </Typography>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Select
              size="small"
              id="select-development-categories"
              value={filterResult.developmentCategories}
              name="developmentCategories"
              input={<OutlinedInput fullWidth />}
              onChange={(event) => handlerFormChange(event)}
              renderValue={(selected) =>
                getSelectValueText(selected, searchData.developmentCategories)
              }
              multiple
            >
              {searchData.developmentCategories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  <Checkbox
                    checked={filterResult.developmentCategories.indexOf(category._id as never) > -1}
                  />
                  <ListItemText>{category.name}</ListItemText>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            作りたいサービス
          </Typography>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Select
              size="small"
              id="select-development-products"
              value={filterResult.developmentProducts}
              name="developmentProducts"
              input={<OutlinedInput fullWidth />}
              onChange={(event) => handlerFormChange(event)}
              renderValue={(selected) =>
                getSelectValueText(selected, searchData.developmentProducts)
              }
              multiple
            >
              {searchData.developmentProducts.map((product) => (
                <MenuItem key={product._id} value={product._id}>
                  <Checkbox
                    checked={filterResult.developmentProducts.indexOf(product._id as never) > -1}
                  />
                  <ListItemText primary={product.name}></ListItemText>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            取得したい資格
          </Typography>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Select
              size="small"
              id="select-qualifications"
              value={filterResult.qualifications}
              name="qualifications"
              input={<OutlinedInput fullWidth />}
              onChange={(event) => handlerFormChange(event)}
              renderValue={(selected) => getSelectValueText(selected, searchData.qualifications)}
              multiple
            >
              {searchData.qualifications.map((dualification) => (
                <MenuItem key={dualification._id} value={dualification._id}>
                  <Checkbox
                    checked={filterResult.qualifications.indexOf(dualification._id as never) > -1}
                  />
                  <ListItemText>{dualification.name}</ListItemText>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            なりたい職種
          </Typography>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Select
              size="small"
              id="select-job-types"
              value={filterResult.jobTypes}
              name="jobTypes"
              input={<OutlinedInput fullWidth />}
              onChange={(event) => handlerFormChange(event)}
              renderValue={(selected) => getSelectValueText(selected, searchData.jobTypes)}
              multiple
            >
              {searchData.jobTypes.map((jobType) => (
                <MenuItem key={jobType._id} value={jobType._id}>
                  <Checkbox checked={filterResult.jobTypes.indexOf(jobType._id as never) > -1} />
                  <ListItemText>{jobType.name}</ListItemText>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            学びたいプログラミング言語
          </Typography>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Select
              size="small"
              id="select-programming-languages"
              value={filterResult.programmingLanguages}
              name="programmingLanguages"
              input={<OutlinedInput fullWidth />}
              onChange={(event) => handlerFormChange(event)}
              renderValue={(selected) =>
                getSelectValueText(selected, searchData.programmingLanguages)
              }
              multiple
            >
              {searchData.programmingLanguages.map((language) => (
                <MenuItem key={language._id} value={language._id}>
                  <Checkbox
                    checked={filterResult.programmingLanguages.indexOf(language._id as never) > -1}
                  />
                  <ListItemText>{language.name}</ListItemText>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            学びたいフレームワーク
          </Typography>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Select
              size="small"
              id="select-frameworks"
              name="frameworks"
              value={filterResult.frameworks}
              onChange={(event) => handlerFormChange(event)}
              renderValue={(selected) => getSelectValueText(selected, searchData.frameworks)}
              multiple
            >
              {Object.keys(languageWithFrameworks).map((key) => [
                <MenuItem key={key} disabled>
                  {getLanguageName(languagesById, key)}
                </MenuItem>,
                // フレームワークをサブアイテムとして表示
                languageWithFrameworks[key].map((framework) => (
                  <MenuItem key={framework._id} value={framework._id} sx={{ pl: 4 }}>
                    <Checkbox
                      checked={filterResult.frameworks.indexOf(framework._id as never) > -1}
                    />
                    <ListItemText>{framework.name}</ListItemText>
                  </MenuItem>
                )),
              ])}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            学びたいライブラリ/API
          </Typography>
        </Box>
        <FormControl fullWidth>
          <Select
            size="small"
            id="select-libraries"
            name="libraries"
            value={filterResult.libraries}
            onChange={(event) => handlerFormChange(event)}
            renderValue={(selected) => getSelectValueText(selected, searchData.libraries)}
            multiple
          >
            <MenuItem value="">
              <em>指定しない</em>
            </MenuItem>
            {Object.keys(librariesByLang).map((key) => [
              <MenuItem key={key} disabled>
                {getLanguageName(languagesById, key)}
              </MenuItem>,
              // ライブラリをサブアイテムとして表示
              librariesByLang[key].map((lib) => (
                <MenuItem key={lib._id} value={lib._id} sx={{ pl: 4 }}>
                  <Checkbox checked={filterResult.libraries.indexOf(lib._id as never) > -1} />
                  <ListItemText>{lib.name}</ListItemText>
                </MenuItem>
              )),
            ])}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            学びたいツール
          </Typography>
        </Box>
        <FormControl fullWidth>
          <Select
            size="small"
            id="select-development-tools"
            name="developmentTools"
            value={filterResult.developmentTools}
            onChange={(event) => handlerFormChange(event)}
            renderValue={(selected) => getSelectValueText(selected, searchData.developmentTools)}
            input={<OutlinedInput fullWidth />}
            multiple
          >
            <MenuItem value="">
              <em>指定しない</em>
            </MenuItem>
            {sortBy(searchData.developmentTools, ["name"]).map((item) => (
              <MenuItem key={item._id} value={item._id}>
                <Checkbox checked={filterResult.developmentTools.indexOf(item._id as never) > -1} />
                <ListItemText>{item.name}</ListItemText>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Paper
        sx={{
          position: "fixed",
          bottom: isMobile ? 0 : 54,
          left: isMobile ? 0 : 16,
          right: isMobile ? 0 : 16,
          zIndex: 3,
          width: isMobile ? "100%" : drawerWidth - 16,
        }}
        elevation={4}
      >
        <Card sx={{ p: 2 }} variant="elevation">
          <Button
            size="large"
            variant="contained"
            fullWidth
            sx={{ fontWeight: "bold" }}
            onClick={handlerFilter}
          >
            検索
          </Button>
        </Card>
      </Paper>
    </Card>
  );
}

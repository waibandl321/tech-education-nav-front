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
  Slider,
  SelectChangeEvent,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { AttendanceTypeLabels, PurposeOptions } from "@/const";
import { useAppSelector } from "@/lib/hooks";
import useSearch, { FilterResult, initFilterResults } from "@/hooks/useSearch";
import { MasterDataBasicType } from "@/types/CommonType";
import { useRouter } from "next/router";
import { CompoundSearchCondition } from "@/hooks/server/fetchData";
import { LearningCenterCourse } from "@/API";

const MAX = 150;
const MIN = 0;

export default function SearchNavigation() {
  // hooks
  const router = useRouter();
  const { getMasterItemsByLang, getLanguagesById, getLanguageName } =
    useSearch();

  // store
  const searchData = useAppSelector((state) => state.searchData);

  // デバイス判定
  const isMobile = useMediaQuery("(max-width:640px)");

  // クエリパラメータに応じて、選択済みにする
  const searchConditions = useMemo(() => {
    return Object.entries(router.query)
      .filter(
        ([key, value]) =>
          value !== undefined && key !== "viewport" && key !== "searchType"
      )
      .reduce<{ [key: string]: string | string[] }>((acc, [key, value]) => {
        const newValue =
          typeof value === "string" ? JSON.parse(value) : value ?? [];
        acc[key] = newValue;

        return acc;
      }, {});
  }, [router.query]);

  // state
  const [filterResult, setFilterResult] = useState<FilterResult>({
    ...initFilterResults,
    ...searchConditions,
  });
  const [rangeValue, setRangeValue] = useState<number[]>([20, 37]);

  // 選択値の更新
  const handlerFormChange = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<readonly []>
  ) => {
    const target = event.target;
    const name = target.name;
    const value =
      target instanceof HTMLElement && target.type === "checkbox"
        ? target.checked
        : target.value;

    setFilterResult((prevFilterResult) => {
      const updatedFilterResults = {
        ...prevFilterResult,
        [name]: value,
      };
      return updatedFilterResults;
    });

    // 現在のクエリパラメータを取得
    const currentQuery = { ...router.query };

    if (Array.isArray(value) && value.length === 0) {
      // valueが空の配列の場合、何もしないで既存のクエリパラメータを削除
      delete currentQuery[name];
    } else if (value) {
      // valueが真の場合（true、非空の文字列、非空の配列）、クエリパラメータを追加または更新
      // クエリパラメータは文字列である必要があるため、toString()を使用
      currentQuery[name] = value.toString();
    } else {
      // valueが偽の場合（false、空文字など）、該当するクエリパラメータを削除
      delete currentQuery[name];
    }

    // URLを更新 (クエリパラメータを含む)
    router.push(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined
    );
  };

  useEffect(() => {
    console.log(filterResult);
  }, [filterResult]);

  /**
   * selectbox 選択名を取得
   * @param selectedValues 選択値
   * @returns 選択した値の名称（マスタデータのnameを結合して返す）
   */

  const getSelectValueText = <T extends MasterDataBasicType>(
    selectedValues: readonly [],
    arr: T[]
  ) => {
    return selectedValues
      .map((v) => arr.find((product) => product.id === v)?.name)
      .join(", ");
  };

  // 料金レンジ（仮）
  const handleChangeRange = (event: Event, newValue: number | number[]) => {
    setRangeValue(newValue as number[]);
  };
  function rangeValueText(value: number) {
    return `${value}万円`;
  }

  // 言語IDをkeyにしたオブジェクト配列
  const languagesById = useMemo(() => {
    return getLanguagesById(searchData.programmingLanguages);
  }, [searchData.programmingLanguages, getLanguagesById]);

  // 言語IDをkeyにしたオブジェクトフレームワーク配列
  const librariesByLang = useMemo(
    () =>
      getMasterItemsByLang(
        searchData.programmingLanguages,
        searchData.libraries
      ),
    [
      searchData.programmingLanguages,
      searchData.libraries,
      getMasterItemsByLang,
    ]
  );

  // プログラミング言語にフレームワークを紐付けたデータ
  const languageWithFrameworks = useMemo(
    () =>
      getMasterItemsByLang(
        searchData.programmingLanguages,
        searchData.frameworks
      ),
    [
      searchData.programmingLanguages,
      searchData.frameworks,
      getMasterItemsByLang,
    ]
  );

  return (
    <Card
      sx={
        isMobile
          ? { overflow: "auto", p: 2 }
          : { overflow: "auto", mr: 2, mb: 8, p: 2 }
      }
      variant="outlined"
    >
      <div>{JSON.stringify(filterResult)}</div>
      <Box>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            受講料金
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography
            textAlign="center"
            variant="body2"
            fontWeight={700}
          >{`${rangeValue[0]}万円以上 〜 ${rangeValue[1]}万円以下`}</Typography>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={rangeValue}
            onChange={handleChangeRange}
            valueLabelDisplay="auto"
            getAriaValueText={rangeValueText}
            step={5}
            min={MIN}
            max={MAX}
          />
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mt: -1 }}
          >
            <Typography variant="caption" sx={{ cursor: "pointer" }}>
              5万円以下
            </Typography>
            <Typography variant="caption" sx={{ cursor: "pointer" }}>
              {MAX}万円
            </Typography>
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
                // checked={filterResult.isJobIntroductionAvailable}
              />
            }
            label="案件保証あり"
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
            label="転職保証付"
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
            id="select-attendance-type"
            value={filterResult.attendanceType}
            name="attendanceType"
            input={<OutlinedInput fullWidth />}
            onChange={(event) => handlerFormChange(event)}
            renderValue={(selected) =>
              getSelectValueText(selected, AttendanceTypeLabels)
            }
            multiple
          >
            {AttendanceTypeLabels.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox
                  checked={
                    filterResult.attendanceType.indexOf(item.id as never) > -1
                  }
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
            受講目的
          </Typography>
        </Box>
        <FormControl fullWidth>
          <Select
            id="select-purposes"
            value={filterResult.purposes}
            name="purposes"
            input={<OutlinedInput fullWidth />}
            onChange={(event) => handlerFormChange(event)}
            renderValue={(selected) =>
              getSelectValueText(selected, PurposeOptions)
            }
            multiple
          >
            {PurposeOptions.map((purpose) => (
              <MenuItem key={purpose.id} value={purpose.id}>
                <Checkbox
                  checked={
                    filterResult.purposes.indexOf(purpose.id as never) > -1
                  }
                />
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
              <MenuItem key={item.id} value={item.id}>
                <Checkbox
                  checked={
                    filterResult.benefitUserCategories.indexOf(
                      item.id as never
                    ) > -1
                  }
                />
                <ListItemText>{item.name}</ListItemText>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            対応している支払い方法
          </Typography>
        </Box>
        <Box>
          <FormGroup sx={{ display: "flex", flexDirection: "unset" }}>
            {searchData.paymentMethods.map((item) => (
              <FormControlLabel
                key={item.id}
                control={<Checkbox name="paymentOptions" value={item.id} />}
                label={item.name}
              />
            ))}
          </FormGroup>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            対応しているクレジットカード
          </Typography>
        </Box>
        <Box>
          <FormGroup sx={{ display: "flex", flexDirection: "unset" }}>
            {searchData.creditCards.map((item) => (
              <FormControlLabel
                key={item.id}
                control={<Checkbox name="creditCards" value={item.id} />}
                label={item.name}
              />
            ))}
          </FormGroup>
        </Box>
      </Box> */}
      <Box sx={{ mt: 3 }}>
        <Box bgcolor="#f8f8f8" p={1} marginBottom={1}>
          <Typography variant="body2" fontWeight={700}>
            関わりたい開発分野
          </Typography>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Select
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
                <MenuItem key={category.id} value={category.id}>
                  <Checkbox
                    checked={
                      filterResult.developmentCategories.indexOf(
                        category.id as never
                      ) > -1
                    }
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
                <MenuItem key={product.id} value={product.id}>
                  <Checkbox
                    checked={
                      filterResult.developmentProducts.indexOf(
                        product.id as never
                      ) > -1
                    }
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
              id="select-qualifications"
              value={filterResult.qualifications}
              name="qualifications"
              input={<OutlinedInput fullWidth />}
              onChange={(event) => handlerFormChange(event)}
              renderValue={(selected) =>
                getSelectValueText(selected, searchData.qualifications)
              }
              multiple
            >
              {searchData.qualifications.map((dualification) => (
                <MenuItem key={dualification.id} value={dualification.id}>
                  <Checkbox
                    checked={
                      filterResult.qualifications.indexOf(
                        dualification.id as never
                      ) > -1
                    }
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
              id="select-job-types"
              value={filterResult.jobTypes}
              name="jobTypes"
              input={<OutlinedInput fullWidth />}
              onChange={(event) => handlerFormChange(event)}
              renderValue={(selected) =>
                getSelectValueText(selected, searchData.jobTypes)
              }
              multiple
            >
              {searchData.jobTypes.map((jobType) => (
                <MenuItem key={jobType.id} value={jobType.id}>
                  <Checkbox
                    checked={
                      filterResult.jobTypes.indexOf(jobType.id as never) > -1
                    }
                  />
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
                <MenuItem key={language.id} value={language.id}>
                  <Checkbox
                    checked={
                      filterResult.programmingLanguages.indexOf(
                        language.id as never
                      ) > -1
                    }
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
              id="select-frameworks"
              name="frameworks"
              value={filterResult.frameworks}
              onChange={(event) => handlerFormChange(event)}
              renderValue={(selected) =>
                getSelectValueText(selected, searchData.frameworks)
              }
              multiple
            >
              {Object.keys(languageWithFrameworks).map((key) => [
                <MenuItem key={key} disabled>
                  {getLanguageName(languagesById, key)}
                </MenuItem>,
                // フレームワークをサブアイテムとして表示
                languageWithFrameworks[key].map((framework) => (
                  <MenuItem
                    key={framework.id}
                    value={framework.id}
                    sx={{ pl: 4 }}
                  >
                    <Checkbox
                      checked={
                        filterResult.frameworks.indexOf(framework.id as never) >
                        -1
                      }
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
            id="select-libraries"
            name="libraries"
            value={filterResult.libraries}
            onChange={(event) => handlerFormChange(event)}
            renderValue={(selected) =>
              getSelectValueText(selected, searchData.libraries)
            }
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
                <MenuItem key={lib.id} value={lib.id} sx={{ pl: 4 }}>
                  <Checkbox
                    checked={
                      filterResult.libraries.indexOf(lib.id as never) > -1
                    }
                  />
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
            id="select-development-tools"
            name="developmentTools"
            value={filterResult.developmentTools}
            onChange={(event) => handlerFormChange(event)}
            renderValue={(selected) =>
              getSelectValueText(selected, searchData.developmentTools)
            }
            input={<OutlinedInput fullWidth />}
            multiple
          >
            <MenuItem value="">
              <em>指定しない</em>
            </MenuItem>
            {sortBy(searchData.developmentTools, ["name"]).map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox
                  checked={
                    filterResult.developmentTools.indexOf(item.id as never) > -1
                  }
                />
                <ListItemText>{item.name}</ListItemText>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Card>
  );
}

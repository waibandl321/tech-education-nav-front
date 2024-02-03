/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getLearningCenterCourse } from "../graphql/queries";
import { updateLearningCenterCourse } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function LearningCenterCourseUpdateForm(props) {
  const {
    id: idProp,
    learningCenterCourse: learningCenterCourseModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    learningCenterId: "",
    courseName: "",
    courseURL: "",
    couseDetail: "",
    isAvailableMoneyBack: false,
    moneyBackDetail: "",
    isAvailableSubsidy: false,
    subsidyMemo: "",
    onSale: false,
    saleMemo: "",
    isMadeToOrder: false,
    madeToOrderDetail: "",
    isJobIntroductionAvailable: false,
    jobIntroductionDetail: "",
    isJobHuntingSupport: false,
    jobHuntingSupportDetail: "",
    purposes: [],
    jobTypes: [],
    developmentCategories: [],
    developmentProducts: [],
    programmingLanguages: [],
    frameworks: [],
    developmentTools: [],
    qualifications: [],
    attendanceType: "",
    locationPref: "",
    locationCity: "",
    especiallyAudiences: [],
    isDeleted: false,
  };
  const [learningCenterId, setLearningCenterId] = React.useState(
    initialValues.learningCenterId
  );
  const [courseName, setCourseName] = React.useState(initialValues.courseName);
  const [courseURL, setCourseURL] = React.useState(initialValues.courseURL);
  const [couseDetail, setCouseDetail] = React.useState(
    initialValues.couseDetail
  );
  const [isAvailableMoneyBack, setIsAvailableMoneyBack] = React.useState(
    initialValues.isAvailableMoneyBack
  );
  const [moneyBackDetail, setMoneyBackDetail] = React.useState(
    initialValues.moneyBackDetail
  );
  const [isAvailableSubsidy, setIsAvailableSubsidy] = React.useState(
    initialValues.isAvailableSubsidy
  );
  const [subsidyMemo, setSubsidyMemo] = React.useState(
    initialValues.subsidyMemo
  );
  const [onSale, setOnSale] = React.useState(initialValues.onSale);
  const [saleMemo, setSaleMemo] = React.useState(initialValues.saleMemo);
  const [isMadeToOrder, setIsMadeToOrder] = React.useState(
    initialValues.isMadeToOrder
  );
  const [madeToOrderDetail, setMadeToOrderDetail] = React.useState(
    initialValues.madeToOrderDetail
  );
  const [isJobIntroductionAvailable, setIsJobIntroductionAvailable] =
    React.useState(initialValues.isJobIntroductionAvailable);
  const [jobIntroductionDetail, setJobIntroductionDetail] = React.useState(
    initialValues.jobIntroductionDetail
  );
  const [isJobHuntingSupport, setIsJobHuntingSupport] = React.useState(
    initialValues.isJobHuntingSupport
  );
  const [jobHuntingSupportDetail, setJobHuntingSupportDetail] = React.useState(
    initialValues.jobHuntingSupportDetail
  );
  const [purposes, setPurposes] = React.useState(initialValues.purposes);
  const [jobTypes, setJobTypes] = React.useState(initialValues.jobTypes);
  const [developmentCategories, setDevelopmentCategories] = React.useState(
    initialValues.developmentCategories
  );
  const [developmentProducts, setDevelopmentProducts] = React.useState(
    initialValues.developmentProducts
  );
  const [programmingLanguages, setProgrammingLanguages] = React.useState(
    initialValues.programmingLanguages
  );
  const [frameworks, setFrameworks] = React.useState(initialValues.frameworks);
  const [developmentTools, setDevelopmentTools] = React.useState(
    initialValues.developmentTools
  );
  const [qualifications, setQualifications] = React.useState(
    initialValues.qualifications
  );
  const [attendanceType, setAttendanceType] = React.useState(
    initialValues.attendanceType
  );
  const [locationPref, setLocationPref] = React.useState(
    initialValues.locationPref
  );
  const [locationCity, setLocationCity] = React.useState(
    initialValues.locationCity
  );
  const [especiallyAudiences, setEspeciallyAudiences] = React.useState(
    initialValues.especiallyAudiences
  );
  const [isDeleted, setIsDeleted] = React.useState(initialValues.isDeleted);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = learningCenterCourseRecord
      ? { ...initialValues, ...learningCenterCourseRecord }
      : initialValues;
    setLearningCenterId(cleanValues.learningCenterId);
    setCourseName(cleanValues.courseName);
    setCourseURL(cleanValues.courseURL);
    setCouseDetail(cleanValues.couseDetail);
    setIsAvailableMoneyBack(cleanValues.isAvailableMoneyBack);
    setMoneyBackDetail(cleanValues.moneyBackDetail);
    setIsAvailableSubsidy(cleanValues.isAvailableSubsidy);
    setSubsidyMemo(cleanValues.subsidyMemo);
    setOnSale(cleanValues.onSale);
    setSaleMemo(cleanValues.saleMemo);
    setIsMadeToOrder(cleanValues.isMadeToOrder);
    setMadeToOrderDetail(cleanValues.madeToOrderDetail);
    setIsJobIntroductionAvailable(cleanValues.isJobIntroductionAvailable);
    setJobIntroductionDetail(cleanValues.jobIntroductionDetail);
    setIsJobHuntingSupport(cleanValues.isJobHuntingSupport);
    setJobHuntingSupportDetail(cleanValues.jobHuntingSupportDetail);
    setPurposes(cleanValues.purposes ?? []);
    setCurrentPurposesValue("");
    setJobTypes(cleanValues.jobTypes ?? []);
    setCurrentJobTypesValue("");
    setDevelopmentCategories(cleanValues.developmentCategories ?? []);
    setCurrentDevelopmentCategoriesValue("");
    setDevelopmentProducts(cleanValues.developmentProducts ?? []);
    setCurrentDevelopmentProductsValue("");
    setProgrammingLanguages(cleanValues.programmingLanguages ?? []);
    setCurrentProgrammingLanguagesValue("");
    setFrameworks(cleanValues.frameworks ?? []);
    setCurrentFrameworksValue("");
    setDevelopmentTools(cleanValues.developmentTools ?? []);
    setCurrentDevelopmentToolsValue("");
    setQualifications(cleanValues.qualifications ?? []);
    setCurrentQualificationsValue("");
    setAttendanceType(cleanValues.attendanceType);
    setLocationPref(cleanValues.locationPref);
    setLocationCity(cleanValues.locationCity);
    setEspeciallyAudiences(cleanValues.especiallyAudiences ?? []);
    setCurrentEspeciallyAudiencesValue("");
    setIsDeleted(cleanValues.isDeleted);
    setErrors({});
  };
  const [learningCenterCourseRecord, setLearningCenterCourseRecord] =
    React.useState(learningCenterCourseModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getLearningCenterCourse.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getLearningCenterCourse
        : learningCenterCourseModelProp;
      setLearningCenterCourseRecord(record);
    };
    queryData();
  }, [idProp, learningCenterCourseModelProp]);
  React.useEffect(resetStateValues, [learningCenterCourseRecord]);
  const [currentPurposesValue, setCurrentPurposesValue] = React.useState("");
  const purposesRef = React.createRef();
  const [currentJobTypesValue, setCurrentJobTypesValue] = React.useState("");
  const jobTypesRef = React.createRef();
  const [
    currentDevelopmentCategoriesValue,
    setCurrentDevelopmentCategoriesValue,
  ] = React.useState("");
  const developmentCategoriesRef = React.createRef();
  const [currentDevelopmentProductsValue, setCurrentDevelopmentProductsValue] =
    React.useState("");
  const developmentProductsRef = React.createRef();
  const [
    currentProgrammingLanguagesValue,
    setCurrentProgrammingLanguagesValue,
  ] = React.useState("");
  const programmingLanguagesRef = React.createRef();
  const [currentFrameworksValue, setCurrentFrameworksValue] =
    React.useState("");
  const frameworksRef = React.createRef();
  const [currentDevelopmentToolsValue, setCurrentDevelopmentToolsValue] =
    React.useState("");
  const developmentToolsRef = React.createRef();
  const [currentQualificationsValue, setCurrentQualificationsValue] =
    React.useState("");
  const qualificationsRef = React.createRef();
  const [currentEspeciallyAudiencesValue, setCurrentEspeciallyAudiencesValue] =
    React.useState("");
  const especiallyAudiencesRef = React.createRef();
  const getDisplayValue = {
    purposes: (r) => {
      const enumDisplayValueMap = {
        JOB: "Job",
        FREELANCE: "Freelance",
        ENTREPRENEURSHIP: "Entrepreneurship",
        SIDE_JOB: "Side job",
        CERTIFICATION: "Certification",
        LEARNING: "Learning",
      };
      return enumDisplayValueMap[r];
    },
    especiallyAudiences: (r) => {
      const enumDisplayValueMap = {
        FOR_ELEMENTARY_STUDENTS: "For elementary students",
        FOR_JUNIOR_HIGH_STUDENTS: "For junior high students",
        FOR_HIGH_SCHOOL_STUDENTS: "For high school students",
        FOR_UNIVERSITY_STUDENTS: "For university students",
        FOR_HOUSEWIVES: "For housewives",
        FOR_SENIORS: "For seniors",
        FOR_PEOPLE_WITH_DISABILITIES: "For people with disabilities",
      };
      return enumDisplayValueMap[r];
    },
  };
  const validations = {
    learningCenterId: [{ type: "Required" }],
    courseName: [],
    courseURL: [],
    couseDetail: [],
    isAvailableMoneyBack: [],
    moneyBackDetail: [],
    isAvailableSubsidy: [],
    subsidyMemo: [],
    onSale: [],
    saleMemo: [],
    isMadeToOrder: [],
    madeToOrderDetail: [],
    isJobIntroductionAvailable: [],
    jobIntroductionDetail: [],
    isJobHuntingSupport: [],
    jobHuntingSupportDetail: [],
    purposes: [],
    jobTypes: [],
    developmentCategories: [],
    developmentProducts: [],
    programmingLanguages: [],
    frameworks: [],
    developmentTools: [],
    qualifications: [],
    attendanceType: [],
    locationPref: [],
    locationCity: [],
    especiallyAudiences: [],
    isDeleted: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          learningCenterId,
          courseName: courseName ?? null,
          courseURL: courseURL ?? null,
          couseDetail: couseDetail ?? null,
          isAvailableMoneyBack: isAvailableMoneyBack ?? null,
          moneyBackDetail: moneyBackDetail ?? null,
          isAvailableSubsidy: isAvailableSubsidy ?? null,
          subsidyMemo: subsidyMemo ?? null,
          onSale: onSale ?? null,
          saleMemo: saleMemo ?? null,
          isMadeToOrder: isMadeToOrder ?? null,
          madeToOrderDetail: madeToOrderDetail ?? null,
          isJobIntroductionAvailable: isJobIntroductionAvailable ?? null,
          jobIntroductionDetail: jobIntroductionDetail ?? null,
          isJobHuntingSupport: isJobHuntingSupport ?? null,
          jobHuntingSupportDetail: jobHuntingSupportDetail ?? null,
          purposes: purposes ?? null,
          jobTypes: jobTypes ?? null,
          developmentCategories: developmentCategories ?? null,
          developmentProducts: developmentProducts ?? null,
          programmingLanguages: programmingLanguages ?? null,
          frameworks: frameworks ?? null,
          developmentTools: developmentTools ?? null,
          qualifications: qualifications ?? null,
          attendanceType: attendanceType ?? null,
          locationPref: locationPref ?? null,
          locationCity: locationCity ?? null,
          especiallyAudiences: especiallyAudiences ?? null,
          isDeleted: isDeleted ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateLearningCenterCourse.replaceAll("__typename", ""),
            variables: {
              input: {
                id: learningCenterCourseRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "LearningCenterCourseUpdateForm")}
      {...rest}
    >
      <TextField
        label="Learning center id"
        isRequired={true}
        isReadOnly={false}
        value={learningCenterId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              learningCenterId: value,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.learningCenterId ?? value;
          }
          if (errors.learningCenterId?.hasError) {
            runValidationTasks("learningCenterId", value);
          }
          setLearningCenterId(value);
        }}
        onBlur={() => runValidationTasks("learningCenterId", learningCenterId)}
        errorMessage={errors.learningCenterId?.errorMessage}
        hasError={errors.learningCenterId?.hasError}
        {...getOverrideProps(overrides, "learningCenterId")}
      ></TextField>
      <TextField
        label="Course name"
        isRequired={false}
        isReadOnly={false}
        value={courseName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName: value,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.courseName ?? value;
          }
          if (errors.courseName?.hasError) {
            runValidationTasks("courseName", value);
          }
          setCourseName(value);
        }}
        onBlur={() => runValidationTasks("courseName", courseName)}
        errorMessage={errors.courseName?.errorMessage}
        hasError={errors.courseName?.hasError}
        {...getOverrideProps(overrides, "courseName")}
      ></TextField>
      <TextField
        label="Course url"
        isRequired={false}
        isReadOnly={false}
        value={courseURL}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL: value,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.courseURL ?? value;
          }
          if (errors.courseURL?.hasError) {
            runValidationTasks("courseURL", value);
          }
          setCourseURL(value);
        }}
        onBlur={() => runValidationTasks("courseURL", courseURL)}
        errorMessage={errors.courseURL?.errorMessage}
        hasError={errors.courseURL?.hasError}
        {...getOverrideProps(overrides, "courseURL")}
      ></TextField>
      <TextField
        label="Couse detail"
        isRequired={false}
        isReadOnly={false}
        value={couseDetail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail: value,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.couseDetail ?? value;
          }
          if (errors.couseDetail?.hasError) {
            runValidationTasks("couseDetail", value);
          }
          setCouseDetail(value);
        }}
        onBlur={() => runValidationTasks("couseDetail", couseDetail)}
        errorMessage={errors.couseDetail?.errorMessage}
        hasError={errors.couseDetail?.hasError}
        {...getOverrideProps(overrides, "couseDetail")}
      ></TextField>
      <SwitchField
        label="Is available money back"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isAvailableMoneyBack}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack: value,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.isAvailableMoneyBack ?? value;
          }
          if (errors.isAvailableMoneyBack?.hasError) {
            runValidationTasks("isAvailableMoneyBack", value);
          }
          setIsAvailableMoneyBack(value);
        }}
        onBlur={() =>
          runValidationTasks("isAvailableMoneyBack", isAvailableMoneyBack)
        }
        errorMessage={errors.isAvailableMoneyBack?.errorMessage}
        hasError={errors.isAvailableMoneyBack?.hasError}
        {...getOverrideProps(overrides, "isAvailableMoneyBack")}
      ></SwitchField>
      <TextField
        label="Money back detail"
        isRequired={false}
        isReadOnly={false}
        value={moneyBackDetail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail: value,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.moneyBackDetail ?? value;
          }
          if (errors.moneyBackDetail?.hasError) {
            runValidationTasks("moneyBackDetail", value);
          }
          setMoneyBackDetail(value);
        }}
        onBlur={() => runValidationTasks("moneyBackDetail", moneyBackDetail)}
        errorMessage={errors.moneyBackDetail?.errorMessage}
        hasError={errors.moneyBackDetail?.hasError}
        {...getOverrideProps(overrides, "moneyBackDetail")}
      ></TextField>
      <SwitchField
        label="Is available subsidy"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isAvailableSubsidy}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy: value,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.isAvailableSubsidy ?? value;
          }
          if (errors.isAvailableSubsidy?.hasError) {
            runValidationTasks("isAvailableSubsidy", value);
          }
          setIsAvailableSubsidy(value);
        }}
        onBlur={() =>
          runValidationTasks("isAvailableSubsidy", isAvailableSubsidy)
        }
        errorMessage={errors.isAvailableSubsidy?.errorMessage}
        hasError={errors.isAvailableSubsidy?.hasError}
        {...getOverrideProps(overrides, "isAvailableSubsidy")}
      ></SwitchField>
      <TextField
        label="Subsidy memo"
        isRequired={false}
        isReadOnly={false}
        value={subsidyMemo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo: value,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.subsidyMemo ?? value;
          }
          if (errors.subsidyMemo?.hasError) {
            runValidationTasks("subsidyMemo", value);
          }
          setSubsidyMemo(value);
        }}
        onBlur={() => runValidationTasks("subsidyMemo", subsidyMemo)}
        errorMessage={errors.subsidyMemo?.errorMessage}
        hasError={errors.subsidyMemo?.hasError}
        {...getOverrideProps(overrides, "subsidyMemo")}
      ></TextField>
      <SwitchField
        label="On sale"
        defaultChecked={false}
        isDisabled={false}
        isChecked={onSale}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale: value,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.onSale ?? value;
          }
          if (errors.onSale?.hasError) {
            runValidationTasks("onSale", value);
          }
          setOnSale(value);
        }}
        onBlur={() => runValidationTasks("onSale", onSale)}
        errorMessage={errors.onSale?.errorMessage}
        hasError={errors.onSale?.hasError}
        {...getOverrideProps(overrides, "onSale")}
      ></SwitchField>
      <TextField
        label="Sale memo"
        isRequired={false}
        isReadOnly={false}
        value={saleMemo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo: value,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.saleMemo ?? value;
          }
          if (errors.saleMemo?.hasError) {
            runValidationTasks("saleMemo", value);
          }
          setSaleMemo(value);
        }}
        onBlur={() => runValidationTasks("saleMemo", saleMemo)}
        errorMessage={errors.saleMemo?.errorMessage}
        hasError={errors.saleMemo?.hasError}
        {...getOverrideProps(overrides, "saleMemo")}
      ></TextField>
      <SwitchField
        label="Is made to order"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isMadeToOrder}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder: value,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.isMadeToOrder ?? value;
          }
          if (errors.isMadeToOrder?.hasError) {
            runValidationTasks("isMadeToOrder", value);
          }
          setIsMadeToOrder(value);
        }}
        onBlur={() => runValidationTasks("isMadeToOrder", isMadeToOrder)}
        errorMessage={errors.isMadeToOrder?.errorMessage}
        hasError={errors.isMadeToOrder?.hasError}
        {...getOverrideProps(overrides, "isMadeToOrder")}
      ></SwitchField>
      <TextField
        label="Made to order detail"
        isRequired={false}
        isReadOnly={false}
        value={madeToOrderDetail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail: value,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.madeToOrderDetail ?? value;
          }
          if (errors.madeToOrderDetail?.hasError) {
            runValidationTasks("madeToOrderDetail", value);
          }
          setMadeToOrderDetail(value);
        }}
        onBlur={() =>
          runValidationTasks("madeToOrderDetail", madeToOrderDetail)
        }
        errorMessage={errors.madeToOrderDetail?.errorMessage}
        hasError={errors.madeToOrderDetail?.hasError}
        {...getOverrideProps(overrides, "madeToOrderDetail")}
      ></TextField>
      <SwitchField
        label="Is job introduction available"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isJobIntroductionAvailable}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable: value,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.isJobIntroductionAvailable ?? value;
          }
          if (errors.isJobIntroductionAvailable?.hasError) {
            runValidationTasks("isJobIntroductionAvailable", value);
          }
          setIsJobIntroductionAvailable(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "isJobIntroductionAvailable",
            isJobIntroductionAvailable
          )
        }
        errorMessage={errors.isJobIntroductionAvailable?.errorMessage}
        hasError={errors.isJobIntroductionAvailable?.hasError}
        {...getOverrideProps(overrides, "isJobIntroductionAvailable")}
      ></SwitchField>
      <TextField
        label="Job introduction detail"
        isRequired={false}
        isReadOnly={false}
        value={jobIntroductionDetail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail: value,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.jobIntroductionDetail ?? value;
          }
          if (errors.jobIntroductionDetail?.hasError) {
            runValidationTasks("jobIntroductionDetail", value);
          }
          setJobIntroductionDetail(value);
        }}
        onBlur={() =>
          runValidationTasks("jobIntroductionDetail", jobIntroductionDetail)
        }
        errorMessage={errors.jobIntroductionDetail?.errorMessage}
        hasError={errors.jobIntroductionDetail?.hasError}
        {...getOverrideProps(overrides, "jobIntroductionDetail")}
      ></TextField>
      <SwitchField
        label="Is job hunting support"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isJobHuntingSupport}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport: value,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.isJobHuntingSupport ?? value;
          }
          if (errors.isJobHuntingSupport?.hasError) {
            runValidationTasks("isJobHuntingSupport", value);
          }
          setIsJobHuntingSupport(value);
        }}
        onBlur={() =>
          runValidationTasks("isJobHuntingSupport", isJobHuntingSupport)
        }
        errorMessage={errors.isJobHuntingSupport?.errorMessage}
        hasError={errors.isJobHuntingSupport?.hasError}
        {...getOverrideProps(overrides, "isJobHuntingSupport")}
      ></SwitchField>
      <TextField
        label="Job hunting support detail"
        isRequired={false}
        isReadOnly={false}
        value={jobHuntingSupportDetail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail: value,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.jobHuntingSupportDetail ?? value;
          }
          if (errors.jobHuntingSupportDetail?.hasError) {
            runValidationTasks("jobHuntingSupportDetail", value);
          }
          setJobHuntingSupportDetail(value);
        }}
        onBlur={() =>
          runValidationTasks("jobHuntingSupportDetail", jobHuntingSupportDetail)
        }
        errorMessage={errors.jobHuntingSupportDetail?.errorMessage}
        hasError={errors.jobHuntingSupportDetail?.hasError}
        {...getOverrideProps(overrides, "jobHuntingSupportDetail")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes: values,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            values = result?.purposes ?? values;
          }
          setPurposes(values);
          setCurrentPurposesValue("");
        }}
        currentFieldValue={currentPurposesValue}
        label={"Purposes"}
        items={purposes}
        hasError={errors?.purposes?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("purposes", currentPurposesValue)
        }
        errorMessage={errors?.purposes?.errorMessage}
        getBadgeText={getDisplayValue.purposes}
        setFieldValue={setCurrentPurposesValue}
        inputFieldRef={purposesRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Purposes"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentPurposesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.purposes?.hasError) {
              runValidationTasks("purposes", value);
            }
            setCurrentPurposesValue(value);
          }}
          onBlur={() => runValidationTasks("purposes", currentPurposesValue)}
          errorMessage={errors.purposes?.errorMessage}
          hasError={errors.purposes?.hasError}
          ref={purposesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "purposes")}
        >
          <option
            children="Job"
            value="JOB"
            {...getOverrideProps(overrides, "purposesoption0")}
          ></option>
          <option
            children="Freelance"
            value="FREELANCE"
            {...getOverrideProps(overrides, "purposesoption1")}
          ></option>
          <option
            children="Entrepreneurship"
            value="ENTREPRENEURSHIP"
            {...getOverrideProps(overrides, "purposesoption2")}
          ></option>
          <option
            children="Side job"
            value="SIDE_JOB"
            {...getOverrideProps(overrides, "purposesoption3")}
          ></option>
          <option
            children="Certification"
            value="CERTIFICATION"
            {...getOverrideProps(overrides, "purposesoption4")}
          ></option>
          <option
            children="Learning"
            value="LEARNING"
            {...getOverrideProps(overrides, "purposesoption5")}
          ></option>
        </SelectField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes: values,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            values = result?.jobTypes ?? values;
          }
          setJobTypes(values);
          setCurrentJobTypesValue("");
        }}
        currentFieldValue={currentJobTypesValue}
        label={"Job types"}
        items={jobTypes}
        hasError={errors?.jobTypes?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("jobTypes", currentJobTypesValue)
        }
        errorMessage={errors?.jobTypes?.errorMessage}
        setFieldValue={setCurrentJobTypesValue}
        inputFieldRef={jobTypesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Job types"
          isRequired={false}
          isReadOnly={false}
          value={currentJobTypesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.jobTypes?.hasError) {
              runValidationTasks("jobTypes", value);
            }
            setCurrentJobTypesValue(value);
          }}
          onBlur={() => runValidationTasks("jobTypes", currentJobTypesValue)}
          errorMessage={errors.jobTypes?.errorMessage}
          hasError={errors.jobTypes?.hasError}
          ref={jobTypesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "jobTypes")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories: values,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            values = result?.developmentCategories ?? values;
          }
          setDevelopmentCategories(values);
          setCurrentDevelopmentCategoriesValue("");
        }}
        currentFieldValue={currentDevelopmentCategoriesValue}
        label={"Development categories"}
        items={developmentCategories}
        hasError={errors?.developmentCategories?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "developmentCategories",
            currentDevelopmentCategoriesValue
          )
        }
        errorMessage={errors?.developmentCategories?.errorMessage}
        setFieldValue={setCurrentDevelopmentCategoriesValue}
        inputFieldRef={developmentCategoriesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Development categories"
          isRequired={false}
          isReadOnly={false}
          value={currentDevelopmentCategoriesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.developmentCategories?.hasError) {
              runValidationTasks("developmentCategories", value);
            }
            setCurrentDevelopmentCategoriesValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "developmentCategories",
              currentDevelopmentCategoriesValue
            )
          }
          errorMessage={errors.developmentCategories?.errorMessage}
          hasError={errors.developmentCategories?.hasError}
          ref={developmentCategoriesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "developmentCategories")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts: values,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            values = result?.developmentProducts ?? values;
          }
          setDevelopmentProducts(values);
          setCurrentDevelopmentProductsValue("");
        }}
        currentFieldValue={currentDevelopmentProductsValue}
        label={"Development products"}
        items={developmentProducts}
        hasError={errors?.developmentProducts?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "developmentProducts",
            currentDevelopmentProductsValue
          )
        }
        errorMessage={errors?.developmentProducts?.errorMessage}
        setFieldValue={setCurrentDevelopmentProductsValue}
        inputFieldRef={developmentProductsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Development products"
          isRequired={false}
          isReadOnly={false}
          value={currentDevelopmentProductsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.developmentProducts?.hasError) {
              runValidationTasks("developmentProducts", value);
            }
            setCurrentDevelopmentProductsValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "developmentProducts",
              currentDevelopmentProductsValue
            )
          }
          errorMessage={errors.developmentProducts?.errorMessage}
          hasError={errors.developmentProducts?.hasError}
          ref={developmentProductsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "developmentProducts")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages: values,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            values = result?.programmingLanguages ?? values;
          }
          setProgrammingLanguages(values);
          setCurrentProgrammingLanguagesValue("");
        }}
        currentFieldValue={currentProgrammingLanguagesValue}
        label={"Programming languages"}
        items={programmingLanguages}
        hasError={errors?.programmingLanguages?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "programmingLanguages",
            currentProgrammingLanguagesValue
          )
        }
        errorMessage={errors?.programmingLanguages?.errorMessage}
        setFieldValue={setCurrentProgrammingLanguagesValue}
        inputFieldRef={programmingLanguagesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Programming languages"
          isRequired={false}
          isReadOnly={false}
          value={currentProgrammingLanguagesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.programmingLanguages?.hasError) {
              runValidationTasks("programmingLanguages", value);
            }
            setCurrentProgrammingLanguagesValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "programmingLanguages",
              currentProgrammingLanguagesValue
            )
          }
          errorMessage={errors.programmingLanguages?.errorMessage}
          hasError={errors.programmingLanguages?.hasError}
          ref={programmingLanguagesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "programmingLanguages")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks: values,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            values = result?.frameworks ?? values;
          }
          setFrameworks(values);
          setCurrentFrameworksValue("");
        }}
        currentFieldValue={currentFrameworksValue}
        label={"Frameworks"}
        items={frameworks}
        hasError={errors?.frameworks?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("frameworks", currentFrameworksValue)
        }
        errorMessage={errors?.frameworks?.errorMessage}
        setFieldValue={setCurrentFrameworksValue}
        inputFieldRef={frameworksRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Frameworks"
          isRequired={false}
          isReadOnly={false}
          value={currentFrameworksValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.frameworks?.hasError) {
              runValidationTasks("frameworks", value);
            }
            setCurrentFrameworksValue(value);
          }}
          onBlur={() =>
            runValidationTasks("frameworks", currentFrameworksValue)
          }
          errorMessage={errors.frameworks?.errorMessage}
          hasError={errors.frameworks?.hasError}
          ref={frameworksRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "frameworks")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools: values,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            values = result?.developmentTools ?? values;
          }
          setDevelopmentTools(values);
          setCurrentDevelopmentToolsValue("");
        }}
        currentFieldValue={currentDevelopmentToolsValue}
        label={"Development tools"}
        items={developmentTools}
        hasError={errors?.developmentTools?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "developmentTools",
            currentDevelopmentToolsValue
          )
        }
        errorMessage={errors?.developmentTools?.errorMessage}
        setFieldValue={setCurrentDevelopmentToolsValue}
        inputFieldRef={developmentToolsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Development tools"
          isRequired={false}
          isReadOnly={false}
          value={currentDevelopmentToolsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.developmentTools?.hasError) {
              runValidationTasks("developmentTools", value);
            }
            setCurrentDevelopmentToolsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("developmentTools", currentDevelopmentToolsValue)
          }
          errorMessage={errors.developmentTools?.errorMessage}
          hasError={errors.developmentTools?.hasError}
          ref={developmentToolsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "developmentTools")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications: values,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            values = result?.qualifications ?? values;
          }
          setQualifications(values);
          setCurrentQualificationsValue("");
        }}
        currentFieldValue={currentQualificationsValue}
        label={"Qualifications"}
        items={qualifications}
        hasError={errors?.qualifications?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("qualifications", currentQualificationsValue)
        }
        errorMessage={errors?.qualifications?.errorMessage}
        setFieldValue={setCurrentQualificationsValue}
        inputFieldRef={qualificationsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Qualifications"
          isRequired={false}
          isReadOnly={false}
          value={currentQualificationsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.qualifications?.hasError) {
              runValidationTasks("qualifications", value);
            }
            setCurrentQualificationsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("qualifications", currentQualificationsValue)
          }
          errorMessage={errors.qualifications?.errorMessage}
          hasError={errors.qualifications?.hasError}
          ref={qualificationsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "qualifications")}
        ></TextField>
      </ArrayField>
      <SelectField
        label="Attendance type"
        placeholder="Please select an option"
        isDisabled={false}
        value={attendanceType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType: value,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.attendanceType ?? value;
          }
          if (errors.attendanceType?.hasError) {
            runValidationTasks("attendanceType", value);
          }
          setAttendanceType(value);
        }}
        onBlur={() => runValidationTasks("attendanceType", attendanceType)}
        errorMessage={errors.attendanceType?.errorMessage}
        hasError={errors.attendanceType?.hasError}
        {...getOverrideProps(overrides, "attendanceType")}
      >
        <option
          children="Online"
          value="ONLINE"
          {...getOverrideProps(overrides, "attendanceTypeoption0")}
        ></option>
        <option
          children="Offline"
          value="OFFLINE"
          {...getOverrideProps(overrides, "attendanceTypeoption1")}
        ></option>
        <option
          children="Hybrid"
          value="HYBRID"
          {...getOverrideProps(overrides, "attendanceTypeoption2")}
        ></option>
      </SelectField>
      <TextField
        label="Location pref"
        isRequired={false}
        isReadOnly={false}
        value={locationPref}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref: value,
              locationCity,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.locationPref ?? value;
          }
          if (errors.locationPref?.hasError) {
            runValidationTasks("locationPref", value);
          }
          setLocationPref(value);
        }}
        onBlur={() => runValidationTasks("locationPref", locationPref)}
        errorMessage={errors.locationPref?.errorMessage}
        hasError={errors.locationPref?.hasError}
        {...getOverrideProps(overrides, "locationPref")}
      ></TextField>
      <TextField
        label="Location city"
        isRequired={false}
        isReadOnly={false}
        value={locationCity}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity: value,
              especiallyAudiences,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.locationCity ?? value;
          }
          if (errors.locationCity?.hasError) {
            runValidationTasks("locationCity", value);
          }
          setLocationCity(value);
        }}
        onBlur={() => runValidationTasks("locationCity", locationCity)}
        errorMessage={errors.locationCity?.errorMessage}
        hasError={errors.locationCity?.hasError}
        {...getOverrideProps(overrides, "locationCity")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences: values,
              isDeleted,
            };
            const result = onChange(modelFields);
            values = result?.especiallyAudiences ?? values;
          }
          setEspeciallyAudiences(values);
          setCurrentEspeciallyAudiencesValue("");
        }}
        currentFieldValue={currentEspeciallyAudiencesValue}
        label={"Especially audiences"}
        items={especiallyAudiences}
        hasError={errors?.especiallyAudiences?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "especiallyAudiences",
            currentEspeciallyAudiencesValue
          )
        }
        errorMessage={errors?.especiallyAudiences?.errorMessage}
        getBadgeText={getDisplayValue.especiallyAudiences}
        setFieldValue={setCurrentEspeciallyAudiencesValue}
        inputFieldRef={especiallyAudiencesRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Especially audiences"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentEspeciallyAudiencesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.especiallyAudiences?.hasError) {
              runValidationTasks("especiallyAudiences", value);
            }
            setCurrentEspeciallyAudiencesValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "especiallyAudiences",
              currentEspeciallyAudiencesValue
            )
          }
          errorMessage={errors.especiallyAudiences?.errorMessage}
          hasError={errors.especiallyAudiences?.hasError}
          ref={especiallyAudiencesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "especiallyAudiences")}
        >
          <option
            children="For elementary students"
            value="FOR_ELEMENTARY_STUDENTS"
            {...getOverrideProps(overrides, "especiallyAudiencesoption0")}
          ></option>
          <option
            children="For junior high students"
            value="FOR_JUNIOR_HIGH_STUDENTS"
            {...getOverrideProps(overrides, "especiallyAudiencesoption1")}
          ></option>
          <option
            children="For high school students"
            value="FOR_HIGH_SCHOOL_STUDENTS"
            {...getOverrideProps(overrides, "especiallyAudiencesoption2")}
          ></option>
          <option
            children="For university students"
            value="FOR_UNIVERSITY_STUDENTS"
            {...getOverrideProps(overrides, "especiallyAudiencesoption3")}
          ></option>
          <option
            children="For housewives"
            value="FOR_HOUSEWIVES"
            {...getOverrideProps(overrides, "especiallyAudiencesoption4")}
          ></option>
          <option
            children="For seniors"
            value="FOR_SENIORS"
            {...getOverrideProps(overrides, "especiallyAudiencesoption5")}
          ></option>
          <option
            children="For people with disabilities"
            value="FOR_PEOPLE_WITH_DISABILITIES"
            {...getOverrideProps(overrides, "especiallyAudiencesoption6")}
          ></option>
        </SelectField>
      </ArrayField>
      <SwitchField
        label="Is deleted"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isDeleted}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              learningCenterId,
              courseName,
              courseURL,
              couseDetail,
              isAvailableMoneyBack,
              moneyBackDetail,
              isAvailableSubsidy,
              subsidyMemo,
              onSale,
              saleMemo,
              isMadeToOrder,
              madeToOrderDetail,
              isJobIntroductionAvailable,
              jobIntroductionDetail,
              isJobHuntingSupport,
              jobHuntingSupportDetail,
              purposes,
              jobTypes,
              developmentCategories,
              developmentProducts,
              programmingLanguages,
              frameworks,
              developmentTools,
              qualifications,
              attendanceType,
              locationPref,
              locationCity,
              especiallyAudiences,
              isDeleted: value,
            };
            const result = onChange(modelFields);
            value = result?.isDeleted ?? value;
          }
          if (errors.isDeleted?.hasError) {
            runValidationTasks("isDeleted", value);
          }
          setIsDeleted(value);
        }}
        onBlur={() => runValidationTasks("isDeleted", isDeleted)}
        errorMessage={errors.isDeleted?.errorMessage}
        hasError={errors.isDeleted?.hasError}
        {...getOverrideProps(overrides, "isDeleted")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || learningCenterCourseModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || learningCenterCourseModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

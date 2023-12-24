/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createCourseReview } from "../graphql/mutations";
const client = generateClient();
export default function CourseReviewCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    userId: "",
    learningCenterId: "",
    learningCenterCourseId: "",
    gotResults: "",
    message: "",
    otherMemo: "",
  };
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [learningCenterId, setLearningCenterId] = React.useState(
    initialValues.learningCenterId
  );
  const [learningCenterCourseId, setLearningCenterCourseId] = React.useState(
    initialValues.learningCenterCourseId
  );
  const [gotResults, setGotResults] = React.useState(initialValues.gotResults);
  const [message, setMessage] = React.useState(initialValues.message);
  const [otherMemo, setOtherMemo] = React.useState(initialValues.otherMemo);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUserId(initialValues.userId);
    setLearningCenterId(initialValues.learningCenterId);
    setLearningCenterCourseId(initialValues.learningCenterCourseId);
    setGotResults(initialValues.gotResults);
    setMessage(initialValues.message);
    setOtherMemo(initialValues.otherMemo);
    setErrors({});
  };
  const validations = {
    userId: [{ type: "Required" }],
    learningCenterId: [{ type: "Required" }],
    learningCenterCourseId: [{ type: "Required" }],
    gotResults: [],
    message: [],
    otherMemo: [],
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
          userId,
          learningCenterId,
          learningCenterCourseId,
          gotResults,
          message,
          otherMemo,
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
            query: createCourseReview.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "CourseReviewCreateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={true}
        isReadOnly={false}
        value={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId: value,
              learningCenterId,
              learningCenterCourseId,
              gotResults,
              message,
              otherMemo,
            };
            const result = onChange(modelFields);
            value = result?.userId ?? value;
          }
          if (errors.userId?.hasError) {
            runValidationTasks("userId", value);
          }
          setUserId(value);
        }}
        onBlur={() => runValidationTasks("userId", userId)}
        errorMessage={errors.userId?.errorMessage}
        hasError={errors.userId?.hasError}
        {...getOverrideProps(overrides, "userId")}
      ></TextField>
      <TextField
        label="Learning center id"
        isRequired={true}
        isReadOnly={false}
        value={learningCenterId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              learningCenterId: value,
              learningCenterCourseId,
              gotResults,
              message,
              otherMemo,
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
        label="Learning center course id"
        isRequired={true}
        isReadOnly={false}
        value={learningCenterCourseId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              learningCenterId,
              learningCenterCourseId: value,
              gotResults,
              message,
              otherMemo,
            };
            const result = onChange(modelFields);
            value = result?.learningCenterCourseId ?? value;
          }
          if (errors.learningCenterCourseId?.hasError) {
            runValidationTasks("learningCenterCourseId", value);
          }
          setLearningCenterCourseId(value);
        }}
        onBlur={() =>
          runValidationTasks("learningCenterCourseId", learningCenterCourseId)
        }
        errorMessage={errors.learningCenterCourseId?.errorMessage}
        hasError={errors.learningCenterCourseId?.hasError}
        {...getOverrideProps(overrides, "learningCenterCourseId")}
      ></TextField>
      <TextField
        label="Got results"
        isRequired={false}
        isReadOnly={false}
        value={gotResults}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              learningCenterId,
              learningCenterCourseId,
              gotResults: value,
              message,
              otherMemo,
            };
            const result = onChange(modelFields);
            value = result?.gotResults ?? value;
          }
          if (errors.gotResults?.hasError) {
            runValidationTasks("gotResults", value);
          }
          setGotResults(value);
        }}
        onBlur={() => runValidationTasks("gotResults", gotResults)}
        errorMessage={errors.gotResults?.errorMessage}
        hasError={errors.gotResults?.hasError}
        {...getOverrideProps(overrides, "gotResults")}
      ></TextField>
      <TextField
        label="Message"
        isRequired={false}
        isReadOnly={false}
        value={message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              learningCenterId,
              learningCenterCourseId,
              gotResults,
              message: value,
              otherMemo,
            };
            const result = onChange(modelFields);
            value = result?.message ?? value;
          }
          if (errors.message?.hasError) {
            runValidationTasks("message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("message", message)}
        errorMessage={errors.message?.errorMessage}
        hasError={errors.message?.hasError}
        {...getOverrideProps(overrides, "message")}
      ></TextField>
      <TextField
        label="Other memo"
        isRequired={false}
        isReadOnly={false}
        value={otherMemo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              learningCenterId,
              learningCenterCourseId,
              gotResults,
              message,
              otherMemo: value,
            };
            const result = onChange(modelFields);
            value = result?.otherMemo ?? value;
          }
          if (errors.otherMemo?.hasError) {
            runValidationTasks("otherMemo", value);
          }
          setOtherMemo(value);
        }}
        onBlur={() => runValidationTasks("otherMemo", otherMemo)}
        errorMessage={errors.otherMemo?.errorMessage}
        hasError={errors.otherMemo?.hasError}
        {...getOverrideProps(overrides, "otherMemo")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createLearningCenter } from "../graphql/mutations";
const client = generateClient();
export default function LearningCenterCreateForm(props) {
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
    name: "",
    memo: "",
    operatingCompany: "",
    headquartersLocation: "",
    websiteURL: "",
    logoImageURL: "",
    establishmentYear: "",
    representative: "",
    isDeleted: false,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [memo, setMemo] = React.useState(initialValues.memo);
  const [operatingCompany, setOperatingCompany] = React.useState(
    initialValues.operatingCompany
  );
  const [headquartersLocation, setHeadquartersLocation] = React.useState(
    initialValues.headquartersLocation
  );
  const [websiteURL, setWebsiteURL] = React.useState(initialValues.websiteURL);
  const [logoImageURL, setLogoImageURL] = React.useState(
    initialValues.logoImageURL
  );
  const [establishmentYear, setEstablishmentYear] = React.useState(
    initialValues.establishmentYear
  );
  const [representative, setRepresentative] = React.useState(
    initialValues.representative
  );
  const [isDeleted, setIsDeleted] = React.useState(initialValues.isDeleted);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setMemo(initialValues.memo);
    setOperatingCompany(initialValues.operatingCompany);
    setHeadquartersLocation(initialValues.headquartersLocation);
    setWebsiteURL(initialValues.websiteURL);
    setLogoImageURL(initialValues.logoImageURL);
    setEstablishmentYear(initialValues.establishmentYear);
    setRepresentative(initialValues.representative);
    setIsDeleted(initialValues.isDeleted);
    setErrors({});
  };
  const validations = {
    name: [],
    memo: [],
    operatingCompany: [],
    headquartersLocation: [],
    websiteURL: [],
    logoImageURL: [],
    establishmentYear: [],
    representative: [],
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
          name,
          memo,
          operatingCompany,
          headquartersLocation,
          websiteURL,
          logoImageURL,
          establishmentYear,
          representative,
          isDeleted,
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
            query: createLearningCenter.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "LearningCenterCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              memo,
              operatingCompany,
              headquartersLocation,
              websiteURL,
              logoImageURL,
              establishmentYear,
              representative,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Memo"
        isRequired={false}
        isReadOnly={false}
        value={memo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              memo: value,
              operatingCompany,
              headquartersLocation,
              websiteURL,
              logoImageURL,
              establishmentYear,
              representative,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.memo ?? value;
          }
          if (errors.memo?.hasError) {
            runValidationTasks("memo", value);
          }
          setMemo(value);
        }}
        onBlur={() => runValidationTasks("memo", memo)}
        errorMessage={errors.memo?.errorMessage}
        hasError={errors.memo?.hasError}
        {...getOverrideProps(overrides, "memo")}
      ></TextField>
      <TextField
        label="Operating company"
        isRequired={false}
        isReadOnly={false}
        value={operatingCompany}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              memo,
              operatingCompany: value,
              headquartersLocation,
              websiteURL,
              logoImageURL,
              establishmentYear,
              representative,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.operatingCompany ?? value;
          }
          if (errors.operatingCompany?.hasError) {
            runValidationTasks("operatingCompany", value);
          }
          setOperatingCompany(value);
        }}
        onBlur={() => runValidationTasks("operatingCompany", operatingCompany)}
        errorMessage={errors.operatingCompany?.errorMessage}
        hasError={errors.operatingCompany?.hasError}
        {...getOverrideProps(overrides, "operatingCompany")}
      ></TextField>
      <TextField
        label="Headquarters location"
        isRequired={false}
        isReadOnly={false}
        value={headquartersLocation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              memo,
              operatingCompany,
              headquartersLocation: value,
              websiteURL,
              logoImageURL,
              establishmentYear,
              representative,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.headquartersLocation ?? value;
          }
          if (errors.headquartersLocation?.hasError) {
            runValidationTasks("headquartersLocation", value);
          }
          setHeadquartersLocation(value);
        }}
        onBlur={() =>
          runValidationTasks("headquartersLocation", headquartersLocation)
        }
        errorMessage={errors.headquartersLocation?.errorMessage}
        hasError={errors.headquartersLocation?.hasError}
        {...getOverrideProps(overrides, "headquartersLocation")}
      ></TextField>
      <TextField
        label="Website url"
        isRequired={false}
        isReadOnly={false}
        value={websiteURL}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              memo,
              operatingCompany,
              headquartersLocation,
              websiteURL: value,
              logoImageURL,
              establishmentYear,
              representative,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.websiteURL ?? value;
          }
          if (errors.websiteURL?.hasError) {
            runValidationTasks("websiteURL", value);
          }
          setWebsiteURL(value);
        }}
        onBlur={() => runValidationTasks("websiteURL", websiteURL)}
        errorMessage={errors.websiteURL?.errorMessage}
        hasError={errors.websiteURL?.hasError}
        {...getOverrideProps(overrides, "websiteURL")}
      ></TextField>
      <TextField
        label="Logo image url"
        isRequired={false}
        isReadOnly={false}
        value={logoImageURL}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              memo,
              operatingCompany,
              headquartersLocation,
              websiteURL,
              logoImageURL: value,
              establishmentYear,
              representative,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.logoImageURL ?? value;
          }
          if (errors.logoImageURL?.hasError) {
            runValidationTasks("logoImageURL", value);
          }
          setLogoImageURL(value);
        }}
        onBlur={() => runValidationTasks("logoImageURL", logoImageURL)}
        errorMessage={errors.logoImageURL?.errorMessage}
        hasError={errors.logoImageURL?.hasError}
        {...getOverrideProps(overrides, "logoImageURL")}
      ></TextField>
      <TextField
        label="Establishment year"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={establishmentYear}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              memo,
              operatingCompany,
              headquartersLocation,
              websiteURL,
              logoImageURL,
              establishmentYear: value,
              representative,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.establishmentYear ?? value;
          }
          if (errors.establishmentYear?.hasError) {
            runValidationTasks("establishmentYear", value);
          }
          setEstablishmentYear(value);
        }}
        onBlur={() =>
          runValidationTasks("establishmentYear", establishmentYear)
        }
        errorMessage={errors.establishmentYear?.errorMessage}
        hasError={errors.establishmentYear?.hasError}
        {...getOverrideProps(overrides, "establishmentYear")}
      ></TextField>
      <TextField
        label="Representative"
        isRequired={false}
        isReadOnly={false}
        value={representative}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              memo,
              operatingCompany,
              headquartersLocation,
              websiteURL,
              logoImageURL,
              establishmentYear,
              representative: value,
              isDeleted,
            };
            const result = onChange(modelFields);
            value = result?.representative ?? value;
          }
          if (errors.representative?.hasError) {
            runValidationTasks("representative", value);
          }
          setRepresentative(value);
        }}
        onBlur={() => runValidationTasks("representative", representative)}
        errorMessage={errors.representative?.errorMessage}
        hasError={errors.representative?.hasError}
        {...getOverrideProps(overrides, "representative")}
      ></TextField>
      <SwitchField
        label="Is deleted"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isDeleted}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              memo,
              operatingCompany,
              headquartersLocation,
              websiteURL,
              logoImageURL,
              establishmentYear,
              representative,
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

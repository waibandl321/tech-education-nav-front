/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CourseReviewCreateFormInputValues = {
    userId?: string;
    learningCenterId?: string;
    learningCenterCourseId?: string;
    gotResults?: string;
    message?: string;
    otherMemo?: string;
};
export declare type CourseReviewCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    learningCenterId?: ValidationFunction<string>;
    learningCenterCourseId?: ValidationFunction<string>;
    gotResults?: ValidationFunction<string>;
    message?: ValidationFunction<string>;
    otherMemo?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CourseReviewCreateFormOverridesProps = {
    CourseReviewCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    learningCenterId?: PrimitiveOverrideProps<TextFieldProps>;
    learningCenterCourseId?: PrimitiveOverrideProps<TextFieldProps>;
    gotResults?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    otherMemo?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CourseReviewCreateFormProps = React.PropsWithChildren<{
    overrides?: CourseReviewCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CourseReviewCreateFormInputValues) => CourseReviewCreateFormInputValues;
    onSuccess?: (fields: CourseReviewCreateFormInputValues) => void;
    onError?: (fields: CourseReviewCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CourseReviewCreateFormInputValues) => CourseReviewCreateFormInputValues;
    onValidate?: CourseReviewCreateFormValidationValues;
} & React.CSSProperties>;
export default function CourseReviewCreateForm(props: CourseReviewCreateFormProps): React.ReactElement;

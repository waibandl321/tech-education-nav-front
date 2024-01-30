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
export declare type CreditCardCreateFormInputValues = {
    name?: string;
};
export declare type CreditCardCreateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CreditCardCreateFormOverridesProps = {
    CreditCardCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CreditCardCreateFormProps = React.PropsWithChildren<{
    overrides?: CreditCardCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CreditCardCreateFormInputValues) => CreditCardCreateFormInputValues;
    onSuccess?: (fields: CreditCardCreateFormInputValues) => void;
    onError?: (fields: CreditCardCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CreditCardCreateFormInputValues) => CreditCardCreateFormInputValues;
    onValidate?: CreditCardCreateFormValidationValues;
} & React.CSSProperties>;
export default function CreditCardCreateForm(props: CreditCardCreateFormProps): React.ReactElement;

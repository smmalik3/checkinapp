/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { DividerProps, GridProps, HeadingProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WeeklyCheckInInputValues = {
    Field0?: string;
};
export declare type WeeklyCheckInValidationValues = {
    Field0?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WeeklyCheckInOverridesProps = {
    WeeklyCheckInGrid?: PrimitiveOverrideProps<GridProps>;
    SectionalElement0?: PrimitiveOverrideProps<HeadingProps>;
    SectionalElement1?: PrimitiveOverrideProps<DividerProps>;
    Field0?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WeeklyCheckInProps = React.PropsWithChildren<{
    overrides?: WeeklyCheckInOverridesProps | undefined | null;
} & {
    onSubmit: (fields: WeeklyCheckInInputValues) => void;
    onChange?: (fields: WeeklyCheckInInputValues) => WeeklyCheckInInputValues;
    onValidate?: WeeklyCheckInValidationValues;
} & React.CSSProperties>;
export default function WeeklyCheckIn(props: WeeklyCheckInProps): React.ReactElement;

import React, { useState } from "react";

interface IValidation {
    required?: {
        value: boolean,
        message: string,
    },
    pattern?: {
        value: string,
        message: string,
    },
    custom?: {
        isValid: (value: string) => boolean,
        message: string,
    },
};

type Validation<T> = Partial<Record<keyof T, IValidation>>;

type ValidationError<T> = Partial<Record<keyof T, string>>;

export function useForm <T extends Record<keyof T, any>>(options: {
    validations: Validation<T>,
    initialValues?: Partial<T>,
    onSubmit?: () => void,
}) {
    const [data, setData] = useState<T>((options?.initialValues || {}) as T);
    const [errors, setErrors] = useState<ValidationError<T>>({});

    // curried function
    function handleChange<S extends unknown>(key: keyof T, fnSanitize?: (value: string) => S) {
        return function updateState(event: React.ChangeEvent<HTMLInputElement>) {
            // if sanitization function is passed, use it to manipulate value, otherwise just use value
            const value = fnSanitize ? fnSanitize(event.target.value) : event.target.value;
            // update state with said value
            setData({
                ...data,
                [key]: value,
            });
        };
    };

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const newErrors: ValidationError<T> = {};

        if (options?.validations) {
            const validations = options.validations;
            for (const key in validations) {
                const value = data[key];
                const validation = validations[key];
                
                // validate required values
                if (validation?.required?.value && !value) {
                    newErrors[key] = validation.required.message;
                    continue;
                };

                // validate values with regex pattern
                const pattern = validation?.pattern;
                if (pattern?.value && !RegExp(pattern.value).test(value)){
                    newErrors[key] = pattern.message;
                };

                const custom = validation?.custom;
                if (custom?.isValid && !custom.isValid(value)) {
                    newErrors[key] = custom.message;
                };
            };
        };

        // if any validation errors encountered, set state with errors and return instead of submitting
        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        };

        if (options?.onSubmit) {
            options.onSubmit();
        };
    };

    return {
        data,
        errors,
        handleChange,
        handleSubmit,
    };
};
"use client";

import React, { useMemo } from "react";
import { StylesConfig } from "react-select";
import Select from "react-select";

type MultiSelectProps = {
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: { label: string; value: string }[]) => void;
};

export default function MultiSelect({
  options = [],
  value,
  disabled,
  placeholder,
  onChange,
}: MultiSelectProps) {
  const multiSelectStyles: StylesConfig = {
    control: (styles) => ({ ...styles, backgroundColor: "black" }),
    option: (styles) => {
      return {
        ...styles,
        opacity: 1000,
        backgroundColor: "black",
        ":hover": {
          backgroundColor: "gray",
        },
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "gray",
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: "white",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "red",
      ":hover": {
        backgroundColor: "red",
        color: "white",
      },
    }),
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <Select
      placeholder={placeholder}
      styles={multiSelectStyles}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "hotpink",
          primary: "black",
        },
      })}
      onChange={(e) => {
        // @ts-ignore
        onChange(e);
      }}
      value={formattedValue}
      options={options}
      isDisabled={disabled}
      isMulti
    />
  );
}

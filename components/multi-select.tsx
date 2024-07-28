"use client";

import { useTheme } from "next-themes";
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
  const { resolvedTheme } = useTheme();

  const multiSelectStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      backgroundColor: resolvedTheme === "dark" ? "black" : "white",
      color: "white",
    }),
    option: (styles) => {
      return {
        ...styles,
        opacity: 1000,
        backgroundColor: resolvedTheme === "dark" ? "black" : "white",
        ":hover": {
          backgroundColor: "skyblue",
        },
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "skyblue",
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: "white",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "gray",
      ":hover": {
        backgroundColor: "red",
        color: "white",
      },
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
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

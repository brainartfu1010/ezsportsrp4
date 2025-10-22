"use client";

import React, { useState } from "react";
import { ComboBase } from "./combo-base";
import { useSports } from "@/hooks/useSports";
import { Select } from "../ui/select";

type SportComboProps = {
  value?: string[] | string | number[] | number;
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
};

export function ComboSports({
  value,
  onChange,
  placeholder = "Select Sport",
  disabled = false,
  className,
  multiple = false,
}: SportComboProps) {
  const { sports, loading, error } = useSports();

  return (
    <Select
      data={sports}
      value={value}
      onChange={(v) => onChange?.(v as string[])}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      multiple={multiple}
      // valueType="item"
      // returnType="item"
      // multiple
      // allowClear
      // allowFilter
    />
  );
}

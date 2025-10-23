"use client";

import React from "react";
import { useSports } from "@/hooks/useSports";
import { Select } from "../ui/select";

type SportComboProps = {
  value?: string[] | string | number[] | number | null | undefined;
  onChange?: (value: string[] | null | undefined) => void;
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
};

export function ComboSports({
  value,
  onChange,
  onValueChange,
  placeholder = "Select Sport",
  disabled = false,
  className,
  multiple = false,
}: SportComboProps) {
  const { sports, loading, error } = useSports();

  const handleChange = (value: string[]) => {
    onChange?.(value);
    onValueChange?.(value);
  };

  return (
    <Select
      data={sports}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled || loading}
      className={className}
      multiple={multiple}
      loading={loading}
      error={error}
    />
  );
}

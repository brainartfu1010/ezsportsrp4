"use client";

import React from "react";
import { useClubs } from "@/hooks/useClubs";
import { Select } from "../ui/select";
import { BaseItem } from "@/types/types";

type ClubComboProps = {
  value?: string[] | string | number[] | number | null | undefined;
  onChange?: (value: string[]) => void;
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  sportId?: string | null;
};

export function ComboClubs({
  value,
  onChange,
  onValueChange,
  placeholder = "Select Club",
  disabled = false,
  className,
  multiple = false,
  sportId,
}: ClubComboProps) {
  const { clubs, isLoading, error } = useClubs();

  const handleChange = (value: string[]) => {
    onChange?.(value);
    onValueChange?.(value);
  };

  return (
    <Select
      data={clubs}
      value={value === null || value === undefined ? [] : value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled || isLoading}
      className={className}
      multiple={multiple}
      loading={isLoading}
      error={error || undefined}
    />
  );
}

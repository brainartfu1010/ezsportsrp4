"use client";

import React from "react";
import { useTeams } from "@/hooks/useTeams";
import { Select } from "../ui/select";
import { BaseItem } from "@/types/types";

type TeamComboProps = {
  value?: string[] | string | number[] | number | null | undefined;
  onChange?: (value: string[]) => void;
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  clubId?: string | null;
  sportId?: string | null;
};

export function ComboTeams({
  value,
  onChange,
  onValueChange,
  placeholder = "Select Team",
  disabled = false,
  className,
  multiple = false,
  clubId,
  sportId,
}: TeamComboProps) {
  const { teams, isLoading, error } = useTeams(
    clubId || undefined,
    sportId || undefined
  );

  const handleChange = (value: string[]) => {
    onChange?.(value);
    onValueChange?.(value);
  };

  return (
    <Select
      data={teams}
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

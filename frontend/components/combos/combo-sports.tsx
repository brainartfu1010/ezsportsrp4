"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSports } from "@/hooks/useSports";
import { TypeSport } from "@/lib/types";

type SportComboProps = {
  value?: string[] | string | number[] | number;
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
};

export function ComboSports({
  value,
  onValueChange,
  placeholder = "Select sports",
  disabled = false,
  className,
  multiple = false,
}: SportComboProps) {
  const { sports, loading, error } = useSports();

  // Normalize value to always be an array of strings
  const selectedSports = React.useMemo(() => {
    if (!value) return [];
    return Array.isArray(value)
      ? value.map(String)
      : [String(value)];
  }, [value]);

  const handleValueChange = (sportId: string) => {
    if (!onValueChange) return;

    const currentIndex = selectedSports.indexOf(sportId);
    const newSelectedSports =
      currentIndex === -1
        ? [...selectedSports, sportId]
        : selectedSports.filter((id) => id !== sportId);

    onValueChange(newSelectedSports);
  };

  // Create a display string for selected sports
  const displayValue =
    selectedSports.length > 0
      ? sports
          .filter((sport) => selectedSports.includes(String(sport.id)))
          .map((sport) => sport.name)
          .join(", ")
      : placeholder;

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <Select
        value={selectedSports[0] || undefined}
        onValueChange={handleValueChange}
        disabled={disabled || loading}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={loading ? "Loading sports..." : displayValue}
          />
        </SelectTrigger>
        <SelectContent>
          {loading && (
            <SelectItem value="loading" disabled>
              Loading sports...
            </SelectItem>
          )}

          {error && (
            <SelectItem value="error" disabled>
              Error loading sports
            </SelectItem>
          )}

          <SelectGroup>
            <SelectLabel>Select Sports</SelectLabel>
            {sports.map((sport: TypeSport) => (
              <SelectItem
                key={sport.id}
                value={String(sport.id)}
                className="flex items-center justify-between"
              >
                <span>{sport.name}</span>
                {selectedSports.includes(String(sport.id)) && (
                  <Badge variant="secondary" className="ml-2">
                    Selected
                  </Badge>
                )}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Display selected sports as badges */}
      {selectedSports.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSports.map((sportId) => {
            const sport = sports.find((s) => String(s.id) === sportId);
            return sport ? (
              <Badge
                key={sportId}
                variant="outline"
                className="flex items-center"
              >
                {sport.name}
                <button
                  onClick={() => handleValueChange(sportId)}
                  className="ml-2 text-destructive hover:text-destructive/80"
                >
                  ×
                </button>
              </Badge>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}

import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  type: "checkbox" | "range" | "radio";
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface FilterState {
  [key: string]: string[] | [number, number];
}

interface AdvancedFiltersProps {
  filters: FilterGroup[];
  activeFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  onApply: () => void;
  activeFilterCount?: number;
}

export function AdvancedFilters({
  filters,
  activeFilters,
  onFilterChange,
  onReset,
  onApply,
  activeFilterCount = 0,
}: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCheckboxChange = (filterId: string, value: string, checked: boolean) => {
    const currentValues = (activeFilters[filterId] as string[]) || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    onFilterChange({ ...activeFilters, [filterId]: newValues });
  };

  const handleRangeChange = (filterId: string, value: number[]) => {
    onFilterChange({ ...activeFilters, [filterId]: value as [number, number] });
  };

  const handleReset = () => {
    onReset();
  };

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-medium text-foreground">筛选</h3>
          {hasActiveFilters && (
            <Badge variant="secondary">{activeFilterCount}</Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          disabled={!hasActiveFilters}
        >
          重置
        </Button>
      </div>

      <div className="space-y-6">
        {filters.map((filter) => (
          <Collapsible
            key={filter.id}
            open={isExpanded}
            onOpenChange={setIsExpanded}
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between cursor-pointer">
                <Label className="font-medium">{filter.label}</Label>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              {filter.type === "checkbox" && filter.options && (
                <div className="space-y-2">
                  {filter.options.map((option) => {
                    const isChecked = (activeFilters[filter.id] as string[])?.includes(
                      option.value
                    );
                    return (
                      <div
                        key={option.value}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`${filter.id}-${option.value}`}
                            checked={isChecked}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(
                                filter.id,
                                option.value,
                                checked as boolean
                              )
                            }
                          />
                          <Label
                            htmlFor={`${filter.id}-${option.value}`}
                            className="cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                        {option.count !== undefined && (
                          <span className="text-sm text-muted-foreground">
                            {option.count}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {filter.type === "range" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {filter.min} {filter.unit}
                    </span>
                    <span className="text-muted-foreground">
                      {filter.max} {filter.unit}
                    </span>
                  </div>
                  <Slider
                    min={filter.min}
                    max={filter.max}
                    step={filter.step || 1}
                    value={
                      (activeFilters[filter.id] as [number, number]) || [
                        filter.min || 0,
                        filter.max || 100,
                      ]
                    }
                    onValueChange={(value) =>
                      handleRangeChange(filter.id, value)
                    }
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <Input
                      type="number"
                      value={
                        (activeFilters[filter.id] as [number, number])?.[0] ||
                        filter.min ||
                        0
                      }
                      onChange={(e) =>
                        handleRangeChange(filter.id, [
                          Number(e.target.value),
                          (activeFilters[filter.id] as [number, number])?.[1] ||
                            filter.max ||
                            100,
                        ])
                      }
                      className="w-20"
                    />
                    <Input
                      type="number"
                      value={
                        (activeFilters[filter.id] as [number, number])?.[1] ||
                        filter.max ||
                        100
                      }
                      onChange={(e) =>
                        handleRangeChange(filter.id, [
                          (activeFilters[filter.id] as [number, number])?.[0] ||
                            filter.min ||
                            0,
                          Number(e.target.value),
                        ])
                      }
                      className="w-20"
                    />
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      <div className="flex gap-2 mt-6 pt-6 border-t">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={!hasActiveFilters}
          className="flex-1"
        >
          重置
        </Button>
        <Button onClick={onApply} className="flex-1">
          应用筛选
        </Button>
      </div>
    </Card>
  );
}

interface ActiveFiltersProps {
  filters: FilterState;
  filterDefinitions: FilterGroup[];
  onRemoveFilter: (filterId: string, value?: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  filters,
  filterDefinitions,
  onRemoveFilter,
  onClearAll,
}: ActiveFiltersProps) {
  const getActiveFilterCount = () => {
    let count = 0;
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        count += value.length;
      } else if (value !== null && value !== undefined && value !== "") {
        count += 1;
      }
    });
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  if (activeFilterCount === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-muted-foreground">已选筛选:</span>
      {Object.entries(filters).map(([filterId, value]) => {
        const filterDef = filterDefinitions.find((f) => f.id === filterId);
        if (!filterDef) return null;

        if (Array.isArray(value) && value.length > 0) {
          return value.map((v) => {
            const option = filterDef.options?.find((o) => o.value === v);
            if (!option) return null;

            return (
              <Badge
                key={`${filterId}-${v}`}
                variant="secondary"
                className="gap-1"
              >
                {option.label}
                <button
                  onClick={() => onRemoveFilter(filterId, v)}
                  aria-label={`移除 ${option.label}`}
                  className="hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            );
          });
        }

        if (Array.isArray(value) && value.length === 2) {
          return (
            <Badge key={filterId} variant="secondary" className="gap-1">
              {filterDef.label}: {value[0]} - {value[1]} {filterDef.unit}
              <button
                onClick={() => onRemoveFilter(filterId)}
                aria-label={`移除 ${filterDef.label}`}
                className="hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          );
        }

        return null;
      })}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-sm"
      >
        清除全部
      </Button>
    </div>
  );
}

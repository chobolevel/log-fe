"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSubjects } from "@/hooks/subject/subject";
import { useDebounce } from "@/hooks/use-debounce";
import type { Subject } from "@/types/subject";

const SUBJECT_TYPE_LABELS: Record<string, string> = {
  BOOK: "책",
  MOVIE: "영화",
  DRAMA: "드라마",
  MUSIC: "음악",
};

interface SubjectComboboxProps {
  value?: Subject;
  onChange: (subject: Subject) => void;
}

export function SubjectCombobox({ value, onChange }: SubjectComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data, isFetching } = useSubjects({ title: debouncedSearch });
  const subjects = data?.data ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          />
        }
      >
        {value ? (
          <span className="flex items-center">
            <span className="mr-2 rounded bg-green-subtle px-1.5 py-0.5 text-xs text-green-subtle-foreground">
              {SUBJECT_TYPE_LABELS[value.type]}
            </span>
            {value.title}
          </span>
        ) : (
          <span className="text-muted-foreground">주제를 검색하세요</span>
        )}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="제목으로 검색..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {isFetching && (
              <div className="py-4 text-center text-sm text-muted-foreground">
                검색 중...
              </div>
            )}
            {!isFetching && search.length > 0 && subjects.length === 0 && (
              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            )}
            {!isFetching && search.length === 0 && (
              <div className="py-4 text-center text-sm text-muted-foreground">
                제목을 입력하면 검색됩니다.
              </div>
            )}
            {subjects.length > 0 && (
              <CommandGroup>
                {subjects.map((subject) => (
                  <CommandItem
                    key={subject.id}
                    value={String(subject.id)}
                    onSelect={() => {
                      onChange(subject);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.id === subject.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="mr-2 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                      {SUBJECT_TYPE_LABELS[subject.type]}
                    </span>
                    {subject.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

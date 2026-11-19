import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, CornerDownLeft, Search } from "lucide-react";

import Modal from "./Modal";

/**
 * Lightweight command palette over a supplied list of destinations.
 * Items are real app routes (nav, tools, account) — no mock results.
 */
export const SearchDialog = ({
  open,
  onClose,
  items = [],
  placeholder = "Search courses, tools, events...",
}) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
      return;
    }

    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return items;

    return items.filter((item) =>
      [item.label, item.description, item.group, ...(item.keywords || [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const go = (item) => {
    if (!item) return;
    onClose?.();
    if (item.to) navigate(item.to);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) =>
        results.length ? (current + 1) % results.length : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        results.length ? (current - 1 + results.length) % results.length : 0,
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();
      go(results[activeIndex]);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      className="!rounded-3xl"
      showClose={false}
    >
      <div className="-mx-6 -my-5">
        <div className="flex items-center gap-3 border-b border-border-subtle px-5 py-4">
          <Search size={18} className="shrink-0 text-primary" aria-hidden="true" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Search SkillHub"
            className="w-full border-0 bg-transparent text-[15px] text-text-primary placeholder:text-text-muted focus:outline-none"
          />

          <kbd className="hidden shrink-0 rounded-md border border-[color:var(--color-line)] bg-white px-1.5 py-0.5 text-[10px] font-medium text-text-muted sm:block">
            ESC
          </kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-text-muted">
              Nothing matches “{query}”. Try a course, tool, or page name.
            </p>
          ) : (
            <ul role="listbox" aria-label="Search results" className="space-y-0.5">
              {results.map((item, index) => {
                const Icon = item.icon;

                return (
                  <li key={`${item.group}-${item.label}-${item.to}`}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={index === activeIndex}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => go(item)}
                      className={[
                        "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                        index === activeIndex
                          ? "bg-sage text-primary"
                          : "text-text-secondary hover:bg-sage/60",
                      ].join(" ")}
                    >
                      {Icon ? (
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                          <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                      ) : (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                      )}

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="mt-0.5 block truncate text-xs text-text-muted">
                            {item.description}
                          </span>
                        )}
                      </span>

                      {index === activeIndex ? (
                        <CornerDownLeft
                          size={14}
                          className="shrink-0 text-primary/60"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowUpRight
                          size={14}
                          className="shrink-0 text-text-muted"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border-subtle px-4 py-2.5 text-[11px] text-text-muted">
          <span>Arrow keys to move, Enter to open</span>
          <span>SkillHub search</span>
        </div>
      </div>
    </Modal>
  );
};

export default SearchDialog;

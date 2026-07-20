export type SearchField = {
  type: "input" | "select" | "button";

  label: string;

  placeholder?: string;

  options?: string[];
};

export type SearchField = {
  type: "input" | "select";

  label: string;

  placeholder?: string;

  options?: string[];
};

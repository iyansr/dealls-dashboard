export type GeneralListResponse<T, key extends string> = {
  [k in key]: T[];
} & {
  total: number;
  skip: number;
  limit: number;
};

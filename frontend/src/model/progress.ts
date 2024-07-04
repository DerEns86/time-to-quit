export type Progress = {
  type: string;
  data: ProgressData[];
};

export type ProgressData = {
  timeframe: string;
  description: string;
};
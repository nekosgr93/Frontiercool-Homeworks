type ErrorName = 'No_Dot_Starting' | 'No_Dot_Ending' | 'No_Consecutive_Dot' | 'Cannot_Reset_Value';

export class ParsingError extends Error {
  constructor(
    public errorName: ErrorName,
    message: string,
    public pairInputIndex: number,
  ) {
    super(message);
  }
}

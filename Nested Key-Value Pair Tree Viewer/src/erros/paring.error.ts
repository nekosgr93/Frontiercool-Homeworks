export class NoDotStartingError extends Error {
  constructor() {
    super('Cannot use dot(.) as starting.');
  }
}

export class NoDotEndingError extends Error {
  constructor() {
    super('Cannot use dot(.) as ending.');
  }
}

export class NoConsecutiveDotError extends Error {
  constructor() {
    super('Detect consecutive dot in your key.');
  }
}

export class CannotResetValueError extends Error {
  constructor() {
    super('Detect the value is already set as string, cannot reset it to nested object.');
  }
}

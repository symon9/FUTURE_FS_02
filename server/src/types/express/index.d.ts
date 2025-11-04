// To allow us to add custom properties to the Express Request object
declare namespace Express {
  export interface Request {
    userId?: string;
  }
}

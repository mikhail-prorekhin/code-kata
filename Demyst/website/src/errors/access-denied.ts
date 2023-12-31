export class AccessDenied extends Error {
  public status!: number;
  public expose!: boolean;

  public constructor() {
    super("Access Denied");
    this.status = 403;
    this.expose = true;
  }
}

export class NotAuthorized extends Error {
  public status!: number;

  public constructor() {
    super();
    this.status = 401;
  }
}

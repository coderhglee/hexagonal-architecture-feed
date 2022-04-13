export class CreateCatCommand {
  constructor(
    readonly name: string,
    readonly age: number,
    readonly breed: string,
  ) {}
}

export interface Image {
  Id: number;
  Url: string;
  AltText?: string;
  ProductId: number;
}
export interface ImageDto extends Image {}

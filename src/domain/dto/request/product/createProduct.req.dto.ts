export interface CreateProductReqDto {
  name: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId: string;
  image?: string;
}

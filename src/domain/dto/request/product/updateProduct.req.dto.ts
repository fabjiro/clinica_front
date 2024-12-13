export interface UpdateProductReqDto {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
  image?: string;
}

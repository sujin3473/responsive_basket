export interface shopItemVO {
  id: number;
  name: string;
  des: string;
  price: number;
  type: string;
  color?: string;
  img: string;
  color_img?: string;
  amount: number;
  freeShipping?: boolean;
}

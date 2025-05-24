export type Order = {
  id: string; // hashKey
  taxId: string;
  productIds: string[];
  total: number;
  createdAt: string;
};

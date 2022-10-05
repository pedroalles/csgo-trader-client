import { IMonitoring, IOrder, ISale } from "./ISticker";

export default interface IItems {
  sales: ISale[];
  orders: IOrder[];
  monitoring: IMonitoring[];
}

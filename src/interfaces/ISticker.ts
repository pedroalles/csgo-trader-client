export interface ISticker {
  name: string;
  value: string;
  link: string;
  image: string;
}

type IStickerWithouValue = Omit<ISticker, "value">;

export interface ISale extends IStickerWithouValue {
  sellValue: string;
  buyValue: string;
  receiveValue: string;
  profitValue: string;
  profitPercent: string;
}

export interface IOrder extends IStickerWithouValue {
  buyValue: string;
  quantity: string;
}

export interface IMonitoring extends IStickerWithouValue {
  buyValue: string;
}

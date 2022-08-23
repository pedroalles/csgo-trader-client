import useSWR from "swr";
import axios from "axios";
import { IMonitoring, IOrder, ISale } from "../interfaces/ISticker";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const axiosFetcher = (url: string) =>
  axios.get(url).then((r) => {
    console.log(r.data);
    return r.data;
  });

export interface Sticker {
  name: string;
  value: string;
  link: string;
  image: string;
}

export interface All {
  sales: ISale[];
  orders: IOrder[];
  monitoring: IMonitoring[];
}

export default function useAll() {
  const url = "http://192.168.0.21:3001/all";
  const { data, error } = useSWR<All>(url, axiosFetcher);
  return {
    all: data,
    error,
  };
}

import useSWR from "swr";
import axios from "axios";
import { IMonitoring, IOrder, ISale } from "../interfaces/ISticker";
import { SWR_ALL_REFRESH } from "../constants";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const axiosFetcher = (url: string) =>
  axios.get(url).then((r) => {
    console.log("GETING ALL", r.data);
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
  const { data, error } = useSWR<{ data: All; time: string }>(
    url,
    axiosFetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: SWR_ALL_REFRESH,
    }
  );
  return {
    all: data?.data,
    time: data?.time,
    error,
  };
}

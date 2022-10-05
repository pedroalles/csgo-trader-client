import useSWR from "swr";
import axios from "axios";
import { SWR_ALL_REFRESH } from "../constants";
// import { useAppDispatch, useAppSelector } from "../redux/store";
import IItems from "../interfaces/IItems";

const axiosFetcher = (url: string) =>
  axios.get(url).then((r) => {
    console.log("GETING ALL", r.data);
    return r.data;
  });

type ActionToDispatch = (data?: any) => { type: string; payload?: any };

interface useAllProps {
  actionsToPersist?: ActionToDispatch[];
}

export default function useAll({ actionsToPersist = [] }: useAllProps) {
  const url = "http://192.168.0.21:3001/all";

  // const items = useAppSelector(selectItems);

  // const dispatch = useAppDispatch();

  const { data, error, isValidating } = useSWR<{ data: IItems; time: string }>(
    url,
    axiosFetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: SWR_ALL_REFRESH,
    }
  );

  if (actionsToPersist.length && !isValidating) {
    actionsToPersist.forEach((action) => {
      // dispatch(action(data?.data));
    });
  }

  return {
    all: data?.data,
    time: data?.time,
    error,
  };
}

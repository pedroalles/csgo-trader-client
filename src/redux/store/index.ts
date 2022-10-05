import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import itemsReducer from "../features/items/itemsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import IItems from "../../interfaces/IItems";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { UseQueryStateOptions } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  IMonitoringInfos,
  IOrderInfos,
  ISaleInfos,
} from "../../interfaces/ISticker";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      console.log(url, "->", result.data);
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// (UseQuerySubscriptionOptions & UseQueryStateOptions<...>) | undefined)

export const itemsApi = createApi({
  reducerPath: "items",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getAll: builder.query<{ data: IItems; time: string }, void>({
      query: () => ({ url: "/all", method: "get" }),
      // providesTags: [{ type: "Items", id: "ALL" }],
    }),

    getSaleInfoByUrl: builder.query<{ data: ISaleInfos; time: string }, string>(
      {
        query: (link: string) => ({
          url: "/sale/info",
          method: "get",
          params: {
            url: link,
          },
        }),
        // providesTags: [{ type: "Items", id: "ALL" }],
      }
    ),

    getOrderInfoByUrl: builder.query<
      { data: IOrderInfos; time: string },
      string
    >({
      query: (link: string) => ({
        url: "/order/info",
        method: "get",
        params: {
          url: link,
        },
      }),
      // providesTags: [{ type: "Items", id: "ALL" }],
    }),

    getMonitoringInfoByUrl: builder.query<
      { data: IMonitoringInfos; time: string },
      string
    >({
      query: (link: string) => ({
        url: "/monitoring/info",
        method: "get",
        params: {
          url: link,
        },
      }),
      // providesTags: [{ type: "Items", id: "ALL" }],
    }),
  }),
});

export const store = configureStore({
  reducer: {
    // items: itemsReducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

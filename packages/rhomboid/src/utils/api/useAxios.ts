import Axios from 'axios';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useEffect, useReducer } from 'react';

interface AxiosReducerState<TData, TError> {
    loading: boolean;
    data?: AxiosResponse<TData>['data'];
    error?: AxiosError<TError>;
}

interface AxiosReducerAction<TData, TError> {
    type: AxiosReducerActionType;
    payload?: AxiosResponse<TData>['data'] | AxiosError<TError>;
}

enum AxiosReducerActionType {
    Pending,
    Failed,
    Success,
}

const axiosReducer = <TData, TError>(
    state: AxiosReducerState<TData, TError>,
    action: AxiosReducerAction<TData, TError>,
): AxiosReducerState<TData, TError> => {
    switch (action.type) {
        case AxiosReducerActionType.Pending:
            // Spread existing state for potential data transition handling
            return { ...state, loading: true };
        case AxiosReducerActionType.Failed:
            return { loading: false, error: action.payload as AxiosError<TError>, data: undefined };
        case AxiosReducerActionType.Success:
            return {
                loading: false,
                data: action.payload as AxiosResponse<TData>['data'],
                error: undefined,
            };
        default:
            return state;
    }
};

type Reducer<TData, TError> = (
    state: AxiosReducerState<TData, TError>,
    action: AxiosReducerAction<TData, TError>,
) => AxiosReducerState<TData, TError>;

interface UseAxiosOptions {
    initialFetch: boolean;
}

export const useAxios = <TData = any, TError = any>(
    config: AxiosRequestConfig,
    options: UseAxiosOptions = { initialFetch: true },
): [AxiosReducerState<TData, TError>, (data: AxiosRequestConfig['data']) => void] => {
    const { initialFetch } = options;

    const [state, dispatch] = useReducer<Reducer<TData, TError>>(axiosReducer, {
        loading: initialFetch,
    });

    const fetch = async (config: AxiosRequestConfig) => {
        try {
            dispatch({ type: AxiosReducerActionType.Pending });
            const response: AxiosResponse<TData> = await axios(config);
            dispatch({ type: AxiosReducerActionType.Success, payload: response.data });
        } catch (error) {
            if (error.isAxiosError) {
                dispatch({ type: AxiosReducerActionType.Failed, payload: error });
                return;
            }
            throw error;
        }
    };

    if (initialFetch) {
        useEffect(() => {
            fetch(config);
        }, [config]);
    }

    const manualFetch = useCallback(
        (data: AxiosRequestConfig['data']) => {
            fetch({ ...config, data });
        },
        [config],
    );

    return [state, manualFetch];
};

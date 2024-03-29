import {
    useReducer
} from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null,
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function useLoading(asyncTask) {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: false,
    });

    const runAsyncTask = async () => {
        dispatch({ type: 'LOADING' });

        try {
            const data = await asyncTask();
            dispatch({ type: 'SUCCESS', data });
        } catch (e) {
            dispatch({ type: 'ERROR', error: e });
        }
    };

    return [state, runAsyncTask];
}

export default useLoading;
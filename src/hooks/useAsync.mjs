import {
    useReducer,
    useEffect
} from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null,
                count: state.count + 1
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
                count: state.count + 1
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
                count: state.count + 1
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function useAsync(asyncTask, options, dependencies = []) {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: false,
        count: 0
    });

    const loadingOnlyFirst = options.loadingOnlyFirst || false;

    const runAsyncTask = async () => {

        if (!loadingOnlyFirst || state.count === 0)
            dispatch({
                type: 'LOADING'
            });

        try {
            const data = await asyncTask();
            
            dispatch({
                type: 'SUCCESS',
                data
            });
        } catch (e) {
            dispatch({
                type: 'ERROR',
                error: e
            });
        }
    };

    useEffect(() => {
        runAsyncTask();
    }, 
    // eslint-disable-next-line
    dependencies);

    return [state, runAsyncTask];
}

export default useAsync;
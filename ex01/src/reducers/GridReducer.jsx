const initialState = {
    dataItems: [],
    colsName: [],
    colsId: [],
    columnNameItems: [],
    colsSort: []
}

const GridReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_DATA_ITEMS':
            return {
                ...state,
                dataItems: [...state.dataItems, ...action.payload]
            }
        case 'SET_DATA_ITEMS':
            return {
                ...state,
                dataItems: action.payload
            }
        case 'SET_COLS_NAME':
            return {
                ...state,
                colsName: action.payload
            };
        case 'SET_COLS_ID':
            return {
                ...state,
                colsId: action.payload
            }
        case 'CLEAR_CLOSNAME':
            return {
                ...state,
                colsName: action.payload
            };
        case 'SET_COLUMN_NAME_ITEMS':
            return {
                ...state,
                columnNameItems: action.payload
            }
        case 'SET_COLS_SORT':
        return {
            ...state,
            colsSort: action.payload
        }
        default:
            return state;
    }
}

export default GridReducer;
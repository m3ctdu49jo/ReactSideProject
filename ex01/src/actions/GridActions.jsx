export const AddDataItemsR = (dataItems) => {
    return {
        type: "ADD_DATA_ITEMS",
        payload: dataItems
    }
}

export const setColsNameR = (colsName) => {
    return {
        type: "SET_COLS_NAME",
        payload: colsName
    }
}

export const setColsIdR = (colsId) => {
    return {
        type: "SET_COLS_ID",
        payload: colsId
    }
}

export const clearColsName = () => {
    return {
        type: "CLEAR_CLOSNAME",
        payload: []
    }
}

export const setColumnNameItemR = (columnNameItems) => {
    return {
        type: "SET_COLUMN_NAME_ITEMS",
        payload: columnNameItems
    }
}
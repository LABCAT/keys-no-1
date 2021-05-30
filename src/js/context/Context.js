import React, { createContext, useReducer } from 'react';

import Reducer from "./Reducer";

const initialState = {
    notes: [],
}

export const Context = createContext(initialState);

export const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const updateNotes = (newNote) => {
        dispatch({ type: "UPDATE_NOTES", payload: newNote });
    }

    return <Context.Provider
        value={
            {
                notes: state.notes,
                updateNotes,
            }
        }
    >
        {children}
    </Context.Provider>
};

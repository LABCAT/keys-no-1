import React, { createContext, useReducer } from 'react';

import Reducer from "./Reducer";

const initialState = {
    notes: [],
    fireflies: [],
}

export const Context = createContext(initialState);

export const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const updateNotes = (newNote) => {
        dispatch({ type: "UPDATE_NOTES", payload: newNote });
    }

    const updateFireFlies = (newFireFly) => {
        dispatch({ type: "UPDATE_FIREFLIES", payload: newFireFly });
    }

    return <Context.Provider
        value={
            {
                notes: state.notes,
                updateNotes,
                fireflies: state.fireflies,
                updateFireFlies,
            }
        }
    >
        {children}
    </Context.Provider>
};

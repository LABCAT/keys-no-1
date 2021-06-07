export default function reducer(state, action) {
    switch (action.type) {
        case "UPDATE_NOTES": {
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        }
        case "UPDATE_FIREFLIES": {
            return {
                ...state,
                fireflies: [...state.fireflies, action.payload]
            }
        }
        default:
            throw new Error('Action type does not exist!')
    }
}
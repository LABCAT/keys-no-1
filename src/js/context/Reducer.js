export default function reducer(state, action) {
    switch (action.type) {
        case "UPDATE_NOTES": {
            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
        }
        default:
            throw new Error('Action type does not exist!')
    }
}
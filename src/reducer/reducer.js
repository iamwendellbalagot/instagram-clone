export const initialState = {
    user: null,
    username: '',
    fullname: '',
    userPosts: []
}

const reducer = (state, action) => {
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case "SET_USERNAME":
            return {
                ...state,
                username: action.username
            }
        case 'SET_FULLNAME':
            return {
                ...state,
                fullname: action.fullname
            }
        case 'SET__USERPOSTS':
            return {
                ...state,
                userPosts: action.posts
            }
        default:
            return state
    }
}

export default reducer;
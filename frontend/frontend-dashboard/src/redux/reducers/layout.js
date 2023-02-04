import actionTypes from '../actionTypes/layout'

export const defaultState = {
    showBackButton: false,
    onBackButtonClick: null,
    headerType: 'text',
    headerText: '',
    hideLeftSidebar: false,
    hideTopBar: false,
    layoutClassName: '',
}

export const accessTokenState = {
    user : null,
    accressToken: null,
}

function reducer(state = defaultState, { type, payload = {} }) {
    switch (type) {
        case actionTypes.SHOW_BACK_BUTTON: {
            return {
                ...state,
                ...payload,
            }
        }
        case actionTypes.SET_HEADER_DATA: {
            return {
                ...state,
                ...payload,
            }
        }
        case actionTypes.HIDE_LEFT_SIDEBAR: {
            return {
                ...state,
                hideLeftSidebar: payload,
            }
        }
        case actionTypes.HIDE_TOP_BAR: {
            return {
                ...state,
                hideTopBar: payload,
            }
        }

        default:
            return state
    }
}

function accessTokenReducer(state = accessTokenState, { type, payload = {} }){
    switch(type){
        
    }
}

export default reducer

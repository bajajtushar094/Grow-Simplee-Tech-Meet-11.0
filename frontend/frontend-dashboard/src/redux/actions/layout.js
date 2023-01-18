import layoutConstants from '../actionTypes/layout'

export const showBackButton = (payload) => {
    return {
        type: layoutConstants.SHOW_BACK_BUTTON,
        payload,
    }
}

export const setHeaderData = (payload) => {
    return {
        type: layoutConstants.SET_HEADER_DATA,
        payload,
    }
}

export const hideLeftSidebar = (payload) => {
    return {
        type: layoutConstants.HIDE_LEFT_SIDEBAR,
        payload,
    }
}

export const hideTopBar = (payload) => {
    return {
        type: layoutConstants.HIDE_TOP_BAR,
        payload,
    }
}

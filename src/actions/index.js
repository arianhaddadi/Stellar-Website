export const modeActionCreator = (action) => {
    return {
        type:"CHANGE_MODE",
        payload:action
    }
}

export const pageActionCreator = (action) => {
    return {
        type:"PAGE_CHANGE",
        payload:action
    }
}

export const languageActionCreator = (action) => {
    return {
        type:"LANG_CHANGE",
        payload:action
    }
}
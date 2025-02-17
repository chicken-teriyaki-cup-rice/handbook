import React from 'react'

export const UIContext = React.createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'openSidebar': {
      return { ...state, isSidebarOpen: true, isSidebarHidden: false }
    }

    case 'closeSidebar': {
      return { ...state, isSidebarOpen: false }
    }

    case 'hideSidebar': {
      return { ...state, isSidebarHidden: true }
    }

    case 'navigateToTarget': {
      return { ...state, currentNavTarget: action.payload }
    }

    case 'addAssignmentTag': {
      return {
        ...state,
        assignmentTags: [...state.assignmentTags, action.payload],
      }
    }

    case 'removeAssignmentTag': {
      return {
        ...state,
        assignmentTags: state.assignmentTags.filter(
          (tag) => tag !== action.payload
        ),
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export function UIContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    isSidebarOpen: false,
    isSidebarHidden: true,
    currentNavTarget: null,
    assignmentTags: [],
  })
  /* TODO: in `resetNavigation`, wait to unset currentNavTarget after
     transition, so it doesn't blink out when navigating back to the
     program menu. See Menu.js */
  return (
    <UIContext.Provider
      value={{
        openSidebar: () => dispatch({ type: 'openSidebar' }),
        closeSidebar: () => dispatch({ type: 'closeSidebar' }),
        hideSidebar: () => dispatch({ type: 'hideSidebar' }),
        navigateToTarget: (module) =>
          dispatch({ type: 'navigateToTarget', payload: module }),
        resetNavigation: () =>
          dispatch({ type: 'navigateToTarget', payload: null }),
        toggleAssignmentTag: (tag) =>
          state.assignmentTags.includes(tag)
            ? dispatch({ type: 'removeAssignmentTag', payload: tag })
            : dispatch({ type: 'addAssignmentTag', payload: tag }),
        ...state,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUIContext() {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIContextProvider')
  }
  return context
}

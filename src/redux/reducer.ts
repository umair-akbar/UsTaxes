/* eslint-disable indent */
import { combineReducers } from 'redux'
import { Information } from './data'
import {
  ActionName,
  Actions
} from './actions'

function formReducer (state: Information | undefined, action: Actions): Information {
  const newState: Information = state ?? { w2s: [], taxPayer: { dependents: [] } }

  switch (action.type) {
    case ActionName.SAVE_PRIMARY_PERSON_INFO: {
      return {
        ...newState,
        taxPayer: {
          ...newState.taxPayer,
          primaryPerson: action.formData
        }
      }
    }
    case ActionName.SAVE_CONTACT_INFO: {
      return {
        ...newState,
        taxPayer: {
          ...newState.taxPayer,
          ...action.formData
        }
      }
    }
    case ActionName.SAVE_FILING_STATUS_INFO: {
      return {
        ...newState,
        taxPayer: {
          ...newState.taxPayer,
          filingStatus: action.formData
        }
      }
    }
    case ActionName.ADD_DEPENDENT: {
      return {
        ...newState,
        taxPayer: {
          ...newState.taxPayer,
          dependents: [
            ...(newState.taxPayer?.dependents ?? []),
            action.formData
          ]
        }
      }
    }
    case ActionName.REMOVE_DEPENDENT: {
      const newDependents = [...(newState.taxPayer?.dependents ?? [])]
      newDependents.splice(action.formData, 1)

      return {
        ...newState,
        taxPayer: {
          ...newState.taxPayer,
          dependents: newDependents
        }
      }
    }
    case ActionName.SAVE_REFUND_INFO: {
      return {
        ...newState,
        refund: action.formData
      }
    }
    case ActionName.ADD_W2: {
      return {
        ...newState,
        w2s: [
          ...newState.w2s,
          action.formData
        ]
      }
    }
    case ActionName.REMOVE_W2: {
      const newW2s = [...newState.w2s]
      newW2s.splice(action.formData, 1)
      return {
        ...newState,
        w2s: newW2s
      }
    }

    case ActionName.ADD_SPOUSE: {
      return {
        ...newState,
        taxPayer: {
          ...newState.taxPayer,
          spouse: action.formData
        }
      }
    }
    case ActionName.REMOVE_SPOUSE: {
      return {
        ...newState,
        taxPayer: {
          ...newState.taxPayer,
          spouse: undefined
        }
      }
    }
    default: {
      return newState
    }
  }
}

const rootReducer = combineReducers({
  information: formReducer
})

export default rootReducer

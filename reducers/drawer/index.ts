import type { Reducer } from 'redux';
import produce from 'immer';
import { DrawerActionTypes } from '@actions/drawer/drawer.action';

export interface DrawerState {
    /** 열림 여부 */
    isOpen: boolean;
}

const initialState: DrawerState = {
    isOpen: true,
};

export const drawerReducer: Reducer<DrawerState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DrawerActionTypes.SHOW: {
                draft.isOpen = true;
                break;
            }
            case DrawerActionTypes.HIDE: {
                draft.isOpen = false;
                break;
            }
            default:
                return state;
        }
    });

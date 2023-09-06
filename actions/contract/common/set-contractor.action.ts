import type { Action } from 'redux';

export const LOADED_CONTRACTOR_KEY = 'WR-LOADED-CONTRACTOR';

export const LOADED_INSURED_KEY = 'WR-LOADED-INSURED';

export const LoadedContractorActionTypes = {
    REQUEST: `${LOADED_CONTRACTOR_KEY}_REQUEST`,
    SUCCESS: `${LOADED_CONTRACTOR_KEY}_SUCCESS`,
    FAILURE: `${LOADED_CONTRACTOR_KEY}_FAILURE`,
    UPDATE: `UPDATE_${LOADED_CONTRACTOR_KEY}`,
} as const;

export const LoadedInsuredActionTypes = {
    UPDATE: `UPDATE_${LOADED_INSURED_KEY}`,
} as const;

export interface GetContractorRequestPayload {
    idx: string;
}

export type GetContractorSuccessPayload = any;

export interface GetContractorRequestAction extends Action<string> {
    payload: GetContractorRequestPayload;
}

export interface GetContractorSuccessAction extends Action<string> {
    payload: GetContractorSuccessPayload;
}

export type LoadedContractorUpdatePayload = any;

export type LoadedInsuredUpdatePayload = any;

export interface LoadedContractUpdateAction extends Action<string> {
    payload: LoadedContractorUpdatePayload;
}

export interface LoadedInsuredUpdateAction extends Action<string> {
    payload: LoadedInsuredUpdatePayload;
}

export function getContractorRequest(
    payload: GetContractorRequestPayload,
): GetContractorRequestAction {
    return {
        type: LoadedContractorActionTypes.REQUEST,
        payload,
    };
}

export function getContractorSuccess(
    payload: GetContractorSuccessPayload,
): GetContractorSuccessAction {
    return {
        type: LoadedContractorActionTypes.SUCCESS,
        payload,
    };
}

export function updateLoadedContractor(
    payload: LoadedContractorUpdatePayload,
): LoadedContractUpdateAction {
    return {
        type: LoadedContractorActionTypes.UPDATE,
        payload,
    };
}

export function updateLoadedInsured(
    payload: LoadedInsuredUpdatePayload,
): LoadedInsuredUpdateAction {
    return {
        type: LoadedInsuredActionTypes.UPDATE,
        payload,
    };
}

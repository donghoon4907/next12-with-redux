import type { CompanyDist } from './company';
import type { CoreCheckableModel } from './core';
/**
 * 보험사 코드
 */
export type Code = CoreCheckableModel & {
    idx?: number;
    wcode?: number;
    fccode?: string;
    password?: string;
    cent_val?: string;
    indate?: string | null;
    dist: CompanyDist;
    // 회사명
    company?: string;
};

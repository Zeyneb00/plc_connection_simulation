import type { ConnectionResult } from "../types/connection";
export function isValidIPv4(ip: string): boolean {
    const parts = ip.split('.');

    if(parts.length !== 4) {
        return false;
    }
    return parts.every((part) => {
        if (!/^\d+$/.test(part)) {
            return false
        }
        const number = Number(part);
        return number >= 0 && number <= 255;
    });

}


export function connectToPLC(ip: string): ConnectionResult {
    if(!isValidIPv4(ip)) {
        return {
            status: 'invalid',
            message: 'Please enter a valid IPv4 address.',
        };
    }
    if (ip === '192.168.1.166') {
        return {
            status: 'connected',
            ip,
        };
    }

    return {
        status: 'unreachable',
        ip,
    };
}


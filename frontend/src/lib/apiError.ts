import { ErrorCode } from '../api/generated';

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
    [ErrorCode.InvalidMessageCount]: 'Le nombre de messages doit être supérieur à 0.',
    [ErrorCode.InvalidPayloadSize]:  'La taille du payload doit être supérieure à 0.',
    [ErrorCode.PayloadTooLarge]:     'Le payload dépasse la limite Kafka (1 MB).',
    [ErrorCode.ValidationError]:     'Les paramètres envoyés sont invalides.',
};

const FALLBACK = 'Une erreur est survenue.';

function isAxiosError(error: unknown): error is { response: { data: unknown } } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: unknown } }).response?.data !== 'undefined'
    );
}

export async function parseApiError(error: unknown): Promise<string> {
    if (isAxiosError(error)) {
        const body = error.response.data;
        if (
            body !== null &&
            typeof body === 'object' &&
            'code' in body
        ) {
            return ERROR_MESSAGES[body.code as ErrorCode] ?? FALLBACK;
        }
    }

    if (error instanceof Error) return error.message;

    return FALLBACK;
}
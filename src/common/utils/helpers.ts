export const serviceTokenKeyword = 'Service';

export function getServiceToken(modelToken: string): string {
	return `${modelToken}${serviceTokenKeyword}`;
}

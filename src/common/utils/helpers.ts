export const serviceTokenKeyword = 'Service';

export function getServiceToken(modelName: string): string {
	return `${modelName}${serviceTokenKeyword}`;
}

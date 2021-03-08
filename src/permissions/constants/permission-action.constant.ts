export enum PermissionActions {
	Read = 'read',
	Create = 'create',
	update = 'update',
	delete = 'delete',
	manage = 'manage',
}

export const permissionActions = Object.values(PermissionActions);

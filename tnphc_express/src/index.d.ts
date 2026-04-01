export interface IAuthUser {
	id: string;
	userName: string;
	email: string;
	roleId: string | null;
	role?: {
		id: string;
		name: string;
	} | null;
	isActive: boolean;
}

declare global {
	namespace Express {
		interface Request {
			user?: IAuthUser;
		}
	}
}
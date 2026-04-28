export const pageConfig = ({
	pageNumber = "1",
	pageSize = "50",
	pageSizeLimit = "50",
	search,
}: {
	pageNumber?: string;
	pageSize?: string;
	pageSizeLimit?: string;
	search?: string;
}) => {
	const pn = Number(pageNumber) > 0 ? Number(pageNumber) : 1; // ensure min page = 1
	const psl = Number(pageSizeLimit) || 25;
	let ps = Number(pageSize) || 25;

	if (ps > psl) {
		ps = psl;
	}

	const skip = (pn - 1) * ps;
	const take = ps;

	return { skip, take };
};

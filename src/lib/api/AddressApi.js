export const addressCreate = async (
	token,
	id,
	{ street, city, province, country, postal_code },
) => {
	return await fetch(
		`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`,
		{
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: token,
			},
			method: "POST",
			body: JSON.stringify({
				street,
				city,
				province,
				country,
				postal_code,
			}),
		},
	);
};

export const addressesList = async (token, id) => {
	return await fetch(
		`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			method: "GET",
		},
	);
};

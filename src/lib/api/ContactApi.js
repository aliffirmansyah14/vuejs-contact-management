export const contactCreate = async (
	{ first_name, last_name, email, phone },
	token,
) => {
	return await fetch(`${import.meta.env.VITE_API_PATH}/contacts`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: token,
		},
		method: "POST",
		body: JSON.stringify({
			first_name,
			email,
			last_name,
			phone,
		}),
	});
};

export const contactList = async ({ name, email, phone, page }, token) => {
	const url = new URL(`${import.meta.env.VITE_API_PATH}/contacts`);
	if (name) url.searchParams.append("name", name);
	if (email) url.searchParams.append("email", email);
	if (phone) url.searchParams.append("phone", phone);
	if (page) url.searchParams.append("page", page);
	return await fetch(url, {
		headers: {
			Accept: "application/json",
			Authorization: token,
		},
		method: "GET",
	});
};

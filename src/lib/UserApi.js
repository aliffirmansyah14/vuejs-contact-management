export const userRegister = async ({ username, password, name }) => {
	return await fetch(`${import.meta.env.VITE_API_PATH}/users`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		method: "POST",
		body: JSON.stringify({
			username,
			password,
			name,
		}),
	});
};

export const userLogin = async ({ username, password }) => {
	return await fetch(`${import.meta.env.VITE_API_PATH}/users/login`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		method: "POST",
		body: JSON.stringify({
			username,
			password,
		}),
	});
};

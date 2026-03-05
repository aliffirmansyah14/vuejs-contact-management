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

export const userDetail = async token => {
	return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: token,
		},
		method: "GET",
	});
};

export const userUpdateProfile = async ({ name }, token) => {
	return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: token,
		},
		method: "PATCH",
		body: JSON.stringify({
			name,
		}),
	});
};

export const userUpdatePassword = async ({ password }, token) => {
	return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: token,
		},
		method: "PATCH",
		body: JSON.stringify({
			password,
		}),
	});
};

export const userLogout = async token => {
	return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
		headers: {
			Authorization: token,
		},
		method: "DELETE",
	});
};

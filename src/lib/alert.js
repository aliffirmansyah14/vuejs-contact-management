import Swal from "sweetalert2";

export const alertSuccess = async message => {
	return Swal.fire({
		icon: "success",
		title: "Success",
		text: message,
	});
};

export const alertError = async (message, onClose = () => {}) => {
	return Swal.fire({
		icon: "error",
		title: "Ups",
		text: message,
		didClose: onClose,
	});
};

export const alertConfirm = async message => {
	const result = await Swal.fire({
		icon: "question",
		title: "Confirm",
		text: message,
		showCancelButton: true,
		cancelButtonText: "No",
		confirmButtonText: "Yes",
		confirmButtonColor: "#d33",
		cancelButtonColor: "#3085d6",
	});
	return result.isConfirmed;
};

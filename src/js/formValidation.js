const validateForm = (todoInput, dateInput, titleError, dateError) => {
	let errors = {
		errorStatus: false,
		todoError: '',
		dateError: '',
	}
	
	if (!todoInput && !dateInput){
		errors = {
			errorStatus: true,
			todoError: 'Title is required ⚠️',
			dateError: 'Date is required ⚠️',
		}
		titleError.style.visibility = 'visible';
		dateError.style.visibility = 'visible';
		titleError.textContent = errors.todoError;
		dateError.textContent = errors.dateError;
	} else if (!todoInput) {
		errors = {
			errorStatus: true,
			todoError: 'Title is required ⚠️',
			dateError: '',
		}
		titleError.style.visibility = 'visible';
		dateError.style.visibility = 'hidden';
		titleError.textContent = errors.todoError;
		dateError.textContent = errors.dateError;
	} else if (!dateInput) {
		errors = {
			errorStatus: true,
			todoError: '',
			dateError: 'Date is required ⚠️',
		}
		titleError.style.visibility = 'hidden';
		dateError.style.visibility = 'visible';
		titleError.textContent = errors.todoError;
		dateError.textContent = errors.dateError;
	} else {
		errors = {
			errorStatus: false,
			todoError: '',
			dateError: '',
		}
		titleError.style.visibility = 'hidden';
		dateError.style.visibility = 'hidden';
		titleError.textContent = errors.todoError;
		dateError.textContent = errors.dateError;
	}
	const formErrorStatus = ()=>{
		return errors.errorStatus
	}
	return {formErrorStatus}
}

const validateDescription = (descInput, counterLabel, descError) =>{
	descInput.addEventListener('input', ()=>{
		counterLabel.textContent = `Typed characters: ${descInput.value.length}/100`;
		if (descInput.value.length >= 100){
			counterLabel.style.color = 'red';
			descError.style.visibility = 'visible';
			descError.textContent = 'Description must be less then 100 characters ⚠️';
		} else {
			counterLabel.style.color = 'black';
			descError.style.visibility = 'hidden';
		}
	})
	descInput.addEventListener('keydown', (e)=> {
		if (descInput.value.length >= 100 && e.key !== 'Backspace') {
			e.preventDefault();
		}
	})
}

export {validateForm, validateDescription}
import {validateForm, validateDescription} from './formValidation';
import renderTodos from './renderTodos';

import firebaseConfig from "./firebaseConfig";
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, serverTimestamp, addDoc, onSnapshot, query, orderBy} from 'firebase/firestore';

initializeApp(firebaseConfig);

export const database = getFirestore();

const todosCollection = collection(database, 'todos');

let todoArray = [];

//SELECTING DOM ELEMENTS
const taskTitleInput = document.querySelector('.task-title-input');
const taskDateInput = document.querySelector('.task-date-input');
const taskDescriptionInput = document.querySelector('.task-description-input');
const submitTaskButton = document.querySelector('.submit-task-button');
const titleError = document.querySelector('.title-error');
const dateError = document.querySelector('.date-error');
const descriptionError = document.querySelector('.description-error');
const charCount = document.querySelector('.char-count');
const successMessage = document.querySelector('.success-message');
const taskForm = document.querySelector('.todo-form');
const filterElement = document.querySelector('.filter-element');

//VALIDATE DESCRIPTION

validateDescription(taskDescriptionInput, charCount, descriptionError)

//HANDLE FILTER ACTION
filterElement.addEventListener('change', ()=>{
	const selectedMonth = Number(filterElement.value);
	if(selectedMonth === 0){
		renderTodos(todoArray);
	} else {
		const filteredTodos = todoArray.filter(todo =>{
			const {todoDate} = todo;
			const dueDate = new Date(todoDate);
			const month = dueDate.getMonth() + 1;
			return selectedMonth === month
		})
		renderTodos(filteredTodos)
	}
})

//SUBMIT ACTION
submitTaskButton.addEventListener('click', (e)=>{
	e.preventDefault();
	const {formErrorStatus} = validateForm(taskTitleInput.value, taskDateInput.value, titleError, dateError)
	if(!formErrorStatus){
		return
	} else {
		const newTodo = {
			todoTitle: taskTitleInput.value,
			todoDate: taskDateInput.value,
			tododescription: taskDescriptionInput.value,
			timeStamp: serverTimestamp()
		}
		addDoc(todosCollection, newTodo)
		.then(()=>{
			taskForm.reset();
			successMessage.style.visibility = 'visible';
			successMessage.textContent = 'Task successfully submitted ✅';
			setInterval(() => {
				successMessage.style.visibility = 'hidden';
			}, 3000);
		})
		.catch ((error) =>{
			console.log(error);
			successMessage.style.visibility = 'visible';
			successMessage.textContent = 'Submission failed ❌';
		})
	}
})


//FETCH TODOS FROM DATABASE
function fetchTodos(){
	const sortedTodos = query(todosCollection, orderBy('timeStamp', 'asc'));
	onSnapshot(sortedTodos, (snapshot)=>{
		todoArray = [];
		snapshot.docs.forEach((todo)=>{
			todoArray.push({id: todo.id, ...todo.data()})
		})
		renderTodos(todoArray)
	})
}

window.addEventListener('DOMContentLoaded', ()=>{
	fetchTodos()
})


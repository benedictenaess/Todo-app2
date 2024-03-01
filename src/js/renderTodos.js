import {doc, deleteDoc} from 'firebase/firestore';
import { database } from './app';

const renderTodos = (todosArray)=>{
	const ul = document.querySelector('.todos-ul');

	ul.textContent = '';
	todosArray.forEach((todo, index)=>{

		const todoRow = document.createElement('li');
		const numberSpan = document.createElement('span');
		const titleSpan = document.createElement('span');
		const dateSpan = document.createElement('span');
		const descriptionSpan = document.createElement('span');
		const deleteContainerSpan = document.createElement('span');
		const deleteButton = document.createElement('button');

		ul.append(todoRow);
		todoRow.append(numberSpan, titleSpan, dateSpan, descriptionSpan, deleteContainerSpan);
		deleteContainerSpan.append(deleteButton);

		numberSpan.textContent = index+1;
		titleSpan.textContent = todo.todoTitle;
		dateSpan.textContent = todo.todoDate;
		descriptionSpan.textContent = todo.tododescription;
		deleteButton.textContent = 'Delete ❌'

		ul.classList.add('todo-ul');
		todoRow.classList.add('todo-row');
		numberSpan.classList.add('todo-number');
		titleSpan.classList.add('todo-title');
		dateSpan.classList.add('todo-date');
		descriptionSpan.classList.add('todo-description');
		deleteContainerSpan.classList.add('todo-delete');
		deleteButton.classList.add('delete-button');

		todoRow.dataset.id = todo.id;

		//DELETING A TODO
		deleteButton.addEventListener('click', (e)=>{
			const rowId = e.currentTarget.parentElement.parentElement.dataset.id 
			e.preventDefault();
			deleteTodos(todosArray, rowId);
		})
	});
}

async function deleteTodos(todosArray, id){
	const index = todosArray.findIndex(todo => todo.id === id)
	if(index !== -1){
		const documentToDelete = todosArray[index].id;
		const docDeleteRef = doc(database, 'todos', documentToDelete);
		await deleteDoc(docDeleteRef)
	}
}

export default renderTodos
const recipeInput = document.getElementById('recipeInput');
const addButton = document.getElementById('addButton');
const recipeList = document.getElementById('recipeList');
const emptyMessage = document.querySelector('.empty-message');

function addRecipe() {
    // trim gets rid of white space
    const recipeText = recipeInput.value.trim();
    
    if (recipeText === '') return;
    if (emptyMessage) {
        emptyMessage.remove();
    }

    // Create new list item
    const li = document.createElement('li');
    li.className = 'recipe-item';

    // Create checkboxs but they don't do anything yet
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'recipe-checkbox';

    // made a span so everything goes on a new line
    const span = document.createElement('span');
    span.textContent = recipeText;

    // Add elements to list item
    li.appendChild(span);
    li.appendChild(checkbox);
    
    // Add list item to recipe list
    recipeList.appendChild(li);

    // Clear input
    recipeInput.value = '';
    
    // Focus back on input
    recipeInput.focus();
}

// Add recipe when button is clicked
addButton.addEventListener('click', addRecipe);

// Add recipe when Enter key is pressed
recipeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addRecipe();
    }
});
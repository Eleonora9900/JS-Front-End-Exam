window.addEventListener("load", solve);

function solve() {
    //get add button
    const addButtonElement = document.getElementById('add-btn');

    //get ul check list
    const ulCheckListEl = document.getElementById('check-list');

    //get contact field 
    const contactField = document.getElementById('contact-list');

    //get input fields
    const nameInputElement = document.getElementById('name');
    const numberInputElement = document.getElementById('phone');
    const categoryInputElement = document.getElementById('category');

    //add event listener to add button
    addButtonElement.addEventListener('click', ()=>{
      if (nameInputElement.value === '' || numberInputElement.value === '' || categoryInputElement.value === ''){
        return;
      }

      const saveName = nameInputElement.value;
      const saveNumber = numberInputElement.value;
      const saveCategory = categoryInputElement.value;

      //create buttons 
      const editButtonElement = document.createElement('button');
      editButtonElement.classList.add('edit-btn');

      const saveButtonElement = document.createElement('button');
      saveButtonElement.classList.add('save-btn');

      //create button container
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('buttons');
      buttonContainer.appendChild(editButtonElement);
      buttonContainer.appendChild(saveButtonElement);

      //create paragraphs for storing data 
      const pNameElement = document.createElement('p');
      pNameElement.textContent = `name:${nameInputElement.value}`;

      const pPhoneElement = document.createElement('p');
      pPhoneElement.textContent = `phone:${numberInputElement.value}`;

      const pCategoryElement = document.createElement('p');
      pCategoryElement.textContent = `category:${categoryInputElement.value}`;

      //create article el which stores data 
      const articleElement = document.createElement('article');
      articleElement.appendChild(pNameElement);
      articleElement.appendChild(pPhoneElement);
      articleElement.appendChild(pCategoryElement);

      //create li element for storing article and buttons
      const liElement = document.createElement('li');
      liElement.appendChild(articleElement);
      liElement.appendChild(buttonContainer);

      //add event listener to edit button
      editButtonElement.addEventListener('click', ()=>{
        liElement.remove();
        nameInputElement.value = saveName;
        numberInputElement.value = saveNumber;
        categoryInputElement.value = saveCategory;
      })

      //add event listener to save button
      saveButtonElement.addEventListener('click', ()=>{
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('del-btn');
        editButtonElement.remove();
        saveButtonElement.remove();
        liElement.appendChild(deleteButton);
        contactField.appendChild(liElement);

        deleteButton.addEventListener('click', ()=>{
            liElement.remove();
        })

      })

      //append builded element to main list 
      ulCheckListEl.appendChild(liElement);

      nameInputElement.value ='';
      numberInputElement.value = '';
      categoryInputElement.value = '';
    })
  }
  
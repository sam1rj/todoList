class UI {
    constructor() {
    }

    displayMessage(type, content, row) {
        let div = document.createElement("div");
        div.className = `alert alert-${type}`;
        div.textContent = content;
        row.appendChild(div);
        setTimeout(() => {
            div.remove()
        }, 2000)

    }

    addTodo(paramsTodo, list) {
        list.innerHTML += `
            <li class="list-group-item d-flex text-danger justify-content-between">
                ${paramsTodo}
                 <a href="#">
                 <i class="bi bi-file-x"></i>
                 </a>
          </li>`

    }

    clearUI(inputs) {
        inputs.value = "";
    }

    addToUISearchTodo(paramsTodo, DIV_FILTER) {

        let div = document.createElement("div");
        div.className = `alert alert-success`;
        div.style.display = "flex"
        div.style.justifyContent = "space-between"
        div.innerHTML = `${paramsTodo}
        
        ${
            `<a href="#" style={color:red}>
            <i class="bi bi-file-x"></i>
            </a>`
        }`;
        DIV_FILTER.innerHTML = "";
        DIV_FILTER.appendChild(div);


    }

    removeSearchTodo(paramsTodo) {
        paramsTodo.remove();
    }

    deleteUI(list){
        list.innerHTML="";
    }
}
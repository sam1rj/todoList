let FORM_ADD = document.getElementById("todo-form");
let INPUT_TODO = document.getElementById("todo-input");
let ROW_CONTENT = document.querySelectorAll(".row");
let TODO_LIST = document.querySelector(".list-group");
let TODO_SELECTOR = document.querySelector("#todo");
let DELETE_TODO = document.querySelector("#delete-td");
let SEARCH_FORM = document.querySelector("#filter-form");
let SEARCH_TODO = document.querySelector("#filter");
let DIV_FILTER = document.getElementById("search-div");
let CLEAR_TODOS = document.getElementById("clear-todos");
eventListeners();
let GymID = 0,
    ShopID = 0,
    EducationID = 0;
let ui = new UI();
let data = new Data();
let fetchDemo = new FetchDemo();
let isTrue = true;
//!eger bu funksiyani bir evente dinleyici
//!olaraq yerlesdirirsense hemin EVENTI hemin
//!funksiyaya parametr olaraq kecmek mumkundur

function eventListeners() {
    FORM_ADD.addEventListener("submit", addTodo);
    TODO_SELECTOR.addEventListener("change", () => {
        let paramsCategory = TODO_SELECTOR.value;
        let id = idSelector(paramsCategory);

        TODO_LIST.innerHTML = "";
        for (let i = 1; i <= id; i++) {
            let fetchDemo = new FetchDemo();
            fetchDemo
                .get(i, paramsCategory)
                .then((response) => ui.addTodo(response.todo, TODO_LIST));
        }
    });
    window.addEventListener("DOMContentLoaded", contentLoadIDFinder);
    SEARCH_FORM.addEventListener("submit", searchTodoController);
    DIV_FILTER.addEventListener("click", searchTodoRemove);
    TODO_LIST.addEventListener("click", listTodoRemove);
    DELETE_TODO.addEventListener("click", deleteTodo);
    CLEAR_TODOS.addEventListener("click", clearTodos);
}

function idSelector(paramsCategory) {
    if (paramsCategory === "gym") {
        return GymID;
    } else if (paramsCategory === "shop") {
        return ShopID;
    } else if (paramsCategory === "education") {
        return EducationID;
    }
}

function addTodo(e) {
    let inputValue = INPUT_TODO.value.trim();
    if (inputValue === "") {
        ui.displayMessage("danger", "Enter todo", ROW_CONTENT[0]);
    }
        // else if (isExist(inputValue)) {
        // ui.displayMessage("danger", "This todo already exist", ROW_CONTENT[0])
    // }
    else {
        let id = idChooser(TODO_SELECTOR.value);
        fetchPost(inputValue, id);
        ui.clearUI(INPUT_TODO);
        ui.displayMessage("primary", `${inputValue} successfully added  to DB`, ROW_CONTENT[0])
    }

    e.preventDefault();
    ui.addTodo(inputValue, TODO_LIST);
}

// function isExist(paramsValue) {
//     let fetchDemo = new FetchDemo();
//     isTrue = true;
//     fetchDemo.get(null, TODO_SELECTOR.value)
//         .then((response) => () => {
//             if ((response.todo).some((item) => {
//
//             })) {
//                 isTrue = false;
//             }
//         })
//     return isTrue;
// }

function idChooser(paramsCategory) {
    if (paramsCategory === "gym") {
        GymID += 1;
        return GymID;
    } else if (paramsCategory === "shop") {
        ShopID += 1;
        return ShopID;
    } else if (paramsCategory === "education") {
        EducationID += 1;
        return EducationID;
    }
}

function fetchPost(paramsInput, paramsID) {
    let fetchDemo = new FetchDemo();
    fetchDemo
        .post(new Data(paramsInput, paramsID), TODO_SELECTOR.value)
        .then((response) => console.table(response))
        .catch((err) => console.log(err));
}

function contentLoadIDFinder() {
    let fetchArray = ["gym", "shop", "education"];
    fetchArray.forEach((item) => {
        let fetchDemo = new FetchDemo();

        if (item === "gym") {
            fetchDemo
                .get(null, item)
                .then((response) => (GymID = response.length))
                .catch((err) => console.log(err));
        } else if (item === "shop") {
            fetchDemo
                .get(null, item)
                .then((response) => (ShopID = response.length))
                .catch((err) => console.log(err));
        } else if (item === "education") {
            fetchDemo
                .get(null, item)
                .then((response) => (EducationID = response.length))
                .catch((err) => console.log(err));
        }
    });
    setTimeout(() => {
        contentLoadListAdd();
    }, 150);
}

function contentLoadListAdd() {
    for (let i = 1; i <= GymID; i++) {
        let fetchDemo = new FetchDemo();
        fetchDemo
            .get(i, "gym")
            .then((response) => ui.addTodo(response.todo, TODO_LIST));
    }
}

function searchTodoController(e) {
    let searchInput = SEARCH_TODO.value.trim();
    let category = TODO_SELECTOR.value;
    let fetchDemo = new FetchDemo();


    if (searchInput === "") {
        ui.displayMessage(
            "danger",
            "Enter any todo name",
            ROW_CONTENT[1].children[2]
        );
        //  }
        //   else if (fetchResponse.every((item)=>{
        //     item.todo !==searchInput
        // })) {
        //     ui.displayMessage(
        //         "danger",
        //         "There is no this Todo",
        //         ROW_CONTENT[1].children[2]
        //     );

    } else if (DIV_FILTER.childElementCount > 0) {
        if (DIV_FILTER.children[0].textContent.trim() !== searchInput) {
            let fetchDemo = new FetchDemo();
            fetchDemo.get(null, category)
                .then((response) => response.forEach((item) => {
                    if (item.todo === searchInput) {
                        ui.addToUISearchTodo(searchInput, DIV_FILTER);
                    }
                }))
        } else if (DIV_FILTER.children[0].textContent.trim() === searchInput) {

            ui.displayMessage(
                "danger",
                "You already see this Todo",
                ROW_CONTENT[1].children[2]
            );
        }
    } else {

        let fetchDemo = new FetchDemo();
        fetchDemo.get(null, category).then((response) =>
            response.forEach((item) => {
                if (item.todo === searchInput) {
                    ui.addToUISearchTodo(searchInput, DIV_FILTER);
                }
            })
        );

    }
    ui.clearUI(SEARCH_TODO);
    e.preventDefault();

}

function searchTodoRemove(e) {
    let click = e.target;
    if (click.className === "bi bi-file-x") {
        ui.removeSearchTodo(click.parentElement.parentElement);
    }
}

function listTodoRemove(e) {
    let click = e.target;
    if (click.className === "bi bi-file-x") {
        ui.removeSearchTodo(click.parentElement.parentElement);
    }
}

function deleteTodo() {
    let paramsCategory = TODO_SELECTOR.value;
    let delID = idSelector(paramsCategory);
if(delID >0){
    for (let i = 1; i <= delID; i++) {
        let fetchDemo = new FetchDemo();
        fetchDemo.delete(i, paramsCategory)
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
    }
    ui.deleteUI(TODO_LIST)
    ui.displayMessage("success","Taslaklar temizlendi",ROW_CONTENT[0])
}else{
    ui.displayMessage("warning","DB is empty",ROW_CONTENT[0])
}

}

function clearTodos() {
    console.log("clear");
    if(GymID>0 ||ShopID>0 ||EducationID >0){
        [["gym", GymID], ["shop", ShopID], ["education", EducationID]].forEach((item) => {
            console.log(item)
            for (let i = 1; i <= item[1]; i++) {
                let fetchDemo = new FetchDemo();
                fetchDemo.delete(i, item[0])
                    .then((response) => console.log(response))
                    .catch((err) => console.log(err));
            }
        })
        ui.deleteUI(TODO_LIST)
        ui.displayMessage("success","Tum Taslaklar temizlendi",ROW_CONTENT[0])
    }else{
        ui.displayMessage("warning","DB is empty",ROW_CONTENT[0])
    }
}
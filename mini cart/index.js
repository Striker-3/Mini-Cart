import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push , onValue , remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-db-for-cart-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputField()

    
})

onValue(shoppingListInDB , function(snapshot){

    if(snapshot.exists()){
         
        let listArray = Object.entries(snapshot.val())
    clearShoppingList()

    for(let i=0;i<listArray.length;i++){
        let currentItem = listArray[i];
        let currentID = currentItem[0];
        let currentValue = currentItem[1];
         
        console.log(currentItem)
        appendItemToShoppingList(currentItem)
    }
    }
    else{

        shoppingList.innerHTML = "<b> No Items Entered Yet </b>"
    }
    
})

function clearInputField(){
    inputFieldEl.value = " "
}

function clearShoppingList(){
    shoppingList.innerHTML = " "
}

function appendItemToShoppingList(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent  = itemValue

    newEl.addEventListener("dblclick",function(){
         let exactLocationInDB = ref(database , `shoppingList/${itemID}`)
         remove(exactLocationInDB)
    })
    

    shoppingList.append(newEl)
}
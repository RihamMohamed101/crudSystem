let title = document.getElementById("title");
let price = document.getElementById("price");
let Ads = document.getElementById("Ads");
let Task = document.getElementById("Task");
let Discount = document.getElementById("Discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let creat = document.getElementById("creat");
let search = document.getElementById("search");
let deleteAll = document.getElementById('deleteAll');
let mood = 'creat' , tmp='' , moodSearch = 'searchTitle';

// total price

let getTotal = function () {
    if (price.value != '') {
        total.innerHTML = +price.value + +Ads.value + +Task.value - +Discount.value;
        total.style.background = "#040";
    }
    
    else {
        total.innerHTML = "";
        total.style.background = "#7f0606";
    }
}


// store data
let productData = [];
if (localStorage && localStorage.product) {
    productData = JSON.parse(localStorage.product)
}



creat.onclick = function()  {
    let newPro = {
        title: title.value,
        price: price.value,
        Task: Task.value,
        Ads: Ads.value,
        Discount: Discount.value,
        total: total.innerHTML,
        category: category.value,
    };

    
   
   
    if (title.value != '' && price.value != '' && category.value != '') {

          
        
            if (count.value > 1) {
                for (let i = 0; i < count.value; i++) {
                    productData.push(newPro);
                }
            }

            else {

                if (mood === 'creat') {
                    productData.push(newPro);
                }

                else
                {
                    productData[temp] = newPro;
                    creat.innerHTML = 'creat';
                    count.style.display = 'block';

                }
            }
      
    }

    localStorage.setItem('product', JSON.stringify(productData));
    showData();
    clearData();
}

 

// show element

let showData = () => {

    let trPoduct = '';
    for (let i = 0; i < productData.length; i++)
    {
        trPoduct += `

               <tr>
                    <td>${i+1}</td>
                    <td>${productData[i].title}</td>
                    <td>${productData[i].price}</td>
                    <td>${productData[i].Task}</td>
                    <td>${productData[i].Ads}</td>
                    <td>${productData[i].Discount}</td>
                    <td>${productData[i].total}</td>
                    <td>${productData[i].category}</td>
                    <td>
                        <button onclick="setUpdate(${i})" id="update">update</button>
                    </td>

                    <td>
                        <button onclick='deleteItem(${i})' id="delete">delete</button>
                    </td>
                </tr>
          `;
    }
   

    if (productData.length > 0)
    {
        let btnAll = `
           <button onclick="clearAll()" >Clear All (${productData.length})</button>
        `;

        deleteAll.innerHTML = btnAll;
    }

    else {
          deleteAll.innerHTML = '';
    }

    document.getElementById('tbody').innerHTML = trPoduct;
}

 showData();


let clearData = () => {
    title.value = '';
    price.value = '';
    Task.value = '';
    Ads.value = '';
    count.value = '';
    category.value = '';
    Discount.value = '';
    total.innerHTML = '';
    getTotal();
}


let setUpdate = (i) => {
    title.value = productData[i].title;
    price.value = productData[i].price;
    Ads.value = productData[i].Ads;
    Task.value = productData[i].Task;
    Discount.value = productData[i].Discount;
    total.innerHTML = productData[i].total;
    category.value = productData[i].category;
    getTotal();
    creat.innerHTML = 'update';
    count.style.display = 'none';
    scroll({
        top: 0,
        behavior: "smooth",
    });

    mood = 'update';
    temp = i;

}


let deleteItem = (i) => {
    productData.splice(i, 1);
    localStorage.product = JSON.stringify(productData);
    showData();
}


let clearAll = () => {
    productData.splice(0);
    localStorage.clear();
    showData();
}


let getSearchMood = (value) => {
    if (value === "seerchbyTitle") {
        moodSearch = 'title';
    }

    else {
        moodSearch = 'category';
    }

    search.placeholder = 'search by ' + moodSearch;
    search.value = '';
    showData();
}


let getSearch = (value) => {


      
        let trPoduct = '';

    for (let i = 0; i < productData.length; i++)
    {
        if (moodSearch === 'title')
        {
            if (productData[i].title.includes(value)) {


                trPoduct += `

               <tr>
                    <td>${i+1}</td>
                    <td>${productData[i].title}</td>
                    <td>${productData[i].price}</td>
                    <td>${productData[i].Task}</td>
                    <td>${productData[i].Ads}</td>
                    <td>${productData[i].Discount}</td>
                    <td>${productData[i].total}</td>
                    <td>${productData[i].category}</td>
                    <td>
                        <button onclick="setUpdate(${i})" id="update">update</button>
                    </td>

                    <td>
                        <button onclick='deleteItem(${i})' id="delete">delete</button>
                    </td>
                </tr>
          `;
                
            }
        }

        else {
            if (productData[i].category.includes(value)) {
                trPoduct += `

               <tr>
                    <td>${i+1}</td>
                    <td>${productData[i].title}</td>
                    <td>${productData[i].price}</td>
                    <td>${productData[i].Task}</td>
                    <td>${productData[i].Ads}</td>
                    <td>${productData[i].Discount}</td>
                    <td>${productData[i].total}</td>
                    <td>${productData[i].category}</td>
                    <td>
                        <button onclick="setUpdate(${i})" id="update">update</button>
                    </td>

                    <td>
                        <button onclick='deleteItem(${i})' id="delete">delete</button>
                    </td>
                </tr>
          `;
                
            }
        }
    }

     document.getElementById('tbody').innerHTML = trPoduct;
}



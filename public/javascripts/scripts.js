// /******************************************
// Table Filter and Pagination
// ******************************************/
   
$(document).ready(function(){
    /*** 
     Global variables... DOM selectors
    ***/
    const bookItems = $('#table tbody tr');
    let pageSize = 6;
    let startPage = 1;


    /*** 
     The `createPaginationDiv` function create the pagination div with its ul.
    ***/
    const createPaginationDiv = () => {
        $('#empty').after('<div class="pagination"></div>');
        let ul = document.createElement('ul');
        document.querySelector('.pagination').appendChild(ul);
        ul.setAttribute('id', 'paginationUL')
    }
 
 
    /*** 
        The `showPage` function is used to show the number of table rows allowed on the `pageSize` 
        variable and hide all other rows in the table. 
        On this case the default pageSize is set to (6).
    ***/
    const showPage = (list, page) => {
        for (let i = 0; i < list.length; i++) {
            if (i >= (page * pageSize) - pageSize && i <= (((page * pageSize) - pageSize) + pageSize) - 1) {
                list[i].style.display = 'table-row';
            } else {
                list[i].style.display = 'none';
            }
        }
        return list;
    }
    showPage(bookItems, startPage);
    

    /*** 
     The `appendPageLinks function generates/appends HTML elements...
     This is where the pagination links are dynamically created and attached to the index page.
     this function also call the `showPage` function every time the link buttons are clicked.  
    ***/

    const appendPageLinks = list => {
        createPaginationDiv(); 
        let pageCount = Math.ceil(list.length / pageSize);
    
        for (let i = 1; i <= pageCount; i++) {
        let li = document.createElement('li');
        document.querySelector('.pagination ul').appendChild(li);
        let a = document.createElement('a');
        document.querySelector('.pagination ul li').appendChild(a);
        a.setAttribute('href', '#');
        a.innerHTML = i;
        a.addEventListener('click', (e) => {
            const currentLink = e.target.textContent;
            showPage(list, currentLink);
            links = document.querySelectorAll('.active');
            for (let i = 0; i < links.length; i++) {
                links[i].classList.remove('active');
            }
            e.target.className = 'active';
        });
        }
    }
    appendPageLinks(bookItems);
    
    
    const removeLinks = () => {
        var elem = document.querySelector('.pagination');
        elem.parentNode.removeChild(elem);
    }

    /******************************************************************************************************** */   

    /*** 
     Search Input HTML Element... 
    ***/
    let input = document.getElementById("myInput");
    input.autocomplete = "on";
   
    /*** 
     The `noSearchMessage` function creates the <p> for the "No result" messsage.
     I have creatred a css selector on the design.css to handle the desing of the the noSearch class.
    ***/

    const noResultMessage = () => {
        let noSearch = document.createElement('p');
        noSearch.setAttribute('class', 'noSearch');
        document.querySelector('body').appendChild(noSearch);
        document.querySelector('.noSearch').innerHTML = 'No match found! Please try again.';
    }

    /*** 
     The `clearMessage` function clears the "No Result" message.
    ***/

    const clearMessage = () => {
        var elem = document.querySelector('.noSearch');
        elem.parentNode.removeChild(elem);
    }


    /*** 
     The `searchOnList` function search and filter through all rows/columns in the table 
     based on the text typed in the input field. 
     the nested for loop, loops through all the items on the rows first and then on every column and hides those that don't 
     match the search query. 
    ***/
    
    const searchOnList = () => {
        var filter, table, tr, td, i, txtValue; 
        bookArr = [];
        filter = input.value.toUpperCase(); 
        table = document.getElementById("table"); 
        tr = table.getElementsByTagName("tr"); 
        th = table.getElementsByTagName("th"); 
        for (i = 1; i < tr.length; i++) { 
            tr[i].style.display = "none"; 
            // Loop through all table rows and columns, and hide those that don't match the search query 
            for (var j = 0; j < th.length; j++) { 
                td= tr[i].getElementsByTagName("td")[j]; 
                if (td) { 
                    txtValue = td.textContent || td.innerText; 
                    if (txtValue.toUpperCase().indexOf(filter) > -1) { 
                        tr[i].style.display = "table-row";
                        bookArr.push(tr[i]); 
                         break; 
                    } 
                   
                } else {
                    tr[i].style.display = "none";
                }
            } 
        }

        /*** 
         This nested If-Statement checks for how many books are listed on the newely created array `bookArr` 
         based on the search results. if the bookArr is empty and there is no a <p> tag with a class `.noSearch`, 
         then the "noResultMessage" is called. 

         else if the `booktArr` > 1 and there is a <p> with a class of `.noSearch`, then the `clearMessage` is called. 
        ***/

        console.log(bookArr);
        if (bookArr.length === 0 && document.querySelector('.noSearch') === null) {
           noResultMessage();
        } else {
           if (document.querySelector('.noSearch') && bookArr.length !== 0) {
              clearMessage();
           }  
        }

        removeLinks();
        showPage(bookArr, startPage);   
        appendPageLinks(bookArr);
        bookArr = [];
    }
    

    // real time filtering and calls the `searchOnList` function
    input.addEventListener('keyup', () => {
        searchOnList();
        if (input.value === 0) {;
        }
    });

});
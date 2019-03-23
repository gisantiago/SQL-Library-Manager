// /******************************************
// Table Filter and Pagination
// ******************************************/
   


$(document).ready(function(){
    // Create empty <p> and the div that contains all the pagination <a> tags below the Books table
    
    $('#table').after('<p id="empty"></p>');
    $('#empty').after('<div id="nav"></div>');
    var rowsShown = 6;
    var listItems = $('#table td');
    var rowsTotal = $('#table tbody tr').length;
    var numPages = rowsTotal/rowsShown;
    for(i = 0; i < numPages; i++) {
        var pageNum = i + 1;
        $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
    }
    $('#table tbody tr').hide();
    $('#table tbody tr').slice(0, rowsShown).show();
    $('#nav a:first').addClass('active');
    $('#nav a').bind('click', function(){

        $('#nav a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
        css('display','table-row').animate({opacity:1}, 300);
    });



    /******************************************
    List Filter and Pagination
    ******************************************/
    


    // /*** 
    //  Global variables... DOM selectors
    // ***/
    // const listItems = document.querySelectorAll('#table tr');
    // let pageSize = 6;
    // let startPage = 1;


    // /*** 
    //  The `createPaginationDiv` function create the pagination div with its ul.
    // ***/
    // const createPaginationDiv = () => {
    //     $('#table').after('<p id="empty"></p>');
    //     let pagination = $('#empty').after('<div id="nav"></div>');
    //     pagination.className = 'pagination';
    //     let ul = document.createElement('ul');
    //     document.querySelector('.pagination').appendChild(ul);
    //     ul.setAttribute('id', 'paginationUL')
    // }


    // /*** 
    //  The `showPage` function is used to show the number of items allowed on the `pageSize` 
    // variable and hide all other item in the list. 
    // On this case the default pageSize is set to (10).
    // ***/
    // const showPage = (list, page) => {
    // for (let i = 0; i < list.length; i++) {
    //     if (i >= (page * pageSize) - pageSize && i <= (((page * pageSize) - pageSize) + pageSize) - 1) {
    //         list[i].style.display = 'block';
    //     } else {
    //         list[i].style.display = 'none';
    //     }
    // }
    // return list;
    // }
    // showPage(listItems, startPage);



    // /*** 
    //  The `appendPageLinks function generates/appends HTML elements...
    // This is where the pagination links are dynamically created and attached to the index.HTML.
    // this function also call the `showPage` function every time the link buttons are clicked.  
    // ***/

    // const appendPageLinks = list => {
    // createPaginationDiv(); 
    // let pageCount = Math.ceil(list.length / pageSize);

    // for (let i = 1; i <= pageCount; i++) {
    //     let li = document.createElement('li');
    //     document.querySelector('.pagination ul').appendChild(li);
    //     let a = document.createElement('a');
    //     document.querySelector('.pagination ul li').appendChild(a);
    //     a.setAttribute('href', '#');
    //     a.innerHTML = i;
    //     a.addEventListener('click', (e) => {
    //         const currentLink = e.target.textContent;
    //         showPage(list, currentLink);
    //         links = document.querySelectorAll('.active');
    //         for (let i = 0; i < links.length; i++) {
    //             links[i].classList.remove('active');
    //         }
    //         e.target.className = 'active';
    //     });
    // }
    // }
    // appendPageLinks(listItems);


    // const removeLinks = () => {
    // var elem = document.querySelector('.pagination');
    // elem.parentNode.removeChild(elem);
    // }

    /******************************************************************************************************** */   

    /*** 
     Search Input HTML Element... 
    ***/

    // let searchInput = document.createElement('div');
    // searchInput.setAttribute('class', 'student-search')
    // document.querySelector('.page-header').appendChild(searchInput);
    // let input = document.createElement('input');
    // input.setAttribute('placeholder', 'Search for students...');
    // input.setAttribute('type', 'text');
    // document.querySelector('.student-search').appendChild(input);
    // input.autocomplete = "on";
    // let button = document.createElement('button');
    // button.textContent = 'Search';
    // document.querySelector('.student-search').appendChild(button);




    // /*** 
    //  The `noSearchMessage` function creates the <p> for the "No result" messsage.

    // I have creatred a css selector on the design.css to handle the desing of the the noSearch class.
    // ***/

    // const noResultMessage = () => {
    // let noSearch = document.createElement('p');
    // noSearch.setAttribute('class', 'noSearch');
    // document.querySelector('.page').appendChild(noSearch);
    // document.querySelector('.noSearch').innerHTML = 'No match found! Please try again.';
    // }

    // /*** 
    //  The `clearMessage` function clears the "No Result" message.
    // ***/

    // const clearMessage = () => {
    // var elem = document.querySelector('.noSearch');
    // elem.parentNode.removeChild(elem);
    // }


    // /*** 
    //  The `searchOnList` function search and filter through the Listitems 
    // based on the text typed in the input field. 
    // the for loop, loops through all the items on the list and hide those who don't 
    // match the search query. 
    // ***/
    
    // const searchOnList = () => {
    // let filter, txtValue;
    // filter = input.value.toLowerCase();
    // studentArr = [];
    // for (let i = 0; i < listItems.length; i ++) { 
    //     list = listItems[i].querySelectorAll('#table tr')[0];
    //     txtValue = list.textContent || list.innerText;
    //     if (txtValue.toLowerCase().indexOf(filter) > -1) {
    //         listItems[i].style.display = "";
    //         studentArr.push(listItems[i]);
    //     } else {
    //         listItems[i].style.display = "none";
    //     }
    // }
    
    // /*** 
    //      This nested If-Statement checks for how many students are listed on the newely created array `studentArr` 
    //     based on the search results. if the studentArr is empty and there is no <p> is a class `.noSearch`, 
    //     then the "noResultMessage" is called. 

    //     else if the `studentArr` > 1 and there is a <p> with a class of `.noSearch`, then the `clearMessage` is called. 
    // ***/

    // console.log(studentArr);
    // if (studentArr.length === 0 && document.querySelector('.noSearch') === null) {
    //     noResultMessage();
    // } else {
    //     if (document.querySelector('.noSearch') && studentArr.length !== 0) {
    //         clearMessage();
    //     }  
    // }

    // removeLinks();
    // showPage(studentArr, startPage);   
    // appendPageLinks(studentArr);
    // studentArr = [];
    // // }

    // // real time filtering and calls the `searchOnList` function
    // input.addEventListener('keyup', () => {
    // searchOnList();
    
    // });


    // button.addEventListener('click', () => {
    // searchOnList();
    // });

});
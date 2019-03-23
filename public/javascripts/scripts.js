// /******************************************
// Table Filter and Pagination
// ******************************************/
   


$(document).ready(function(){
    // Create empty <p> and the div that contains all the pagination <a> tags below the Books table
    
    let input = document.getElementById("myInput"); 

    const pgnation = (data) => {
        $('#table').after('<p id="empty"></p>');
        $('#empty').after('<div id="nav"></div>');
        var rowsShown = 6;
        var listItems = $(data);
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
    };
    pgnation('#table td');

    const removePgnation = () => {
        var elem = document.querySelector('#nav');
        elem.parentNode.removeChild(elem);
     }





    /*** 
    The `searchOn` function search and filter through the Listitems (table rows) 
    based on the text typed in the input field. 
    the for loop, loops through all the rows first and then through all the columns -- then hide the rows that don't 
    match the search query. 
    ***/
    const searchOn = () => { 
        var input, filter, table, tr, td, i, txtValue; 
        input = document.getElementById("myInput"); 
        filter = input.value.toUpperCase(); 
        table = document.getElementById("table"); 
        tr = table.getElementsByTagName("tr"); 
        th = table.getElementsByTagName("th"); 
        for (i = 1; i < tr.length; i++) { 
            tr[i].style.display = "none"; 
            // Loop through all table rows and columns, and hide those who don't match the search query 
            for (var j = 0; j < th.length; j++) { 
                td= tr[i].getElementsByTagName("td")[j]; 
                if (td) { 
                    txtValue = td.textContent || td.innerText; 
                    if (txtValue.toUpperCase().indexOf(filter) > -1) { 
                        tr[i].style.display = ""; 
                        break; 
                    } 
                } 
            } 
        }
        removePgnation();
        
    }
    
    // real time filtering and calls the `searchOnList` function
    input.addEventListener('keyup', () => {
        searchOn();
        //pgnation('#table td');
    });

});
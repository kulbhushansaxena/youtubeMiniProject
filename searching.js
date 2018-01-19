//Global Properties Used
var numberofItemsToShowPerPage = 0;
var numberofPages = 1;
var pageNumber = 1;
var items = {};
let listElement = document.querySelector("#list");
let noOfRecordsPerPage = 15;
let currentPage = 1;
let isresized = false;
let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

(function(){
        let searchButtonElement = document.querySelector("#searchButton");
        //Creating Event on Button Click
        searchButtonElement.addEventListener('click', function(event){
            resetProperties();
            listElement.innerHTML = "";

            numberofItemsToShowPerPage = width/400;
            numberofPages = (noOfRecordsPerPage/numberofItemsToShowPerPage)+1;

            let searchInput = document.querySelector("#searchKeyword").value;
            let url = urlGeneration(searchInput, noOfRecordsPerPage);

            fetchData(url, searchInput, numberofPages, numberofItemsToShowPerPage);
            
            modifycss();
    });
})();


function fetchData(url, searchInput, numberofPages, numberofItemsToShowPerPage){
    fetch(url)
      .then(data => data.json())
      .then(function(data) {
          url = urlGeneration(searchInput, noOfRecordsPerPage, recoverIds(data.items));
          fetch(url)
                .then(data => data.json())
                .then(function(data) {
                        items = data.items;
                        var result = "";
                        var count = 0;

                        items.forEach(function(item) {
                                count++;
                                if(count<numberofItemsToShowPerPage){
                                        result += addContent(item);
                                }
                         });

                        listElement.innerHTML = result;

                        addPagination();

                })
                .catch(function(error) {
                    alert("Cannot Process your Request...!!!!!!!!!!! \nTry after some time...");
                });       
      })
      .catch(function(error) {
            alert("Cannot Process your Request...!!!!!!!!!!!");
      });
}
    



function fetchNextPageRecords(pagenumber){
    //pageNumber = pagenumber;
    if(pagenumber){
        
        currentPage = pagenumber;
        numberofItemsToShowPerPage = parseInt(numberofItemsToShowPerPage);
        var count = parseInt((pagenumber*numberofItemsToShowPerPage) - numberofItemsToShowPerPage);
        
        if(parseInt(numberofPages) == pagenumber){
           noOfRecordsPerPage = noOfRecordsPerPage+15;
           let searchInput = document.querySelector("#searchKeyword").value;
           let url = urlGeneration(searchInput, noOfRecordsPerPage); 
           numberofPages = (noOfRecordsPerPage/numberofItemsToShowPerPage)+1;
           fetchData(url, searchInput, parseInt(numberofPages), numberofItemsToShowPerPage);
           document.querySelector("#list").innerHTML = "";
           setTimeout(function(){
                modifyData(count, pagenumber);
           },1000);
           return;
        }
        
        modifyData(count, pagenumber);
        modifycss();
    }
    
}


function modifyData(count, pagenumber){
    //let listElement = document.querySelector("#list");
    //listElement.innerHTML = "";
    var result = "";

    for(var i=count;i<(pagenumber*numberofItemsToShowPerPage);i++){
        var item = items[i];
        if(typeof item != "undefined"){
             result += addContent(item);
        }
    }

    var paginationbarNodes = document.querySelectorAll("a");

    for(var i=0; i<paginationbarNodes.length;i++){
        paginationbarNodes[i].removeAttribute("class");
        if(paginationbarNodes[i].textContent == pagenumber){
             paginationbarNodes[i].setAttribute('class','active');
        }
    }


    listElement.innerHTML = result;
}

function addPages(pageNumber, textContent, isActive, parrent){
    var a = document.createElement('a');
    a.setAttribute('href','#');
    
    a.addEventListener('click',function(event){
            fetchNextPageRecords(pageNumber);
        });
    
    if(isActive)
        a.setAttribute('class','active');
    a.textContent = textContent;  
    
    parrent.appendChild(a);
}

function addPagination(){
    //document.querySelector("#pagebar").innerHTML = "";
    var paginationbar = document.querySelector("#pagebar");
    paginationbar.innerHTML = "";

    //addPages(1,1,true, paginationbar);
    for(let i =1 ;i<=numberofPages;i++){
        addPages(i,i,i==currentPage, paginationbar);
    }
}


function resize(){
     width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
     //if(screen.width>width)
        //isresized = true;
    
    numberofItemsToShowPerPage = parseInt(width/400);
    numberofPages = parseInt((15/numberofItemsToShowPerPage)+1);
    
    if(!isEmpty(items))
        addPagination();
    
    fetchNextPageRecords(pageNumber);
    
    modifycss();
}


function urlGeneration(searchInput, noOfRecordsPerPage, arrayIds){
    let url = "";
    if(typeof arrayIds == "undefined"){
        url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults="+noOfRecordsPerPage+"&q="+searchInput;
    }
    else{
        url = "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&part=snippet,statistics&id="+arrayIds;
    }
    
    return url;
}

function recoverIds(items){
    var array = [];
    
    for(var i=0;i<items.length;i++){
        array.push(items[i].id.videoId);
    }
    
    return array.join(',').replace('[','').replace(']','');
    
}

function addContent(item){
    item.snippet.publishedAt = item.snippet.publishedAt.substring(0,10);
    item.snippet.description = item.snippet.description.substring(0,150)+"....";
    return `<div class='column'>
                    <img src= ${item.snippet.thumbnails.medium.url} 
                         width=${item.snippet.thumbnails.medium.width} 
                         height=${item.snippet.thumbnails.medium.height} 
                         class='image'/><br/>

                    <p class='onTop'>${item.snippet.title}<br/></p>
 
                    <span>
                        <img src='images/person1.jpg' class='imageClass'/>
                        <p>
                            <b>${item.snippet.channelTitle}</b>
                        </p>
                    </span><br/>

                    <span>
                        <img src='images/calander.png' class='imageClass'/>
                        <p>
                            <b>${item.snippet.publishedAt}</b>
                        </p>
                    </span><br/>

                    <span>
                        <img src='images/eye.png' class='imageClass'/>
                        <p>
                            <b>${item.statistics.viewCount}</b>
                        </p>
                    </span><br/>

                    <span>
                        <p class='pMargin'>
                            <i>${item.snippet.description}</i>
                        </p>
                    </span>

              </div>`;
}


function resetProperties(){
    var paginationbar = document.querySelector("#pagebar");
    paginationbar.innerHTML = "";
    noOfRecordsPerPage = 15;
    currentPage = 1;
}

function modifycss(){
    if(screen.width>width && !isEmpty(items)){
        setTimeout(function(){
            if(document.getElementsByClassName("column").length !=0 ){
                document.getElementsByClassName("column")[0].setAttribute("style","width : 69%;");
                document.querySelector("#searchKeyword").setAttribute("style","width: 69%;");
                document.querySelector("#pagebar").setAttribute("style","left: 20%;");
            }
        },100)
    }
    else{
        if(document.getElementsByClassName("column").length !=0 ){
            document.getElementsByClassName("column")[0].removeAttribute("style");
            document.querySelector("#searchKeyword").removeAttribute("style");
            document.querySelector("#pagebar").removeAttribute("style");
        }
    }
}

Object.prototype.isEmpty = function() {
    for(var key in this) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
}


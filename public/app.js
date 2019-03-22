

function displayResuluts(data) {
    $("tbody").empty();
 data.forEach(scrapedData => {
        $("tbody").append(
            "<ul>" +
            "<li>" + scrapedData.title + "</li>" +
           "<li>" + scrapedData.link +"</li>" +
           //  "<li>" + scrapedData.img + "</li>" +
            "</ul>"
        
        )

        console.log(scrapedData);
 })
}

     
            


// $.getJSON("/", function(data) {
// displayResuluts(data);
// })

$("#scrape").on("click", function(){
    console.log("scraped")
    $.getJSON("/scrape", data => displayResuluts(data))
})

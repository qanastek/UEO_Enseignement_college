$(".getArea").click(function (e) { 

    console.log("Clicked !")

    var rectancle = new Rectangle(5,5);
    var area = rectancle.getArea();

    $(".size").text(area);
});
var row1 = new Array();
var row2 = new Array();
var row3 = new Array();
var row4 = new Array();
var row5 = new Array();
var row6 = new Array();
function displayCalendar (month, year)
{	
	month = parseInt(month);
	year = parseInt(year);
	var days = getDaysInMonth(month+1,year)+1;
	var firstOfMonth = new Date (year, month, 1);
	var startingPos = firstOfMonth.getDay();
	var counter =1;
	var date = new Date();
	var d = date.getDate();
	var tr = document.createElement("tr");
	for (var k=0; k<startingPos;k++)
	{
		row1.push(" ");
	}
	for (var k=startingPos; k<7;k++)
	{
		row1.push(" "+counter);	
		counter++;
	}
	
	for (var j=0; j<7; j++)
	{
			row2.push(" "+ counter);
			counter++;
	}
	
	for (var j=0; j<7; j++)
	{
			row3.push(" "+ counter);
			counter++;
	}
	
	for (var j=0; j<7; j++)
	{
			row4.push(" "+ counter);
			counter++;
	}
	
	for (var j=0; j<7; j++)
	{
		if (counter<days)
		{
			row5.push(" "+ counter);
			counter++;
		}		
	}
	function getDaysInMonth(month,year)  
	{
		var days;
		if (month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12)  days=31;
		else if (month==4 || month==6 || month==9 || month==11) days=30;
		else if (month==2)  {
		if (isLeapYear(year)) { days=29; }
		else { days=28; }
		}
		return (days);
		}
		function isLeapYear (Year) {
		if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
		return (true);
		} else { return (false); 
	}	
	}
}

var main_app = angular.module('app',[]);
main_app.controller('control',function($scope,$http)
{
    $scope.names= ['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Satruday'];
	var date = new Date();
	displayCalendar (date.getMonth(), date.getFullYear());
	
  	var d= date.getDate();
	
	$scope.rows1 = row1;
	$scope.rows2 = row2;
	$scope.rows3 = row3;
	$scope.rows4 = row4;
	$scope.rows5 = row5;
	
$http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22islamabad%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
  .success(function (response) 
  {
	  var result= response.query; 
   	  var temp=result.results.channel.item.condition.temp;
   	  var text=result.results.channel.item.condition.text;
	  var d= date.getDate();
	  for (var i=0; i<row1.length; i++)
		  if (row1[i]==d)
			  row1[i]= temp+" "+text;
	  for (var i=0; i<row2.length; i++)
		  if (row2[i]==d)
			  row2[i]= temp+" "+text;
	  for (var i=0; i<row3.length; i++)
		  if (row3[i]==d)
			  row3[i]= temp+" "+text;
	  for (var i=0; i<row4.length; i++)
		  if (row4[i]==d)
			  row4[i]= temp+" "+text;
	  for (var i=0; i<row5.length; i++)
		  if (row5[i]==d)
			  row5[i]= temp+" "+text;
	if (typeof(Storage) !== "undefined") {
    // Store
	console.log (date.getDate());
	var dates = date.getDate() + "."+ date.getMonth() + "." + date.getFullYear();
    localStorage.setItem(""+dates , ""+temp+" "+text);
    // Retrieve    
} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}

   })

}//controller function ends here
);

$("table").click(function(event) {
    var text = $(event.target).text();
	text = text.replace(/\s+/g, '');
	var date = new Date();
	if (text>date.getDate())
		alert ("Please Select Correct Date");
	else
	{
		var dates = text + "."+ date.getMonth() + "." + date.getFullYear();
		alert(localStorage.getItem(""+dates));
	}
});

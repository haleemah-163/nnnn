'use strict';
var rounds=25;
var roundsCounter=0;
var LIIndex;
var MIIndex;
var RIIndex; 
var leftImage = document.getElementById('LI');
var middleImage = document.getElementById('MI');
var rightImage = document.getElementById('RI');
var pResults;
var timeDisplayed=[];
var votes=[];
var productNames=[];
var LShown =-1;
var MShown=-1;
var RShown=-1;


//add rounds number event
var formdiv = document.getElementById('roundsForm');
formdiv.addEventListener('submit',roundsSumbmission);
function roundsSumbmission(event){
    event.preventDefault();
    rounds=event.target.roundsNumber.value;
    
}
//ooooooooooooooooooooooooooooooooooooooooo



function ProductImages (productName,imagePath){
    this.productName=productName;
    this.imagePath=imagePath;
    this.timeDisplayed=0;
    this.votes=0;
    ProductImages.allImages.push(this);
    productNames.push(productName);
}
ProductImages.allImages=[];


new ProductImages ('bag','img/IMG-20200404-WA0033.jpg');
new ProductImages ('banana','img/IMG-20200418-WA0093.jpg');
new ProductImages ('bathroom','img/IMG-20200804-WA0004.jpg');
new ProductImages ('boots','img/IMG-20201211-WA0081.jpg');
new ProductImages ('breakfast','img/IMG-20201211-WA0081.jpg');
new ProductImages ('bubblegum','img/IMG-20210121-WA0008.jpg');
new ProductImages ('chair','img/IMG-20210121-WA0008.jpg');
new ProductImages ('cthulhu','img/IMG-20210121-WA0012.jpg');
new ProductImages ('dog-duck','img/IMG-20210121-WA0014jpg');
new ProductImages ('dragon','img/IMG-20210121-WA0015.jpg');
new ProductImages ('pen','img/IMG-20210121-WA0017.jpg');
new ProductImages ('pet-sweep','img/IMG-20210121-WA0019.jpg');
new ProductImages ('scissors','img/received_416315939584694.jpeg');
new ProductImages ('shark','img/received_452669842427677.jpeg');
new ProductImages ('sweep','img/received_773367609930586.jpeg');
new ProductImages ('tauntaun','img/received_796334117627326.jpeg');
new ProductImages ('unicorn','img/received_1285191968502873.jpeg');
new ProductImages ('usb','img/received_2522494468052268.jpeg');
new ProductImages ('water-can','img/received_2735629860008476.jpeg');
new ProductImages ('wine-glass','img/received_2791939691134758.jpeg');

RenderThreeImages();

//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
function GenerateRandomIndex(){
    return Math.floor(Math.random()*ProductImages.allImages.length);
}

function RenderThreeImages(){
    var shownImages=[LShown,MShown,RShown];
    do {LIIndex=GenerateRandomIndex();}
    while(shownImages.includes(LIIndex));
    LShown=LIIndex;
    shownImages.push(LIIndex);
    
    do { MIIndex=GenerateRandomIndex();
        
    } while (shownImages.includes(MIIndex));
    MShown=MIIndex;
    shownImages.push(MIIndex);

    do {RIIndex=GenerateRandomIndex();
        
    } while (shownImages.includes(RIIndex));
    RShown=RIIndex;
    
   /////////////////////////////////////////////////////////////////////////////////////
    
    leftImage.src= ProductImages.allImages[LIIndex].imagePath;
    middleImage.src= ProductImages.allImages[MIIndex].imagePath;
    rightImage.src= ProductImages.allImages[RIIndex].imagePath;
    
       
}




leftImage.addEventListener('click', voting);
middleImage.addEventListener('click',voting);
rightImage.addEventListener('click',voting);

function voting(event){
    roundsCounter++;
    if (roundsCounter<=rounds) {
        if (event.target.id === 'LI' ) {
            ProductImages.allImages[LIIndex].votes++;
        } else if (event.target.id === 'MI' ) {
            ProductImages.allImages[MIIndex].votes++;}
            else{
                 
                    ProductImages.allImages[RIIndex].votes++;
            }
            ProductImages.allImages[LIIndex].timeDisplayed++;
            ProductImages.allImages[MIIndex].timeDisplayed++;
            ProductImages.allImages[RIIndex].timeDisplayed++;
            RenderThreeImages();
        
    } else {

        
        pResults= document.getElementById('PR');
        leftImage.removeEventListener('click',voting);
        middleImage.removeEventListener('click',voting);
        rightImage.removeEventListener('click',voting);

        function viewButton(event,pVotes){
            event.preventDefault();
            
            
            for (let i = 0; i < ProductImages.allImages.length; i++) {
                pVotes=document.createElement('li');
               
                pVotes.textContent=ProductImages.allImages[i].productName+' had '+ProductImages.allImages[i].votes+' votes, and was seen '+ProductImages.allImages[i].timeDisplayed+'  times. as percentage of '+Math.ceil((ProductImages.allImages[i].votes/ProductImages.allImages[i].timeDisplayed)*100) +'%' ;
                pResults.appendChild(pVotes);
                
                    
            }

            for (let i = 0; i < ProductImages.allImages.length; i++) {
                votes.push(ProductImages.allImages[i].votes);
                timeDisplayed.push(ProductImages.allImages[i].timeDisplayed);
                
            }

            // Viewing Bars //////////////////////////////////////////////////////////////////////
            var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: productNames ,
        datasets: [{
            label: 'votes',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: votes
        },{
            
            label: 'shown',
            backgroundColor: 'rgb(0, 99, 0)',
            borderColor: 'rgb(255, 99, 132)',
            data: timeDisplayed
        }]
    },

    // Configuration options go here
    options: {}
});

        }
//////////////////////////////////////////////////////////////////////////////////
        

// view event
        var resultsDiv = document.getElementById('viewResults');
  
resultsDiv.addEventListener('submit',viewButton);

    }
}


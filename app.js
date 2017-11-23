'use strict';

var allProducts = [];
var productNames = ['bag', 'boots', 'banana', 'bathroom', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb',
  'water-can', 'wine-glass'];

function Product(name) {
  this.name = name;
  this.path = 'assets/' + this.name + '.jpg';
  this.votes = 0;
  allProducts.push(this);
}

(function() {
  for(var i in productNames) {
    new Product(productNames[i]);
  }
})();

var tracker = {
  imageEl: document.getElementById('images'),
  resultsEl: document.getElementsByName('results'),
  clickCount: 0,
  imageOne: document.createElement('img'),
  imageTwo: document.createElement('img'),
  imageThree: new Image(),

  getRandomIndex: function() {
    return Math.floor(Math.random() * allProducts.length);
  },



  displayImages: function() {
    var idOne = this.getRandomIndex();
    var idTwo = this.getRandomIndex();
    var idThree = this.getRandomIndex();

    if (idOne === idTwo || idOne === idThree || idTwo === idThree) {
      this.displayImages();
      return ;
    }
    this.imageOne.src = allProducts[idOne].path;
    this.imageTwo.src = allProducts[idTwo].path;
    this.imageThree.src = allProducts[idThree].path;
    this.imageOne.id = allProducts[idOne].name;
    this.imageTwo.id = allProducts[idTwo].name;
    this.imageThree.id = allProducts[idThree].name;
    this.imageEl.appendChild(this.imageOne);
    this.imageEl.appendChild(this.imageTwo);
    this.imageEl.appendChild(this.imageThree);
  },

  onClick: function(event) {
    console.log(event.target.id);

    if (tracker.clickCount < 25){
      if(event.target.id === 'images') {
        console.log('didnt click an image');
        return;
      } else {
        tracker.clickCount++;
        for(var i in allProducts) {
          if(event.target.id === allProducts[i].name){
            allProducts[i].votes++;
          }
        }
        tracker.displayImages();
        var ctx = document.getElementById('myChart').getContext('2d');
     var options = {
       type: 'bar',
       data: {
         labels: allProducts.map(function(x) {return x.name;}),
         datasets: [{
           label: '# of Votes',
           data: allProducts.map(function(x) {return x.votes;}),
           backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(255, 159, 64, 0.2)',
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(255, 159, 64, 0.2)',
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(255, 159, 64, 0.2)',
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(255, 159, 64, 0.2)'
           ],
           borderColor: [
             'rgba(255,99,132,1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)',
             'rgba(255,99,132,1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)',
             'rgba(255,99,132,1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)',
             'rgba(255,99,132,1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)'
           ],
           borderWidth: 1
         },
         ]
       },
       options: {
         scales: {
           yAxes: [{
             ticks: {
               beginAtZero: true
             }
           }]
         }
       }
     };
     var myChart = new Chart(ctx, options);
     console.log('stuff',myChart);
     tracker.imagesEl.removeEventListener('click', tracker.onClick);

      }
    } else {
      if (tracker.clickCount === 25) {
        tracker.render();
        tracker.imageEl.removeEventListener('click', tracker.onClick);
      }
    }
  }
};
tracker.imageEl.addEventListener('click', tracker.onClick);
tracker.displayImages();

'use strict';

var allProducts = [];
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

function Product(name) {
  this.name = name;
  this.path = 'assets/' + this.name + '.jpg';
  this.clicked = 0;
  this.votes = 0;
  allProducts.push(this);
}

(function() {
  for(var i in productNames){
    new Product(productNames[i]);
  }
})();

var tracker = {
  imagesEl: document.getElementById('images'),
  resultsEl: document.getElementById('results'),
  clickCount: 0,

  imageOne: document.createElement('img'),
  imageTwo: document.createElement('img'),
  imageThree: document.createElement('img'),

  getRandomIndex: function() {
    return Math.floor(Math.random() * allProducts.length);
  },

  displayImages: function() {
    var idOne = this.getRandomIndex();
    var idTwo = this.getRandomIndex();
    var idThree = this.getRandomIndex();

    if(idOne === idTwo || idOne === idThree || idTwo === idThree) {
      this.displayImages();
      return;
    }

    this.imageOne.src = allProducts[idOne].path;
    this.imageTwo.src = allProducts[idTwo].path;
    this.imageThree.src = allProducts[idThree].path;

    this.imageOne.id = allProducts[idOne].name;
    this.imageTwo.id = allProducts[idTwo].name;
    this.imageThree.id = allProducts[idThree].name;

    this.imagesEl.appendChild(this.imageOne);
    this.imagesEl.appendChild(this.imageTwo);
    this.imagesEl.appendChild(this.imageThree);
  },

  onClick: function(event) {
    console.log(event.target.id);

    if(event.target.id === 'images') {
      console.log('didn\'t click an image');
      return;
    } else {
      tracker.clickCount++;

      for(var i in allProducts) {
        if(event.target.id === allProducts[i].name) {
          allProducts[i].votes++;
        }
      }
      tracker.displayImages();
    }
    if (tracker.clickCount === 25) {
      tracker.localStorage();
      var ctx = document.getElementById('myChart').getContext('2d');
      ctx.canvas.width = 75;
      ctx.canvas.height = 25;
      var optionTypes = {
        type: 'bar',
        data: {
          labels: allProducts.map(function(x) {return x.name;}),
          datasets: [{
            label: '# of Votes',
            data: allProducts.map(function(x) {return x.votes;}),
            backgroundColor: [
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)',
              'rgba(0,0,0)'
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
      var myChart = new Chart(ctx, optionTypes);
      console.log('chart', myChart);
      tracker.imagesEl.removeEventListener('click', tracker.onClick);
    }
  },
  localStorage: function() {
    localStorage.clear();
    var encode = JSON.stringify(allProducts);
    localStorage.setItem('AllProducts',encode);
  },
  localStorageProduct: function() {
    var jr = JSON.parse(localStorage.getItem('AllProducts'));
    if (jr !== null) {
      allProducts = jr;
    }
  },
};

tracker.imagesEl.addEventListener('click', tracker.onClick);
tracker.displayImages();
tracker.localStorageProduct();

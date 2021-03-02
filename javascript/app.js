'use strict';

let busArray = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass'
];
let arr = [30 ,50,60];
const productType = document.getElementById( 'productType' );
const leftImage = document.getElementById( 'leftImage' );
const centerImage = document.getElementById( 'centerImage' );
const rightImage = document.getElementById( 'rightImage' );

let leftBusIndex = 0;
let centerBusIndex = 0;
let rightBusIndex = 0;
const clickCounter = 25;

function Bus( name ) {
  this.name = name;
  this.image = `./img11/${name}.jpg`;
  this.clicks = 0;
  this.shown = 0;
  Bus.all.push( this );
}

Bus.all = [];
Bus.counter = 0;

for ( let i = 0; i < busArray.length; i++ ) {
  new Bus( busArray[i] );
}
//30 , 50, 60
function renderNewBus() {
  let leftIndex;
  do
  {
    leftIndex = randomNumber( 0, Bus.all.length - 1 );
  }
  while( ( leftIndex === arr[0] || leftIndex === arr[1] || leftIndex === arr[2] ) );
  leftImage.src = Bus.all[leftIndex].image;
  leftImage.alt = Bus.all[leftIndex].name;
  leftBusIndex = leftIndex;

  let centerIndex;
  do {
    centerIndex = randomNumber( 0, Bus.all.length - 1 );
  } while ( centerIndex === leftIndex || centerIndex === arr[0] || centerIndex === arr[1] || centerIndex === arr[2] );
  centerImage.src = Bus.all[centerIndex].image;
  centerImage.alt = Bus.all[centerIndex].name;
  centerBusIndex = centerIndex;


  let rightIndex;
  do {
    rightIndex = randomNumber( 0, Bus.all.length - 1 );
  } while ( rightIndex === leftIndex || rightIndex === centerIndex || rightIndex === arr[0] || rightIndex === arr[1] || rightIndex === arr[2] );

  rightImage.src = Bus.all[rightIndex].image;
  rightImage.alt = Bus.all[rightIndex].name;
  rightBusIndex = rightIndex;



  Bus.all[leftIndex].shown++;
  Bus.all[centerIndex].shown++;
  Bus.all[rightIndex].shown++;

  arr [0] = leftIndex;
  arr [1] = rightIndex;
  arr [2] = centerIndex;

}
function handelClick( event ) {

  if ( Bus.counter < clickCounter ) {
    const clickedElement = event.target;
    if ( clickedElement.id === 'leftImage' || clickedElement.id === 'rightImage' || clickedElement.id === 'centerImage' ) {
      if ( clickedElement.id === 'leftImage' ) {
        Bus.all[leftBusIndex].clicks++;
      }
      if ( clickedElement.id === 'centerImage' ) {
        Bus.all[centerBusIndex].clicks++;
      }
      if ( clickedElement.id === 'rightImage' ) {
        Bus.all[rightBusIndex].clicks++;
      }
      Bus.counter++;
      renderNewBus();

      console.log( Bus.all );
    }

  }
}

productType.addEventListener( 'click', handelClick );
function getResult() {
  const parentElement = document.getElementById( 'list' );
  const ulElement = document.createElement( 'ul' );
  parentElement.appendChild( ulElement );
  for ( let i = 0; i < busArray.length; i++ ) {
    const liElement = document.createElement( 'li' );
    ulElement.appendChild( liElement );
    liElement.textContent = `image ${Bus.all[i].name} it's had a ${Bus.all[i].clicks} clicks, and was seen ${Bus.all[i].shown}  times.`;

  }
}
console.log( getResult );
function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

renderNewBus();
const chart = document.getElementById( 'chart' );
chart.addEventListener( 'click', renderChart );


function renderChart() {

  let nameArray = [];
  let clicksArray = [];
  let showArray = [];
  localStorage.setItem( 'orders', JSON.stringify( Bus.all ) );
  for ( let i = 0; i < Bus.all.length; i++ ) {
    nameArray.push( Bus.all[i].name );
    clicksArray.push( Bus.all[i].clicks );
    showArray.push( Bus.all[i].shown );

  }
  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  new Chart( ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [
        {
          label: '# of Votes',
          data: clicksArray,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 3
        }

        ,
        {
          label: '# of show',
          data: showArray,
          backgroundColor: 'gray',
          borderColor: 'pink',
          borderWidth: 2
        }
      ],
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
  } );
}

function getData() {
  const data = localStorage.getItem( 'orders' );
  if( data ) {
    const objData = JSON.parse( data );
    Bus.all = objData;
    renderChart();
  }
}

chart.addEventListener( 'submit', Bus );
getData();

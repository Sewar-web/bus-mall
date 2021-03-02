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
const productType = document.getElementById( 'productType' );
const leftImage = document.getElementById( 'leftImage' );
const centerImage = document.getElementById( 'centerImage' );
const rightImage = document.getElementById( 'rightImage' );

let leftBusIndex = 0;
let centerBusIndex = 0;
let rightBusIndex = 0;
const clickCounter = 25 ;

function Bus( name ) {
  this.name = name;
  this.image = `./img11/${name}.jpg`;
  this.clicks = 0;
  this.shown = 0;
  Bus.all.push( this );
}

Bus.all = [];
Bus.counter = 0;

for( let i = 0; i < busArray.length; i++ ) {
  new Bus( busArray[i] );
}

function renderNewBus() {
  let leftIndex = randomNumber( 0, Bus.all.length - 1 );
  leftImage.src = Bus.all[leftIndex].image;
  leftImage.alt = Bus.all[leftIndex].name;
  leftBusIndex = leftIndex;

  let centerIndex = randomNumber( 0, Bus.all.length - 1 );
  centerImage.src = Bus.all[centerIndex].image;
  centerImage.alt = Bus.all[centerIndex].name;
  centerBusIndex = centerIndex;

  let rightIndex;
  do {
    rightIndex = randomNumber( 0, Bus.all.length - 1 );
  } while( rightIndex === leftIndex || rightIndex === centerIndex );

  rightImage.src = Bus.all[rightIndex].image;
  rightImage.alt = Bus.all[rightIndex].name;
  rightBusIndex = rightIndex;



  Bus.all[leftIndex].shown++;
  Bus.all[centerIndex].shown++;
  Bus.all[rightIndex].shown++;
  console.log( leftIndex , centerIndex , rightIndex );

}

function handelClick( event ) {

  if( Bus.counter < clickCounter ) {
    const clickedElement = event.target;
    if( clickedElement.id === 'leftImage' || clickedElement.id === 'rightImage' || clickedElement.id === 'centerImage' ) {
      if( clickedElement.id === 'leftImage' ) {
        Bus.all[leftBusIndex].clicks++;
      }
      if( clickedElement.id === 'centerImage' ) {
        Bus.all[centerBusIndex].clicks++;
      }
      if( clickedElement.id === 'rightImage' ) {
        Bus.all[rightBusIndex].clicks++;
      }

      Bus.counter++;
      renderNewBus();

      console.log( Bus.all );
    }
  }
}

productType.addEventListener ( 'click', handelClick );

function getResult() {
  const parentElement = document.getElementById( 'list' );
  const ulElement = document.createElement( 'ul' );
  parentElement.appendChild( ulElement );
  for ( let i = 0; i < busArray.length; i++ ){
    const liElement = document.createElement( 'li' );
    ulElement.appendChild( liElement );
    liElement.textContent = `image ${Bus.all[i].name} it's had a ${Bus.all[i].clicks} clicks, and was seen ${Bus.all[i].shown}  times.`;
  }

}
function remove() {
  document.getElementById( 'productType' ).removeEventListener( 'click', handelClick );
}

function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
// function remove() {
//   document.getElementById( 'productType' ).removeEventListener( 'click', handelClick );
// }
renderNewBus();

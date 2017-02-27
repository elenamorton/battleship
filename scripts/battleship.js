window.onload = function() {
  var fireButton = document.getElementById("fireButton");
  //var guessInput = document.getElementById("guessInput");

  console.log(model.numShips, view, controller.guesses);
  model.generateShipLocations();

  fireButton.onclick = function() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value; 
    controller.processGuess(guess);
    guessInput.value = "";
  };

  guessInput.onkeypress = function(e) {
    if (e.keyCode === 13) {
      fireButton.click();
      return false;
    }
  };
  
};




var view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
    
  },
  
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  
  },
  
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");

  }

};

var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipSunk: 0,
  
 /* ships: [{locations: ["06", "16", "26"], hits:["","",""]},
          {locations: ["24", "34", "44"], hits:["","",""]},
          {locations: ["10", "11", "12"], hits:["","",""]}],  */
  
  ships: [{locations: [0, 0, 0], hits:["","",""]},
          {locations: [0, 0, 0], hits:["","",""]},
          {locations: [0, 0, 0], hits:["","",""]}],
  
  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);
      console.log(index);
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if (this.isSunk(ship)) {
          view.displayMessage("You've sunk my battleship!");
          this.shipSunk++;
        }
        console.log(ship);
        return true;
      }
    }
    
    view.displayMiss(guess);
    view.displayMessage("You missed!");
    console.log(ship);
    return false;
  },
  
  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },
  
  generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;
    var newShipLocations = [];
    if (direction) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
    }
    else {
      row = Math.floor(Math.random() * (this.boardSize - (this.shipLength + 1)));
      col = Math.floor(Math.random() * this.boardSize);
    }
    for (var i = 0; i < this.shipLength; i++) {
      if (direction) {
        newShipLocations.push(row + "" + (col + i));
      }
      else {
        newShipLocations.push((row + i ) + "" + col);
      }
    }
    return newShipLocations;
  },
  
  collision: function(locations) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = model.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0)  {
          return true;
        }
      }
    }
    return false;
  },
  
  generateShipLocations: function() {
    var locations;

    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      
      this.ships[i].locations = locations; 
    } 
  }
  
};

var controller = {
  guesses: 0,
  
  parseGuess: function(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null  || guess.length !== 2) {
      alert("Oops! Please enter a letter and a number on the board!");
    }
    else {
      var firstChar = guess.charAt(0);
      var row = alphabet.indexOf(firstChar);
      var column = guess.charAt(1);
      if (isNaN(row) || isNaN(column)) {
        alert("Oops! That is not on the board!");
      }
      else if (row < 0  || row >= model.boardSize || column < 0 || column >= model.boardSize) {
        alert("Oops! that's off the board!");
      }
      else {
        return row + column;
      }
    }
    return null;
  },
  
  processGuess: function(guess) {
     var location = this.parseGuess(guess);
     if (location) {
       this.guesses++;
       var hit = model.fire(location);
       if (hit && model.shipSunk === model.numShips) {
         view.displayMessage("You sunk all my battleships in: " + this.guesses + " guesses");
       }
     }
  }
  
};




//controller.processGuess("A0");
//controller.processGuess("A6");
//controller.processGuess("B6");
//controller.processGuess("C6");

//controller.processGuess("C4");
//controller.processGuess("D4");
//controller.processGuess("E4");

//controller.processGuess("B0");
//controller.processGuess("B1");
//controller.processGuess("B2");

//console.log(controler.parseGuess("A0"));
//console.log(controler.parseGuess("B6"));
//console.log(controler.parseGuess("G3"));
//console.log(controler.parseGuess("H0"));
//console.log(controler.parseGuess("A"));
//console.log(controler.parseGuess("A7"));
//model.fire("06");
//model.fire("53");
//model.fire("16");
//model.fire("34");
//model.fire("12");
//model.fire("26");
//model.fire("64");
//model.fire("46");
//model.fire("23");


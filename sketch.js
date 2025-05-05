//can't figure out fill color, slider, select tool

let myData;
let calorieSlider;
let favoriteSelect;

let color1;
let color2;

function preload() {
  myData = loadJSON("drink.json");
}

function setup() {
  createCanvas(1800, 1000);
  myData = myData.data;

  color1 = color(229, 237, 190);
  color2 = color(187, 234, 240);

  calorieSlider = createSlider(0, 260, 0, 10);
  calorieSlider.position(100, 220);
  calorieSlider.style("width", "200px");

  favoriteSelect = createSelect();
  favoriteSelect.position(100, 320);
  favoriteSelect.option("All");
  favoriteSelect.option("Like");
  favoriteSelect.option("Dislike");
}

function draw() {
  background(255);

  let filterData;
  let selectedFavorite = favoriteSelect.selected();
  let filteredData = [];

  for (let i = 0; i < myData.length; i++) {
    let item = myData[i];
    let favoriteMatch = false;
    let calorieMatch = false
    
    // check favorite
    if (selectedFavorite === "All") {
      favoriteMatch = true;
    } else if (item.Favorite === selectedFavorite) {
      favoriteMatch = true;
    }
    // check calorie
    if (item.Calories >= calorieSlider.value()) {
      calorieMatch = true
    }
    if (favoriteMatch && calorieMatch) {
        filteredData.push(item);
    }  
    
  
    
  }
   
  
  
  for (let i = 0; i < filteredData.length; i++) {
    let x = (i + 1) * 220;
    let y = height / 2;
    let item = filteredData[i]
    let carb = item.Carb;
    let petalCount = item.Protein;
    let fat = item.Fat;
    let sodium = item.Sodium;
    let drink_name = item.Drink;
    let calories = item.Calories;
    let favorite = item.favorite;

    drawFlower(x, y, petalCount, carb, sodium, fat, drink_name, favorite);

  }
  
  textSize(14);
    textFont("Courier New");
    text("Select Caroline's Favorites", 100, 300);

    textSize(14);
    textFont("Courier New");
    text(`Calorie Scale: ${calorieSlider.value()}`, 100, 200);

    textSize(14);
    textFont("Courier New");
    text("Visualization Key", 490, 210);

    rect(490, 220, 400, 100);

    push()
    textSize(14);
    textFont("Courier New");
    fill("#00ACC1");
    text("High Sodium", 500, 250);
    pop()

    push()
    textSize(14);
    textFont("Courier New");
    fill("#8BB160")
    text("Medium Sodium", 500, 275);
    pop()

    push()
    textSize(14);
    textFont("Courier New");
    fill("#A0D3A2")
    text("Low Sodium", 500, 300);
    pop()

    textSize(14);
    textFont("Courier New");
    text("Petal # = Protein", 625, 250);

    textSize(14);
    textFont("Courier New");
    text("More Filled Center = More Carb", 625, 275);

    textSize(14);
    textFont("Courier New");
    text("Lighter Outline = More Fat", 625, 300);
}

function drawFlower(x, y, petalCount, carb, sodium, fat, drink_name, favorite, calories_slider) {
  push();
  translate(x, y);
  let distance = dist(mouseX, mouseY, x, y);

  // draw petals
  for (let i = 0; i < petalCount; i++) {
    push();
    rotate((TWO_PI / petalCount) * i); // use when using RADIUS mode

    let sodiumColor = lerpColor(color1, color2, fat / 9);
    fill(sodiumColor);
    let fatWeight = map(fat, 13, 34, 1, 5);
    strokeWeight(fatWeight);
    ellipse(60, 0, 50, 50);

    pop();
  }

  //draw flower center
  let middle_color = color(240, 236, 187);
  let transparency = map(carb, 13, 34, 100, 255);
  middle_color.setAlpha(transparency);
  strokeWeight(0.3);
  fill(middle_color);
  circle(0, 0, 80);
  // draw smiles
  if (favoriteSelect.selected() === "Like") {
    strokeWeight(2);
    circle(-10, -10, 5)
    circle(10, -10, 5)
    noFill()
    arc(0, 0, 30, 30, 0, PI);
  } else if (favoriteSelect.selected() === "Dislike") {
    strokeWeight(2);
    circle(-10, -10, 5)
    circle(10, -10, 5)
    noFill()
    arc(0, 15, 30, 30, PI, 0);
  }
  pop();
  
  //draw smiles
  
  
  
  
  //names
  push();
  if (distance < 30) {
    fill(0);
    textSize(14);
    textFont("Courier New");
    noStroke();
    textAlign(CENTER, CENTER);
    text(
      `${drink_name}
       Protein: ${petalCount}(g)
       Fat: ${fat}(g)
       Carb: ${carb}(g)
       Sodium: ${sodium}(g)`,
      x + 0,
      y + 105
    );
  }

  pop();
}

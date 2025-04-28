let json = null;
let textY = 10;
let slider;

function preload() {
  json = loadJSON("drinks.json");
}

function setup() {
  createCanvas(400, 400);
  json = Object.values(json);
  
  slider = createSlider(0, 260);
  slider.position(10, 10);
  slider.size(80);
}

function filterName(obj){
  
  let filtered = slider.value();
  console.log(filtered)
  
  if (obj.Calories > filtered){
    return true;
   } else {
     return false;
   }
  }


function draw() {
  let textY = 100;
  
  let filtered = json.filter(filterName);
  
  background(220);
  for (let i = 0; i < filtered.length; i = i + 1){
    text(filtered[i].Name, 100, textY);
    textY += 12; 
  }    
}







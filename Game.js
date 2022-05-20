class Game {
  constructor() {
    this.doors = new Array(3);
    this.winningDoor = null;
    this.switchButton = select("#switch");
    this.stayButton = select("#stay");
    this.playAgain = select("#playAgain");
    
    for (let i=0; i<3; i++) this.doors[i] = new Door(i);    
    this.switchButton.mousePressed(()=>{this.result(this.switchButton)});
    this.stayButton.mousePressed(()=>{this.result(this.stayButton)});
    this.playAgain.mousePressed(()=>{this.reset()});
    this.reset();
  }
  
  reset() {
    state = "PICK";
    mode = "";
    neutron.html("Pick a Door");
    
    this.doors.forEach(door=>{door.reset()});
    this.winningDoor = floor(random(3));
    this.doors[this.winningDoor].setPrize();
  }
  
  reveal() {
    let newPick = [];
    this.doors.forEach(door=>{
      if (door.index!=this.winningDoor && door.picked==false) {
        newPick.push(door);
      }
    });
    newPick = random(newPick);
    this.doors[newPick.index].revealed = true;
    this.doors[newPick.index].open();
  }
  
  result(button) {
    let res="LOSE";
    if (button.elt.innerText=='SWITCH') {
      this.doors.forEach(door=>{
        if (door.revealed==false && door.picked==false) {
          door.backDoor.style('box-shadow', '0 0 0 0.7vw gold');
          if (window.matchMedia('(max-device-width: 600px)').matches) {door.backDoor.style('box-shadow', '0 0 0 1.5vw gold');}
          if (door.prize == '🚂') {
            res="WIN";
            door.backDoor.style('background-color', 'green');
            updateTable(1,1);
          } else{
            res="LOSE";
            door.backDoor.style('background-color', 'red');
            updateTable(1,0);
          }
        }
        if (door.picked==true) {
          door.backDoor.style('box-shadow', 'none');
        }
      });
    } else {
      this.doors.forEach(door=>{
        if (door.index==this.winningDoor && door.picked==true) {
          res="WIN";
          door.backDoor.style('background-color', 'green');
          updateTable(0,1);
        } else if (door.index!=this.winningDoor && door.picked==true) {
          res="LOSE";
          door.backDoor.style('background-color', 'red');
          updateTable(0,0);
        }
      });
    }
    
    this.doors.forEach(door=>{
      if (door.revealed==false)
      door.open();
    });
    if (res=="WIN")
      neutron.html('<div style="background:green">You WIN</div>');
    else
      neutron.html('<div style="background:red">You LOSE</div>');
    state = "RESULT";
  }
}
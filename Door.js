let state;
let mode;
let proton;
let electron;
let neutron;
let muon;
let quark;
let photon;
let game;
let totalSwitch=0;
let totalStay=0;
let totalSwitchWins=0;
let totalStayWins=0;
let sliding;

class Door {
  constructor(id) {
    this.frontDoor = select("#door"+id);
    this.backDoor = select("#backDoor"+id);
    this.prizeText = select("#prize"+id);
    this.index = id;

    this.reset();
    this.frontDoor.mousePressed(() => {this.pick()});
  }
  
  reset() {
    this.frontDoor.removeClass("doorOpen");
    this.backDoor.style('background-color', 'grey');
    this.backDoor.style('box-shadow', 'none');
    this.prizeText.html(' ');
    this.prize = '🐐';
    this.picked = false;
    this.revealed = false;
  }
  
  pick() {
    if (state == "PICK") {
      this.picked = true;
      this.backDoor.style('box-shadow', '0 0 0 0.7vw gold');
      if (window.matchMedia('(max-device-width: 600px)').matches) {this.backDoor.style('box-shadow', '0 0 0 1.5vw gold');}
      state = "SWITCH";
      game.reveal();
    }
  }
  
  setPrize() {
    this.prize = '🚂';
  }
  
  open() {
    this.frontDoor.addClass("doorOpen");
    this.prizeText.html(this.prize);
  }
}
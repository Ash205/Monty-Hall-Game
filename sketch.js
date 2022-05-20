function setup() {
  noCanvas();
  
  sliding = createSlider(10,1000,100,10);
  sliding.parent(select(".sliding"));
  
  select("#combined").style('display', 'flex');
  neutron = select('.neutron');
  proton = select('.proton');
  electron = select('.electron');
  muon = select('.muon');
  quark = select('.quark');
  
  select('#resetTable').mousePressed(()=>{updateTable();});
  
  retreiveTable();
  
  game = new Game();
}

function draw() {
  switch (state) {
    case "PICK":
      neutron.show();
      proton.hide();
      electron.hide();
      muon.hide();
      neutron.style('display', 'flex');
      break;
    case "SWITCH":
      neutron.hide();
      proton.show();
      electron.hide();
      muon.hide();
      proton.style('display', 'flex');
      break;
    case "RESULT":
      neutron.show();
      proton.hide();
      electron.show();
      muon.show();
      neutron.style('display', 'flex');
      electron.style('display', 'flex');
      muon.style('display', 'flex');
      break;
  }
  
  if (mode=="RUN") {
    quark.hide();
    
  } else {
    quark.show();
    quark.style('display', 'flex');
  }
  
  select("#simulate-value").html(sliding.value());
}

function updateTable(sw=null, won=null) {
  if (sw==null) {
    select("#switch0").html('0');
    select("#switch1").html('0');
    select("#switch2").html('0');
    select("#stay0").html('0');
    select("#stay1").html('0');
    select("#stay2").html('0');
    
    totalSwitch=0;
    totalSwitchWins=0;
    totalStay=0;
    totalStayWins=0;
  } else if(sw==1 && won==1) {
    totalSwitch++;
    totalSwitchWins++;
    select("#switch0").html(totalSwitchWins);
    select("#switch1").html(totalSwitch);
    select("#switch2").html(nf(totalSwitchWins*100/totalSwitch,2,2));
  } else if(sw==1 && won==0) {
    totalSwitch++;
    select("#switch0").html(totalSwitchWins);
    select("#switch1").html(totalSwitch);
    select("#switch2").html(nf(totalSwitchWins*100/totalSwitch,2,2));
  } else if(sw==0 && won==1) {
    totalStay++;
    totalStayWins++;
    select("#stay0").html(totalStayWins);
    select("#stay1").html(totalStay);
    select("#stay2").html(nf(totalStayWins*100/totalStay,2,2));
  } else if(sw==0 && won==0){
    totalStay++;
    select("#stay0").html(totalStayWins);
    select("#stay1").html(totalStay);
    select("#stay2").html(nf(totalStayWins*100/totalStay,2,2));
  }
  
  let resultTable = {
    swa: totalSwitch,
    swb: totalSwitchWins,
    sta: totalStay,
    stb: totalStayWins
  }
  storeItem('resultTable', resultTable);
  if(sw==null) clearStorage();
}

function Scroll() {
  $("html, body").animate({ scrollTop: $("#results").offset().top }, 100);
}

function ScrollTop(){
  $("html, body").animate({ scrollTop: $("#play").offset().top },1);
}

async function Go() {
  
  if ((state == "PICK"||state=="RESULT")&& mode!="RUN") {
    mode = "RUN";
    ScrollTop();
    await SLEEP(1000);
    let n = sliding.value();
    for (let i=0; i<n; i++) {
      if (mode!="STOP") {
        game.reset();
        random(game.doors).pick();
        await SLEEP(100);
        if (i%2) {
          game.result(game.switchButton);
        } else {
          game.result(game.stayButton);
        }      
        await SLEEP(100);
      }
    }
    mode = "STOP";
    game.reset();
    Scroll();
    
  }
}

function Sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function SLEEP(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Stop() {
  mode = "STOP";
}

function retreiveTable() {
  let resultTable = getItem('resultTable');
  if (resultTable!=null) {
    totalSwitch=resultTable.swa;
    totalSwitchWins=resultTable.swb;
    totalStay=resultTable.sta;
    totalStayWins=resultTable.stb;
    
    if (totalSwitch!=0){
      select("#switch0").html(totalSwitchWins);
      select("#switch1").html(totalSwitch);
      select("#switch2").html(nf(totalSwitchWins*100/totalSwitch,2,2));
    }
    if (totalStay!=0){
      select("#stay0").html(totalStayWins);
      select("#stay1").html(totalStay);
      select("#stay2").html(nf(totalStayWins*100/totalStay,2,2));
    }
  }
}

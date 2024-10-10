// api ke js object e convert korar jonno
const milestonesData = JSON.parse(data).data;
// first er data ta hoilo pura overall data er porer data hoilo jaite vitre element ase oigula


// load course milestone data
function loadMilestones(){
  const milestones = document.querySelector('.milestones')

  milestones.innerHTML = `${milestonesData.map(function(milestone){
    return `<div class="milestone border-b" id="${milestone._id}">
            <div class="flex">
              <div class="checkbox"><input type="checkbox" onclick="markMilestone(this,${milestone._id} )" /></div>
              <div onclick="openMilestone(this, ${milestone._id})">
                <p>
                  ${milestone.name}
                  <span><i class="fas fa-chevron-down"></i></span>
                </p>
              </div>
            </div>
            <div class="hidden_panel">
              ${milestone.modules.map(function(module){
              return `<div class="module border-b">
                <p>${module.name}</p>
              </div>`;
              }).join("")};
            </div>
          </div>`;
  })
  .join("")}`;
}

// onclick function to get hidden elements
function openMilestone(milestoneElement,id){
  // to get current element
const currentPanel = milestoneElement.parentNode.nextElementSibling;


// checker er age kader moddhe active class ta ase ta get korte hobe
const active= document.querySelector(".active");
// akhon checker dite hobe
if (active && !milestoneElement.classList.contains("active")) {
  active.classList.remove("active");
}
// active button ba module  ta ke alada kore bujhar jonno
// ai line ta likhle ager moto same kahini hoi like jaite age active asilo oita inactive hoileo aitar font bold i thake . ai ta remove korar  jonno same akta checker bosaite hobe 
milestoneElement.classList.toggle("active");

// nicher je line ta likhsi oita likhle sob milestone aksathe khola thaki jai
// kintu amra cacchi jate akta milestone e click korle shudhu oi milestone er module gulai show korbe ar baki  jai milestone er module gula ase sob gula hidden thakbe. er jonno first e jara active ase ba show class ta ase tader get korte hobe. ai kaj ta amra next line e korbo.
const showPanel = document.querySelector(".show");

if(!currentPanel.classList.contains("show") && showPanel)
// ai line ta check korar jonno akta check line dite hobe naile aita mair khai jabe. karon first e to kothaw show class ta thakbe na.
showPanel.classList.remove("show"); 

// click korle jate hidden section ta show kore and abar click korle jate hidden hoi jai
currentPanel.classList.toggle("show");
// milestone er je image gula ase ta milestone e click korle show korar jonno.
showMilestone(id);
}

// show mile stones
function showMilestone(id){
  const milestoneImage = document.querySelector(".milestoneImage");
  const name = document.querySelector(".title");
  const details = document.querySelector(".details");

milestoneImage.style.opacity = "0";
  milestoneImage.src = milestonesData[id].image;
  name.innerText = milestonesData[id].name;
  details.innerText = milestonesData[id].description;
}

// listen for heron image load
const milestoneImage= document.querySelector(".milestoneImage");
milestoneImage.onload= function () {
  this.style.opacity ="1";
};
 
// jai milesotne gula sesh korsi oigula te tik mark dile jate onno jaigai jai add hoi oi jonno akta function 
function markMilestone(checkbox, id) {
  const doneList = document.querySelector(".doneList");
  const milestonesList = document.querySelector(".milestones");

  const item = document.getElementById(id);

  if (checkbox.checked) {
    // mark as done
    milestonesList.removeChild(item);
    doneList.appendChild(item)
  } else {
    // back to main list
    milestonesList.appendChild(item);
    doneList.removeChild(item);
    reload();
    // sort
    // data.data.sort((a,b) => a._id - b.id );
    // console.log(data);
    // milestonesData.sort ((a,b)=> a._id - b._id)

    function reload() {
      const elements = milestonesList.childNodes;
      const elementsArray = Array.from(elements);
  
      elementsArray.sort(function (a, b) {
        return Number(a.id) - Number(b.id);
      });
  
      elementsArray.forEach(function (element) {
        milestonesList.appendChild(element);
      });
    }
    
  }

}

loadMilestones();
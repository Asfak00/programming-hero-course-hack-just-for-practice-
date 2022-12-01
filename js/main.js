// importing data form the data.js file
const milestoneData = JSON.parse(data).data;

//creating a function for including data in moduleList
function getMilestones() {
  const milestoneList = document.getElementById("milestones");
  milestoneList.innerHTML = `${milestoneData
    .map((milestone) => {
      return ` 
      <div class="milestone border-b" id = "${milestone._id}" >
       <div class="flex">
        <div class="checkbox"><input type="checkbox" onclick = "markMilestone(this, ${
          milestone._id
        })"/></div>
          <div onclick = "toggleMilestoneToGetModule(this, ${milestone._id})">
             <p id="Milestone-name">
               ${milestone.name}
              <span><i class="fas fa-chevron-down"></i></span>
             </p>
          </div>
       </div>
      <div class="hidden-panel">
     ${milestone.modules
       .map((module) => {
         return `<div class="module border-b">
                  <p>${module.name}</p>
               </div>`;
       })
       .join("")}
    </div>
  </div>`;
    })
    .join("")}`;
}

// function for the toggle milestone and get modules in this milestone
function toggleMilestoneToGetModule(milestoneElement, id) {
  const openMilestone = milestoneElement.parentNode.nextElementSibling;
  const shownModule = document.querySelector(".show");
  const boldFont = document.querySelector(".font-bold");

  if (boldFont && !milestoneElement.classList.contains("font-bold")) {
    boldFont.classList.remove("font-bold");
  }

  milestoneElement.classList.toggle("font-bold");

  if (!openMilestone.classList.contains("show") && shownModule) {
    shownModule.classList.remove("show");
  }

  openMilestone.classList.toggle("show");

  milestoneImage(id);
}

function milestoneImage(id) {
  const moduleImage = document.getElementById("milestoneImage");
  const title = document.getElementById("title");
  const details = document.getElementById("details");

  moduleImage.style.opacity = "0";
  moduleImage.src = milestoneData[id].image;
  title.innerText = milestoneData[id].name;
  details.innerText = milestoneData[id].description;
}

// milestone image adding event listener for know when load image
const moduleImage = document.querySelector(".milestoneImage");
moduleImage.onload = function () {
  this.style.opacity = "1";
};

// this function working on checked item add to doneList and unchecked item return to milestoneList
function markMilestone(checkedItem, id) {
  let doneList = document.getElementById("doneList");
  const milestoneList = document.getElementById("milestones");
  const completeText = document.querySelector(".completed-milestone");
  const doneItem = document.getElementById(id);

  if (checkedItem.checked) {
    milestoneList.removeChild(doneItem);
    doneList.appendChild(doneItem);
    doneList.style.display = "block";
    completeText.style.display = "block";
  } else {
    doneList.removeChild(doneItem);
    milestoneList.appendChild(doneItem);
    if (!doneList.innerHTML) {
      doneList.style.display = "none";
      completeText.style.display = "none";
    }

    // sorting element
    const divs = document.querySelectorAll(".milestones .milestone");

    listItems = [];

    divs.forEach((div) => listItems.push(div));
    listItems.sort((a, b) => a.id - b.id);
    listItems.forEach((item) => milestoneList.appendChild(item));
  }
}

getMilestones();

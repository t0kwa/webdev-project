// Get all draggable elements
var draggables = document.querySelectorAll(".draggable");

// Add event listeners for dragstart event to all draggable elements
draggables.forEach(function(draggable) {
  draggable.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
  });
});

// Get all drop zone elements
var dropZones = document.querySelectorAll(".dropzone");

// Prevent default behavior on dragover event for all drop zones
dropZones.forEach(function(dropZone) {
  dropZone.addEventListener("dragover", function(event) {
    event.preventDefault();
    const draggable = document.querySelector('.draggable')
    container.appendChild(draggable)
  });

  // Add event listeners for dragenter and dragleave events
  dropZone.addEventListener("dragenter", function(event) {
    event.target.style.background = "#4dacc4";
  });

  dropZone.addEventListener("dragleave", function(event) {
    event.target.style.background = "";
  });

  // Add event listener for drop event
  dropZone.addEventListener("drop", function(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    
    // Check if the drop event occurs within the boundaries of the drop zone
    var rect = event.target.getBoundingClientRect();
    var offsetX = event.clientX - rect.left;
    var offsetY = event.clientY - rect.top;
    
    if (offsetX >= 0 && offsetX <= rect.width && offsetY >= 0 && offsetY <= rect.height) {
      event.target.appendChild(draggedElement);
    }
    
    event.target.style.background = "";
  });
});



document.querySelector("#close").addEventListener
("click", function(){
  document.querySelector(".popup").style.display="none";
})


document.addEventListener('DOMContentLoaded', () => {
    const draggableElements = document.querySelectorAll('.draggable');
    const dropZones = document.querySelectorAll('.dropzone');
    const submitButton = document.getElementById('submit');
    const charDropZone = document.getElementById('dropZone2');
    const intDropZone = document.getElementById('dropZone3');

    draggableElements.forEach(elem => {
        elem.addEventListener('dragstart', handleDragStart);
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
    });

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (checkAnswers()) {
            window.location.href = 'congrats.html';
        } else {
            window.location.href = 'wrong.html';
        }
    });

    function handleDragStart(event) {
        event.dataTransfer.setData('text', event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text');
        const draggedElement = document.getElementById(data);
        if (event.target.classList.contains('dropzone')) {
            event.target.appendChild(draggedElement);
        }
    }

    function checkAnswers() {
        const intElements = intDropZone.querySelectorAll('.draggable');
        const charElements = charDropZone.querySelectorAll('.draggable');
        
        let correct = true;
        
        intElements.forEach(elem => {
            const imgSrc = elem.querySelector('img').src;
            if (!imgSrc.includes('num')) {
                correct = false;
            }
        });

        charElements.forEach(elem => {
            const imgSrc = elem.querySelector('img').src;
            if (!imgSrc.includes('A') && !imgSrc.includes('B') && !imgSrc.includes('C') && !imgSrc.includes('D') && !imgSrc.includes('E')) {
                correct = false;
            }
        });

        return correct;
    }
});


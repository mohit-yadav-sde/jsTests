(function() {
  'use strict';
  
  const Timetable = function(containerId, days, hours) {
    this.container = document.getElementById(containerId);
    this.days = days;
    this.hours = hours;
    this.selectedSlots = new Map();
    this.init();
  };
  
  Timetable.prototype = {
    init: function() {
      this.renderTable();
      this.setupInteractivity();
    },
    
    renderTable: function() {
      // Logic to render the timetable table
      let tableHTML = '<thead><tr><th>Time</th>' + this.days.map(day => `<th>${day}</th>`).join('') + '</tr></thead><tbody>';
      for (let hour of this.hours) {
        tableHTML += `<tr><td>${hour}</td>${this.days.map(day => `<td class="time-slot" data-day="${day}" data-hour="${hour}"></td>`).join('')}</tr>`;
      }
      tableHTML += '</tbody>';
      this.container.innerHTML = tableHTML;
    },
    
    setupInteractivity: function() {
      interact('.time-slot').on('tap', this.handleSlotSelection.bind(this));
    },
    
    handleSlotSelection: function(event) {
      const cell = event.target;
      cell.classList.toggle('selected');
      if (cell.classList.contains('selected')) {
        this.promptForEvent(cell);
      } else {
        this.selectedSlots.delete(cell.dataset.day + cell.dataset.hour);
      }
    },
    
    promptForEvent: function(cell) {
      const prompt = document.getElementById('slotPrompt');
      prompt.style.display = 'block';
      prompt.style.left = (cell.offsetLeft + cell.offsetWidth) + 'px';
      prompt.style.top = cell.offsetTop + 'px';
      
      const saveEvent = function() {
        const eventDetail = document.getElementById('eventDetail').value;
        this.selectedSlots.set(cell.dataset.day + cell.dataset.hour, eventDetail);
        prompt.style.display = 'none';
      }.bind(this);
      
      window.saveEvent = saveEvent; // Temporarily expose for the button click
    },
    
    // Method to get all selected slots with their events
    getSelectedEvents: function() {
      return Array.from(this.selectedSlots.entries());
    }
  };
  
  // Initialize
  window.onload = function() {
    const timetable = new Timetable('timetable', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], Array.from({length: 18}, (_, i) => `${i + 6}:00`));
  };
  
})();
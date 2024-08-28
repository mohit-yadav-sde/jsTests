// This would typically go in a separate test file with a testing framework like Jest

function testTimetable() {
  // Mock document for testing
  const mockDocument = {
    getElementById: function(id) { return {innerHTML: ''}; }
  };
  
  const testHours = ['09:00', '10:00'];
  const testDays = ['Mon', 'Tue'];
  
  const testTimetable = new Timetable('timetable', testDays, testHours);
  
  // Test if table renders correctly
  testTimetable.container = mockDocument.getElementById('timetable');
  testTimetable.renderTable();
  console.assert(testTimetable.container.innerHTML.includes('09:00'), 'Time rendering failed');
  
  // Test slot selection
  const mockEvent = {target: {classList: {toggle: () => {}, contains: () => true}, dataset: {day: 'Mon', hour: '09:00'}}};
  testTimetable.handleSlotSelection(mockEvent);
  console.assert(testTimetable.selectedSlots.has('Mon09:00'), 'Slot selection failed');
  
  console.log('Tests completed.');
}

testTimetable();
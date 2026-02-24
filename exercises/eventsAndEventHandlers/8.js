const tracker = (function() {
  let events = [];

  return {
    list() {
      return [...events];
    },

    elements() {
      return this.list().map(event => event.target);
    },

    clear() {
      events = [];
      return events.length;
    },

    add(event) {
      if (!events.includes(event)) events.push(event)
    }
  }
})();

function track(callback) {
  return function(event) {
    tracker.add(event);
    callback(event);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const divRed = document.querySelector('#red');
  const divBlue = document.querySelector('#blue');
  const divOrange = document.querySelector('#orange');
  const divGreen = document.querySelector('#green');
  
  divRed.addEventListener('click', track(event => {
    document.body.style.background = 'red';
  }));
  
  divBlue.addEventListener('click', track(event => {
    event.stopPropagation();
    document.body.style.background = 'blue';
  }));
  
  divOrange.addEventListener('click', track(event => {
    document.body.style.background = 'orange';
  }));
  
  divGreen.addEventListener('click', track(event => {
    document.body.style.background = 'green';
  }));
});

// To be run after clicking blue, red, orange, green divs
function myTests() {
  console.log(tracker.list().length === 4); // 4
  console.log(tracker.elements()); // [div#blue, div#red, div#orange, div#green]
  console.log(tracker.elements()[0] === document.querySelector('#blue')); // true
  console.log(tracker.elements()[3] === document.querySelector('#green')); // true
  console.log(tracker.list()[0]); // PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}
  console.log(tracker.clear() === 0); // true
  console.log(tracker.list().length === 0); // true
  tracker.list()[0] = 'abc';
  console.log(tracker.list().length === 0); // true
}

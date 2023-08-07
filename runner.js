const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE1Zjg3NTZjLTMzNjMtNDBjZS04NzEwLTkxY2ZjZDYyZjFmNy0xNjkxNDQ0MDI0OTUwIiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiOWU0MTdhNmItMGQ5My00Y2U0LWFjNWMtZTNjZGFlODgyMDU5IiwidHlwZSI6InQifQ.ae5e3ZZl9JhggKQmQ0MvW0uNNXhdx76C3Fy3504F4OQ'

cypress.run({
  // specs to run here
})
.then((results) => {
  const args = {
    target: TOKEN,
  }
  tesults.results(results, args);
})
.catch((err) => {
 console.error(err)
})

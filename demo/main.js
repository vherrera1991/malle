/**
 * This file is part of the "malle" library
 * Copyright 2021 Nicolas CARPi @ Deltablot
 * License MIT
 * https://github.com/deltablot/malle
 */

import { Action, InputType, Malle } from '../dist/main.js';

// this is the user function that will process the new value
// typically this will POST to some endpoint and get some json back
// it receives the event
const myCustomFunction = (value, orig) => {
  console.log(`New text: ${value}`);
  // do something with that value, like POSTing it somewhere
  return value;
};

// minimal options
new Malle({
  formClasses: ['d-inline'],
  listenOn: '#minimal',
  fun: myCustomFunction,
// because listenNow is set to false by default, we need to explicitely call listen
}).listen();

// all options changed from default
const malle = new Malle({
  before: (original, event) => {
    console.log('Executed before going into edit mode');
    console.log(original);
    console.log(event);
    return true;
  },
  cancel: 'Cancel',
  cancelClasses: ['btn', 'btn-danger'],
  formClasses: ['col-md-12'],
  inputClasses: ['form-control', 'mb-2'],
  debug: true,
  //event: 'mouseenter',
  fun: myCustomFunction,
  inputType: InputType.Textarea,
  listenNow: true,
  listenOn: '.malleableTextarea',
  onBlur: Action.Ignore,
  submit: 'OK',
  submitClasses: ['btn', 'btn-primary'],
  tooltip: 'Click this to edit',
});

// this has no listenOn option so it will listen on all data-malleable='true' elements
new Malle({
  fun: value => {
    return value;
  },
  formClasses: ['d-inline-flex'],
  listenNow: true,
  onBlur: Action.Ignore,
});

new Malle({
  fun: value => {
    return value;
  },
  inputType: InputType.Select,
  selectOptions: [
    { value: '1', text: 'France' },
    { value: '2', text: 'La gaulle' },
    { value: '3', text: 'Royaume de France', selected: true },
    { value: '4', text: 'Empire français' },
  ],
  formClasses: ['d-inline-flex'],
  listenNow: true,
  listenOn: '.malleableSelect',
});

$(function() {

// default instrument is synthesizer
let instrument = 'synthesizer'

let baseNote = '4n'

let gridBeats = 16

let octaveRange = {
  min: 0,
  max: 8
}

let notePositions = []

// SET UP SYNTHESIZER

const synthesizer = new Tone.PolySynth(4, Tone.MonoSynth, {
  oscillator: {
      type: "sine4"
  },
  envelope: {
    attack: .2,
    decay: .5,
    sustain: .5,
    release: 1
  },
  volume: -30
}).toMaster()

$('#instrument-selector').on('change', () => {
  instrument = $('#instrument-selector option:selected').attr('value')
})

let synth = synthesizer

function setInstrument() {
  switch (instrument) {
    case 'synthesizer':
      synth = synthesizer
      break;
  }
}

let song = {}

// SET UP NOTE GRID

function makeNoteGrid() {
  let noteSequence = ['B', 'A', 'G', 'F', 'E', 'D', 'C']

  // add notes (rows)
  for (let oct = octaveRange.max; oct >= octaveRange.min; oct--) {
    // create div for each octave
    $('<div>', {'class': `octave ${oct}`})
      .appendTo('#noteGrid')

    // append note rows with label for each note
    noteSequence.forEach( function(note, index) {
      $(`<div class='noteRow ${note}${oct}'>
          <div class="noteName">${note}${oct}</div>
        </div>`)
        .appendTo(`.octave.${oct}`)
    });
  }

  // add positions to each note (columns)
  for (var x = 1; x <= gridBeats; x++) {
      notePositions.push(`p${x}`)
    if (x % 4 == 0) {
      $('<div>', {'class': `position p${x} bar`})
        .appendTo(`.noteRow`)
    } else {
      $('<div>', {'class': `position p${x}`})
        .appendTo(`.noteRow`)
    }
  }
  initSongPositions(notePositions)
}

// INITIALIZE

makeNoteGrid()

// scroll down note grid to hide rarely used upper range
$('#noteGrid').scrollTop(550)

scheduler = {
  triggerNote: (note, duration, time) => {
    Tone.Transport.schedule((time) => {
      synth.triggerAttackRelease(note, duration, time)

    }, time)
  },
  triggerHighlight: () => {

  }
}

for (let n = 1; n <= gridBeats; n++) {
  scheduler.(`${n} * ${baseNote}`)
}

function scheduleNotes() {
  Tone.Transport.cancel()
  let positions = Object.values(song)
  positions.forEach((notesAtPos, index) => {
    for (n in notesAtPos) {
      let note = n
      let duration = notesAtPos[n]
      let time = `${(index + 1)} * ${baseNote}`
      scheduler.triggerNote(note, duration, time)
    }
  });
}

scheduleNotes()

function initSongPositions(positions) {
  positions.forEach( function(position, index) {
    song[position] = {}
  })
}


// helper functions

function getValueFromClass(target, value, parent = false) {
  let valueClass = $(target).attr('class')
  if (parent) valueClass = $(target).parent().attr('class')
  switch (value) {
    case 'noteRow':
      return /noteRow\s(\w\d+)/.exec(valueClass)[1]
      break;
    case 'position':
      return /position\s\w(\d+)/.exec(valueClass)[1]
      break;
    case 'duration':
      return /dur(\d+)/.exec(valueClass)[1]
  }
}

function getValueFromParentClass(target, value) {
  return getValueFromClass(target, value, true)
}


$('.position').mousedown( e => {
  if ( $(e.target).hasClass('note') ) {
    changeNote(e)
  } else {
    startNote(e)
  }
})

function startNote(e) {
  let noteValue = getValueFromParentClass(e.target, 'noteRow')
  let note = e.target
  let duration = '8n'
  let time = Tone.now()

  // play note
  synth.triggerAttackRelease(noteValue, duration, time)

  // set class
  $(note).addClass('note start')
  trackNoteDuration(e, noteValue)
}

function changeNote(e) {
  note = e.target
  deleteNote(note, e)
}

function trackNoteDuration(e, noteValue) {
  let noteStart = e.target
  let noteStartPos = getValueFromClass(e.target, 'position')
  let sameRow = true
  let holding = true
  let noteEndPos = noteStartPos

  function endTrackNoteDuration(e) {
    holding = false
    noteEndPos = getValueFromClass(e.target, 'position')
    let noteDuration = `${(noteEndPos - noteStartPos) + 1}*${baseNote}`
    $(noteStart).addClass(`dur${noteDuration}`)
    // if (noteDuration == 1)
    $(`.${noteValue} > .position.p${noteEndPos}`).addClass('end')
    saveNote(noteValue, noteStartPos, noteDuration)
  }

  $('.position')
    .mouseover( e => {
      // check if same row
      if (noteValue !== getValueFromParentClass(e.target, 'noteRow')) {
        sameRow = false
      } else if (holding) {
        currentPosition = getValueFromClass(e.target, 'position')
        for (let i = 1; i < currentPosition; i++) {
          if (i >= noteStartPos) {
            $(`.${noteValue} > .position.p${i + 1}`).addClass('note').removeClass('end')
            if (i + 1 == currentPosition) {
              $(`.${noteValue} > .position.p${i + 1}`).addClass('end')
            }
          }
        }
      }
    })
    .mouseup( e => {
      endTrackNoteDuration(e)
    })
}

function saveNote(noteValue, noteStartPos, noteDuration) {
  let notePosition = `p${noteStartPos}`
  $('.position').off('mouseover mouseup')
  song[notePosition][noteValue] = noteDuration
  scheduleNotes()
}

function deleteNote(note, e) {
  let noteValue = getValueFromParentClass(note, 'noteRow')
  let noteStartPos = getValueFromClass(note, 'position')
  let noteEndPos = getValueFromClass(note, 'position')
  // find start position by looping backward
  for (let i = noteStartPos; i > 0; i--) {
    noteStartPos = $(`.${noteValue} > .position.p${i}`)
    if (noteStartPos.hasClass('start')) {
      noteStartPos = i
      break
    }
  }
  // remove note classes by looping forward until end position
  for (let i = noteStartPos; i <= gridBeats; i++) {
    let currentPos = $(`.${noteValue} > .position.p${i}`)
    currentPos.removeClass('note')
    if (currentPos.hasClass('end')) {
      currentPos.removeClass('end')
      break
    }
  }
  noteStartPosName = `p${noteStartPos}`

  // for (let i = noteStartPos; i <= noteEndPos; i++) {
  //   $(`.${noteValue} > .position.p${i}`).removeClass('note')
  // }
  delete song[noteStartPosName][noteValue]
  $(note).removeClass('note start end')
}

Tone.Transport.loopEnd = '4m +0.1'
Tone.Transport.loop = true


// Playback Control Buttons

$('#clear').on('click', () => {
  $('.position').removeClass('note start end')
  initSongPositions(notePositions)
  Tone.Transport.cancel()
})

$('#play').on('click', () => {
  Tone.Transport.start('+0.1')
  $('#play').addClass('playing')
})

$('#stop').on('click', () => {
  Tone.Transport.stop()
  $('#play').removeClass('playing')
})

$('#measures').on('change', () => {

})

})
$(function() {

// default instrument is synthesizer
let selectedInstrument = $('#instrument-selector option:selected').attr('value')

let baseNote = '16n'

let gridBeats = 4

let octaveRange = {
  min: 0,
  max: 8
}

let notePositions = []

// SET UP SYNTHESIZER

let synthesizer = new Tone.PolySynth(4, Tone.MonoSynth, {
  oscillator: {
    type: "sine4"
  },
  envelope: {
    attack: 0.2,
    decay: .5,
    sustain: .5,
    release: 1
  },
  volume: -30
}).toMaster()

const drum = new Tone.MembraneSynth().toMaster()

const sampler = new Tone.Sampler({
  'C4': 'samples/kick.aif',
  'D4': 'samples/snare.aif',
  'E4': 'samples/clap.aif',
  'F4': 'samples/closedHihat.aif',
  'G4': 'samples/openHihat.aif',
  'A4': 'samples/crash.aif'
}).toMaster()

sampler.volume.value = -5

// const snare = new Tone.Player({
//   url: 'samples/snare.aif'
// }).toMaster()

// const samples = {
//   snare: newSample('snare')
//   clap: newSample('clap')
//   crash: newSample('crash')
//   openHihat: newSample('openHihat')
//   closedHihat: newSample('closedHihat')
// }

$('#instrument-selector').on('change', () => {
  selectedInstrument = $('#instrument-selector option:selected').attr('value')
})

let inst

function setInstrument() {
  switch (selectedInstrument) {
    case 'synthesizer':
      inst = synthesizer
      break;
  }
}

setInstrument()

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
      if (selectedInstrument == 'synthesizer') {
        $(`<div class='noteRow ${note}${oct}'>
            <div class="noteName">${note}${oct}</div>
          </div>`)
          .appendTo(`.octave.${oct}`)
      }
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

function triggerDrumNote(note, time) {
  sampleNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4']
  if (sampleNotes.includes(note))
    sampler.triggerAttackRelease(note, baseNote)
    // snare.triggerAttack(note, baseNote)
  else {
    drum.triggerAttackRelease(note, baseNote, time)
  }
}

function triggerNote(note, duration, time, position = null) {
  Tone.Transport.schedule((time) => {
    if (position) {
      Tone.Draw.schedule(() => {
        $position = $(`.p${position}`)
        $('.position').removeClass('highlight')
        $position.addClass('highlight')
      }, time)
    } else {
      if (selectedInstrument === 'synthesizer') {
        inst.triggerAttackRelease(note, duration, time)
      } else {
        triggerDrumNote(note, time)
      }
    }
  }, time)
}

function scheduleNotes() {
  Tone.Transport.cancel()
  for (let n = 1; n <= gridBeats; n++) {
    triggerNote('', baseNote, `${n} * ${baseNote}`, n)
  }
  let positions = Object.values(song)
  positions.forEach((notesAtPos, index) => {
    for (n in notesAtPos) {
      let note = n
      let duration = notesAtPos[n]
      let time = `${(index + 1)} * ${baseNote}`
      triggerNote(note, duration, time)
    }
  });
  console.log(song)
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
  let posClicked = e.target
  let noteValue = getValueFromParentClass(posClicked, 'noteRow')
  if ( $(posClicked).hasClass('note') ) {
    deleteNote(posClicked, noteValue)
  } else {
    startNote(posClicked, noteValue)
  }
})

function startNote(noteStart, noteValue) {
  // set class
  $(noteStart).addClass('note start')

  if (selectedInstrument === 'synthesizer') {
    // play feedback note
    inst.triggerAttackRelease(noteValue, '8n', Tone.now())
    trackNoteDuration(noteStart, noteValue)
  } else {
    // play feedback note
    triggerDrumNote(noteValue, Tone.now())
    // inst.triggerAttackRelease(noteValue, 0.1, Tone.now())
    noteEnd = noteStart
    endTrackNoteDuration(noteStart, noteEnd, noteValue)
  }
}

function endTrackNoteDuration(noteStart, noteEnd, noteValue) {
  let endPos = getValueFromClass(noteEnd, 'position')
  startPos = getValueFromClass(noteStart, 'position')
  let duration = `${(endPos - startPos) + 1}*${baseNote}`
  $(noteStart).addClass(`dur${duration}`)
  $(`.${noteValue} > .position.p${endPos}`).addClass('end')
  saveNote(startPos, noteValue, duration)
}

function trackNoteDuration(noteStart, noteValue) {
  let startPos = getValueFromClass(noteStart, 'position')
  let mouseDown = true

  $('.position')
    .mouseover( e => {
      if (mouseDown) {
        currentPosition = getValueFromClass(e.target, 'position')
        // set class to selected positions
        for (let i = 1; i < currentPosition; i++) {
          if (i >= startPos) {
            $(`.${noteValue} > .position.p${i + 1}`).addClass('note').removeClass('end')
            if (i + 1 == currentPosition) {
              $(`.${noteValue} > .position.p${i + 1}`).addClass('end')
            }
          }
        }
      }
    })
    .mouseup( e => {
      mouseDown = false
      noteEnd = e.target
      endTrackNoteDuration(noteStart, noteEnd, noteValue)
    })
}

function saveNote(startPos, noteValue, duration) {
  startPos = `p${startPos}`

  // clear mouse bindings
  $('.position').off('mouseover mouseup')

  // save note to song object
  song[startPos][noteValue] = duration

  // refresh transport
  scheduleNotes()
}

function deleteNote(posClicked, noteValue) {
  posClicked = getValueFromClass(posClicked, 'position')
  startPos = null

  // find start position by looping backward
  for (let i = posClicked; i > 0; i--) {
    $currentPos = $(`.${noteValue} > .position.p${i}`)
    if ($currentPos.hasClass('start')) {
      startPosClass = $currentPos.attr('class')
      durationString = /dur(\d+\*\d+n)/.exec(startPosClass)[1]
      $currentPos.removeClass(`start ${durationString}`)
      startPos = i
      break
    }
  }

  // remove note classes by looping forward until end position
  for (let i = startPos; i <= gridBeats; i++) {
    let currentPos = $(`.${noteValue} > .position.p${i}`)
    currentPos.removeClass('note')
    if (currentPos.hasClass('end')) {
      currentPos.removeClass('end')
      break
    }
  }

  startPos = `p${startPos}`

  delete song[startPos][noteValue]
  scheduleNotes()
}

Tone.Transport.loopEnd = `(${gridBeats} * ${baseNote})+0.01`
Tone.Transport.loop = true


// Playback Control Buttons

$('#clear').on('click', () => {
  $('.position').removeClass('note start end')
  initSongPositions(notePositions)
  scheduleNotes()
})

$('#play').on('click', () => {
  scheduleNotes()
  Tone.Transport.start()
  $('#play').addClass('playing')
})

$('#stop').on('click', () => {
  Tone.Transport.stop()
  $('.position').removeClass('highlight')
  $('#play').removeClass('playing')
})

})
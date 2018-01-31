$(function() {
  //
  //
  //
  // TO FIGURE OUT:
  // every note row has an array of positions that are to be played
  //
  //
  //
  //

  let notes = {}

  function addPositionsToNotesObject(positions) {
    positions.forEach( function(element, index) {
      notes[element] = []
    })
    console.log(notes)
  }

  let notePositions = []

  function makePositions() {
    for (var x = 1; x <= 16; x++) {
        notePositions.push(`p${x}`)
      if (x % 4 == 0) {
        $('<div>', {'class': `square bar p${x}`})
          .appendTo(`.row`)
      } else {
        $('<div>', {'class': `square p${x}`})
          .appendTo(`.row`)
      }
    }
    addPositionsToNotesObject(notePositions)
  }

  function makeNotes(minOctave, maxOctave) {
    let notes = ['B', 'A', 'G', 'F', 'E', 'D', 'C']
    for (var oct = maxOctave; oct >= minOctave; oct--) {
      $('<div>', {'class': `octave ${oct}`})
        .appendTo('#noteGrid')
      notes.forEach( function(note, index) {
        $(`<div class='row ${note}${oct}'>
            <div class="noteName">${note}${oct}</div>
          </div>`)
          .appendTo(`.octave.${oct}`)
      });
    }
    makePositions()
  }

  makeNotes(2, 8)

  // implement: activate note plays sound

  function noteSelection() {
    let mouseDown = false
    let removing = false
    let adding = false

    $(document).on('mousedown', (e) => {
      mouseDown = true
    })
    $(document).on('mouseup', (e) => {
      mouseDown = false
      $('.square').removeClass('toggled')
      adding = removing = false
    })


    function toggleSquare(e) {
      sq = e.target
      if (mouseDown) {
        // If not already just changed
        if (!$(sq).hasClass('toggled')) {
          if ($(sq).hasClass('active') && !adding) {
            removing = true
            clearNote()
          } else if (!$(sq).hasClass('active') && !removing) {
            adding = true
            activateNote()
          }
          $(sq).addClass('toggled')
        }
      }
    }

    $('.square')
      .on('mouseover', (e) => {
        toggleSquare(e)
      })
      .on('mousedown', (e) => {
        mouseDown = true
        toggleSquare(e)
      })

    function activateNote() {
      $(sq).addClass('active')
      let sqClass = $(sq).attr('class')
      let position = /p\d+/.exec(sqClass)

      let noteClass = $(sq).parent().attr('class')
      let note = /row\s(\w\d+)/.exec(noteClass)[1]
      console.log(position)
      instrument.triggerAttackRelease(note, '4n', `${Tone.now()} `)
      setNote(note, position)
    }
  }

  noteSelection()

  function trigger(note, time) {
    instrument.triggerAttackRelease(note, '4n', `${Tone.now()} + ${time} + 0.2`)
  }

  function setNote(note, pos) {
    console.log(notes[pos])
    notes[pos].push(note)
    console.log(notes)
  }

  function clearNote() {
    $(sq).removeClass('active')

    let sqClass = $(sq).attr('class')
    let position = /p\d+/.exec(sqClass)

    let noteClass = $(sq).parent().attr('class')
    note = /row\s(\w\d+)/.exec(noteClass)[1]
    notes[position] = notes[position].filter(e => !e.includes(note))
  }

  $('#clear').on('click', () => {
    $('.square').removeClass('active')
    addPositionsToNotesObject(notePositions)
  })

  $('#play').on('click', () => {
    loop.start()
    Tone.Transport.start('+0.1')
  })

  $('#stop').on('click', () => {
    loop.stop()
    Tone.Transport.stop()
  })

  const loop = new Tone.Loop(time => {
    noteValues = Object.values(notes)
    noteValues.forEach( function(element, i) {
      if (element) {
        trigger(element, `4n * ${i + 1}`)
      }
    });
  }, '4m')

  $('#measures').on('change', () => {

  })

  let instrument = 'synthesizer'

  $('#instrument-selector').on('change', () => {
    instrument = $('#instrument-selector option:selected').attr('value')
  })

  function setInstrument() {

  }

  const synthesizer = new Tone.PolySynth(4, Tone.MonoSynth, {
    oscillator: {
        type: "sine4"
    },
    envelope: {
        attack: .9,
        decay: 1,
        sustain: .5,
        release: 1
      }
  }).toMaster();
})
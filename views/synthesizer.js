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

  let instrument = 'synthesizer'

  const synthesizer = new Tone.PolySynth(4, Tone.MonoSynth, {
    oscillator: {
        type: "sine4"
    },
    envelope: {
      attack: .9,
      decay: 1,
      sustain: .5,
      release: 1
    },
    volume: -30
  })

  $('#instrument-selector').on('change', () => {
    instrument = $('#instrument-selector option:selected').attr('value')
  })

  let synth = 'drums'

  function setInstrument() {
    switch (instrument) {
      case 'synthesizer':
        synth = synthesizer
        break;
      default:
        break;
    }
  }

  setInstrument()

  let vol = new Tone.Volume(-20)
  synthesizer.chain(vol, Tone.Master).toMaster()

  let song = {
    p1: {
      c4: '1n',
      c5: '4n'
    },
    p2: {
      a4: '4n'
    },
    p3: {
      b4: '4n'
    },
    p4: {
      d4: '1n'
    }
  }

  function scheduleTrigger(note, duration, time) {
    function trigger(time) {
      synth.triggerAttackRelease(note, duration, time)
    }
    Tone.Transport.schedule(trigger, time)
  }

  function getNotesFromSong() {
    let positions = Object.values(song)
    positions.forEach((notesAtPos, index) => {
      console.log(notesAtPos)
      for (n in notesAtPos) {
        let note = n
        let duration = notesAtPos[n]
        let time = `${(index + 1)}*4n`
        console.log(`time: ${time}; note: ${note}, duration: ${duration}`)
        scheduleTrigger(note, duration, time)
      }
    });
  }

  getNotesFromSong()

  // const loop = new Tone.Loop(time => {
  //   noteValues = Object.values(notes)
  //   noteValues.forEach( function(element, i) {
  //     if (element) {
  //       trigger(element, `4n * ${i + 1}`)
  //     }
  //   });
  // }, '4m')

  // function addPositionsToNotesObject(positions) {
  //   positions.forEach( function(element, index) {
  //     notes[element] = []
  //   })
  //   console.log(notes)
  // }

  // let notePositions = []

  // function makePositions() {
  //   for (var x = 1; x <= 16; x++) {
  //       notePositions.push(`p${x}`)
  //     if (x % 4 == 0) {
  //       $('<div>', {'class': `square bar p${x}`})
  //         .appendTo(`.row`)
  //     } else {
  //       $('<div>', {'class': `square p${x}`})
  //         .appendTo(`.row`)
  //     }
  //   }
  //   addPositionsToNotesObject(notePositions)
  // }

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
    // makePositions()
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
      synth.triggerAttackRelease(note, '4n', `${Tone.now()} `)
      setNote(note, position)
    }
  }

  noteSelection()

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
    Tone.Transport.start('+0.1')
  })

  $('#stop').on('click', () => {
    Tone.Transport.stop()
  })

  $('#measures').on('change', () => {

  })
})
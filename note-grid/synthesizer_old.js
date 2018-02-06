$(function() {

  let instrument = 'synthesizer'

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
    volume: -20
  }).toMaster()

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
  let song = {}

  function scheduleTrigger(note, duration, time) {
    function trigger(time) {
      synth.triggerAttackRelease(note, duration, time)
    }
    Tone.Transport.schedule(trigger, time)
  }

  function getNotesFromSong() {
    Tone.Transport.cancel()
    let positions = Object.values(song)
    positions.forEach((notesAtPos, index) => {
      for (n in notesAtPos) {
        let note = n
        let duration = notesAtPos[n]
        let time = `${(index + 1)}*4n`
        scheduleTrigger(note, duration, time)
      }
    });
  }

  getNotesFromSong()

  function initSongPositions(positions) {
    positions.forEach( function(position, index) {
      song[position] = {}
    })
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
    initSongPositions(notePositions)
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

  makeNotes(0, 8)

  function createNote() {
        $(sq).addClass('note')
        getNotesFromSong()
  }

  toggleNote()

  // function noteSelection() {
  //   let mouseDown = false
  //   let removing = false
  //   let adding = false

  //   $(document).on('mousedown', (e) => {
  //     mouseDown = true
  //   })
  //   $(document).on('mouseup', (e) => {
  //     mouseDown = false
  //     $('.square').removeClass('toggled')
  //     adding = removing = false
  //   })

  //   function toggleSquare(e) {
  //     sq = e.target
  //     sqActive = $(sq).hasClass('active')
  //     sqExt = $(sq).hasClass('extend')
  //     let noteClass = $(sq).parent().attr('class')
  //     let note = /row\s(\w\d+)/.exec(noteClass)[1]
  //     synth.triggerAttackRelease(note, '4n', Tone.now())

  //     if (mouseDown) {
  //       // If not already just changed
  //       // if (!$(sq).hasClass('toggled')) {
  //         // if (sqActive && !adding) {
  //         if (sqActive) {
  //           removing = true
  //           toggleNote('off')
  //         } else if (!sqActive && !removing) {
  //           adding = true
  //           extendNote(sq)
  //         }
  //         $(sq).addClass('toggled')
  //       }
  //     // }
  //   }

  //   function extendNote(note) {
  //     let duration = 1

  //     let originalSqClass = $(note).attr('class')
  //     let originalNoteClass = $(note).parent().attr('class')
  //     let originalNote = /row\s(\w\d+)/.exec(originalNoteClass)[1]
  //     let originalSqPosValue = /p(\d+)/.exec(originalSqClass)[1]
  //     let toggled = false
  //     $('.square').on('mouseover', e => {
  //       sqExt = e.target
  //       let sqExtClass = $(sqExt).attr('class')
  //       let sqExtNoteClass = $(sqExt).parent().attr('class')
  //       let sqExtNote = /row\s(\w\d+)/.exec(sqExtNoteClass)[1]
  //       let sqExtPosValue = /p(\d+)/.exec(sqExtClass)[1]
  //       // check that extending note on same row
  //       if((sqExtNote === originalNote) && mouseDown && !$(sqExt).hasClass('extend') && !toggled) {
  //         // add extend class if not original note that's being extended
  //         if (sqExtPosValue !== originalSqPosValue) {
  //           $(sqExt).addClass('extend')
  //           duration = (sqExtPosValue - originalSqPosValue) + 1
  //           toggled = true
  //         }
  //       }
  //     }).on('mouseup', e => {
  //         $(sq).addClass(`dur${duration}`)
  //         if (toggled) {
  //           toggleNote('off')
  //           toggled = false
  //         } else {
  //           toggleNote('on', e, duration)
  //           toggled = true
  //         }
  //       })
  //       // if cursor moves backward, revert extension
  //       .on('mouseleave', e => {
  //         // if ($(sqExt).hasClass('extend') && ($() > $(sqExtPosValue)) {
  //         //   if (toggled) {
  //         //     toggleNote('off')
  //         //     toggled = false
  //         //   } else {
  //         //     toggleNote('on', e, duration)
  //         //     toggled = true
  //         //   }
  //         // }
  //         if ($(sqExt).hasClass('extend')) {
  //           // $(sqExt).removeClass('extend')
  //         }
  //       })

  //     if (mouseDown && !sqActive) {
  //     }
  //   }

  //   $('.square')
  //     .on('mousedown', e => {
  //       mouseDown = true
  //       toggleSquare(e)
  //     })

  //   function toggleNote(onOrOff, e, duration) {
  //       let sqClass = $(sq).attr('class')
  //       let position = /p\d+/.exec(sqClass)

  //       let noteClass = $(sq).parent().attr('class')
  //       let note = /row\s(\w\d+)/.exec(noteClass)[1]
  //     if (onOrOff === 'on') {
  //       console.log(e.target)

  //       setNote(note, position, duration)
  //     } else {
  //       clearNote(note, position, duration)
  //     }
  //   }
  // }

  // noteSelection()

  $('#noteGrid').scrollTop(550)

  Tone.Transport.loopEnd = '4m +0.1'
  Tone.Transport.loop = true

  // function setNote(note, position, duration) {
  //   song[position][note] = '4n'
  //   $(sq).addClass('active')
  //   getNotesFromSong()
  // }

  // function clearNote(note, position) {

  //   let sqClass = $(sq).attr('class')
  //   let duration = /dur(\d+)/.exec(sqClass)
  //   console.log(duration[1])
  //   delete song[position][note]
  //   $(sq).removeClass('active').removeClass(duration)
  //   getNotesFromSong()
  // }

  $('#clear').on('click', () => {
    $('.square').removeClass('note').removeClass('start').removeClass('end')
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
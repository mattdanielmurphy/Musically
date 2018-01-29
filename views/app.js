$(function() {
  const synth = new Tone.PolySynth(8, Tone.Synth, {
          oscillator: {
              type: "sine3"
          },
          envelope: {
              attack: .3,
              decay: .1,
              sustain: .2,
              release: .6
          }}).toMaster();

  const makeCols = (y) => {
    for (var x = 1; x <= 16; x++) {
      if (x % 4 == 0) {
        $('<div>', {'class': `square bar x${x} y${y}`})
          .appendTo(`.row.y${y}`)
      } else {
        $('<div>', {'class': `square x${x} y${y}`})
          .appendTo(`.row.y${y}`)
      }
    }
  }

  const makeRows = () => {
    for (var y = 1; y <= 25; y++) {
      $('<div>', {'class': `row y${y}`})
        .appendTo('#noteGrid')
      makeCols(y)
    }
  }

  makeRows()

  let mouseDown = false;
  $('#noteGrid').on('mousedown', (e) => {
    mouseDown = true
  })
  $('#noteGrid').on('mouseup', (e) => {
    mouseDown = false
    $('.square').removeClass('toggled')
    adding = removing = false
    console.log(`adding: ${adding}`)
    console.log(`removing: ${removing}`)
  })

  let removing = false
  let adding = false

  const toggleSquare = (e) => {
    sq = e.target
    if (mouseDown) {
      // If not already just changed
      if (!$(sq).hasClass('toggled')) {

        if ($(sq).hasClass('active') && !adding) {
          removing = true
          console.log(`removing: ${removing}`)
          $(sq).removeClass('active')

        } else if (!$(sq).hasClass('active') && !removing) {
          adding = true
          console.log(`adding: ${adding}`)
          $(sq).addClass('active')
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

  const triggerNote = (note) => {
    synth.triggerAttackRelease(note, "16n", "+0.02")
  }

  const clearNotes = () => {
    $('#clear').on('click', () => {
      console.log('clearing notes')
      $('.square').removeClass('active')
    })
  }

  clearNotes()
})

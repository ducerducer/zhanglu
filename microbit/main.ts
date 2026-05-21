input.onButtonPressed(Button.A, function () {
    x = 1
})
input.onButtonPressed(Button.B, function () {
    x = 0
})
let x = 0
x = 0
basic.forever(function () {
    if (x == 0) {
        basic.showLeds(`
            . # . # .
            # . # . #
            # . . . #
            . # . # .
            . . # . .
            `)
        basic.clearScreen()
        basic.pause(200)
    } else {
        basic.clearScreen()
    }
})

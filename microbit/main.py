def on_button_pressed_a():
    global x
    x = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global x
    x = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

x = 0
x = 0

def on_forever():
    if x == 0:
        basic.show_leds("""
            . # . # .
                        # . # . #
                        # . . . #
                        . # . # .
                        . . # . .
        """)
        basic.clear_screen()
        basic.pause(200)
    else:
        basic.clear_screen()
basic.forever(on_forever)

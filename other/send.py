import keyboard
import serial
import time
import os


PORT = 'COM5'
BAUDRATE = 9600

# motors
# L = left
# R = right
# steps
# H = hold
# CC = counter-clockwise
# C = clockwise
COMMANDS = {
    "enable":  b'\xff',
    "disable": b'\x88',
    "LH,RH":   b'\x00',
    "LH,RCC":  b'\x01',
    "LH,RC":   b'\x02',
    "LCC,RH":  b'\x10',
    "LCC,RCC": b'\x11',
    "LCC,RC":  b'\x12',
    "LC,RH":   b'\x20',
    "LC,RCC":  b'\x21',
    "LC,RC":   b'\x22',
}

class Plotter:
    def __init__(self, port, baudrate):
        self.port = port
        self.baudrate = baudrate
        self.connect()

    def connect(self):
        try:
            self.arduino = serial.Serial(port=self.port, baudrate=self.baudrate, timeout=0.1)
            print(" 2 second pause to allow Arduino to connect...", end='', flush=True)
            time.sleep(2)
            print(" done")
        except:
            print(" Failed to connect to arduino")

    def move(self, cmd):
        try:
            self.arduino.write(cmd)
        except:
            print("failed to move")

class Standby:
    def go(self, controller):
        controller.move(COMMANDS["disable"])

        print()
        print(" Standby mode")
        print(" q = quit")
        print(" m = manual mode")
        print(" l = load file")
        print(" r = run file")
        print()

        while True:
            key = input().strip()
            if key == "q":
                print("Goodbye")
                quit()
            elif key == "m":
                controller.setState(STATE["MANUAL"])
                return
            elif key == "l":
                controller.setState(STATE["LOAD"])
                return
            elif key == "r":
                controller.setState(STATE["RUN"])
                return
            time.sleep(0.1)

class Load:
    def go(self, controller):
        print()

        if controller.input_file_path:
            print(" Currently: {}".format(controller.input_file_path))
        else:
            print(" Currently: no file")

        file_path = input(" Please enter file path: ").strip()

        if (not os.path.exists(file_path)) or (not os.path.isfile(file_path)):
            print(" Bad path")
        else:
            print(" Good path")
            controller.input_file_path = file_path

        print(" returning to standby")
        print()
        controller.setState(STATE["STANDBY"])
        return

class Run:
    def go(self, controller):
        if not controller.input_file_path:
            print(" No file to run")
            controller.setState(STATE["STANDBY"])
            return

        print("TO BE IMPLEMENTED")
        controller.setState(STATE["STANDBY"])
        return

class Manual:
    def go(self, controller):
        controller.move(COMMANDS["enable"])

        print()
        print(" Manual mode")
        print(" k = right motor clockwise")
        print(" j = right motor counter-clockwise")
        print(" f = left motor clockwise")
        print(" d = left motor counter-clockwise")
        print(" q = back to standby")
        print()

        while True:
            if keyboard.is_pressed("k"):
                controller.move(COMMANDS["LH,RC"])
            elif keyboard.is_pressed("j"):
                controller.move(COMMANDS["LH,RCC"])
            elif keyboard.is_pressed("f"):
                controller.move(COMMANDS["LC,RH"])
            elif keyboard.is_pressed("d"):
                controller.move(COMMANDS["LCC,RH"])
            elif keyboard.is_pressed("q"):
                input()
                controller.setState(STATE["STANDBY"])  
                return
            time.sleep(0.001)
        
STATE = {
    "STANDBY": Standby(),
    "LOAD":    Load(),
    "RUN":     Run(),
    "MANUAL":  Manual(),
}

class Controller:
    def __init__(self, port, baudrate):
        self.plotter = Plotter(port, baudrate)
        self.state = STATE["STANDBY"]
        self.input_file_path = None

    def setState(self, newState):
        if newState:
            self.state = newState

    def move(self, cmd):
        if self.plotter:
            self.plotter.move(cmd)

    def go(self):
        self.state.go(self)


controller = Controller(PORT, BAUDRATE)

while (True):
    controller.go()
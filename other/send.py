import keyboard
import serial
import time
import json
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

# 1  = clockwise
# 0  = hold
# -1 = counter-clockwise
def stepToHex(step):
    if (not 'l' in step) or (not 'r' in step):
        return COMMANDS["LH,RH"]
    if step['l'] == 0 and step['r'] == 0:
        return COMMANDS["LH,RH"]
    elif step['l'] == 0 and step['r'] == 1:
        return COMMANDS["LH,RC"]
    elif step['l'] == 0 and step['r'] == -1:
        return COMMANDS["LH,RCC"]
    elif step['l'] == 1 and step['r'] == 0:
        return COMMANDS["LC,RH"]
    elif step['l'] == 1 and step['r'] == 1:
        return COMMANDS["LC,RC"]
    elif step['l'] == 1 and step['r'] == -1:
        return COMMANDS["LC,RCC"]
    elif step['l'] == -1 and step['r'] == 0:
        return COMMANDS["LCC,RH"]
    elif step['l'] == -1 and step['r'] == 1:
        return COMMANDS["LCC,RC"]
    elif step['l'] == -1 and step['r'] == -1:
        return COMMANDS["LCC,RCC"]
    return COMMANDS["LH,RH"]

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

    def send(self, cmd):
        try:
            self.arduino.write(cmd)
        except:
            print("failed to send")

    def receive(self, length):
        try:
            return self.arduino.read(length)
        except:
            print("failed to receive")
            return []

class Standby:
    def go(self, controller):
        controller.send(COMMANDS["disable"])

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
    def __init__(self):
        self.chunk_size = 16

    def sendAll(self, controller, data):
        steps = map(lambda d: stepToHex(d), data)
        for cmd in steps:
            controller.send(cmd)

    def receiveSome(self, controller, length):
        total_recv = 0
        while total_recv < length:
            recv = controller.receive(length - total_recv)
            if len(recv) == 0:
                break
            else:
                total_recv += len(recv)
        return total_recv

    def go(self, controller):
        if not controller.input_file_path:
            print(" No file to run")
            controller.setState(STATE["STANDBY"])
            return

        controller.send(COMMANDS["enable"])
        print()
        print(" Run mode")
        print()
        time.sleep(0.1)
        
        with open(controller.input_file_path, 'r') as f:
            data = json.load(f)

            spare = len(data) % self.chunk_size

            if not (spare == 0):
                self.sendAll(controller, data[0 : spare])
                received = self.receiveSome(controller, spare)
                if not (received == spare):
                    print("ERROR: sent {} steps, received {}".format( spare, received))
                    controller.setState(STATE["STANDBY"])
                    return 

            if len(data) > spare:
                self.sendAll(controller, data[spare : spare + self.chunk_size])

                for i in range(1, (len(data) - spare) // self.chunk_size):
                    self.sendAll(controller, data[spare + (i * self.chunk_size) : spare + ((i+1) * self.chunk_size)])
                    received = self.receiveSome(controller, self.chunk_size)
                    if not (received == self.chunk_size):
                        print("ERROR: at chunk {}, sent {} steps, received {}".format(i, self.chunk_size, received))
                        controller.setState(STATE["STANDBY"])
                        return

                received = self.receiveSome(controller, self.chunk_size)
                if not (received == self.chunk_size):
                    print("ERROR: at last chunk, sent {} steps, received {}".format(self.chunk_size, received))
                    controller.setState(STATE["STANDBY"])
                    return

        print("Success")
        controller.setState(STATE["STANDBY"])
        return

class Manual:
    def go(self, controller):
        controller.send(COMMANDS["enable"])

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
                controller.send(COMMANDS["LH,RC"])
            elif keyboard.is_pressed("j"):
                controller.send(COMMANDS["LH,RCC"])
            elif keyboard.is_pressed("f"):
                controller.send(COMMANDS["LC,RH"])
            elif keyboard.is_pressed("d"):
                controller.send(COMMANDS["LCC,RH"])
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

    def send(self, cmd):
        if self.plotter:
            self.plotter.send(cmd)

    def receive(self, length):
        if self.plotter:
            return self.plotter.receive(length)
        return []

    def go(self):
        self.state.go(self)


controller = Controller(PORT, BAUDRATE)

while (True):
    controller.go()
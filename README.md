# Wall Plotter

The all-in-one wall plotting solution. Do you like walls? Do you like line drawings? Do you wish you could draw stuff without all the hassle of lifting your pen up? Then you need the wall plotter.  

This project is a 2d plotter. Consists of a brain box (arduino), two stepper motors, some 3D prints, and fishing line, that's it. Basic conceptual physical setup: Two spools of fishing line are placed 100cm apart horizontally, their ends are tied together around a pen. By rotating the spools, the pen will draw on the wall.  

Actually used:
- two Nema 17 motors (17HS4401)
- wood 2-4 for mounting
- some screws for mounting
- GRBL arduino shield [here](https://blog.protoneer.co.nz/arduino-cnc-shield/)
- 24V 2A DC power cable with screw terminal adapter for the shield/motors
- Arduino Uno
- a very long A-to-B usb cable
- 3D printed parts
- elastic bands
- sharpie markers
- 40lb braided fishing line
- 18 gauge copper wire
  - guide the fishing line
  - smoothly attach the pen holder to the fishing line
  - attach power cable to the GRBL board

Aside from the physical setup, there are three (3) important software steps:
1. [Generate motor control pulses (via a handy website)](https://cruncha-cruncha.github.io/wall-plotter/)
2. [Send pulses to Arduino (via a python script)](https://github.com/cruncha-cruncha/wall-plotter/blob/main/other/send.py)
3. [Receive pulses on Arduino (via some C code)](https://github.com/cruncha-cruncha/wall-plotter/blob/main/other/receive/receive.ino)

## Limitations
Step #1 (the website that generates motor control pulses) only accepts svg files. In those files, only paths will be processed. Also, any transform styling will be ignored.

## Algorithm
For each path in the svg:
1. sample a point every Xmm along the path
2. remove points based on a smoothing algorithm
3. calculate the top speed between every two points based on the distance between them
4. traverse straight between each pair of points

In reality, 1, 2, and 3 happen in the same loop for efficiency. See [this file](https://github.com/cruncha-cruncha/wall-plotter/blob/main/src/components/Converter/useConverter.js) for the code.

### Notes

1. Xmm is 2mm by default
2. Smoothing algorithm works as follows:
  1. Set `precision` to 2mm
  2. For each set of points a, b and candidate point c, where a.length < b.length < c.length along the path:
  3. Calculate the shortest distance D from point b to a line passing through points a and c
  4. If D is less than `precision`, discard point b and replace with point c, set `precision` to `precision` / 2
  5. If D is greater than `precision`, keep all points, use a = b and b = c in the next loop
  The result of this algorithm is that:
  - points residing inside straight lines are discarded
  - small aberrations (less than 2mm deviation from neighbouring points) are discarded
  - sharp corners are preserved
  - gradual but persistent changes (low frequency oscillations) are preserved
  - less points are carried over to step #4
3. Top speed is a number from 0 to 7 inclusive, interpreted linearly by the Arduino, and based on a simple lookup. See `getSpeed()`. Speed is per-motor-pulse, and is converted into a wait time between pulses. Step four ramps linearly from current speed, to top speed. If the next line has a lower top speed, it then ramps down to that speed.
4. Given a current known location/fishing-line-length, figure out exact fishing-line-length for the desired location (next point). Linearly intersperse motor pulses to get as close to that fishing-line-length as possible. This may trace a slightly curved line on the wall. Figure out new cartesian coordinate given actual fishing-line-length. Repeat.

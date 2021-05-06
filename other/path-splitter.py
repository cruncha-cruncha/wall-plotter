# parse svg (text) and break every M or m into it's own path, rainbow colors
import sys
import re

input = ''
with open(sys.argv[1], 'r') as f:
    input = f.read()

pattern = re.compile(r'(M[^Mm]*|m[^Mm]*)')

colors = ["red", "orange", "yellow", "green", "violet"]
color_index = 0
i = 0

with open('split.txt', 'w+') as f:
    for move in re.findall(pattern, input):
        line = '<path id="' + str(i) + '" d="' + move + '" stroke="' + colors[color_index] + '"></path>\n'
        color_index = (color_index + 1) % len(colors)       
        f.write(line)
        i += 1
        
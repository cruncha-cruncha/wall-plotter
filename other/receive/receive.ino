#define enablePin 8

// X (left)
#define xDirPin 5
#define xStepPin 2

// Y (right)
#define yDirPin 6
#define yStepPin 3

byte buf[1];

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(1);
  while (!Serial) {
   delay(1);
  }

  pinMode(enablePin, OUTPUT);
  pinMode(xStepPin, OUTPUT);
  pinMode(xDirPin, OUTPUT);
  pinMode(yStepPin, OUTPUT);
  pinMode(yDirPin, OUTPUT);

  digitalWrite(xStepPin, LOW);
  digitalWrite(yStepPin, LOW);
}

void leftShorter() {
  digitalWrite(xDirPin, HIGH);
  digitalWrite(xStepPin, HIGH);
}

void leftLonger() {
  digitalWrite(xDirPin, LOW);
  digitalWrite(xStepPin, HIGH);
}

void leftHold() {
  digitalWrite(xStepPin, LOW);
}

void rightShorter() {
  digitalWrite(yDirPin, LOW);
  digitalWrite(yStepPin, HIGH);
}

void rightLonger() {
  digitalWrite(yDirPin, HIGH);
  digitalWrite(yStepPin, HIGH);
}

void rightHold() {
  digitalWrite(yStepPin, LOW);
}

void loop() {
  if (Serial.available() > 0) {

    Serial.readBytes(buf, 1);

    if (buf[0] == 0xff) {
      // enable
      digitalWrite(enablePin, LOW);
      delay(1);
      return;
    } else if (buf[0] == 0x88) {
      // disable
      digitalWrite(enablePin, HIGH);
      delay(1);
      return;
    }

    byte motorDirs = buf[0] & 0x07;
    if (motorDirs == 0x00) {
      leftHold();
      rightLonger();
    } else if (motorDirs == 0x01) {
      leftHold();
      rightShorter();
    } else if (motorDirs == 0x02) {
      leftLonger();
      rightHold();
    } else if (motorDirs == 0x03) {
      leftLonger();
      rightLonger();
    } else if (motorDirs == 0x04) {
      leftLonger();
      rightShorter();
    } else if (motorDirs == 0x05) {
      leftShorter();
      rightHold();
    } else if (motorDirs == 0x06) {
      leftShorter();
      rightLonger();
    } else if (motorDirs == 0x07) {
      leftShorter();
      rightShorter();
    }

    byte speed = (buf[0] & 0x38) >> 3;
    unsigned long pauseMS = 1000 + (speed * 285);

    delayMicroseconds(pauseMS);
    
    digitalWrite(xStepPin, LOW);
    digitalWrite(yStepPin, LOW);
    
    delayMicroseconds(pauseMS);

    Serial.write(buf, 1);
    
  } else {
    delay(5);
  }
}

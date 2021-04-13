#define enablePin 8
#define pauseMS 1000

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

void loop() {
  if (Serial.available() > 0) {
    Serial.readBytes(buf, 1);

    if (buf[0] == 0xff) {
      // enable
      digitalWrite(enablePin, LOW);
      return;
    } else if (buf[0] == 0x88) {
      // disable
      digitalWrite(enablePin, HIGH);
      return;
    }

    // left
    if (buf[0] & 0x10) {
      // clockwise
      digitalWrite(xDirPin, LOW);
      digitalWrite(xStepPin, HIGH);
    } else if (buf[0] & 0x20) {
      // counter-clockwise
      digitalWrite(xDirPin, HIGH);
      digitalWrite(xStepPin, HIGH);
    } else {
      // hold
      digitalWrite(xStepPin, LOW);
    }

    // right
    if (buf[0] & 0x01) {
      // clockwise
      digitalWrite(yDirPin, LOW);
      digitalWrite(yStepPin, HIGH);
    } else if (buf[0] & 0x02) {
      // counter-clockwise
      digitalWrite(yDirPin, HIGH);
      digitalWrite(yStepPin, HIGH);
    } else {
      // hold
      digitalWrite(yStepPin, LOW);
    }

    delayMicroseconds(pauseMS);
    
    digitalWrite(xStepPin, LOW);
    digitalWrite(yStepPin, LOW);
    
    delayMicroseconds(pauseMS);

    Serial.write(buf, 1);
    
  } else {
    delay(5);
  }
}

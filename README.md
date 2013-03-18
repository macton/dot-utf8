# dot-utf8

Author: Mike Acton <macton@gmail.com>

Simple utf8 encoder/decoder.

- [Install](#install)
- [Questions?](#questions)
- [Contribute?](#contribute)
- [API](#api)

## Install

### node
For [node](http://nodejs.org) with [npm](http://npmjs.org):

```bash
npm install dot-utf8
```

And use with `var utf8 = require("dot-utf8")`

## Questions?

Submit issue on github.

## Contribute?

Pull requests welcome.

* #TODO EncodeStream
* #TODO tests for DecodeStream
* #TODO tests for EncodeStream

## API
- [encode](#encode)
- [decoder](#decoder)
- [DecodeStream.decode](#decodestreamdecode)
- [EncodeStream.encode](#encodestreamencode)

## encode

### Synopsis

    utf8       = require('dot-utf8');
    utf8String = utf8.encode( utf16String );

### Description

Encodes a UTF-16 string into UTF-8.

### Return Value

The string encoded as UTF-8, as a JavaScript
string with bytes represented as code units from 0x00 to 0xFF.

<sub><sup>([Return to API)](#api)</sup></sub>


## DecodeStream

### Synopsis

    utf8       = require('dot-utf8');
    decoder    = new utf8.DecodeStream();

### Description

A stateful UTF-8 decoder.

### Return Value

Object to manage state of decoding.

<sub><sup>([Return to API)](#api)</sup></sub>

## DecodeStream.decode

### Synopsis

    utf8         = require('dot-utf8');
    decoder      = new utf8.DecodeStream();
    utf16String  = decoder.decode( utf8STring );
    utf16String += decoder.decode( moreUtf8String );

### Description

Decodes a some UTF-8 data from UTF-16 source, taking into account state 
from previous data streamed through the encoder.

Represented as a JavaScript String with each code unit representing
a byte between 0x00 to 0xFF.

### Return Value

The data decoded into a JavaScript UTF-16 string.

<sub><sup>([Return to API)](#api)</sup></sub>

## EncodeStream

### Synopsis

    utf8       = require('dot-utf8');
    encoder    = new utf8.EncodeStream();

### Description

A stateful UTF-8 encoder.

### Return Value

Object to manage state of decoding.

<sub><sup>([Return to API)](#api)</sup></sub>

## EncodeStream.encode

### Synopsis

    utf8        = require('dot-utf8');
    encoder     = new utf8.EncodeStream();
    utf8String  = encoder.encode( utf16STring );
    utf8String += encoder.encode( moreUtf16String );

### Description

Encodes a some UTF-16 data from UTF-8 source, taking into account state
from previous data streamed through the encoder.

Represented as a JavaScript String with each code unit representing
a byte between 0x00 to 0xFF.

### Return Value

The data encoded into a JavaScript UTF-8 string.

<sub><sup>([Return to API)](#api)</sup></sub>


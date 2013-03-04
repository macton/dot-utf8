# dot-utf8

Author: Robert Ginda <rginda@google.com>

Port to Node.js: Mike Acton <macton@gmail.com>

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

If you have questions, the best place to ask is the [chromium-hterm google group](https://groups.google.com/a/chromium.org/forum/?fromgroups=#!forum/chromium-hterm)

## Contribute?

If you want to contribute to the upstream, the best place to ask is the [chromium-hterm google group](https://groups.google.com/a/chromium.org/forum/?fromgroups=#!forum/chromium-hterm)

If you would like to contribute to this port, I have some things in mind:
* There is a TODO worth closer examination:

    TODO(davidben): Do we need a stateful version of this that can
    handle a surrogate pair split in two calls? What happens if a
    keypress event would have contained a character outside the BMP?

* Figure out a (good) way to automate the generation of this readme file.
* Make some tests.
* Add examples to this readme in the API section.
* Compare to: http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt

## API
- [encode](#encode)
- [decoder](#decoder)
- [decoder.decode](#decoderdecode)

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


## decoder

### Synopsis

    utf8       = require('dot-utf8');
    decoder    = new utf8.decoder();

### Description

A stateful UTF-8 decoder.

### Return Value

Object to manage state of decoding.

<sub><sup>([Return to API)](#api)</sup></sub>

## decoder.decode

### Synopsis

    utf8         = require('dot-utf8');
    decoder      = new utf8.decoder();
    utf16String  = decoder.decode( utf8STring );
    utf16String += decoder.decode( moreUtf8String );

### Description

Decodes a some UTF-8 data, taking into account state from previous
data streamed through the encoder.

Represented as a JavaScript String with each code unit representing
a byte between 0x00 to 0xFF.

### Return Value

The data decoded into a JavaScript UTF-16 string.

<sub><sup>([Return to API)](#api)</sup></sub>


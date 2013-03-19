'use strict';

function Utf8DecodeStream() {
  this.decodeStream = '';
}

Utf8DecodeStream.prototype.decode = function( s ) {
  var code = this.decodeStream + s;
  try {
    var utf8          = decodeURIComponent( escape( code ) );
    this.decodeStream = '';
    return utf8;
  } catch(e) {
    // if hit max code length, silently eat input.
    if ( code.length == 4 ) {
      this.decodeStream = '';
      return '';
    }
    // if longer than max code length (failure inside longer string),
    // decode as stream to keep as much of the source text as possible.
    else if ( code.length > 4 ) {
      var decoder = new Utf8DecodeStream();
      var length  = code.length;
      var result  = '';
      var i;
      for (i=0;i<length;i++) {
        result += decoder.decode( code[i] );
      }
      // keep anything left over at end
      this.decodeStream = decoder.decodeStream;
      return result;
    }
    // normal case: can't decode yet
    this.decodeStream = code;
    return '';
  }
}

function Utf8EncodeStream() {
  this.encodeStream = '';
}

Utf8EncodeStream.prototype.encode = function( s ) {
  var code = this.encodeStream + s;
  try {
    var utf16         = unescape( encodeURIComponent( s ) );
    this.encodeStream = '';
    return utf16;
  } catch(e) {
    // if hit max code length, silently eat input.
    if ( code.length == 2 ) {
      this.encodeStream = '';
      return '';
    }
    // if longer than max code length (failure inside longer string),
    // encode as stream to keep as much of the source text as possible.
    else if ( code.length > 2 ) {
      var encoder = new Utf8EncodeStream();
      var length  = code.length;
      var result  = '';
      var i;
      for (i=0;i<length;i++) {
        result += encoder.encode( code[i] );
      }
      // keep anything left over at end
      this.encodeStream = encoder.encodeStream;
      return result;
    }
    // normal case: can't encode yet
    this.encodeStream = code;
    return '';
  }
}

var Utf8Utils = {};

Utf8Utils.quoteString = function( s ) {
  return '"' + s + '"';
}

Utf8Utils.unquoteString = function( s ) {
  return eval( '"' + s + '"' );
}

Utf8Utils.hexEncode = function( s ) {
  var r   = '';
  var len = s.length;
  var i;
  for (i=0;i<len;i++) {
    var charCode = s.charCodeAt(i);
    // Not really intended for multi-byte codes, but just in case
    if ( charCode > 255 ) {
      r += '\\x' + ( '00' + ( charCode >> 8 ).toString(16) ).substr(-2);
    }
    r += '\\x' + ( '00' + ( charCode & 0xff ).toString(16) ).substr(-2);
  }
  return r;
}

var Utf8 = {};

Utf8.decode = function( s ) {
  return decodeURIComponent( escape( s ) );
}

Utf8.encode = function( s ) {
  return unescape( encodeURIComponent( s ) );
}

Utf8.DecodeStream = Utf8DecodeStream;
Utf8.EncodeStream = Utf8EncodeStream;
Utf8.utils        = Utf8Utils;

/**
 * Export
 */
module.exports = Utf8;

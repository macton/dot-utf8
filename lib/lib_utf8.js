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
      return '';
    }
    // if longer than max code length (failure inside longer string),
    // decode as stream to keep as much of the source text as possible.
    else if ( code.length > 4 ) {
      var utf8   = new Utf8();
      var length = code.length;
      var result = '';
      var i;
      for (i=0;i<length;i++) {
        result += utf8.decode( code[i] );
      }
      // keep anything left over at end
      this.decodeStream = utf8.decodeStream;
      return result;
    }
    // normal case: can't decode yet
    this.decodeStream = (code.length >= 4)?'':code;
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
  for (i= 0;i<len;i++) {
    r += '\\x' + ( '00' + s.charCodeAt(i).toString(16) ).substr(-2);
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
Utf8.utils        = Utf8Utils;

/**
 * Export
 */
module.exports = Utf8;

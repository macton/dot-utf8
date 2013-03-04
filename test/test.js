utf8 = require('../lib/lib_utf8');

// See: http://mathiasbynens.be/notes/javascript-encoding

var testFailCount = 0;
var decoder       = new utf8.decoder();

function testDecoder( name, utf8String, expectedUtf16String ) {
  var resultUtf16 = decoder.decode( utf8String );
  if ( resultUtf16 != expectedUtf16String ) {
    console.log( name + ' decoded incorrectly.');
    testFailCount++;
  }
  return resultUtf16;
}

function testEncode( name, utf16String, expectedUtf8String ) {
  var resultUtf8 = utf8.encode( utf16String );
  if ( resultUtf8 != expectedUtf8String ) {
    console.log( name + ' encoded incorrectly.');
    testFailCount++;
  }
  return resultUtf8;
}

// #todo Need some tests here


if ( testFailCount ) {
  console.log( testFailCount + ' tests failed.' ); ;
} else {
  console.log( 'All tests succeeded.' );
}


// UTF8 codepages https://github.com/macton/utf8-blocks
// See also: http://mathiasbynens.be/notes/javascript-encoding

var utf8       = require('../lib/lib_utf8');
var csv        = require('csv-string');
var fs         = require('fs');
var path       = require('path');

var kTextInfo    = '\033[94m';
var kTextSuccess = '\033[92m';
var kTextWarning = '\033[93m';
var kTextError   = '\033[91m';
var kTextReset   = '\033[0m';

function logError( s ) {
  console.log( kTextError + 'ERROR: ' + s + kTextReset );
}

function testCodePage( testName, filePath, test ) {
  fs.readFile( path.resolve( __dirname, 'codepages', filePath ), function (err, data) {
    if ( err ) {
      logError( 'Could not read file ' + filePath + ' error: ' + JSON.stringify( err ) );
      return;
    }
    var lines      = data.toString().split('\n');
    var lineCount  = lines.length;
    var errorCount = 0;
    var i;
    for (i=0;i<lineCount;i++) {
      var line         = lines[i];
      var commentStart = line.indexOf('#');
      var strippedLine = ( commentStart >= 0 ) ? line.slice(0,commentStart) : line;
      var trimmedLine  = strippedLine.trim();
      if ( trimmedLine.length > 0 ) {
        var row                     = csv.parse( trimmedLine )[0];
        var codePoint               = row[0].trim();
        var valueUtf8Hex            = row[1].trim();
        var description             = row[2].trim();

        errorCount += test( codePoint, valueUtf8Hex, description );

      }
    }
    if ( errorCount == 0 ) {
      console.log( 'Test ' + testName + ' codepage ' + filePath + ' = ' + kTextSuccess + 'PASSED (' + lineCount + ')' + kTextReset );
    } else {
      console.log( 'Test ' + testName + ' codepage ' + filePath + ' = ' + kTextError + 'FAILED (' + errorCount + ' errors)' + kTextReset );
    }
  });
}


fs.readdir( path.resolve( __dirname, 'codepages' ), function( err, paths ) {
  if ( err ) {
    logError('Could not read codepages directory');
    return;
  }
  var pathCount = paths.length;
  var i;
  for (i=0;i<pathCount;i++) {
    var filePath = paths[i];
    if ( filePath.indexOf( '.csv' ) == -1 ) {
      continue;
    }

    testCodePage( 'utf8.decode', filePath, function( codePoint, valueUtf8Hex, description ) {
      var valueUtf8          = utf8.utils.unquoteString( valueUtf8Hex );
      var literalFromUtf8    = utf8.decode( valueUtf8 );
      var valueUtf16Escape   = codePoint.replace(/U\+/i,'\\u');
      var literalFromUtf16   = utf8.utils.unquoteString( valueUtf16Escape );

      if ( literalFromUtf16 != literalFromUtf8 ) {
        logError( valueUtf8Hex + ' != ' + codePoint );
        return (1);
      }
      return (0);
    });

    testCodePage( 'utf8.DecodeStream.decode', filePath, function( codePoint, valueUtf8Hex, description ) {
      var decoder            = new utf8.DecodeStream();
      var valueUtf8          = utf8.utils.unquoteString( valueUtf8Hex );
      var valueUtf8Length    = valueUtf8.length;
      var valueUtf16Escape   = codePoint.replace(/U\+/i,'\\u');
      var literalFromUtf16   = utf8.utils.unquoteString( valueUtf16Escape );
      var literalFromUtf8    = '';
      var i;

      for (i=0;i<valueUtf8Length;i++) {
        literalFromUtf8 += decoder.decode( valueUtf8[i] );
      }

      if ( literalFromUtf16 != literalFromUtf8 ) {
        logError( valueUtf8Hex + ' != ' + codePoint );
        return (1);
      }
      return (0);
    });

    testCodePage( 'utf8.encode', filePath, function( codePoint, valueUtf8Hex, description ) {
      var valueUtf16Escape    = codePoint.replace(/U\+/i,'\\u');
      var literalFromUtf16    = utf8.utils.unquoteString( valueUtf16Escape );
      var utf8FromLiteral     = utf8.encode( literalFromUtf16 );
      var utf8HexFromLiteral  = utf8.utils.hexEncode( utf8FromLiteral );

      if ( utf8HexFromLiteral.toLowerCase() != valueUtf8Hex.toLowerCase() ) {
        logError( utf8HexFromLiteral + ' != ' + valueUtf8Hex );
        return (1);
      }
      return (0);
    });

  }
});

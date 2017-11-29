/* JavaScript String -> NSString */
function nsstr(str) { return ObjC.classes.NSString.stringWithUTF8String_(Memory.allocUtf8String(str));}
/* NSString -> NSData */
function nsstr2nsdata(nsstr) { return nsstr.dataUsingEncoding_(4);}
/* NSData -> NSString */
function nsdata2nsstr(nsdata) { return ObjC.classes.NSString.alloc().initWithData_encoding_(nsdata, 4);}
/* Print Native Callstack */
function callstack() { console.log(Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n") + "\n");}

function _utf8_encode (string) { string = string.replace(/\r\n/g,"\n"); var utftext = ""; for (var n = 0; n < string.length; n++) {  var c = string.charCodeAt(n);  if (c < 128) {   utftext += String.fromCharCode(c);  } else if((c > 127) && (c < 2048)) {   utftext += String.fromCharCode((c >> 6) | 192);   utftext += String.fromCharCode((c & 63) | 128);  } else {   utftext += String.fromCharCode((c >> 12) | 224);   utftext += String.fromCharCode(((c >> 6) & 63) | 128);   utftext += String.fromCharCode((c & 63) | 128);  }
 } return utftext;}
/* Base64 Encode */
function base64(input) { var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" var output = ""; var chr1, chr2, chr3, enc1, enc2, enc3, enc4; var i = 0; input = _utf8_encode(input); while (i < input.length) {  chr1 = input.charCodeAt(i++);  chr2 = input.charCodeAt(i++);  chr3 = input.charCodeAt(i++);  enc1 = chr1 >> 2;  enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  enc4 = chr3 & 63;  if (isNaN(chr2)) {   enc3 = enc4 = 64;  } else if (isNaN(chr3)) {   enc4 = 64;  }  output = output +  _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  _keyStr.charAt(enc3) + _keyStr.charAt(enc4); } return output;}

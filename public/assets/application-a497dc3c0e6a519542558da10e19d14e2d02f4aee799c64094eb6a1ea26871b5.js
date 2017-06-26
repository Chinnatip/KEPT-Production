/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.0.3
Copyright © 2017 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r,n=[].slice;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.History=function(){function r(t){this.delegate=t,this.onPageLoad=e(this.onPageLoad,this),this.onPopState=e(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},r.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},r.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(e){return t.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=e(this.onScroll,this),this.onScroll=t.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){
return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
 FB.init({
      appId: '1903426476539943', 
      status: true,
      cookie: true,
      xfbml: true
 });
/*1498239973,,JIT Construction: v3112099,en_US*/

/**
 * Copyright (c) 2017-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use of
 * this software is subject to the Facebook Platform Policy
 * [http://developers.facebook.com/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

try {window.FB|| (function(window, fb_fif_window) {  var apply = Function.prototype.apply;  function bindContext(fn, thisArg) {    return function _sdkBound() {      return apply.call(fn, thisArg, arguments);    };  }  var global = {    __type: 'JS_SDK_SANDBOX',    window: window,    document: window.document  };  var sandboxWhitelist = [    'setTimeout',    'setInterval',    'clearTimeout',    'clearInterval'  ];  for (var i = 0; i < sandboxWhitelist.length; i++) {    global[sandboxWhitelist[i]] = bindContext(      window[sandboxWhitelist[i]],      window    );  }  (function() {    var self = window;    var __DEV__ = 0;    function emptyFunction() {};    var __transform_includes = {};    var __annotator, __bodyWrapper;    var __w, __t;    var undefined;    with (this) {      (function(){var a={},b=function i(j,k){if(!j&&!k)return null;var l={};if(typeof j!=='undefined')l.type=j;if(typeof k!=='undefined')l.signature=k;return l;},c=function i(j,k){return b(j&&/^[A-Z]/.test(j)?j:undefined,k&&(k.params&&k.params.length||k.returns)?'function('+(k.params?k.params.map(function(l){return /\?/.test(l)?'?'+l.replace('?',''):l;}).join(','):'')+')'+(k.returns?':'+k.returns:''):undefined);},d=function i(j,k,l){return j;},e=function i(j,k,l){if('sourcemeta' in __transform_includes)j.__SMmeta=k;if('typechecks' in __transform_includes){var m=c(k?k.name:undefined,l);if(m)__w(j,m);}return j;},f=function i(j,k,l){return l.apply(j,k);},g=function i(j,k,l,m){if(m&&m.params)__t.apply(j,m.params);var n=l.apply(j,k);if(m&&m.returns)__t([n,m.returns]);return n;},h=function i(j,k,l,m,n){if(n){if(!n.callId)n.callId=n.module+':'+(n.line||0)+':'+(n.column||0);var o=n.callId;a[o]=(a[o]||0)+1;}return l.apply(j,k);};if(typeof __transform_includes==='undefined'){__annotator=d;__bodyWrapper=f;}else{__annotator=e;if('codeusage' in __transform_includes){__annotator=d;__bodyWrapper=h;__bodyWrapper.getCodeUsage=function(){return a;};__bodyWrapper.clearCodeUsage=function(){a={};};}else if('typechecks' in __transform_includes){__bodyWrapper=g;}else __bodyWrapper=f;}})();
__t=function(a){return a[0];};__w=function(a){return a;};
var require,__d;(function(a){var b={},c={},d=['global','require','requireDynamic','requireLazy','module','exports'];require=function(e,f){if(Object.prototype.hasOwnProperty.call(c,e))return c[e];if(!Object.prototype.hasOwnProperty.call(b,e)){if(f)return null;throw new Error('Module '+e+' has not been defined');}var g=b[e],h=g.deps,i=g.factory.length,j,k=[];for(var l=0;l<i;l++){switch(h[l]){case 'module':j=g;break;case 'exports':j=g.exports;break;case 'global':j=a;break;case 'require':j=require;break;case 'requireDynamic':j=null;break;case 'requireLazy':j=null;break;default:j=require.call(null,h[l]);}k.push(j);}g.factory.apply(a,k);c[e]=g.exports;return g.exports;};__d=function(e,f,g,h){if(typeof g=='function'){b[e]={factory:g,deps:d.concat(f),exports:{}};if(h===3)require.call(null,e);}else c[e]=g;};})(this);
__d('ES5Array',[],(function a(b,c,d,e,f,g){var h={};h.isArray=function(i){return Object.prototype.toString.call(i)=='[object Array]';};f.exports=h;}),null);
__d('ES5ArrayPrototype',[],(function a(b,c,d,e,f,g){var h={};h.map=function(i,j){if(typeof i!='function')throw new TypeError();var k=void 0,l=this.length,m=new Array(l);for(k=0;k<l;++k)if(k in this)m[k]=i.call(j,this[k],k,this);return m;};h.forEach=function(i,j){h.map.call(this,i,j);};h.filter=function(i,j){if(typeof i!='function')throw new TypeError();var k=void 0,l=void 0,m=this.length,n=[];for(k=0;k<m;++k)if(k in this){l=this[k];if(i.call(j,l,k,this))n.push(l);}return n;};h.every=function(i,j){if(typeof i!='function')throw new TypeError();var k=new Object(this),l=k.length;for(var m=0;m<l;m++)if(m in k)if(!i.call(j,k[m],m,k))return false;return true;};h.some=function(i,j){if(typeof i!='function')throw new TypeError();var k=new Object(this),l=k.length;for(var m=0;m<l;m++)if(m in k)if(i.call(j,k[m],m,k))return true;return false;};h.indexOf=function(i,j){var k=this.length;j|=0;if(j<0)j+=k;for(;j<k;j++)if(j in this&&this[j]===i)return j;return -1;};f.exports=h;}),null);
__d("ES5Date",[],(function a(b,c,d,e,f,g){var h={};h.now=function(){return new Date().getTime();};f.exports=h;}),null);
__d('ES5FunctionPrototype',[],(function a(b,c,d,e,f,g){var h={};h.bind=function(i){if(typeof this!='function')throw new TypeError('Bind must be called on a function');var j=this,k=Array.prototype.slice.call(arguments,1);function l(){return j.apply(i,k.concat(Array.prototype.slice.call(arguments)));}l.displayName='bound:'+(j.displayName||j.name||'(?)');l.toString=function m(){return 'bound: '+j;};return l;};f.exports=h;}),null);
__d('ie8DontEnum',[],(function a(b,c,d,e,f,g){var h=['toString','toLocaleString','valueOf','hasOwnProperty','isPrototypeOf','prototypeIsEnumerable','constructor'],i={}.hasOwnProperty,j=function k(){};if({toString:true}.propertyIsEnumerable('toString'))j=function k(l,m){for(var n=0;n<h.length;n++){var o=h[n];if(i.call(l,o))m(o);}};f.exports=j;}),null);
__d('ES5Object',['ie8DontEnum'],(function a(b,c,d,e,f,g,h){var i={}.hasOwnProperty,j={};function k(){}j.create=function(l){var m=typeof l;if(m!='object'&&m!='function')throw new TypeError('Object prototype may only be a Object or null');k.prototype=l;return new k();};j.keys=function(l){var m=typeof l;if(m!='object'&&m!='function'||l===null)throw new TypeError('Object.keys called on non-object');var n=[];for(var o in l)if(i.call(l,o))n.push(o);h(l,function(p){return n.push(p);});return n;};f.exports=j;}),null);
__d('ES5StringPrototype',[],(function a(b,c,d,e,f,g){var h={};h.trim=function(){if(this==null)throw new TypeError('String.prototype.trim called on null or undefined');return String.prototype.replace.call(this,/^\s+|\s+$/g,'');};h.startsWith=function(i){var j=String(this);if(this==null)throw new TypeError('String.prototype.startsWith called on null or undefined');var k=arguments.length>1?Number(arguments[1]):0;if(isNaN(k))k=0;var l=Math.min(Math.max(k,0),j.length);return j.indexOf(String(i),k)==l;};h.endsWith=function(i){var j=String(this);if(this==null)throw new TypeError('String.prototype.endsWith called on null or undefined');var k=j.length,l=String(i),m=arguments.length>1?Number(arguments[1]):k;if(isNaN(m))m=0;var n=Math.min(Math.max(m,0),k),o=n-l.length;if(o<0)return false;return j.lastIndexOf(l,o)==o;};h.includes=function(i){if(this==null)throw new TypeError('String.prototype.contains called on null or undefined');var j=String(this),k=arguments.length>1?Number(arguments[1]):0;if(isNaN(k))k=0;return j.indexOf(String(i),k)!=-1;};h.contains=h.includes;h.repeat=function(i){if(this==null)throw new TypeError('String.prototype.repeat called on null or undefined');var j=String(this),k=i?Number(i):0;if(isNaN(k))k=0;if(k<0||k===Infinity)throw RangeError();if(k===1)return j;if(k===0)return '';var l='';while(k){if(k&1)l+=j;if(k>>=1)j+=j;}return l;};f.exports=h;}),null);
__d('ES6Array',[],(function a(b,c,d,e,f,g){'use strict';var h={from:function i(j){if(j==null)throw new TypeError('Object is null or undefined');var k=arguments[1],l=arguments[2],m=this,n=Object(j),o=typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator',p=typeof k==='function',q=typeof n[o]==='function',r=0,s=void 0,t=void 0;if(q){s=typeof m==='function'?new m():[];var u=n[o](),v=void 0;while(!(v=u.next()).done){t=v.value;if(p)t=k.call(l,t,r);s[r]=t;r+=1;}s.length=r;return s;}var w=n.length;if(isNaN(w)||w<0)w=0;s=typeof m==='function'?new m(w):new Array(w);while(r<w){t=n[r];if(p)t=k.call(l,t,r);s[r]=t;r+=1;}s.length=r;return s;}};f.exports=h;}),null);
__d('ES6ArrayPrototype',[],(function a(b,c,d,e,f,g){var h={find:function i(j,k){if(this==null)throw new TypeError('Array.prototype.find called on null or undefined');if(typeof j!=='function')throw new TypeError('predicate must be a function');var l=h.findIndex.call(this,j,k);return l===-1?void 0:this[l];},findIndex:function i(j,k){if(this==null)throw new TypeError('Array.prototype.findIndex called on null or undefined');if(typeof j!=='function')throw new TypeError('predicate must be a function');var l=Object(this),m=l.length>>>0;for(var n=0;n<m;n++)if(j.call(k,l[n],n,l))return n;return -1;},fill:function i(j){if(this==null)throw new TypeError('Array.prototype.fill called on null or undefined');var k=Object(this),l=k.length>>>0,m=arguments[1],n=m>>0,o=n<0?Math.max(l+n,0):Math.min(n,l),p=arguments[2],q=p===undefined?l:p>>0,r=q<0?Math.max(l+q,0):Math.min(q,l);while(o<r){k[o]=j;o++;}return k;}};f.exports=h;}),null);
__d('ES6DatePrototype',[],(function a(b,c,d,e,f,g){function h(j){return (j<10?'0':'')+j;}var i={toISOString:function j(){if(!isFinite(this))throw new Error('Invalid time value');var k=this.getUTCFullYear();k=(k<0?'-':k>9999?'+':'')+('00000'+Math.abs(k)).slice(0<=k&&k<=9999?-4:-6);return k+'-'+h(this.getUTCMonth()+1)+'-'+h(this.getUTCDate())+'T'+h(this.getUTCHours())+':'+h(this.getUTCMinutes())+':'+h(this.getUTCSeconds())+'.'+(this.getUTCMilliseconds()/1000).toFixed(3).slice(2,5)+'Z';}};f.exports=i;}),null);
__d('ES6Number',[],(function a(b,c,d,e,f,g){var h=Math.pow(2,-52),i=Math.pow(2,53)-1,j=-1*i,k={isFinite:function(l){function m(n){return l.apply(this,arguments);}m.toString=function(){return l.toString();};return m;}(function(l){return typeof l=='number'&&isFinite(l);}),isNaN:function(l){function m(n){return l.apply(this,arguments);}m.toString=function(){return l.toString();};return m;}(function(l){return typeof l=='number'&&isNaN(l);}),isInteger:function l(m){return this.isFinite(m)&&Math.floor(m)===m;},isSafeInteger:function l(m){return this.isFinite(m)&&m>=this.MIN_SAFE_INTEGER&&m<=this.MAX_SAFE_INTEGER&&Math.floor(m)===m;},EPSILON:h,MAX_SAFE_INTEGER:i,MIN_SAFE_INTEGER:j};f.exports=k;}),null);
__d('ES6Object',['ie8DontEnum'],(function a(b,c,d,e,f,g,h){var i={}.hasOwnProperty,j={assign:function k(l){if(l==null)throw new TypeError('Object.assign target cannot be null or undefined');l=Object(l);for(var m=arguments.length,n=Array(m>1?m-1:0),o=1;o<m;o++)n[o-1]=arguments[o];for(var p=0;p<n.length;p++){var q=n[p];if(q==null)continue;q=Object(q);for(var r in q)if(i.call(q,r))l[r]=q[r];h(q,function(s){return l[s]=q[s];});}return l;},is:function k(l,m){if(l===m){return l!==0||1/l===1/m;}else return l!==l&&m!==m;}};f.exports=j;}),null);
__d('ES7ArrayPrototype',['ES5ArrayPrototype','ES5Array'],(function a(b,c,d,e,f,g,h,i){var j=h.indexOf,k=i.isArray;function l(p){return Math.min(Math.max(m(p),0),Number.MAX_SAFE_INTEGER);}function m(p){var q=Number(p);return isFinite(q)&&q!==0?n(q)*Math.floor(Math.abs(q)):q;}function n(p){return p>=0?1:-1;}var o={includes:function p(q){'use strict';if(q!==undefined&&k(this)&&!(typeof q==='number'&&isNaN(q)))return j.apply(this,arguments)!==-1;var r=Object(this),s=r.length?l(r.length):0;if(s===0)return false;var t=arguments.length>1?m(arguments[1]):0,u=t<0?Math.max(s+t,0):t,v=isNaN(q)&&typeof q==='number';while(u<s){var w=r[u];if(w===q||typeof w==='number'&&v&&isNaN(w))return true;u++;}return false;}};f.exports=o;}),null);
__d('ES7Object',['ie8DontEnum'],(function a(b,c,d,e,f,g,h){var i={}.hasOwnProperty,j={};j.entries=function(k){if(k==null)throw new TypeError('Object.entries called on non-object');var l=[];for(var m in k)if(i.call(k,m))l.push([m,k[m]]);h(k,function(n){return l.push([n,k[n]]);});return l;};j.values=function(k){if(k==null)throw new TypeError('Object.values called on non-object');var l=[];for(var m in k)if(i.call(k,m))l.push(k[m]);h(k,function(n){return l.push(k[n]);});return l;};f.exports=j;}),null);
__d('ES7StringPrototype',[],(function a(b,c,d,e,f,g){var h={};h.trimLeft=function(){return this.replace(/^\s+/,'');};h.trimRight=function(){return this.replace(/\s+$/,'');};f.exports=h;}),null);
/**
 * @providesModule JSON3
 * @preserve-header
 *
 *! JSON v3.2.3 | http://bestiejs.github.com/json3 | Copyright 2012, Kit Cambridge | http://kit.mit-license.org
 */__d("JSON3",[],(function a(b,c,d,e,f,g){(function(){var h={}.toString,i,j,k,l=f.exports={},m='{"A":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}',n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ba,ca=new Date(-3509827334573292),da,ea,fa;try{ca=ca.getUTCFullYear()==-109252&&ca.getUTCMonth()===0&&ca.getUTCDate()==1&&ca.getUTCHours()==10&&ca.getUTCMinutes()==37&&ca.getUTCSeconds()==6&&ca.getUTCMilliseconds()==708;}catch(ga){}if(!ca){da=Math.floor;ea=[0,31,59,90,120,151,181,212,243,273,304,334];fa=function(ga,ha){return ea[ha]+365*(ga-1970)+da((ga-1969+(ha=+(ha>1)))/4)-da((ga-1901+ha)/100)+da((ga-1601+ha)/400);};}if(typeof JSON=="object"&&JSON){l.stringify=JSON.stringify;l.parse=JSON.parse;}if(n=typeof l.stringify=="function"&&!fa){(ca=function(){return 1;}).toJSON=ca;try{n=l.stringify(0)==="0"&&l.stringify(new Number())==="0"&&l.stringify(new String())=='""'&&l.stringify(h)===k&&l.stringify(k)===k&&l.stringify()===k&&l.stringify(ca)==="1"&&l.stringify([ca])=="[1]"&&l.stringify([k])=="[null]"&&l.stringify(null)=="null"&&l.stringify([k,h,null])=="[null,null,null]"&&l.stringify({result:[ca,true,false,null,"\0\b\n\f\r\t"]})==m&&l.stringify(null,ca)==="1"&&l.stringify([1,2],null,1)=="[\n 1,\n 2\n]"&&l.stringify(new Date(-8.64e+15))=='"-271821-04-20T00:00:00.000Z"'&&l.stringify(new Date(8.64e+15))=='"+275760-09-13T00:00:00.000Z"'&&l.stringify(new Date(-62198755200000))=='"-000001-01-01T00:00:00.000Z"'&&l.stringify(new Date(-1))=='"1969-12-31T23:59:59.999Z"';}catch(ga){n=false;}}if(typeof l.parse=="function")try{if(l.parse("0")===0&&!l.parse(false)){ca=l.parse(m);if(s=ca.A.length==5&&ca.A[0]==1){try{s=!l.parse('"\t"');}catch(ga){}if(s)try{s=l.parse("01")!=1;}catch(ga){}}}}catch(ga){s=false;}ca=m=null;if(!n||!s){if(!(i={}.hasOwnProperty))i=function(ga){var ha={},ia;if((ha.__proto__=null,ha.__proto__={toString:1},ha).toString!=h){i=function(ja){var ka=this.__proto__,la=ja in (this.__proto__=null,this);this.__proto__=ka;return la;};}else{ia=ha.constructor;i=function(ja){var ka=(this.constructor||ia).prototype;return ja in this&&!(ja in ka&&this[ja]===ka[ja]);};}ha=null;return i.call(this,ga);};j=function(ga,ha){var ia=0,ja,ka,la,ma;(ja=function(){this.valueOf=0;}).prototype.valueOf=0;ka=new ja();for(la in ka)if(i.call(ka,la))ia++;ja=ka=null;if(!ia){ka=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"];ma=function(na,oa){var pa=h.call(na)=="[object Function]",qa,ra;for(qa in na)if(!(pa&&qa=="prototype")&&i.call(na,qa))oa(qa);for(ra=ka.length;qa=ka[--ra];i.call(na,qa)&&oa(qa));};}else if(ia==2){ma=function(na,oa){var pa={},qa=h.call(na)=="[object Function]",ra;for(ra in na)if(!(qa&&ra=="prototype")&&!i.call(pa,ra)&&(pa[ra]=1)&&i.call(na,ra))oa(ra);};}else ma=function(na,oa){var pa=h.call(na)=="[object Function]",qa,ra;for(qa in na)if(!(pa&&qa=="prototype")&&i.call(na,qa)&&!(ra=qa==="constructor"))oa(qa);if(ra||i.call(na,qa="constructor"))oa(qa);};return ma(ga,ha);};if(!n){o={"\\":"\\\\",'"':'\\"',"\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"};p=function(ga,ha){return ("000000"+(ha||0)).slice(-ga);};q=function(ga){var ha='"',ia=0,ja;for(;ja=ga.charAt(ia);ia++)ha+='\\"\b\f\n\r\t'.indexOf(ja)>-1?o[ja]:ja<" "?"\\u00"+p(2,ja.charCodeAt(0).toString(16)):ja;return ha+'"';};r=function(ga,ha,ia,ja,ka,la,ma){var na=ha[ga],oa,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,ab,bb,cb;if(typeof na=="object"&&na){oa=h.call(na);if(oa=="[object Date]"&&!i.call(na,"toJSON")){if(na>-1/0&&na<1/0){if(fa){ra=da(na/86400000);for(pa=da(ra/365.2425)+1970-1;fa(pa+1,0)<=ra;pa++);for(qa=da((ra-fa(pa,0))/30.42);fa(pa,qa+1)<=ra;qa++);ra=1+ra-fa(pa,qa);sa=(na%86400000+86400000)%86400000;ta=da(sa/3600000)%24;ua=da(sa/60000)%60;va=da(sa/1000)%60;wa=sa%1000;}else{pa=na.getUTCFullYear();qa=na.getUTCMonth();ra=na.getUTCDate();ta=na.getUTCHours();ua=na.getUTCMinutes();va=na.getUTCSeconds();wa=na.getUTCMilliseconds();}na=(pa<=0||pa>=10000?(pa<0?"-":"+")+p(6,pa<0?-pa:pa):p(4,pa))+"-"+p(2,qa+1)+"-"+p(2,ra)+"T"+p(2,ta)+":"+p(2,ua)+":"+p(2,va)+"."+p(3,wa)+"Z";}else na=null;}else if(typeof na.toJSON=="function"&&(oa!="[object Number]"&&oa!="[object String]"&&oa!="[object Array]"||i.call(na,"toJSON")))na=na.toJSON(ga);}if(ia)na=ia.call(ha,ga,na);if(na===null)return "null";oa=h.call(na);if(oa=="[object Boolean]"){return ""+na;}else if(oa=="[object Number]"){return na>-1/0&&na<1/0?""+na:"null";}else if(oa=="[object String]")return q(na);if(typeof na=="object"){for(ab=ma.length;ab--;)if(ma[ab]===na)throw TypeError();ma.push(na);xa=[];bb=la;la+=ka;if(oa=="[object Array]"){for(za=0,ab=na.length;za<ab;cb||(cb=true),za++){ya=r(za,na,ia,ja,ka,la,ma);xa.push(ya===k?"null":ya);}return cb?ka?"[\n"+la+xa.join(",\n"+la)+"\n"+bb+"]":"["+xa.join(",")+"]":"[]";}else{j(ja||na,function(db){var eb=r(db,na,ia,ja,ka,la,ma);if(eb!==k)xa.push(q(db)+":"+(ka?" ":"")+eb);cb||(cb=true);});return cb?ka?"{\n"+la+xa.join(",\n"+la)+"\n"+bb+"}":"{"+xa.join(",")+"}":"{}";}ma.pop();}};l.stringify=function(ga,ha,ia){var ja,ka,la,ma,na,oa;if(typeof ha=="function"||typeof ha=="object"&&ha)if(h.call(ha)=="[object Function]"){ka=ha;}else if(h.call(ha)=="[object Array]"){la={};for(ma=0,na=ha.length;ma<na;oa=ha[ma++],(h.call(oa)=="[object String]"||h.call(oa)=="[object Number]")&&(la[oa]=1));}if(ia)if(h.call(ia)=="[object Number]"){if((ia-=ia%1)>0)for(ja="",ia>10&&(ia=10);ja.length<ia;ja+=" ");}else if(h.call(ia)=="[object String]")ja=ia.length<=10?ia:ia.slice(0,10);return r("",(oa={},oa[""]=ga,oa),ka,la,ja,"",[]);};}if(!s){t=String.fromCharCode;u={"\\":"\\",'"':'"',"/":"/",b:"\b",t:"\t",n:"\n",f:"\f",r:"\r"};v=function(){aa=ba=null;throw SyntaxError();};w=function(){var ga=ba,ha=ga.length,ia,ja,ka,la,ma;while(aa<ha){ia=ga.charAt(aa);if("\t\r\n ".indexOf(ia)>-1){aa++;}else if("{}[]:,".indexOf(ia)>-1){aa++;return ia;}else if(ia=='"'){for(ja="@",aa++;aa<ha;){ia=ga.charAt(aa);if(ia<" "){v();}else if(ia=="\\"){ia=ga.charAt(++aa);if('\\"/btnfr'.indexOf(ia)>-1){ja+=u[ia];aa++;}else if(ia=="u"){ka=++aa;for(la=aa+4;aa<la;aa++){ia=ga.charAt(aa);if(!(ia>="0"&&ia<="9"||ia>="a"&&ia<="f"||ia>="A"&&ia<="F"))v();}ja+=t("0x"+ga.slice(ka,aa));}else v();}else{if(ia=='"')break;ja+=ia;aa++;}}if(ga.charAt(aa)=='"'){aa++;return ja;}v();}else{ka=aa;if(ia=="-"){ma=true;ia=ga.charAt(++aa);}if(ia>="0"&&ia<="9"){if(ia=="0"&&(ia=ga.charAt(aa+1),ia>="0"&&ia<="9"))v();ma=false;for(;aa<ha&&(ia=ga.charAt(aa),ia>="0"&&ia<="9");aa++);if(ga.charAt(aa)=="."){la=++aa;for(;la<ha&&(ia=ga.charAt(la),ia>="0"&&ia<="9");la++);if(la==aa)v();aa=la;}ia=ga.charAt(aa);if(ia=="e"||ia=="E"){ia=ga.charAt(++aa);if(ia=="+"||ia=="-")aa++;for(la=aa;la<ha&&(ia=ga.charAt(la),ia>="0"&&ia<="9");la++);if(la==aa)v();aa=la;}return +ga.slice(ka,aa);}if(ma)v();if(ga.slice(aa,aa+4)=="true"){aa+=4;return true;}else if(ga.slice(aa,aa+5)=="false"){aa+=5;return false;}else if(ga.slice(aa,aa+4)=="null"){aa+=4;return null;}v();}}return "$";};x=function(ga){var ha,ia,ja;if(ga=="$")v();if(typeof ga=="string"){if(ga.charAt(0)=="@")return ga.slice(1);if(ga=="["){ha=[];for(;;ia||(ia=true)){ga=w();if(ga=="]")break;if(ia)if(ga==","){ga=w();if(ga=="]")v();}else v();if(ga==",")v();ha.push(x(ga));}return ha;}else if(ga=="{"){ha={};for(;;ia||(ia=true)){ga=w();if(ga=="}")break;if(ia)if(ga==","){ga=w();if(ga=="}")v();}else v();if(ga==","||typeof ga!="string"||ga.charAt(0)!="@"||w()!=":")v();ha[ga.slice(1)]=x(w());}return ha;}v();}return ga;};z=function(ga,ha,ia){var ja=y(ga,ha,ia);if(ja===k){delete ga[ha];}else ga[ha]=ja;};y=function(ga,ha,ia){var ja=ga[ha],ka;if(typeof ja=="object"&&ja)if(h.call(ja)=="[object Array]"){for(ka=ja.length;ka--;)z(ja,ka,ia);}else j(ja,function(la){z(ja,la,ia);});return ia.call(ga,ha,ja);};l.parse=function(ga,ha){aa=0;ba=ga;var ia=x(w());if(w()!="$")v();aa=ba=null;return ha&&h.call(ha)=="[object Function]"?y((ca={},ca[""]=ia,ca),"",ha):ia;};}}}).call(this);}),null);
__d('ES',['ES5ArrayPrototype','ES5FunctionPrototype','ES5StringPrototype','ES5Array','ES5Object','ES5Date','JSON3','ES6Array','ES6Object','ES6ArrayPrototype','ES6DatePrototype','ES6Number','ES7StringPrototype','ES7Object','ES7ArrayPrototype'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){var w={}.toString,x={'JSON.stringify':n.stringify,'JSON.parse':n.parse},y={'Array.prototype':h,'Function.prototype':i,'String.prototype':j,Object:l,Array:k,Date:m},z={Object:p,'Array.prototype':q,'Date.prototype':r,Number:s,Array:o},aa={Object:u,'String.prototype':t,'Array.prototype':v};function ba(da){for(var ea in da){if(!Object.prototype.hasOwnProperty.call(da,ea))continue;var fa=da[ea],ga=ea.split('.');if(ga.length===2){var ha=ga[0],ia=ga[1];if(!ha||!ia||!window[ha]||!window[ha][ia]){var ja=ha?window[ha]:'-',ka=ha&&window[ha]&&ia?window[ha][ia]:'-';throw new Error('Unexpected state (t11975770): '+(ha+', '+ia+', '+ja+', '+ka+', '+ea));}}var la=ga.length===2?window[ga[0]][ga[1]]:window[ea];for(var ma in fa){if(!Object.prototype.hasOwnProperty.call(fa,ma))continue;if(typeof fa[ma]!=='function'){x[ea+'.'+ma]=fa[ma];continue;}var na=la[ma];x[ea+'.'+ma]=na&&/\{\s+\[native code\]\s\}/.test(na)?na:fa[ma];}}}ba(y);ba(z);ba(aa);function ca(da,ea,fa){var ga=fa?w.call(da).slice(8,-1)+'.prototype':da,ha=x[ga+'.'+ea]||da[ea];if(typeof ha==='function'){for(var ia=arguments.length,ja=Array(ia>3?ia-3:0),ka=3;ka<ia;ka++)ja[ka-3]=arguments[ka];return ha.apply(da,ja);}else if(ha)return ha;throw new Error('Polyfill '+ga+' does not have implementation of '+ea);}f.exports=ca;}),null);
__d('ES5FunctionPrototype',[],(function a(b,c,d,e,f,g){var h={};h.bind=function(i){if(typeof this!='function')throw new TypeError('Bind must be called on a function');var j=this,k=Array.prototype.slice.call(arguments,1);function l(){return j.apply(i,k.concat(Array.prototype.slice.call(arguments)));}l.displayName='bound:'+(j.displayName||j.name||'(?)');l.toString=function m(){return 'bound: '+j;};return l;};f.exports=h;}),null);
__d('ie8DontEnum',[],(function a(b,c,d,e,f,g){var h=['toString','toLocaleString','valueOf','hasOwnProperty','isPrototypeOf','prototypeIsEnumerable','constructor'],i={}.hasOwnProperty,j=function k(){};if({toString:true}.propertyIsEnumerable('toString'))j=function k(l,m){for(var n=0;n<h.length;n++){var o=h[n];if(i.call(l,o))m(o);}};f.exports=j;}),null);
__d('ES5Object',['ie8DontEnum'],(function a(b,c,d,e,f,g,h){var i={}.hasOwnProperty,j={};function k(){}j.create=function(l){var m=typeof l;if(m!='object'&&m!='function')throw new TypeError('Object prototype may only be a Object or null');k.prototype=l;return new k();};j.keys=function(l){var m=typeof l;if(m!='object'&&m!='function'||l===null)throw new TypeError('Object.keys called on non-object');var n=[];for(var o in l)if(i.call(l,o))n.push(o);h(l,function(p){return n.push(p);});return n;};f.exports=j;}),null);
__d('ES6Object',['ie8DontEnum'],(function a(b,c,d,e,f,g,h){var i={}.hasOwnProperty,j={assign:function k(l){if(l==null)throw new TypeError('Object.assign target cannot be null or undefined');l=Object(l);for(var m=arguments.length,n=Array(m>1?m-1:0),o=1;o<m;o++)n[o-1]=arguments[o];for(var p=0;p<n.length;p++){var q=n[p];if(q==null)continue;q=Object(q);for(var r in q)if(i.call(q,r))l[r]=q[r];h(q,function(s){return l[s]=q[s];});}return l;},is:function k(l,m){if(l===m){return l!==0||1/l===1/m;}else return l!==l&&m!==m;}};f.exports=j;}),null);
__d('sdk.babelHelpers',['ES5FunctionPrototype','ES5Object','ES6Object'],(function a(b,c,d,e,f,g,h,i,j){var k={},l=Object.prototype.hasOwnProperty;k.inherits=function(m,n){j.assign(m,n);m.prototype=i.create(n&&n.prototype);m.prototype.constructor=m;m.__superConstructor__=n;return n;};k._extends=j.assign;k['extends']=k._extends;k.objectWithoutProperties=function(m,n){var o={};for(var p in m){if(!l.call(m,p)||n.indexOf(p)>=0)continue;o[p]=m[p];}return o;};k.taggedTemplateLiteralLoose=function(m,n){m.raw=n;return m;};k.bind=h.bind;f.exports=k;}),null);      var ES = require('ES');      var babelHelpers = require('sdk.babelHelpers');      (function(a,b){var c='keys',d='values',e='entries',f=function(){var l=h(Array),m=void 0;if(!l)m=function(){function n(o,p){'use strict';this.$ArrayIterator1=o;this.$ArrayIterator2=p;this.$ArrayIterator3=0;}n.prototype.next=function(){'use strict';if(this.$ArrayIterator1==null)return {value:b,done:true};var o=this.$ArrayIterator1,p=this.$ArrayIterator1.length,q=this.$ArrayIterator3,r=this.$ArrayIterator2;if(q>=p){this.$ArrayIterator1=b;return {value:b,done:true};}this.$ArrayIterator3=q+1;if(r===c){return {value:q,done:false};}else if(r===d){return {value:o[q],done:false};}else if(r===e)return {value:[q,o[q]],done:false};};n.prototype[typeof Symbol==='function'?Symbol.iterator:'@@iterator']=function(){'use strict';return this;};return n;}();return {keys:l?function(n){return n.keys();}:function(n){return new m(n,c);},values:l?function(n){return n.values();}:function(n){return new m(n,d);},entries:l?function(n){return n.entries();}:function(n){return new m(n,e);}};}(),g=function(){var l=h(String),m=void 0;if(!l)m=function(){function n(o){'use strict';this.$StringIterator1=o;this.$StringIterator2=0;}n.prototype.next=function(){'use strict';if(this.$StringIterator1==null)return {value:b,done:true};var o=this.$StringIterator2,p=this.$StringIterator1,q=p.length;if(o>=q){this.$StringIterator1=b;return {value:b,done:true};}var r=void 0,s=p.charCodeAt(o);if(s<55296||s>56319||o+1===q){r=p[o];}else{var t=p.charCodeAt(o+1);if(t<56320||t>57343){r=p[o];}else r=p[o]+p[o+1];}this.$StringIterator2=o+r.length;return {value:r,done:false};};n.prototype[typeof Symbol==='function'?Symbol.iterator:'@@iterator']=function(){'use strict';return this;};return n;}();return {keys:function n(){throw TypeError('Strings default iterator doesn\'t implement keys.');},values:l?function(n){return n[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();}:function(n){return new m(n);},entries:function n(){throw TypeError('Strings default iterator doesn\'t implement entries.');}};}();function h(l){return typeof l.prototype[typeof Symbol==='function'?Symbol.iterator:'@@iterator']==='function'&&typeof l.prototype.values==='function'&&typeof l.prototype.keys==='function'&&typeof l.prototype.entries==='function';}function i(l,m){'use strict';this.$ObjectIterator1=l;this.$ObjectIterator2=m;this.$ObjectIterator3=ES('Object','keys',false,l);this.$ObjectIterator4=0;}i.prototype.next=function(){'use strict';var l=this.$ObjectIterator3.length,m=this.$ObjectIterator4,n=this.$ObjectIterator2,o=this.$ObjectIterator3[m];if(m>=l){this.$ObjectIterator1=b;return {value:b,done:true};}this.$ObjectIterator4=m+1;if(n===c){return {value:o,done:false};}else if(n===d){return {value:this.$ObjectIterator1[o],done:false};}else if(n===e)return {value:[o,this.$ObjectIterator1[o]],done:false};};i.prototype[typeof Symbol==='function'?Symbol.iterator:'@@iterator']=function(){'use strict';return this;};var j={keys:function l(m){return new i(m,c);},values:function l(m){return new i(m,d);},entries:function l(m){return new i(m,e);}};function k(l,m){if(typeof l==='string'){return g[m||d](l);}else if(ES('Array','isArray',false,l)){return f[m||d](l);}else if(l[typeof Symbol==='function'?Symbol.iterator:'@@iterator']){return l[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();}else return j[m||e](l);}ES('Object','assign',false,k,{KIND_KEYS:c,KIND_VALUES:d,KIND_ENTRIES:e,keys:function l(m){return k(m,c);},values:function l(m){return k(m,d);},entries:function l(m){return k(m,e);},generic:j.entries});a.FB_enumerate=k;})(typeof global==='undefined'?this:global);
(function(a,b){var c=a.window||a;function d(){return 'f'+(Math.random()*(1<<30)).toString(16).replace('.','');}function e(j){var k=j?j.ownerDocument||j:document,l=k.defaultView||c;return !!(j&&(typeof l.Node==='function'?j instanceof l.Node:typeof j==='object'&&typeof j.nodeType==='number'&&typeof j.nodeName==='string'));}function f(j){var k=c[j];if(k==null)return true;if(typeof c.Symbol!=='function')return true;var l=k.prototype;return k==null||typeof k!=='function'||typeof l.clear!=='function'||new k().size!==0||typeof l.keys!=='function'||typeof l['for'+'Each']!=='function';}var g=a.FB_enumerate,h=function(){if(!f('Map'))return c.Map;var j='key',k='value',l='key+value',m='$map_',n=void 0,o='IE_HASH_';function p(ba){'use strict';if(!u(this))throw new TypeError('Wrong map object type.');t(this);if(ba!=null){var ca=g(ba),da=void 0;while(!(da=ca.next()).done){if(!u(da.value))throw new TypeError('Expected iterable items to be pair objects.');this.set(da.value[0],da.value[1]);}}}p.prototype.clear=function(){'use strict';t(this);};p.prototype.has=function(ba){'use strict';var ca=r(this,ba);return !!(ca!=null&&this._mapData[ca]);};p.prototype.set=function(ba,ca){'use strict';var da=r(this,ba);if(da!=null&&this._mapData[da]){this._mapData[da][1]=ca;}else{da=this._mapData.push([ba,ca])-1;s(this,ba,da);this.size+=1;}return this;};p.prototype.get=function(ba){'use strict';var ca=r(this,ba);if(ca==null){return b;}else return this._mapData[ca][1];};p.prototype['delete']=function(ba){'use strict';var ca=r(this,ba);if(ca!=null&&this._mapData[ca]){s(this,ba,b);this._mapData[ca]=b;this.size-=1;return true;}else return false;};p.prototype.entries=function(){'use strict';return new q(this,l);};p.prototype.keys=function(){'use strict';return new q(this,j);};p.prototype.values=function(){'use strict';return new q(this,k);};p.prototype.forEach=function(ba,ca){'use strict';if(typeof ba!=='function')throw new TypeError('Callback must be callable.');var da=ES(ba,'bind',true,ca||b),ea=this._mapData;for(var fa=0;fa<ea.length;fa++){var ga=ea[fa];if(ga!=null)da(ga[1],ga[0],this);}};p.prototype[typeof Symbol==='function'?Symbol.iterator:'@@iterator']=function(){'use strict';return this.entries();};function q(ba,ca){'use strict';if(!(u(ba)&&ba._mapData))throw new TypeError('Object is not a map.');if(ES([j,l,k],'indexOf',true,ca)===-1)throw new Error('Invalid iteration kind.');this._map=ba;this._nextIndex=0;this._kind=ca;}q.prototype.next=function(){'use strict';if(!this instanceof p)throw new TypeError('Expected to be called on a MapIterator.');var ba=this._map,ca=this._nextIndex,da=this._kind;if(ba==null)return v(b,true);var ea=ba._mapData;while(ca<ea.length){var fa=ea[ca];ca+=1;this._nextIndex=ca;if(fa)if(da===j){return v(fa[0],false);}else if(da===k){return v(fa[1],false);}else if(da)return v(fa,false);}this._map=b;return v(b,true);};q.prototype[typeof Symbol==='function'?Symbol.iterator:'@@iterator']=function(){'use strict';return this;};function r(ba,ca){if(u(ca)){var da=z(ca);return da?ba._objectIndex[da]:b;}else{var ea=m+ca;if(typeof ca==='string'){return ba._stringIndex[ea];}else return ba._otherIndex[ea];}}function s(ba,ca,da){var ea=da==null;if(u(ca)){var fa=z(ca);if(!fa)fa=aa(ca);if(ea){delete ba._objectIndex[fa];}else ba._objectIndex[fa]=da;}else{var ga=m+ca;if(typeof ca==='string'){if(ea){delete ba._stringIndex[ga];}else ba._stringIndex[ga]=da;}else if(ea){delete ba._otherIndex[ga];}else ba._otherIndex[ga]=da;}}function t(ba){ba._mapData=[];ba._objectIndex={};ba._stringIndex={};ba._otherIndex={};ba.size=0;}function u(ba){return ba!=null&&(typeof ba==='object'||typeof ba==='function');}function v(ba,ca){return {value:ba,done:ca};}p.__isES5=function(){try{Object.defineProperty({},'__.$#x',{});return true;}catch(ba){return false;}}();function w(ba){if(!p.__isES5||!Object.isExtensible){return true;}else return Object.isExtensible(ba);}function x(ba){var ca=void 0;switch(ba.nodeType){case 1:ca=ba.uniqueID;break;case 9:ca=ba.documentElement.uniqueID;break;default:return null;}if(ca){return o+ca;}else return null;}var y=d();function z(ba){if(ba[y]){return ba[y];}else if(!p.__isES5&&ba.propertyIsEnumerable&&ba.propertyIsEnumerable[y]){return ba.propertyIsEnumerable[y];}else if(!p.__isES5&&e(ba)&&x(ba)){return x(ba);}else if(!p.__isES5&&ba[y])return ba[y];}var aa=function(){var ba=Object.prototype.propertyIsEnumerable,ca=0;return function da(ea){if(w(ea)){ca+=1;if(p.__isES5){Object.defineProperty(ea,y,{enumerable:false,writable:false,configurable:false,value:ca});}else if(ea.propertyIsEnumerable){ea.propertyIsEnumerable=function(){return ba.apply(this,arguments);};ea.propertyIsEnumerable[y]=ca;}else if(e(ea)){ea[y]=ca;}else throw new Error('Unable to set a non-enumerable property on object.');return ca;}else throw new Error('Non-extensible objects are not allowed as keys.');};}();return __annotator(p,{name:'Map'});}(),i=function(){if(!f('Set'))return c.Set;function j(l){'use strict';if(this==null||typeof this!=='object'&&typeof this!=='function')throw new TypeError('Wrong set object type.');k(this);if(l!=null){var m=g(l),n=void 0;while(!(n=m.next()).done)this.add(n.value);}}j.prototype.add=function(l){'use strict';this._map.set(l,l);this.size=this._map.size;return this;};j.prototype.clear=function(){'use strict';k(this);};j.prototype['delete']=function(l){'use strict';var m=this._map['delete'](l);this.size=this._map.size;return m;};j.prototype.entries=function(){'use strict';return this._map.entries();};j.prototype.forEach=function(l){'use strict';var m=arguments[1],n=this._map.keys(),o=void 0;while(!(o=n.next()).done)l.call(m,o.value,o.value,this);};j.prototype.has=function(l){'use strict';return this._map.has(l);};j.prototype.values=function(){'use strict';return this._map.values();};j.prototype.keys=function(){'use strict';return this.values();};j.prototype[typeof Symbol==='function'?Symbol.iterator:'@@iterator']=function(){'use strict';return this.values();};function k(l){l._map=new h();l.size=l._map.size;}return __annotator(j,{name:'Set'});}();a.Map=h;a.Set=i;})(typeof global==='undefined'?this:global);      __d("UrlMapConfig",[],{"www":"www.facebook.com","m":"m.facebook.com","connect":"connect.facebook.net","business":"business.facebook.com","api_https":"api.facebook.com","api_read_https":"api.facebook.com","graph_https":"graph.facebook.com","an_https":"an.facebook.com","fbcdn_http":"static.xx.fbcdn.net","fbcdn_https":"static.xx.fbcdn.net","cdn_http":"staticxx.facebook.com","cdn_https":"staticxx.facebook.com"});__d("JSSDKRuntimeConfig",[],{"locale":"en_US","rtl":false,"revision":"3112099"});__d("JSSDKConfig",[],{"bustCache":true,"tagCountLogRate":0.01,"errorHandling":{"rate":4},"usePluginPipe":true,"features":{"dialog_resize_refactor":true,"one_comment_controller":true,"allow_non_canvas_app_events":false,"event_subscriptions_log":{"rate":0.01,"value":10000},"should_force_single_dialog_instance":true,"js_sdk_force_status_on_load":true,"js_sdk_mbasic_share_plugin_init":true,"kill_fragment":true,"xfbml_profile_pic_server":true,"error_handling":{"rate":4},"e2e_ping_tracking":{"rate":1.0e-6},"getloginstatus_tracking":{"rate":0.001},"xd_timeout":{"rate":4,"value":30000},"use_bundle":true,"launch_payment_dialog_via_pac":{"rate":100},"plugin_tags_blacklist":["recommendations_bar","registration","activity","recommendations","facepile"],"should_log_response_error":true},"api":{"mode":"warn","whitelist":["AppEvents","AppEvents.EventNames","AppEvents.ParameterNames","AppEvents.activateApp","AppEvents.logEvent","AppEvents.logPageView","AppEvents.logPurchase","AppEvents.setUserID","AppEvents.getUserID","AppEvents.clearUserID","AppEvents.updateUserProperties","Canvas","Canvas.Prefetcher","Canvas.Prefetcher.addStaticResource","Canvas.Prefetcher.setCollectionMode","Canvas.getPageInfo","Canvas.hideFlashElement","Canvas.scrollTo","Canvas.setAutoGrow","Canvas.setDoneLoading","Canvas.setSize","Canvas.setUrlHandler","Canvas.showFlashElement","Canvas.startTimer","Canvas.stopTimer","Event","Event.subscribe","Event.unsubscribe","Music.flashCallback","Music.init","Music.send","Payment","Payment.cancelFlow","Payment.continueFlow","Payment.init","Payment.lockForProcessing","Payment.parse","Payment.setSize","Payment.unlockForProcessing","ThirdPartyProvider","ThirdPartyProvider.init","ThirdPartyProvider.sendData","UA","UA.nativeApp","XFBML","XFBML.RecommendationsBar","XFBML.RecommendationsBar.markRead","XFBML.parse","addFriend","api","getAccessToken","getAuthResponse","getLoginStatus","getUserID","init","login","logout","publish","share","ui","AppEvents.setAppVersion","AppEvents.getAppVersion","AppEvents.clearAppVersion"]},"initSitevars":{"enableMobileComments":1,"iframePermissions":{"read_stream":false,"manage_mailbox":false,"manage_friendlists":false,"read_mailbox":false,"publish_checkins":true,"status_update":true,"photo_upload":true,"video_upload":true,"sms":false,"create_event":true,"rsvp_event":true,"offline_access":true,"email":true,"xmpp_login":false,"create_note":true,"share_item":true,"export_stream":false,"publish_stream":true,"publish_likes":true,"ads_management":false,"contact_email":true,"access_private_data":false,"read_insights":false,"read_requests":false,"read_friendlists":true,"manage_pages":false,"physical_login":false,"manage_groups":false,"read_deals":false}}});__d("JSSDKXDConfig",[],{"XdUrl":"\/connect\/xd_arbiter.php?version=42","XdBundleUrl":"\/connect\/xd_arbiter\/r\/XBwzv5Yrm_1.js?version=42","Flash":{"path":"https:\/\/connect.facebook.net\/rsrc.php\/v2\/yW\/r\/yOZN1vHw3Z_.swf"},"useCdn":true});__d("JSSDKCssConfig",[],{"rules":".fb_hidden{position:absolute;top:-10000px;z-index:10001}.fb_reposition{overflow:hidden;position:relative}.fb_invisible{display:none}.fb_reset{background:none;border:0;border-spacing:0;color:#000;cursor:auto;direction:ltr;font-family:\"lucida grande\", tahoma, verdana, arial, sans-serif;font-size:11px;font-style:normal;font-variant:normal;font-weight:normal;letter-spacing:normal;line-height:1;margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal}.fb_reset>div{overflow:hidden}.fb_link img{border:none}\u0040keyframes fb_transform{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.fb_animate{animation:fb_transform .3s forwards}\n.fb_dialog{background:rgba(82, 82, 82, .7);position:absolute;top:-10000px;z-index:10001}.fb_reset .fb_dialog_legacy{overflow:visible}.fb_dialog_advanced{padding:10px;-moz-border-radius:8px;-webkit-border-radius:8px;border-radius:8px}.fb_dialog_content{background:#fff;color:#333}.fb_dialog_close_icon{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}.fb_dialog_mobile .fb_dialog_close_icon{top:5px;left:5px;right:auto}.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}.fb_dialog_close_icon:hover{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent}.fb_dialog_close_icon:active{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yq\/r\/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent}.fb_dialog_loader{background-color:#f6f7f9;border:1px solid #606060;font-size:24px;padding:20px}.fb_dialog_top_left,.fb_dialog_top_right,.fb_dialog_bottom_left,.fb_dialog_bottom_right{height:10px;width:10px;overflow:hidden;position:absolute}.fb_dialog_top_left{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 0;left:-10px;top:-10px}.fb_dialog_top_right{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -10px;right:-10px;top:-10px}.fb_dialog_bottom_left{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -20px;bottom:-10px;left:-10px}.fb_dialog_bottom_right{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ye\/r\/8YeTNIlTZjm.png) no-repeat 0 -30px;right:-10px;bottom:-10px}.fb_dialog_vert_left,.fb_dialog_vert_right,.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{position:absolute;background:#525252;filter:alpha(opacity=70);opacity:.7}.fb_dialog_vert_left,.fb_dialog_vert_right{width:10px;height:100\u0025}.fb_dialog_vert_left{margin-left:-10px}.fb_dialog_vert_right{right:0;margin-right:-10px}.fb_dialog_horiz_top,.fb_dialog_horiz_bottom{width:100\u0025;height:10px}.fb_dialog_horiz_top{margin-top:-10px}.fb_dialog_horiz_bottom{bottom:0;margin-bottom:-10px}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #365899;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yd\/r\/Cou7n-nqK52.gif) no-repeat 5px 50\u0025;float:left;padding:5px 0 7px 26px}body.fb_hidden{-webkit-transform:none;height:100\u0025;margin:0;overflow:visible;position:absolute;top:-10000px;left:0;width:100\u0025}.fb_dialog.fb_dialog_mobile.loading{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/ya\/r\/3rhSv5V8j3o.gif) white no-repeat 50\u0025 50\u0025;min-height:100\u0025;min-width:100\u0025;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{width:auto;height:auto;min-height:initial;min-width:initial;background:none}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100\u0025}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{color:#fff;display:block;padding-top:20px;clear:both;font-size:18px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .45);position:absolute;bottom:0;left:0;right:0;top:0;width:100\u0025;min-height:100\u0025;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_content .dialog_header{-webkit-box-shadow:white 0 1px 1px -1px inset;background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#738ABA), to(#2C4987));border-bottom:1px solid;border-color:#1d4088;color:#fff;font:14px Helvetica, sans-serif;font-weight:bold;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{-webkit-font-smoothing:subpixel-antialiased;height:43px;width:100\u0025}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:-webkit-gradient(linear, 0\u0025 0\u0025, 0\u0025 100\u0025, from(#4966A6), color-stop(.5, #355492), to(#2A4887));border:1px solid #29487d;-webkit-background-clip:padding-box;-webkit-border-radius:3px;-webkit-box-shadow:rgba(0, 0, 0, .117188) 0 1px 1px inset, rgba(255, 255, 255, .167969) 0 1px 0;display:inline-block;margin-top:3px;max-width:85px;line-height:18px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{border:none;background:none;color:#fff;font:12px Helvetica, sans-serif;font-weight:bold;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/y9\/r\/jKEcVPZFk-2.gif) no-repeat 50\u0025 50\u0025;border:1px solid #555;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f6f7f9;border:1px solid #555;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_button{text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/yD\/r\/t-wz8gw1xG1.png);background-repeat:no-repeat;background-position:50\u0025 50\u0025;height:24px;width:24px}\u0040keyframes rotateSpinner{0\u0025{transform:rotate(0deg)}100\u0025{transform:rotate(360deg)}}\n.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100\u0025}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_hide_iframes iframe{position:relative;left:-10000px}.fb_iframe_widget_loader{position:relative;display:inline-block}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100\u0025}.fb_iframe_widget_loader iframe{min-height:32px;z-index:2;zoom:1}.fb_iframe_widget_loader .FB_Loader{background:url(http:\/\/static.xx.fbcdn.net\/rsrc.php\/v3\/y9\/r\/jKEcVPZFk-2.gif) no-repeat;height:32px;width:32px;margin-left:-16px;position:absolute;left:50\u0025;z-index:4}","components":["css:fb.css.base","css:fb.css.dialog","css:fb.css.iframewidget"]});__d("ApiClientConfig",[],{"FlashRequest":{"swfUrl":"https:\/\/connect.facebook.net\/rsrc.php\/v2\/yd\/r\/mxzow1Sdmxr.swf"}});__d("JSSDKCanvasPrefetcherConfig",[],{"blacklist":[144959615576466,768691303149786,320528941393723],"sampleRate":500});      __d("DOMWrapper",[],(function a(b,c,d,e,f,g){var h,i,j={setRoot:function k(l){h=l;},getRoot:function k(){return h||document.body;},setWindow:function k(l){i=l;},getWindow:function k(){return i||self;}};f.exports=j;}),null);
__d('dotAccess',[],(function a(b,c,d,e,f,g){function h(i,j,k){var l=j.split('.');do{var m=l.shift();i=i[m]||k&&(i[m]={});}while(l.length&&i);return i;}f.exports=h;}),null);
__d('guid',[],(function a(b,c,d,e,f,g){function h(){return 'f'+(Math.random()*(1<<30)).toString(16).replace('.','');}f.exports=h;}),18);
__d("wrapFunction",[],(function a(b,c,d,e,f,g){var h={},i=function j(k,l,m){return function(){var n=l in h?h[l](k,m):k;for(var o=arguments.length,p=Array(o),q=0;q<o;q++)p[q]=arguments[q];return n.apply(this,p);};};i.setWrapper=function(j,k){h[k]=j;};f.exports=i;}),18);
__d('GlobalCallback',['DOMWrapper','dotAccess','guid','wrapFunction'],(function a(b,c,d,e,f,g,h,i,j,k){var l,m,n={setPrefix:function o(p){l=i(h.getWindow(),p,true);m=p;},create:function o(p,q){if(!l)this.setPrefix('__globalCallbacks');var r=j();l[r]=k(p,'entry',q||'GlobalCallback');return m+'.'+r;},remove:function o(p){var q=p.substring(m.length+1);delete l[q];}};f.exports=n;}),null);
__d("sprintf",[],(function a(b,c,d,e,f,g){function h(i){for(var j=arguments.length,k=Array(j>1?j-1:0),l=1;l<j;l++)k[l-1]=arguments[l];var m=0;return i.replace(/%s/g,function(){return String(k[m++]);});}f.exports=h;}),null);
__d('Log',['sprintf'],(function a(b,c,d,e,f,g,h){var i={DEBUG:3,INFO:2,WARNING:1,ERROR:0};function j(l,m){var n=Array.prototype.slice.call(arguments,2),o=h.apply(null,n),p=window.console;if(p&&k.level>=m)p[l in p?l:'log'](o);}var k={level:-1,Level:i,debug:ES(j,'bind',true,null,'debug',i.DEBUG),info:ES(j,'bind',true,null,'info',i.INFO),warn:ES(j,'bind',true,null,'warn',i.WARNING),error:ES(j,'bind',true,null,'error',i.ERROR)};f.exports=k;}),null);
__d("ObservableMixin",[],(function a(b,c,d,e,f,g){function h(){this.__observableEvents={};}h.prototype={inform:function i(j){var k=Array.prototype.slice.call(arguments,1),l=Array.prototype.slice.call(this.getSubscribers(j));for(var m=0;m<l.length;m++){if(l[m]===null)continue;try{l[m].apply(this,k);}catch(n){setTimeout(function(){throw n;},0);}}return this;},getSubscribers:function i(j){return this.__observableEvents[j]||(this.__observableEvents[j]=[]);},clearSubscribers:function i(j){if(j)this.__observableEvents[j]=[];return this;},clearAllSubscribers:function i(){this.__observableEvents={};return this;},subscribe:function i(j,k){var l=this.getSubscribers(j);l.push(k);return this;},unsubscribe:function i(j,k){var l=this.getSubscribers(j);for(var m=0;m<l.length;m++)if(l[m]===k){l.splice(m,1);break;}return this;},monitor:function i(j,k){if(!k()){var l=ES(function(m){if(k.apply(k,arguments))this.unsubscribe(j,l);},"bind",true,this);this.subscribe(j,l);}return this;}};f.exports=h;}),null);
__d('UrlMap',['UrlMapConfig'],(function a(b,c,d,e,f,g,h){var i={resolve:function j(k,l){var m=typeof l=='undefined'?location.protocol.replace(':',''):l?'https':'http';if(k in h)return m+'://'+h[k];if(typeof l=='undefined'&&k+'_'+m in h)return m+'://'+h[k+'_'+m];if(l!==true&&k+'_http' in h)return 'http://'+h[k+'_http'];if(l!==false&&k+'_https' in h)return 'https://'+h[k+'_https'];}};f.exports=i;}),null);
__d('QueryString',[],(function a(b,c,d,e,f,g){function h(l){var m=[];ES(ES('Object','keys',false,l).sort(),'forEach',true,function(n){var o=l[n];if(typeof o==='undefined')return;if(o===null){m.push(n);return;}m.push(encodeURIComponent(n)+'='+encodeURIComponent(o));});return m.join('&');}function i(l,m){var n={};if(l==='')return n;var o=l.split('&');for(var p=0;p<o.length;p++){var q=o[p].split('=',2),r=decodeURIComponent(q[0]);if(m&&Object.prototype.hasOwnProperty.call(n,r))throw new URIError('Duplicate key: '+r);n[r]=q.length===2?decodeURIComponent(q[1]):null;}return n;}function j(l,m){return l+(ES(l,'indexOf',true,'?')!==-1?'&':'?')+(typeof m==='string'?m:k.encode(m));}var k={encode:h,decode:i,appendToUrl:j};f.exports=k;}),null);
__d("ManagedError",[],(function a(b,c,d,e,f,g){function h(i,j){Error.prototype.constructor.call(this,i);this.message=i;this.innerError=j;}h.prototype=new Error();h.prototype.constructor=h;f.exports=h;}),null);
__d('AssertionError',['ManagedError'],(function a(b,c,d,e,f,g,h){function i(j){h.prototype.constructor.apply(this,arguments);}i.prototype=new h();i.prototype.constructor=i;f.exports=i;}),null);
__d('Assert',['AssertionError','sprintf'],(function a(b,c,d,e,f,g,h,i){function j(o,p){if(typeof o!=='boolean'||!o)throw new h(p);return o;}function k(o,p,q){var r;if(p===undefined){r='undefined';}else if(p===null){r='null';}else{var s=Object.prototype.toString.call(p);r=/\s(\w*)/.exec(s)[1].toLowerCase();}j(ES(o,'indexOf',true,r)!==-1,q||i('Expression is of type %s, not %s',r,o));return p;}function l(o,p,q){j(p instanceof o,q||'Expression not instance of type');return p;}function m(o,p){n['is'+o]=p;n['maybe'+o]=function(q,r){if(q!=null)p(q,r);};}var n={isInstanceOf:l,isTrue:j,isTruthy:function o(p,q){return j(!!p,q);},type:k,define:function o(p,q){p=p.substring(0,1).toUpperCase()+p.substring(1).toLowerCase();m(p,function(r,s){j(q(r),s);});}};ES(['Array','Boolean','Date','Function','Null','Number','Object','Regexp','String','Undefined'],'forEach',true,function(o){m(o,ES(k,'bind',true,null,o.toLowerCase()));});f.exports=n;}),null);
__d('Type',['Assert'],(function a(b,c,d,e,f,g,h){function i(){var m=this.__mixins;if(m)for(var n=0;n<m.length;n++)m[n].apply(this,arguments);}function j(m,n){if(n instanceof m)return true;if(n instanceof i)for(var o=0;o<n.__mixins.length;o++)if(n.__mixins[o]==m)return true;return false;}function k(m,n){var o=m.prototype;if(!ES('Array','isArray',false,n))n=[n];for(var p=0;p<n.length;p++){var q=n[p];if(typeof q=='function'){o.__mixins.push(q);q=q.prototype;}ES(ES('Object','keys',false,q),'forEach',true,function(r){o[r]=q[r];});}}function l(m,n,o){var p=n&&Object.prototype.hasOwnProperty.call(n,'constructor')?n.constructor:function(){this.parent.apply(this,arguments);};h.isFunction(p);if(m&&m.prototype instanceof i===false)throw new Error('parent type does not inherit from Type');m=m||i;function q(){}q.prototype=m.prototype;p.prototype=new q();if(n)ES('Object','assign',false,p.prototype,n);p.prototype.constructor=p;p.parent=m;p.prototype.__mixins=m.prototype.__mixins?Array.prototype.slice.call(m.prototype.__mixins):[];if(o)k(p,o);p.prototype.parent=function(){this.parent=m.prototype.parent;m.apply(this,arguments);};p.prototype.parentCall=function(r){return m.prototype[r].apply(this,Array.prototype.slice.call(arguments,1));};p.extend=function(r,s){return l(this,r,s);};return p;}ES('Object','assign',false,i.prototype,{instanceOf:function m(n){return j(n,this);}});ES('Object','assign',false,i,{extend:function m(n,o){return typeof n==='function'?l.apply(null,arguments):l(null,n,o);},instanceOf:j});f.exports=i;}),null);
__d('sdk.Model',['Type','ObservableMixin'],(function a(b,c,d,e,f,g,h,i){var j=h.extend({constructor:function k(l){this.parent();var m={},n=this;ES(ES('Object','keys',false,l),'forEach',true,function(o){m[o]=l[o];n['set'+o]=function(p){if(p===m[o])return this;m[o]=p;n.inform(o+'.change',p);return n;};n['get'+o]=function(){return m[o];};});}},i);f.exports=j;}),null);
__d('sdk.Runtime',['sdk.Model','JSSDKRuntimeConfig'],(function a(b,c,d,e,f,g,h,i){var j={UNKNOWN:0,PAGETAB:1,CANVAS:2,PLATFORM:4},k=new h({AccessToken:'',AutoLogAppEvents:false,ClientID:'',CookieUserID:'',Environment:j.UNKNOWN,Initialized:false,IsVersioned:false,KidDirectedSite:undefined,Locale:i.locale,LoggedIntoFacebook:undefined,LoginStatus:undefined,Revision:i.revision,Rtl:i.rtl,Scope:undefined,Secure:undefined,UseCookie:false,UserID:'',Version:undefined});ES('Object','assign',false,k,{ENVIRONMENTS:j,isEnvironment:function l(m){var n=this.getEnvironment();return (m|n)===n;},isCanvasEnvironment:function l(){return this.isEnvironment(j.CANVAS)||this.isEnvironment(j.PAGETAB);}});(function(){var l=/app_runner/.test(window.name)?j.PAGETAB:/iframe_canvas/.test(window.name)?j.CANVAS:j.UNKNOWN;if((l|j.PAGETAB)===l)l|=j.CANVAS;k.setEnvironment(l);})();f.exports=k;}),null);
__d('sdk.Cookie',['QueryString','sdk.Runtime'],(function a(b,c,d,e,f,g,h,i){var j=null;function k(n,o,p){n=n+i.getClientID();var q=j&&j!=='.';if(q){document.cookie=n+'=; expires=Wed, 04 Feb 2004 08:00:00 GMT;';document.cookie=n+'=; expires=Wed, 04 Feb 2004 08:00:00 GMT;'+'domain='+location.hostname+';';}var r=new Date(p).toGMTString();document.cookie=n+'='+o+(o&&p===0?'':'; expires='+r)+'; path=/'+(q?'; domain='+j:'');}function l(n){n=n+i.getClientID();var o=new RegExp('\\b'+n+'=([^;]*)\\b');return o.test(document.cookie)?RegExp.$1:null;}var m={setDomain:function n(o){j=o;var p=h.encode({base_domain:j&&j!=='.'?j:''}),q=new Date();q.setFullYear(q.getFullYear()+1);k('fbm_',p,q.getTime());},getDomain:function n(){return j;},loadMeta:function n(){var o=l('fbm_');if(o){var p=h.decode(o);if(!j)j=p.base_domain;return p;}},loadSignedRequest:function n(){return l('fbsr_');},setSignedRequestCookie:function n(o,p){if(!o)throw new Error('Value passed to Cookie.setSignedRequestCookie '+'was empty.');k('fbsr_',o,p);},clearSignedRequestCookie:function n(){k('fbsr_','',0);},setRaw:k,getRaw:l};f.exports=m;}),null);
__d('Miny',[],(function a(b,c,d,e,f,g){var h='Miny1',i='wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split(''),j={encode:function k(l){if(/^$|[~\\]|__proto__/.test(l))return l;var m=l.match(/\w+|\W+/g),n,o=ES('Object','create',false,null);for(n=0;n<m.length;n++)o[m[n]]=(o[m[n]]||0)+1;var p=ES('Object','keys',false,o);p.sort(function(s,t){return o[t]-o[s];});for(n=0;n<p.length;n++){var q=(n-n%32)/32;o[p[n]]=q?q.toString(32)+i[n%32]:i[n%32];}var r='';for(n=0;n<m.length;n++)r+=o[m[n]];p.unshift(h,p.length);p.push(r);return p.join('~');}};f.exports=j;}),null);
__d('sdk.UA',[],(function a(b,c,d,e,f,g){var h=navigator.userAgent,i={iphone:/\b(iPhone|iP[ao]d)/.test(h),ipad:/\b(iP[ao]d)/.test(h),android:/Android/i.test(h),nativeApp:/FBAN\/\w+;/i.test(h)},j=/Mobile/i.test(h),k={ie:'',firefox:'',chrome:'',webkit:'',osx:'',edge:'',operaMini:'',ucWeb:''},l=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(h);if(l){k.ie=l[1]?parseFloat(l[1]):l[4]?parseFloat(l[4]):'';k.firefox=l[2]||'';k.webkit=l[3]||'';if(l[3]){var m=/(?:Chrome\/(\d+\.\d+))/.exec(h);k.chrome=m?m[1]:'';var n=/(?:Edge\/(\d+\.\d+))/.exec(h);k.edge=n?n[1]:'';}}var o=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(h);if(o)k.osx=o[1];var p=/(?:Opera Mini\/(\d+(?:\.\d+)?))/.exec(h);if(p)k.operaMini=p[1];var q=/(?:UCWEB\/(\d+(?:\.\d+))?)/.exec(h);if(q)k.ucWeb=q[1]||'2.0';function r(t){return ES(t.split('.'),'map',true,function(u){return parseFloat(u);});}var s={};ES(ES('Object','keys',false,k),'map',true,function(t){s[t]=function(){return parseFloat(k[t]);};s[t].getVersionParts=function(){return r(k[t]);};});ES(ES('Object','keys',false,i),'map',true,function(t){s[t]=function(){return i[t];};});s.mobile=function(){return i.iphone||i.ipad||i.android||j;};s.mTouch=function(){return i.android||i.iphone||i.ipad;};s.mBasic=function(){return !!(k.ucWeb||k.operaMini);};f.exports=s;}),null);
__d('getBlankIframeSrc',['sdk.UA'],(function a(b,c,d,e,f,g,h){function i(){return h.ie()<10?'javascript:false':'about:blank';}f.exports=i;}),null);
__d('insertIframe',['GlobalCallback','getBlankIframeSrc','guid'],(function a(b,c,d,e,f,g,h,i,j){function k(l){l.id=l.id||j();l.name=l.name||j();var m=false,n=false,o=function s(){if(m&&!n){n=true;l.onload&&l.onload(l.root.firstChild);}},p=h.create(o);if(document.attachEvent){var q='<iframe'+' id="'+l.id+'"'+' name="'+l.name+'"'+(l.title?' title="'+l.title+'"':'')+(l.className?' class="'+l.className+'"':'')+' style="border:none;'+(l.width?'width:'+l.width+'px;':'')+(l.height?'height:'+l.height+'px;':'')+'"'+' src="'+i()+'"'+' frameborder="0"'+' scrolling="no"'+' allowtransparency="true"'+' onload="'+p+'()"'+'></iframe>';l.root.innerHTML='<iframe src="'+i()+'"'+' frameborder="0"'+' scrolling="no"'+' style="height:1px"></iframe>';m=true;setTimeout(function(){l.root.innerHTML=q;l.root.firstChild.src=l.url;l.onInsert&&l.onInsert(l.root.firstChild);},0);}else{var r=document.createElement('iframe');r.id=l.id;r.name=l.name;r.onload=o;r.scrolling='no';r.style.border='none';r.style.overflow='hidden';if(l.title)r.title=l.title;if(l.className)r.className=l.className;if(l.height!==undefined)r.style.height=l.height+'px';if(l.width!==undefined)if(l.width=='100%'){r.style.width=l.width;}else r.style.width=l.width+'px';l.root.appendChild(r);m=true;r.src=l.url;l.onInsert&&l.onInsert(r);}}f.exports=k;}),null);
__d('sdk.domReady',['sdk.Runtime'],(function a(b,c,d,e,f,g,h){var i,j='readyState' in document?/loaded|complete/.test(document.readyState):!!document.body;function k(){if(!i)return;var n;while(n=i.shift())n();i=null;}function l(n){if(i){i.push(n);return;}else n();}if(!j){i=[];if(document.addEventListener){document.addEventListener('DOMContentLoaded',k,false);window.addEventListener('load',k,false);}else if(document.attachEvent){document.attachEvent('onreadystatechange',k);window.attachEvent('onload',k);}if(document.documentElement.doScroll&&window==window.top){var m=function n(){try{h.getRtl()?document.documentElement.doScroll('right'):document.documentElement.doScroll('left');}catch(o){setTimeout(n,0);return;}k();};m();}}f.exports=l;}),3);
__d('sdk.Content',['Log','sdk.UA','sdk.domReady'],(function a(b,c,d,e,f,g,h,i,j){var k,l,m={append:function n(o,p){if(!p)if(!k){k=p=document.getElementById('fb-root');if(!p){h.warn('The "fb-root" div has not been created, auto-creating');k=p=document.createElement('div');p.id='fb-root';if(i.ie()||!document.body){j(function(){document.body.appendChild(p);});}else document.body.appendChild(p);}p.className+=' fb_reset';}else p=k;if(typeof o=='string'){var q=document.createElement('div');p.appendChild(q).innerHTML=o;return q;}else return p.appendChild(o);},appendHidden:function n(o){if(!p){var p=document.createElement('div'),q=p.style;q.position='absolute';q.top='-10000px';q.width=q.height=0;p=m.append(p);}return m.append(o,p);},submitToTarget:function n(o,p){var q=document.createElement('form');q.action=o.url;q.target=o.target;q.method=p?'GET':'POST';m.appendHidden(q);for(var r in o.params)if(Object.prototype.hasOwnProperty.call(o.params,r)){var s=o.params[r];if(s!==null&&s!==undefined){var t=document.createElement('input');t.name=r;t.value=s;q.appendChild(t);}}q.submit();q.parentNode.removeChild(q);}};f.exports=m;}),null);
__d('sdk.Impressions',['sdk.Content','Miny','QueryString','sdk.Runtime','UrlMap','getBlankIframeSrc','guid','insertIframe'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){function p(r){var s=k.getClientID();if(!r.api_key&&s)r.api_key=s;r.kid_directed_site=k.getKidDirectedSite();var t=l.resolve('www',true)+'/impression.php/'+n()+'/',u=j.appendToUrl(t,r);if(u.length>2000)if(r.payload&&typeof r.payload==='string'){var v=i.encode(r.payload);if(v&&v.length<r.payload.length){r.payload=v;u=j.appendToUrl(t,r);}}if(u.length<=2000){var w=new Image();w.src=u;}else{var x=n(),y=h.appendHidden('');o({url:m(),root:y,name:x,className:'fb_hidden fb_invisible',onload:function z(){y.parentNode.removeChild(y);}});h.submitToTarget({url:t,target:x,params:r});}}var q={log:function r(s,t){if(!t.source)t.source='jssdk';p({lid:s,payload:ES('JSON','stringify',false,t)});},impression:p};f.exports=q;}),null);
__d('sdk.Scribe',['QueryString','sdk.Runtime','UrlMap'],(function a(b,c,d,e,f,g,h,i,j){function k(m,n){if(typeof n.extra=='object')n.extra.revision=i.getRevision();new Image().src=h.appendToUrl(j.resolve('www',true)+'/common/scribe_endpoint.php',{c:m,m:ES('JSON','stringify',false,n)});}var l={log:k};f.exports=l;}),null);
__d('Base64',[],(function a(b,c,d,e,f,g){var h='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';function i(m){m=m.charCodeAt(0)<<16|m.charCodeAt(1)<<8|m.charCodeAt(2);return String.fromCharCode(h.charCodeAt(m>>>18),h.charCodeAt(m>>>12&63),h.charCodeAt(m>>>6&63),h.charCodeAt(m&63));}var j='>___?456789:;<=_______'+'\x00\x01\x02\x03\x04\x05\x06\x07\b\t\n\x0b\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19'+'______\x1a\x1b\x1c\x1d\x1e\x1f !"#$%&\'()*+,-./0123';function k(m){m=j.charCodeAt(m.charCodeAt(0)-43)<<18|j.charCodeAt(m.charCodeAt(1)-43)<<12|j.charCodeAt(m.charCodeAt(2)-43)<<6|j.charCodeAt(m.charCodeAt(3)-43);return String.fromCharCode(m>>>16,m>>>8&255,m&255);}var l={encode:function m(n){n=unescape(encodeURI(n));var o=(n.length+2)%3;n=(n+'\0\0'.slice(o)).replace(/[\s\S]{3}/g,i);return n.slice(0,n.length+o-2)+'=='.slice(o);},decode:function m(n){n=n.replace(/[^A-Za-z0-9+\/]/g,'');var o=n.length+3&3;n=(n+'AAA'.slice(o)).replace(/..../g,k);n=n.slice(0,n.length+o-3);try{return decodeURIComponent(escape(n));}catch(p){throw new Error('Not valid UTF-8');}},encodeObject:function m(n){return l.encode(ES('JSON','stringify',false,n));},decodeObject:function m(n){return ES('JSON','parse',false,l.decode(n));},encodeNums:function m(n){return String.fromCharCode.apply(String,ES(n,'map',true,function(o){return h.charCodeAt((o|-(o>63))&-(o>0)&63);}));}};f.exports=l;}),null);
__d('sdk.SignedRequest',['Base64'],(function a(b,c,d,e,f,g,h){function i(k){if(!k)return null;var l=k.split('.',2)[1].replace(/\-/g,'+').replace(/\_/g,'/');return h.decodeObject(l);}var j={parse:i};f.exports=j;}),null);
__d('URIRFC3986',[],(function a(b,c,d,e,f,g){var h=new RegExp('^'+'([^:/?#]+:)?'+'(//'+'([^\\\\/?#@]*@)?'+'('+'\\[[A-Fa-f0-9:.]+\\]|'+'[^\\/?#:]*'+')'+'(:[0-9]*)?'+')?'+'([^?#]*)'+'(\\?[^#]*)?'+'(#.*)?'),i={parse:function j(k){if(ES(k,'trim',true)==='')return null;var l=k.match(h);if(l==null)return null;var m={};m.uri=l[0]?l[0]:null;m.scheme=l[1]?l[1].substr(0,l[1].length-1):null;m.authority=l[2]?l[2].substr(2):null;m.userinfo=l[3]?l[3].substr(0,l[3].length-1):null;m.host=l[2]?l[4]:null;m.port=l[5]?l[5].substr(1)?parseInt(l[5].substr(1),10):null:null;m.path=l[6]?l[6]:null;m.query=l[7]?l[7].substr(1):null;m.fragment=l[8]?l[8].substr(1):null;m.isGenericURI=m.authority===null&&!!m.scheme;return m;}};f.exports=i;}),18);
__d('createObjectFrom',[],(function a(b,c,d,e,f,g){function h(i,j){var k={},l=ES('Array','isArray',false,j);if(j===undefined)j=true;for(var m=i.length-1;m>=0;m--)k[i[m]]=l?j[m]:j;return k;}f.exports=h;}),18);
__d('URISchemes',['createObjectFrom'],(function a(b,c,d,e,f,g,h){var i=h(['blob','cmms','fb','fbatwork','fb-ama','fb-messenger','fb-messenger-public','fb-messenger-group-thread','fb-page-messages','fb-pma','fbcf','fbconnect','fbmobilehome','fbrpc','file','ftp','http','https','mailto','ms-app','intent','itms','itms-apps','itms-services','market','svn+ssh','fbstaging','tel','sms','pebblejs','sftp','whatsapp','moments','flash','fblite','chrome-extension','webcal','fb124024574287414','fb124024574287414rc','fb124024574287414master','fb1576585912599779','fb929757330408142','designpack','fbapi20130214','fb1196383223757595','tbauth','oculus','oculus.store']),j={isAllowed:function k(l){if(!l)return true;return Object.prototype.hasOwnProperty.call(i,l.toLowerCase());}};f.exports=j;}),18);
__d('eprintf',[],(function a(b,c,d,e,f,g){function h(i){for(var j=arguments.length,k=Array(j>1?j-1:0),l=1;l<j;l++)k[l-1]=arguments[l];var m=ES(k,'map',true,function(p){return String(p);}),n=i.split('%s').length-1;if(n!==m.length)return h('eprintf args number mismatch: %s',ES('JSON','stringify',false,[i].concat(m)));var o=0;return i.replace(/%s/g,function(){return String(m[o++]);});}f.exports=h;}),null);
__d('ex',['eprintf'],(function a(b,c,d,e,f,g,h){function i(j){for(var k=arguments.length,l=Array(k>1?k-1:0),m=1;m<k;m++)l[m-1]=arguments[m];var n=ES(l,'map',true,function(p){return String(p);}),o=j.split('%s').length-1;if(o!==n.length)return i('ex args number mismatch: %s',ES('JSON','stringify',false,[j].concat(n)));return i._prefix+ES('JSON','stringify',false,[j].concat(n))+i._suffix;}i._prefix='<![EX[';i._suffix=']]>';f.exports=i;}),18);
__d('invariant',['ex','sprintf'],(function a(b,c,d,e,f,g,h,i){'use strict';var j=h;function k(l,m){if(!l){var n=void 0;if(m===undefined){n=new Error('Minified exception occurred; use the non-minified dev environment '+'for the full error message and additional helpful warnings.');}else{for(var o=arguments.length,p=Array(o>2?o-2:0),q=2;q<o;q++)p[q-2]=arguments[q];n=new Error(j.apply(undefined,[m].concat(p)));n.name='Invariant Violation';n.messageWithParams=[m].concat(p);}n.framesToPop=1;throw n;}}f.exports=k;}),18);
__d('setHostSubdomain',[],(function a(b,c,d,e,f,g){function h(i,j){var k=i.split('.');if(k.length<3){k.unshift(j);}else k[0]=j;return k.join('.');}f.exports=h;}),null);
__d('URIBase',['URIRFC3986','URISchemes','ex','invariant','setHostSubdomain'],(function a(b,c,d,e,f,g,h,i,j,k,l){var m=new RegExp('[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f'+'\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF'+'\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]'),n=new RegExp('^(?:[^/]*:|'+'[\\x00-\\x1f]*/[\\x00-\\x1f]*/)');function o(r,s,t,u){if(!s)return true;if(s instanceof q){r.setProtocol(s.getProtocol());r.setDomain(s.getDomain());r.setPort(s.getPort());r.setPath(s.getPath());r.setQueryData(u.deserialize(u.serialize(s.getQueryData())));r.setFragment(s.getFragment());r.setIsGeneric(s.getIsGeneric());r.setForceFragmentSeparator(s.getForceFragmentSeparator());return true;}s=ES(s.toString(),'trim',true);var v=h.parse(s)||{fragment:null,scheme:null};if(!t&&!i.isAllowed(v.scheme))return false;r.setProtocol(v.scheme||'');if(!t&&m.test(v.host||''))return false;r.setDomain(v.host||'');r.setPort(v.port||'');r.setPath(v.path||'');if(t){r.setQueryData(u.deserialize(v.query||'')||{});}else try{r.setQueryData(u.deserialize(v.query||'')||{});}catch(w){return false;}r.setFragment(v.fragment||'');if(v.fragment==='')r.setForceFragmentSeparator(true);r.setIsGeneric(v.isGenericURI||false);if(v.userinfo!==null)if(t){throw new Error(j('URI.parse: invalid URI (userinfo is not allowed in a URI): %s',r.toString()));}else return false;if(!r.getDomain()&&ES(r.getPath(),'indexOf',true,'\\')!==-1)if(t){throw new Error(j('URI.parse: invalid URI (no domain but multiple back-slashes): %s',r.toString()));}else return false;if(!r.getProtocol()&&n.test(s))if(t){throw new Error(j('URI.parse: invalid URI (unsafe protocol-relative URLs): %s',r.toString()));}else return false;if(r.getDomain()&&r.getPath()&&!ES(r.getPath(),'startsWith',true,'/'))if(t){throw new Error(j('URI.parse: invalid URI (domain and path where path lacks leading slash): %s',r.toString()));}else return false;return true;}var p=[];q.isValidURI=function(r,s){'use strict';return o(new q(null,s),r,false,s);};function q(r,s){'use strict';s||k(0);this.$URIBase9=s;this.$URIBase7='';this.$URIBase1='';this.$URIBase6='';this.$URIBase5='';this.$URIBase3='';this.$URIBase4=false;this.$URIBase8={};this.$URIBase2=false;o(this,r,true,s);}q.prototype.setProtocol=function(r){'use strict';i.isAllowed(r)||k(0);this.$URIBase7=r;return this;};q.prototype.getProtocol=function(){'use strict';return (this.$URIBase7||'').toLowerCase();};q.prototype.setSecure=function(r){'use strict';return this.setProtocol(r?'https':'http');};q.prototype.isSecure=function(){'use strict';return this.getProtocol()==='https';};q.prototype.setDomain=function(r){'use strict';if(m.test(r))throw new Error(j('URI.setDomain: unsafe domain specified: %s for url %s',r,this.toString()));this.$URIBase1=r;return this;};q.prototype.getDomain=function(){'use strict';return this.$URIBase1;};q.prototype.setPort=function(r){'use strict';this.$URIBase6=r;return this;};q.prototype.getPort=function(){'use strict';return this.$URIBase6;};q.prototype.setPath=function(r){'use strict';this.$URIBase5=r;return this;};q.prototype.getPath=function(){'use strict';return this.$URIBase5;};q.prototype.addQueryData=function(r,s){'use strict';if(Object.prototype.toString.call(r)==='[object Object]'){ES('Object','assign',false,this.$URIBase8,r);}else this.$URIBase8[r]=s;return this;};q.prototype.setQueryData=function(r){'use strict';this.$URIBase8=r;return this;};q.prototype.getQueryData=function(){'use strict';return this.$URIBase8;};q.prototype.removeQueryData=function(r){'use strict';if(!ES('Array','isArray',false,r))r=[r];for(var s=0,t=r.length;s<t;++s)delete this.$URIBase8[r[s]];return this;};q.prototype.setFragment=function(r){'use strict';this.$URIBase3=r;this.setForceFragmentSeparator(false);return this;};q.prototype.getFragment=function(){'use strict';return this.$URIBase3;};q.prototype.setForceFragmentSeparator=function(r){'use strict';this.$URIBase2=r;return this;};q.prototype.getForceFragmentSeparator=function(){'use strict';return this.$URIBase2;};q.prototype.setIsGeneric=function(r){'use strict';this.$URIBase4=r;return this;};q.prototype.getIsGeneric=function(){'use strict';return this.$URIBase4;};q.prototype.isEmpty=function(){'use strict';return !(this.getPath()||this.getProtocol()||this.getDomain()||this.getPort()||ES('Object','keys',false,this.getQueryData()).length>0||this.getFragment());};q.prototype.toString=function(){'use strict';var r=this;for(var s=0;s<p.length;s++)r=p[s](r);return r.$URIBase10();};q.prototype.$URIBase10=function(){'use strict';var r='',s=this.getProtocol();if(s)r+=s+':'+(this.getIsGeneric()?'':'//');var t=this.getDomain();if(t)r+=t;var u=this.getPort();if(u)r+=':'+u;var v=this.getPath();if(v){r+=v;}else if(r)r+='/';var w=this.$URIBase9.serialize(this.getQueryData());if(w)r+='?'+w;var x=this.getFragment();if(x){r+='#'+x;}else if(this.getForceFragmentSeparator())r+='#';return r;};q.registerFilter=function(r){'use strict';p.push(r);};q.prototype.getOrigin=function(){'use strict';var r=this.getPort();return this.getProtocol()+'://'+this.getDomain()+(r?':'+r:'');};q.prototype.getQualifiedURIBase=function(){'use strict';return new q(this,this.$URIBase9).qualify();};q.prototype.qualify=function(){'use strict';if(!this.getDomain()){var r=new q(window.location.href,this.$URIBase9);this.setProtocol(r.getProtocol()).setDomain(r.getDomain()).setPort(r.getPort());}return this;};q.prototype.setSubdomain=function(r){'use strict';var s=this.qualify().getDomain();return this.setDomain(l(s,r));};q.prototype.getSubdomain=function(){'use strict';if(!this.getDomain())return '';var r=this.getDomain().split('.');if(r.length<=2){return '';}else return r[0];};f.exports=q;}),18);
__d('sdk.URI',['Assert','QueryString','URIBase'],(function a(b,c,d,e,f,g,h,i,j){var k,l,m=/\.facebook\.com$/,n={serialize:function p(q){return q?i.encode(q):'';},deserialize:function p(q){return q?i.decode(q):{};}};k=babelHelpers.inherits(o,j);l=k&&k.prototype;function o(p){'use strict';h.isString(p,'The passed argument was of invalid type.');l.constructor.call(this,p,n);}o.prototype.isFacebookURI=function(){'use strict';return m.test(this.getDomain());};o.prototype.valueOf=function(){'use strict';return this.toString();};o.isValidURI=function(p){'use strict';return j.isValidURI(p,n);};f.exports=o;}),null);
__d('Queue',[],(function a(b,c,d,e,f,g){var h={};function i(j){'use strict';this._opts=babelHelpers['extends']({interval:0,processor:null},j);this._queue=[];this._stopped=true;}i.prototype._dispatch=function(j){'use strict';if(this._stopped||this._queue.length===0)return;if(!this._opts.processor){this._stopped=true;throw new Error('No processor available');}if(this._opts.interval){this._opts.processor.call(this,this._queue.shift());this._timeout=setTimeout(ES(this._dispatch,'bind',true,this),this._opts.interval);}else while(this._queue.length)this._opts.processor.call(this,this._queue.shift());};i.prototype.enqueue=function(j){'use strict';if(this._opts.processor&&!this._stopped){this._opts.processor.call(this,j);}else this._queue.push(j);return this;};i.prototype.start=function(j){'use strict';if(j)this._opts.processor=j;this._stopped=false;this._dispatch();return this;};i.prototype.isStarted=function(){'use strict';return !this._stopped;};i.prototype.dispatch=function(){'use strict';this._dispatch(true);};i.prototype.stop=function(j){'use strict';this._stopped=true;if(j)clearTimeout(this._timeout);return this;};i.prototype.merge=function(j,k){'use strict';this._queue[k?'unshift':'push'].apply(this._queue,j._queue);j._queue=[];this._dispatch();return this;};i.prototype.getLength=function(){'use strict';return this._queue.length;};i.get=function(j,k){'use strict';var l;if(j in h){l=h[j];}else l=h[j]=new i(k);return l;};i.exists=function(j){'use strict';return j in h;};i.remove=function(j){'use strict';return delete h[j];};f.exports=i;}),null);
__d("emptyFunction",[],(function a(b,c,d,e,f,g){function h(j){return function(){return j;};}var i=function j(){};i.thatReturns=h;i.thatReturnsFalse=h(false);i.thatReturnsTrue=h(true);i.thatReturnsNull=h(null);i.thatReturnsThis=function(){return this;};i.thatReturnsArgument=function(j){return j;};f.exports=i;}),18);
__d('DOMEventListener',['emptyFunction','invariant','wrapFunction'],(function a(b,c,d,e,f,g,h,i,j){var k=false;try{var l=Object.defineProperty({},'passive',{get:function p(){k=true;}});window.addEventListener('test',null,l);}catch(p){}var m=void 0,n=void 0;if(window.addEventListener){m=function p(q,r,s){var t=arguments.length<=3||arguments[3]===undefined?false:arguments[3];s.wrapper=j(s,'entry','DOMEventListener.add '+r);q.addEventListener(r,s.wrapper,k?t:false);};n=function p(q,r,s){var t=arguments.length<=3||arguments[3]===undefined?false:arguments[3];q.removeEventListener(r,s.wrapper,k?t:false);};}else if(window.attachEvent){m=function p(q,r,s){s.wrapper=j(s,'entry','DOMEventListener.add '+r);q.attachEvent||i(0);q.attachEvent('on'+r,s.wrapper);};n=function p(q,r,s){q.detachEvent||i(0);q.detachEvent('on'+r,s.wrapper);};}else n=m=h;var o={add:function p(q,r,s){var t=arguments.length<=3||arguments[3]===undefined?false:arguments[3];m(q,r,s,t);return {remove:function u(){n(q,r,s,t);}};},remove:n};f.exports=o;}),18);
__d('UserAgent_DEPRECATED',[],(function a(b,c,d,e,f,g){var h=false,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;function x(){if(h)return;h=true;var z=navigator.userAgent,aa=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(z),ba=/(Mac OS X)|(Windows)|(Linux)/.exec(z);t=/\b(iPhone|iP[ao]d)/.exec(z);u=/\b(iP[ao]d)/.exec(z);r=/Android/i.exec(z);v=/FBAN\/\w+;/i.exec(z);w=/Mobile/i.exec(z);s=!!/Win64/.exec(z);if(aa){i=aa[1]?parseFloat(aa[1]):aa[5]?parseFloat(aa[5]):NaN;if(i&&document&&document.documentMode)i=document.documentMode;var ca=/(?:Trident\/(\d+.\d+))/.exec(z);n=ca?parseFloat(ca[1])+4:i;j=aa[2]?parseFloat(aa[2]):NaN;k=aa[3]?parseFloat(aa[3]):NaN;l=aa[4]?parseFloat(aa[4]):NaN;if(l){aa=/(?:Chrome\/(\d+\.\d+))/.exec(z);m=aa&&aa[1]?parseFloat(aa[1]):NaN;}else m=NaN;}else i=j=k=m=l=NaN;if(ba){if(ba[1]){var da=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(z);o=da?parseFloat(da[1].replace('_','.')):true;}else o=false;p=!!ba[2];q=!!ba[3];}else o=p=q=false;}var y={ie:function z(){return x()||i;},ieCompatibilityMode:function z(){return x()||n>i;},ie64:function z(){return y.ie()&&s;},firefox:function z(){return x()||j;},opera:function z(){return x()||k;},webkit:function z(){return x()||l;},safari:function z(){return y.webkit();},chrome:function z(){return x()||m;},windows:function z(){return x()||p;},osx:function z(){return x()||o;},linux:function z(){return x()||q;},iphone:function z(){return x()||t;},mobile:function z(){return x()||t||u||r||w;},nativeApp:function z(){return x()||v;},android:function z(){return x()||r;},ipad:function z(){return x()||u;}};f.exports=y;}),18);
__d('htmlSpecialChars',[],(function a(b,c,d,e,f,g){var h=/&/g,i=/</g,j=/>/g,k=/\"/g,l=/\'/g;function m(n){if(typeof n=='undefined'||n===null||!n.toString)return '';if(n===false){return '0';}else if(n===true)return '1';return n.toString().replace(h,'&amp;').replace(k,'&quot;').replace(l,'&#039;').replace(i,'&lt;').replace(j,'&gt;');}f.exports=m;}),null);
__d('Flash',['DOMEventListener','DOMWrapper','QueryString','UserAgent_DEPRECATED','guid','htmlSpecialChars'],(function a(b,c,d,e,f,g,h,i,j,k,l,m){var n={},o,p=i.getWindow().document;function q(v){var w=p.getElementById(v);if(w)w.parentNode.removeChild(w);delete n[v];}function r(){for(var v in n)if(Object.prototype.hasOwnProperty.call(n,v))q(v);}function s(v){return v.replace(/\d+/g,function(w){return '000'.substring(w.length)+w;});}function t(v){if(!o){if(k.ie()>=9)h.add(window,'unload',r);o=true;}n[v]=v;}var u={embed:function v(w,x,y,z){var aa=l();w=m(w).replace(/&amp;/g,'&');y=babelHelpers['extends']({allowscriptaccess:'always',flashvars:z,movie:w},y);if(typeof y.flashvars=='object')y.flashvars=j.encode(y.flashvars);var ba=[];for(var ca in y)if(Object.prototype.hasOwnProperty.call(y,ca)&&y[ca])ba.push('<param name="'+m(ca)+'" value="'+m(y[ca])+'">');var da=x.appendChild(p.createElement('span')),ea='<object '+(k.ie()?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ':'type="application/x-shockwave-flash"')+'data="'+w+'" '+(y.height?'height="'+y.height+'" ':'')+(y.width?'width="'+y.width+'" ':'')+'id="'+aa+'">'+ba.join('')+'</object>';da.innerHTML=ea;var fa=da.firstChild;t(aa);return fa;},remove:q,getVersion:function v(){var w='Shockwave Flash',x='application/x-shockwave-flash',y='ShockwaveFlash.ShockwaveFlash',z;if(navigator.plugins&&typeof navigator.plugins[w]=='object'){var aa=navigator.plugins[w].description;if(aa&&navigator.mimeTypes&&navigator.mimeTypes[x]&&navigator.mimeTypes[x].enabledPlugin)z=aa.match(/\d+/g);}if(!z)try{z=new ActiveXObject(y).GetVariable('$version').match(/(\d+),(\d+),(\d+),(\d+)/);z=Array.prototype.slice.call(z,1);}catch(ba){}return z;},getVersionString:function v(){var w=u.getVersion();return w?w.join('.'):'';},checkMinVersion:function v(w){var x=u.getVersion();if(!x)return false;return s(x.join('.'))>=s(w);},isAvailable:function v(){return !!u.getVersion();}};f.exports=u;}),null);
__d('XDM',['DOMEventListener','DOMWrapper','emptyFunction','Flash','GlobalCallback','guid','Log','UserAgent_DEPRECATED','wrapFunction'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q={},r={transports:[]},s=i.getWindow();function t(w){var x={},y=w.length,z=r.transports;while(y--)x[w[y]]=1;y=z.length;while(y--){var aa=z[y],ba=q[aa];if(!x[aa]&&ba.isAvailable())return aa;}}var u={register:function w(x,y){n.debug('Registering %s as XDM provider',x);r.transports.push(x);q[x]=y;},create:function w(x){if(!x.whenReady&&!x.onMessage){n.error('An instance without whenReady or onMessage makes no sense');throw new Error('An instance without whenReady or '+'onMessage makes no sense');}if(!x.channel){n.warn('Missing channel name, selecting at random');x.channel=m();}if(!x.whenReady)x.whenReady=j;if(!x.onMessage)x.onMessage=j;var y=x.transport||t(x.blacklist||[]),z=q[y];if(z&&z.isAvailable()){n.debug('%s is available',y);z.init(x);return y;}}};u.register('flash',function(){var w=false,x,y=false,z=15000,aa;return {isAvailable:function ba(){return k.checkMinVersion('8.0.24');},init:function ba(ca){n.debug('init flash: '+ca.channel);var da={send:function ga(ha,ia,ja,ka){n.debug('sending to: %s (%s)',ia,ka);x.postMessage(ha,ia,ka);}};if(w){ca.whenReady(da);return;}var ea=ca.root.appendChild(s.document.createElement('div')),fa=l.create(function(){l.remove(fa);clearTimeout(aa);n.info('xdm.swf called the callback');var ga=l.create(function(ha,ia){ha=decodeURIComponent(ha);ia=decodeURIComponent(ia);n.debug('received message %s from %s',ha,ia);ca.onMessage(ha,ia);},'xdm.swf:onMessage');x.init(ca.channel,ga);ca.whenReady(da);},'xdm.swf:load');x=k.embed(ca.flashUrl,ea,null,{protocol:location.protocol.replace(':',''),host:location.host,callback:fa,log:y});aa=setTimeout(function(){n.warn('The Flash component did not load within %s ms - '+'verify that the container is not set to hidden or invisible '+'using CSS as this will cause some browsers to not load '+'the components',z);},z);w=true;}};}());var v=/\.facebook\.com(\/|$)/;u.register('postmessage',function(){var w=false;return {isAvailable:function x(){return !!s.postMessage;},init:function x(y){n.debug('init postMessage: '+y.channel);var z='_FB_'+y.channel,aa={send:function ba(ca,da,ea,fa){if(s===ea){n.error('Invalid windowref, equal to window (self)');throw new Error();}n.debug('sending to: %s (%s)',da,fa);var ga=function ha(){ea.postMessage('_FB_'+fa+ca,da);};if(o.ie()==8||o.ieCompatibilityMode()){setTimeout(ga,0);}else ga();}};if(w){y.whenReady(aa);return;}h.add(s,'message',p(function(event){var ba=event.data,ca=event.origin||'native';if(!/^(https?:\/\/|native$)/.test(ca)){n.debug('Received message from invalid origin type: %s',ca);return;}if(ca!=='native'&&!(v.test(location.hostname)||v.test(event.origin)))return;if(typeof ba!='string'){n.warn('Received message of type %s from %s, expected a string',typeof ba,ca);return;}n.debug('received message %s from %s',ba,ca);if(ba.substring(0,z.length)==z)ba=ba.substring(z.length);y.onMessage(ba,ca);},'entry','onMessage'));y.whenReady(aa);w=true;}};}());f.exports=u;}),null);
__d('isFacebookURI',[],(function a(b,c,d,e,f,g){var h=null,i=['http','https'];function j(k){if(!h)h=new RegExp('(^|\\.)facebook\\.com$','i');if(k.isEmpty()&&k.toString()!=='#')return false;if(!k.getDomain()&&!k.getProtocol())return true;return ES(i,'indexOf',true,k.getProtocol())!==-1&&h.test(k.getDomain());}j.setRegex=function(k){h=k;};f.exports=j;}),null);
__d('sdk.Event',[],(function a(b,c,d,e,f,g){var h={SUBSCRIBE:'event.subscribe',UNSUBSCRIBE:'event.unsubscribe',subscribers:function i(){if(!this._subscribersMap)this._subscribersMap={};return this._subscribersMap;},subscribe:function i(j,k){var l=this.subscribers();if(!l[j]){l[j]=[k];}else if(ES(l[j],'indexOf',true,k)==-1)l[j].push(k);if(j!=this.SUBSCRIBE&&j!=this.UNSUBSCRIBE)this.fire(this.SUBSCRIBE,j,l[j]);},unsubscribe:function i(j,k){var l=this.subscribers()[j];if(l)ES(l,'forEach',true,function(m,n){if(m==k)l.splice(n,1);});if(j!=this.SUBSCRIBE&&j!=this.UNSUBSCRIBE)this.fire(this.UNSUBSCRIBE,j,l);},monitor:function i(j,k){if(!k()){var l=this,m=function n(){if(k.apply(k,arguments))l.unsubscribe(j,n);};this.subscribe(j,m);}},clear:function i(j){delete this.subscribers()[j];},fire:function i(j){var k=Array.prototype.slice.call(arguments,1),l=this.subscribers()[j];if(l)ES(l,'forEach',true,function(m){if(m)m.apply(this,k);});}};f.exports=h;}),null);
__d('JSONRPC',['Log'],(function a(b,c,d,e,f,g,h){function i(j){'use strict';this.$JSONRPC1=0;this.$JSONRPC2={};this.remote=ES(function(k){this.$JSONRPC3=k;return this.remote;},'bind',true,this);this.local={};this.$JSONRPC4=j;}i.prototype.stub=function(j){'use strict';this.remote[j]=ES(function(){var k={jsonrpc:'2.0',method:j};for(var l=arguments.length,m=Array(l),n=0;n<l;n++)m[n]=arguments[n];if(typeof m[m.length-1]=='function'){k.id=++this.$JSONRPC1;this.$JSONRPC2[k.id]=m.pop();}k.params=m;this.$JSONRPC4(ES('JSON','stringify',false,k),this.$JSONRPC3||{method:j});},'bind',true,this);};i.prototype.read=function(j,k){'use strict';var l=ES('JSON','parse',false,j),m=l.id;if(!l.method){if(!this.$JSONRPC2[m]){h.warn('Could not find callback %s',m);return;}var n=this.$JSONRPC2[m];delete this.$JSONRPC2[m];delete l.id;delete l.jsonrpc;n(l);return;}var o=this,p=this.local[l.method],q;if(m){q=function s(t,u){var v={jsonrpc:'2.0',id:m};v[t]=u;setTimeout(function(){o.$JSONRPC4(ES('JSON','stringify',false,v),k);},0);};}else q=function s(){};if(!p){h.error('Method "%s" has not been defined',l.method);q('error',{code:-32601,message:'Method not found',data:l.method});return;}l.params.push(ES(q,'bind',true,null,'result'));l.params.push(ES(q,'bind',true,null,'error'));try{var r=p.apply(k||null,l.params);if(typeof r!=='undefined')q('result',r);}catch(s){h.error('Invokation of RPC method %s resulted in the error: %s',l.method,s.message);q('error',{code:-32603,message:'Internal error',data:s.message});}};f.exports=i;}),null);
__d('sdk.RPC',['Assert','JSONRPC','Queue'],(function a(b,c,d,e,f,g,h,i,j){var k=new j(),l=new i(function(n){k.enqueue(n);}),m={local:l.local,remote:l.remote,stub:ES(l.stub,'bind',true,l),setInQueue:function n(o){h.isInstanceOf(j,o);o.start(function(p){l.read(p);});},getOutQueue:function n(){return k;}};f.exports=m;}),null);
__d('hasNamePropertyBug',['guid','UserAgent_DEPRECATED'],(function a(b,c,d,e,f,g,h,i){var j=i.ie()?undefined:false;function k(){var m=document.createElement("form"),n=m.appendChild(document.createElement("input"));n.name=h();j=n!==m.elements[n.name];m=n=null;return j;}function l(){return typeof j==='undefined'?k():j;}f.exports=l;}),null);
__d("isNumberLike",[],(function a(b,c,d,e,f,g){function h(i){return !isNaN(parseFloat(i))&&isFinite(i);}f.exports=h;}),null);
__d('sdk.createIframe',['DOMEventListener','getBlankIframeSrc','guid','hasNamePropertyBug','isNumberLike'],(function a(b,c,d,e,f,g,h,i,j,k,l){function m(n){n=ES('Object','assign',false,{},n);var o,p=n.name||j(),q=n.root,r=n.style||{border:'none'},s=n.url,t=n.onload,u=n.onerror;if(k()){o=document.createElement('<iframe name="'+p+'"/>');}else{o=document.createElement('iframe');o.name=p;}delete n.style;delete n.name;delete n.url;delete n.root;delete n.onload;delete n.onerror;var v=ES('Object','assign',false,{frameBorder:0,allowTransparency:true,allowFullscreen:true,scrolling:'no'},n);if(v.width&&l(v.width))o.width=v.width+'px';if(v.height&&l(v.height))o.height=v.height+'px';delete v.height;delete v.width;for(var w in v)if(Object.prototype.hasOwnProperty.call(v,w))o.setAttribute(w,v[w]);ES('Object','assign',false,o.style,r);o.src=i();q.appendChild(o);if(t)var x=h.add(o,'load',function(){x.remove();t();});if(u)var y=h.add(o,'error',function(){y.remove();u();});o.src=s;return o;}f.exports=m;}),null);
__d('sdk.FeatureFunctor',['invariant'],(function a(b,c,d,e,f,g,h){function i(k,l,m){if(k.features&&l in k.features){var n=k.features[l];if(typeof n==='object'&&typeof n.rate==='number'){if(n.rate&&Math.random()*100<=n.rate){return n.value||true;}else return n.value?null:false;}else return n;}return m;}function j(k){return function(l,m){arguments.length>=2||h(0);return i(k,l,m);};}f.exports={create:j};}),null);
__d('sdk.feature',['sdk.FeatureFunctor','JSSDKConfig'],(function a(b,c,d,e,f,g,h,i){f.exports=h.create(i);}),null);
__d('sdk.XD',['sdk.Content','sdk.Event','Log','QueryString','Queue','sdk.RPC','sdk.Runtime','sdk.Scribe','sdk.URI','UrlMap','JSSDKXDConfig','XDM','isFacebookURI','sdk.createIframe','sdk.feature','guid'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w){var x=new l(),y=new l(),z=new l(),aa,ba,ca=w(),da=r.useCdn?'cdn':'www',ea=v('use_bundle',false)?r.XdBundleUrl:r.XdUrl,fa=q.resolve(da,false)+ea,ga=q.resolve(da,true)+ea,ha=function va(){if('origin' in location)if(location.origin&&location.origin!=='null'){return location.origin;}else if(window!==window.parent)try{var wa=parent.location.origin;if(wa&&wa!=='null')return wa;}catch(xa){}return location.protocol+'//'+location.host;},ia=w(),ja=ha(),ka,la=false,ma='Facebook Cross Domain Communication Frame',na={},oa=new l();m.setInQueue(oa);function pa(va){j.info('Remote XD can talk to facebook.com (%s)',va);n.setEnvironment(va==='canvas'?n.ENVIRONMENTS.CANVAS:n.ENVIRONMENTS.PAGETAB);}function qa(va,wa){if(!wa){j.error('No senderOrigin');throw new Error();}var xa=/^https?/.exec(wa)[0];switch(va.xd_action){case 'proxy_ready':var ya,za;if(xa=='https'){ya=z;za=ba;n.setLoggedIntoFacebook(va.logged_in==='true');}else{ya=y;za=aa;}if(va.registered){pa(va.registered);x=ya.merge(x);}j.info('Proxy ready, starting queue %s containing %s messages',xa+'ProxyQueue',ya.getLength());ya.start(function(bb){ka.send(typeof bb==='string'?bb:k.encode(bb),wa,za.contentWindow,ia+'_'+xa);});break;case 'plugin_ready':j.info('Plugin %s ready, protocol: %s',va.name,xa);na[va.name]={protocol:xa};if(l.exists(va.name)){var ab=l.get(va.name);j.debug('Enqueuing %s messages for %s in %s',ab.getLength(),va.name,xa+'ProxyQueue');(xa=='https'?z:y).merge(ab);}break;}if(va.data)ra(va.data,wa);}function ra(va,wa){if(wa&&wa!=='native'&&!t(new p(wa)))return;if(typeof va=='string'){if(/^FB_RPC:/.test(va)){oa.enqueue(va.substring(7));return;}if(va.substring(0,1)=='{'){try{va=ES('JSON','parse',false,va);}catch(ya){j.warn('Failed to decode %s as JSON',va);return;}}else va=k.decode(va);}if(!wa)if(va.xd_sig==ca)wa=va.xd_origin;if(va.xd_action){qa(va,wa);return;}if(va.access_token)n.setSecure(/^https/.test(ja));if(va.cb){var xa=ua._callbacks[va.cb];if(!ua._forever[va.cb])delete ua._callbacks[va.cb];if(xa)xa(va);}}function sa(va,wa){if(va=='facebook'){wa.relation='parent.parent';x.enqueue(wa);}else{wa.relation='parent.frames["'+va+'"]';var xa=na[va];if(xa){j.debug('Enqueuing message for plugin %s in %s',va,xa.protocol+'ProxyQueue');(xa.protocol=='https'?z:y).enqueue(wa);}else{j.debug('Buffering message for plugin %s',va);l.get(va).enqueue(wa);}}}m.getOutQueue().start(function(va){sa('facebook','FB_RPC:'+va);});function ta(va){if(la)return;var wa=h.appendHidden(document.createElement('div')),xa=s.create({blacklist:null,root:wa,channel:ia,flashUrl:r.Flash.path,whenReady:function ya(za){ka=za;var ab={channel:ia,origin:ja,transport:xa,xd_name:va},bb='#'+k.encode(ab);if(n.getSecure()!==true)aa=u({url:fa+bb,name:'fb_xdm_frame_http',id:'fb_xdm_frame_http',root:wa,'aria-hidden':true,title:ma,tabindex:-1});ba=u({url:ga+bb,name:'fb_xdm_frame_https',id:'fb_xdm_frame_https',root:wa,'aria-hidden':true,title:ma,tabindex:-1});},onMessage:ra});if(!xa)o.log('jssdk_error',{appId:n.getClientID(),error:'XD_TRANSPORT',extra:{message:'Failed to create a valid transport'}});la=true;}var ua={rpc:m,_callbacks:{},_forever:{},_channel:ia,_origin:ja,onMessage:ra,recv:ra,init:ta,sendToFacebook:sa,inform:function va(wa,xa,ya,za){sa('facebook',{method:wa,params:ES('JSON','stringify',false,xa||{}),behavior:za||'p',relation:ya});},handler:function va(wa,xa,ya,za){var ab='#'+k.encode({cb:this.registerCallback(wa,ya,za),origin:ja+'/'+ia,domain:location.hostname,relation:xa||'opener'});return (location.protocol=='https:'?ga:fa)+ab;},registerCallback:function va(wa,xa,ya){ya=ya||w();if(xa)ua._forever[ya]=true;ua._callbacks[ya]=wa;return ya;},getXDArbiterURL:function va(wa){return wa?ga:fa;}};i.subscribe('init:post',function(va){ta(va.xdProxyName);var wa=v('xd_timeout',false);if(wa)setTimeout(function(){var xa=ba&&!!aa==y.isStarted()&&!!ba==z.isStarted();if(!xa)o.log('jssdk_error',{appId:n.getClientID(),error:'XD_INITIALIZATION',extra:{message:'Failed to initialize in '+wa+'ms'}});},wa);});f.exports=ua;}),null);
__d('sdk.getContextType',['sdk.Runtime','sdk.UA'],(function a(b,c,d,e,f,g,h,i){function j(){if(i.nativeApp())return 3;if(i.mobile())return 2;if(h.isEnvironment(h.ENVIRONMENTS.CANVAS))return 5;return 1;}f.exports=j;}),null);
__d('sdk.Auth',['sdk.Cookie','sdk.createIframe','DOMWrapper','sdk.feature','sdk.getContextType','guid','sdk.Impressions','Log','ObservableMixin','sdk.Runtime','sdk.Scribe','sdk.SignedRequest','UrlMap','sdk.URI','sdk.XD'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){var w='fblo_',x=365*24*60*60*1000,y,z,aa=new p();function ba(ja,ka){var la=q.getUserID(),ma='';if(ja)if(ja.userID){ma=ja.userID;}else if(ja.signedRequest){var na=s.parse(ja.signedRequest);if(na&&na.user_id)ma=na.user_id;}var oa=q.getLoginStatus(),pa=oa==='unknown'&&ja||q.getUseCookie()&&q.getCookieUserID()!==ma,qa=la&&!ja,ra=ja&&la&&la!=ma,sa=ja!=y,ta=ka!=(oa||'unknown');q.setLoginStatus(ka);q.setAccessToken(ja&&ja.accessToken||null);q.setUserID(ma);y=ja;var ua={authResponse:ja,status:ka};if(qa||ra)aa.inform('logout',ua);if(pa||ra)aa.inform('login',ua);if(sa)aa.inform('authresponse.change',ua);if(ta)aa.inform('status.change',ua);return ua;}function ca(){return y;}function da(ja,ka,la){return function(ma){var na;if(ma&&ma.access_token){var oa=s.parse(ma.signed_request);ka={accessToken:ma.access_token,userID:oa.user_id,expiresIn:parseInt(ma.expires_in,10),signedRequest:ma.signed_request};if(ma.granted_scopes)ka.grantedScopes=ma.granted_scopes;if(q.getUseCookie()){var pa=ka.expiresIn===0?0:ES('Date','now',false)+ka.expiresIn*1000,qa=h.getDomain();if(!qa&&ma.base_domain)h.setDomain('.'+ma.base_domain);h.setSignedRequestCookie(ma.signed_request,pa);ea();}na='connected';ba(ka,na);}else if(la==='logout'||la==='login_status'){if(ma.error&&ma.error==='not_authorized'){na='not_authorized';}else na='unknown';ba(null,na);if(q.getUseCookie())h.clearSignedRequestCookie();if(la==='logout'){fa();r.log('jssdk_error',{appId:q.getClientID(),error:'PLATFORM_AUTH_LOGOUT',extra:{args:{fblo:true}}});}}if(ma&&ma.https==1)q.setSecure(true);if(ja)ja({authResponse:ka,status:q.getLoginStatus()});return ka;};}function ea(){h.setRaw(w,'',0);}function fa(){h.setRaw(w,'y',ES('Date','now',false)+x);}function ga(ja){var ka,la=ES('Date','now',false);if(z){clearTimeout(z);z=null;}var ma=h.getRaw(w)==='y';if(k('getloginstatus_tracking',true))r.log('jssdk_error',{appId:q.getClientID(),error:'PLATFORM_AUTH_GETLOGINSTATUS',extra:{args:{fblo:ma}}});if(ma){var na='unknown';ba(null,na);if(ja)ja({authResponse:null,status:na});return;}var oa=da(ja,y,'login_status'),pa=new u(t.resolve('www',true)+'/connect/ping').setQueryData({client_id:q.getClientID(),response_type:'token,signed_request,code',domain:location.hostname,origin:l(),redirect_uri:v.handler(function(qa){if(k('e2e_ping_tracking',true)){var ra={init:la,close:ES('Date','now',false),method:'ping'};o.debug('e2e: %s',ES('JSON','stringify',false,ra));n.log(114,{payload:ra});}ka.parentNode.removeChild(ka);if(oa(qa))z=setTimeout(function(){ga(function(){});},1200000);},'parent'),sdk:'joey',kid_directed_site:q.getKidDirectedSite()});ka=i({root:j.getRoot(),name:m(),url:pa.toString(),style:{display:'none'}});}var ha;function ia(ja,ka){if(!q.getClientID()){o.warn('FB.getLoginStatus() called before calling FB.init().');return;}if(ja)if(!ka&&ha=='loaded'){ja({status:q.getLoginStatus(),authResponse:ca()});return;}else aa.subscribe('FB.loginStatus',ja);if(!ka&&ha=='loading')return;ha='loading';var la=function ma(na){ha='loaded';aa.inform('FB.loginStatus',na);aa.clearSubscribers('FB.loginStatus');};ga(la);}ES('Object','assign',false,aa,{removeLogoutState:ea,getLoginStatus:ia,fetchLoginStatus:ga,setAuthResponse:ba,getAuthResponse:ca,parseSignedRequest:s.parse,xdResponseWrapper:da});f.exports=aa;}),null);
__d('sdk.DOM',['Assert','sdk.UA','sdk.domReady'],(function a(b,c,d,e,f,g,h,i,j){var k={};function l(z,aa){var ba=z.getAttribute(aa)||z.getAttribute(aa.replace(/_/g,'-'))||z.getAttribute(aa.replace(/-/g,'_'))||z.getAttribute(aa.replace(/-/g,''))||z.getAttribute(aa.replace(/_/g,''))||z.getAttribute('data-'+aa)||z.getAttribute('data-'+aa.replace(/_/g,'-'))||z.getAttribute('data-'+aa.replace(/-/g,'_'))||z.getAttribute('data-'+aa.replace(/-/g,''))||z.getAttribute('data-'+aa.replace(/_/g,''));return ba?String(ba):null;}function m(z,aa){var ba=l(z,aa);return ba?/^(true|1|yes|on)$/.test(ba):null;}function n(z,aa){h.isTruthy(z,'element not specified');h.isString(aa);try{return String(z[aa]);}catch(ba){throw new Error('Could not read property '+aa+' : '+ba.message);}}function o(z,aa){h.isTruthy(z,'element not specified');h.isString(aa);try{z.innerHTML=aa;}catch(ba){throw new Error('Could not set innerHTML : '+ba.message);}}function p(z,aa){h.isTruthy(z,'element not specified');h.isString(aa);var ba=' '+n(z,'className')+' ';return ES(ba,'indexOf',true,' '+aa+' ')>=0;}function q(z,aa){h.isTruthy(z,'element not specified');h.isString(aa);if(!p(z,aa))z.className=n(z,'className')+' '+aa;}function r(z,aa){h.isTruthy(z,'element not specified');h.isString(aa);var ba=new RegExp('\\s*'+aa,'g');z.className=ES(n(z,'className').replace(ba,''),'trim',true);}function s(z,aa,ba){h.isString(z);aa=aa||document.body;ba=ba||'*';if(aa.querySelectorAll)return ES('Array','from',false,aa.querySelectorAll(ba+'.'+z));var ca=aa.getElementsByTagName(ba),da=[];for(var ea=0,fa=ca.length;ea<fa;ea++)if(p(ca[ea],z))da[da.length]=ca[ea];return da;}function t(z,aa){h.isTruthy(z,'element not specified');h.isString(aa);aa=aa.replace(/-(\w)/g,function(da,ea){return ea.toUpperCase();});var ba=z.currentStyle||document.defaultView.getComputedStyle(z,null),ca=ba[aa];if(/backgroundPosition?/.test(aa)&&/top|left/.test(ca))ca='0%';return ca;}function u(z,aa,ba){h.isTruthy(z,'element not specified');h.isString(aa);aa=aa.replace(/-(\w)/g,function(ca,da){return da.toUpperCase();});z.style[aa]=ba;}function v(z,aa){var ba=true;for(var ca=0,da;da=aa[ca++];)if(!(da in k)){ba=false;k[da]=true;}if(ba)return;if(i.ie()<11){try{document.createStyleSheet().cssText=z;}catch(fa){if(document.styleSheets[0])document.styleSheets[0].cssText+=z;}}else{var ea=document.createElement('style');ea.type='text/css';ea.textContent=z;document.getElementsByTagName('head')[0].appendChild(ea);}}function w(){var z=document.documentElement&&document.compatMode=='CSS1Compat'?document.documentElement:document.body;return {scrollTop:z.scrollTop||document.body.scrollTop,scrollLeft:z.scrollLeft||document.body.scrollLeft,width:window.innerWidth?window.innerWidth:z.clientWidth,height:window.innerHeight?window.innerHeight:z.clientHeight};}function x(z){h.isTruthy(z,'element not specified');var aa=0,ba=0;do{aa+=z.offsetLeft;ba+=z.offsetTop;}while(z=z.offsetParent);return {x:aa,y:ba};}var y={containsCss:p,addCss:q,removeCss:r,getByClass:s,getStyle:t,setStyle:u,getAttr:l,getBoolAttr:m,getProp:n,html:o,addCssRules:v,getViewportInfo:w,getPosition:x,ready:j};f.exports=y;}),null);
__d('normalizeError',['sdk.UA'],(function a(b,c,d,e,f,g,h){function i(j){var k={line:j.lineNumber||j.line,message:j.message,name:j.name,script:j.fileName||j.sourceURL||j.script,stack:j.stackTrace||j.stack};k._originalError=j;var l=/([\w:\.\/]+\.js):(\d+)/.exec(j.stack);if(h.chrome()&&l){k.script=l[1];k.line=parseInt(l[2],10);}for(var m in k)k[m]==null&&delete k[m];return k;}f.exports=i;}),null);
__d('sdk.ErrorHandling',['ManagedError','sdk.Runtime','sdk.Scribe','sdk.feature','normalizeError','wrapFunction'],(function a(b,c,d,e,f,g,h,i,j,k,l,m){var n=k('error_handling',false),o='';function p(v){var w=v._originalError;delete v._originalError;j.log('jssdk_error',{appId:i.getClientID(),error:v.name||v.message,extra:v});throw w;}function q(v,w){return function(){if(!n)return v.apply(this,arguments);try{o=w;return v.apply(this,arguments);}catch(z){if(z instanceof h)throw z;var x=l(z);x.entry=w;var y=ES(Array.prototype.slice.call(arguments),'map',true,function(aa){var ba=Object.prototype.toString.call(aa);return /^\[object (String|Number|Boolean|Object|Date)\]$/.test(ba)?aa:aa.toString();});x.args=ES('JSON','stringify',false,y).substring(0,200);p(x);}finally{o='';}};}function r(v){if(!v.__wrapper)v.__wrapper=function(){try{return v.apply(this,arguments);}catch(w){window.setTimeout(function(){throw w;},0);return false;}};return v.__wrapper;}function s(v){try{return v&&v.callee&&v.callee.caller?v.callee.caller.name:'';}catch(w){return '';}}function t(v,w){return function(x,y){var z=w+':'+(o||'[global]')+':'+(x.name||'[anonymous]'+s(arguments));return v(m(x,'entry',z),y);};}if(n){setTimeout=t(setTimeout,'setTimeout');setInterval=t(setInterval,'setInterval');m.setWrapper(q,'entry');}var u={guard:q,unguard:r};f.exports=u;}),null);
__d('sdk.Insights',['sdk.Impressions'],(function a(b,c,d,e,f,g,h){var i={TYPE:{NOTICE:'notice',WARNING:'warn',ERROR:'error'},CATEGORY:{DEPRECATED:'deprecated',APIERROR:'apierror'},log:function j(k,l,m){var n={source:'jssdk',type:k,category:l,payload:m};h.log(113,n);},impression:h.impression};f.exports=i;}),null);
__d('FB',['sdk.Auth','JSSDKCssConfig','dotAccess','sdk.domReady','sdk.DOM','sdk.ErrorHandling','sdk.Content','DOMWrapper','GlobalCallback','sdk.Insights','Log','sdk.Runtime','sdk.Scribe','JSSDKConfig'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){var v=void 0,w=void 0,x=j(u,'api.mode'),y={};v=window.FB={};var z={};r.level=0;p.setPrefix('FB.__globalCallbacks');var aa=document.createElement('div');o.setRoot(aa);k(function(){r.info('domReady');n.appendHidden(aa);if(i.rules)l.addCssRules(i.rules,i.components);});s.subscribe('AccessToken.change',function(da){if(!da&&s.getLoginStatus()==='connected')h.getLoginStatus(null,true);});if(j(u,'api.whitelist.length')){w={};ES(u.api.whitelist,'forEach',true,function(da){w[da]=1;});}function ba(da,ea,fa,ga){var ha;if(/^_/.test(fa)){ha='hide';}else if(w&&!w[ea])ha=x;switch(ha){case 'hide':return;case 'stub':return function(){r.warn('The method FB.%s has been removed from the JS SDK.',ea);};default:return m.guard(function(){if(ha==='warn'){r.warn('The method FB.%s is not officially supported by '+'Facebook and access to it will soon be removed.',ea);if(!Object.prototype.hasOwnProperty.call(y,ea)){q.log(q.TYPE.WARNING,q.CATEGORY.DEPRECATED,'FB.'+ea);t.log('jssdk_error',{appId:s.getClientID(),error:'Private method used',extra:{args:ea}});y[ea]=true;}}function ia(pa){if(ES('Array','isArray',false,pa))return ES(pa,'map',true,ia);if(pa&&typeof pa==='object'&&pa.__wrapped)return pa.__wrapped;return typeof pa==='function'&&/^function/.test(pa.toString())?m.unguard(pa):pa;}var ja=ES(Array.prototype.slice.call(arguments),'map',true,ia),ka=da.apply(ga,ja),la,ma=true;if(ka&&typeof ka==='object'){la=ES('Object','create',false,ka);la.__wrapped=ka;for(var na in ka){var oa=ka[na];if(typeof oa!=='function'||na==='constructor')continue;ma=false;la[na]=ba(oa,ea+':'+na,na,ka);}}if(!ma)return la;return ma?ka:la;},ea);}}function ca(da,ea){var fa=da?j(v,da,true):v;ES(ES('Object','keys',false,ea),'forEach',true,function(ga){var ha=ea[ga];if(typeof ha==='function'){var ia=(da?da+'.':'')+ga,ja=ba(ha,ia,ga,ea);if(ja)fa[ga]=ja;}else if(typeof ha==='object'||typeof ha==='number'){ia=(da?da+'.':'')+ga;if(w&&w[ia])fa[ga]=ha;}});}s.setSecure(function(){var da=/iframe_canvas|app_runner/.test(window.name),ea=/dialog/.test(window.name);if(location.protocol=='https:'&&(window==top||!(da||ea)))return true;if(/_fb_https?/.test(window.name))return ES(window.name,'indexOf',true,'_fb_https')!=-1;}());ES('Object','assign',false,z,{provide:ca});f.exports=z;}),null);
__d('ArgumentError',['ManagedError'],(function a(b,c,d,e,f,g,h){function i(j,k){h.prototype.constructor.apply(this,arguments);}i.prototype=new h();i.prototype.constructor=i;f.exports=i;}),null);
__d('errorCode',[],(function a(b,c,d,e,f,g){'use strict';function h(i){throw new Error('errorCode'+'("'+i+'"): This should not happen. Oh noes!');}f.exports=h;}),null);
__d('sdk.safelyParseResponse',['errorCode'],(function a(b,c,d,e,f,g,h){'use strict';function i(k){try{return k===null?j:ES('JSON','parse',false,k);}catch(l){return j;}}var j={error:{code:1,error_subcode:1357046,message:'Received Invalid JSON reply.',type:'http'}};i.ERROR=j;f.exports=i;}),null);
__d('CORSRequest',['wrapFunction','QueryString','errorCode','sdk.safelyParseResponse'],(function a(b,c,d,e,f,g,h,i,j,k){function l(o,p){if(!self.XMLHttpRequest)return null;var q=new XMLHttpRequest(),r=function v(){};if('withCredentials' in q){q.open(o,p,true);q.setRequestHeader('Content-type','application/x-www-form-urlencoded');}else if(self.XDomainRequest){q=new XDomainRequest();try{q.open(o,p);q.onprogress=q.ontimeout=r;}catch(v){return null;}}else return null;var s={send:function v(w){q.send(w);}},t=h(function(){t=r;if('onload' in s)s.onload(q);},'entry','XMLHttpRequest:load'),u=h(function(){u=r;if('onerror' in s)s.onerror(q);},'entry','XMLHttpRequest:error');q.onload=function(){t();};q.onerror=function(){u();};q.onreadystatechange=function(){if(q.readyState==4)if(q.status==200){t();}else u();};return s;}function m(o,p,q,r){q.suppress_http_code=1;var s=i.encode(q);if(p!='post'){o=i.appendToUrl(o,s);s='';}var t=l(p,o);if(!t)return false;t.onload=function(u){r(k(u.responseText));};t.onerror=function(u){if(u.responseText){r(k(u.responseText));}else r({error:{code:1,error_subcode:1357045,message:'unknown error (empty response)',status:u.status,type:'http'}});};t.send(s);return true;}var n={execute:m};f.exports=n;}),null);
__d('FlashRequest',['DOMWrapper','Flash','GlobalCallback','QueryString','Queue'],(function a(b,c,d,e,f,g,h,i,j,k,l){var m,n={},o,p;function q(){if(!o)throw new Error('swfUrl has not been set');var t=j.create(function(){m.start(function(v){var w=p.execute(v.method,v.url,v.body);if(!w)throw new Error('Could create request');n[w]=v.callback;});}),u=j.create(function(v,w,x){var y;try{y=ES('JSON','parse',false,decodeURIComponent(x));}catch(z){y={error:{type:'SyntaxError',message:z.message,status:w,raw:x}};}n[v](y);delete n[v];});p=i.embed(o,h.getRoot(),null,{log:false,initCallback:t,requestCallback:u});}function r(t,u,v,w){v.suppress_http_code=1;if(!v.method)v.method=u;var x=k.encode(v);if(u==='get'&&t.length+x.length<2000){t=k.appendToUrl(t,x);x='';}else u='post';if(!m){if(!i.isAvailable())return false;m=new l();q();}m.enqueue({method:u,url:t,body:x,callback:w});return true;}var s={setSwfUrl:function t(u){o=u;},execute:r};f.exports=s;}),null);
__d('JSONPRequest',['DOMWrapper','GlobalCallback','QueryString'],(function a(b,c,d,e,f,g,h,i,j){var k=2000,l=false;function m(p,q,r,s){var t=document.createElement('script'),u=function w(x){u=function y(){};i.remove(r.callback);s(x);t.parentNode.removeChild(t);};r.callback=i.create(u);if(!r.method)r.method=q;p=j.appendToUrl(p,r);if(!l&&p.length>k){i.remove(r.callback);return false;}t.onerror=function(){u({error:{type:'http',message:'unknown error'}});};var v=function w(){setTimeout(function(){u({error:{type:'http',message:'unknown error'}});},0);};if(t.addEventListener){t.addEventListener('load',v,false);}else t.onreadystatechange=function(){if(/loaded|complete/.test(this.readyState))v();};t.src=p;h.getRoot().appendChild(t);return true;}function n(){l=true;}var o={execute:m,ignoreMaxQuerystringLength:n,MAX_QUERYSTRING_LENGTH:k};f.exports=o;}),null);
__d('flattenObject',[],(function a(b,c,d,e,f,g){function h(i){var j={};for(var k in i)if(Object.prototype.hasOwnProperty.call(i,k)){var l=i[k];if(null===l||undefined===l){continue;}else if(typeof l=='string'){j[k]=l;}else j[k]=ES('JSON','stringify',false,l);}return j;}f.exports=h;}),null);
__d('ApiClient',['ArgumentError','Assert','CORSRequest','FlashRequest','flattenObject','JSONPRequest','Log','ObservableMixin','QueryString','sprintf','sdk.URI','UrlMap','ApiClientConfig','invariant','sdk.safelyParseResponse'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){var w,x,y,z=m.MAX_QUERYSTRING_LENGTH,aa={get:true,post:true,'delete':true,put:true},ba={fql_query:true,fql_multiquery:true,friends_get:true,notifications_get:true,stream_get:true,users_getinfo:true},ca=['jsonp','cors','flash'],da=[],ea=[],fa=null,ga=0,ha=[],ia=0,ja=50,ka=105440539523;function la(va,wa,xa,ya){var za=ia!==0&&ga>=ia;if(za){ha.push(function(){return la(va,wa,xa,ya);});ta.inform('request.queued',va,wa,xa);return;}ga++;if(y)xa=ES('Object','assign',false,{},y,xa);xa.pretty=xa.pretty||0;xa=l(xa);var ab={jsonp:m,cors:j,flash:k},bb={},cb=xa.access_token||w;if(cb)bb.access_token=cb;var db=ES('Object','keys',false,bb);if(db.length>0){va=p.appendToUrl(va,bb);ES(db,'forEach',true,function(ib){return delete xa[ib];});}var eb;if(xa.transport){eb=[xa.transport];delete xa.transport;}else eb=ca;for(var fb=0;fb<eb.length;fb++){var gb=ab[eb[fb]],hb=ES('Object','assign',false,{},xa);if(gb.execute(va,wa,hb,ya))return;}ya({error:{type:'no-transport',message:'Could not find a usable transport for request'}});}function ma(va,wa,xa,ya,za,ab){if(ab&&ab.error)ta.inform('request.error',wa,xa,ya,ab,ES('Date','now',false)-za);ta.inform('request.complete',wa,xa,ya,ab,ES('Date','now',false)-za);ga--;if(va)va(ab);var bb=ha.length>0&&ga<ia;if(bb){var cb=ha.shift();cb();}}function na(va){var wa=va.shift();i.isString(wa,'Invalid path');if(!/^https?/.test(wa)&&wa.charAt(0)!=='/')wa='/'+wa;var xa,ya={};try{xa=new r(wa);}catch(cb){throw new h(cb.message,cb);}ES(va,'forEach',true,function(cb){return ya[typeof cb]=cb;});var za=(ya.string||'get').toLowerCase();i.isTrue(Object.prototype.hasOwnProperty.call(aa,za),q('Invalid method passed to ApiClient: %s',za));var ab=ya['function'];if(!ab)n.warn('No callback passed to the ApiClient');if(ya.object)xa.addQueryData(l(ya.object));var bb=xa.getQueryData();bb.method=za;return {uri:xa,callback:ab,params:bb};}function oa(){for(var va=arguments.length,wa=Array(va),xa=0;xa<va;xa++)wa[xa]=arguments[xa];var ya=na(wa),za=ya.uri,ab=ya.callback,bb=ya.params,cb=bb.method;if(ua(za,cb))cb='post';var db=za.getProtocol()&&za.getDomain()?za.setQueryData({}).toString():s.resolve('graph')+za.getPath();ta.inform('request.prepare',db,bb);la(db,cb=='get'?'get':'post',bb,ES(ma,'bind',true,null,ab,za.getPath(),cb,bb,ES('Date','now',false)));}function pa(va){var wa=na(va),xa=wa.uri,ya=wa.callback,za=wa.params.method,ab,bb=xa.removeQueryData('method').toString();if(za.toLowerCase()=='post'){ab=p.encode(xa.getQueryData());bb=xa.setQueryData({}).toString();}return {body:ab,callback:ya,method:za,relative_url:bb};}function qa(){for(var va=arguments.length,wa=Array(va),xa=0;xa<va;xa++)wa[xa]=arguments[xa];var ya=pa(wa),za=ya.body,ab=ya.callback,bb=ya.method,cb=ya.relative_url,db={method:bb,relative_url:cb};if(za)db.body=za;da.push(db);ea.push(ab);if(da.length==ja){if(fa)clearTimeout(fa);ra();}else if(!fa)fa=setTimeout(ra,0);}function ra(){da.length>0||u(0);da.length===ea.length||u(0);var va=da,wa=ea;da=[];ea=[];fa=null;if(va.length===1){var xa=va[0],ya=wa[0],za=xa.body?p.decode(xa.body):null;oa(xa.relative_url,xa.method,za,ya);return;}oa('/','POST',{batch:va,include_headers:false,batch_app_id:x||ka},function(ab){if(ES('Array','isArray',false,ab)){ES(ab,'forEach',true,function(bb,cb){wa[cb](v(bb&&bb.body));});}else ES(wa,'forEach',true,function(bb){return bb({error:{message:'Fatal: batch call failed.'}});});});}function sa(va,wa){i.isObject(va);i.isString(va.method,'method missing');if(!wa)n.warn('No callback passed to the ApiClient');var xa=va.method.toLowerCase().replace('.','_');va.format='json-strings';va.api_key=x;var ya=xa in ba?'api_read':'api',za=s.resolve(ya)+'/restserver.php',ab=ES(ma,'bind',true,null,wa,'/restserver.php','get',va,ES('Date','now',false));la(za,'get',va,ab);}var ta=ES('Object','assign',false,new o(),{setAccessToken:function va(wa){w=wa;},setAccessTokenForClientID:function va(wa,xa){if(!(w&&x&&x!==xa))w=wa;},getAccessToken:function va(){return w;},setClientID:function va(wa){x=wa;},setDefaultParams:function va(wa){y=wa;},setDefaultTransports:function va(wa){ca=wa;},setMaxConcurrentRequests:function va(wa){ia=wa;},getCurrentlyExecutingRequestCount:function va(){return ga;},getQueuedRequestCount:function va(){return ha.length;},rest:sa,graph:oa,scheduleBatchCall:qa,prepareBatchParams:pa});function ua(va,wa){return va.toString().length>z&&wa==='get';}k.setSwfUrl(t.FlashRequest.swfUrl);f.exports=ta;}),null);
__d('sdk.PlatformVersioning',['sdk.Runtime','ManagedError'],(function a(b,c,d,e,f,g,h,i){var j=/^v\d+\.\d\d?$/,k={REGEX:j,assertVersionIsSet:function l(){if(!h.getVersion())throw new i('init not called with valid version');},assertValidVersion:function l(m){if(!j.test(m))throw new i('invalid version specified');}};f.exports=k;}),null);
__d('sdk.api',['ApiClient','sdk.PlatformVersioning','sdk.Runtime','sdk.Scribe','sdk.URI','sdk.feature'],(function a(b,c,d,e,f,g,h,i,j,k,l,m){var n=m('should_log_response_error',false),o;j.subscribe('ClientID.change',function(q){return h.setClientID(q);});j.subscribe('AccessToken.change',function(q){o=q;h.setAccessToken(q);});h.setDefaultParams({sdk:'joey'});h.subscribe('request.complete',function(q,r,s,t){var u=false;if(t&&typeof t=='object')if(t.error){if(t.error=='invalid_token'||t.error.type=='OAuthException'&&t.error.code==190)u=true;}else if(t.error_code)if(t.error_code=='190')u=true;if(u&&o===j.getAccessToken())j.setAccessToken(null);});h.subscribe('request.complete',function(q,r,s,t){if((q=='/me/permissions'&&r==='delete'||q=='/restserver.php'&&s.method=='Auth.revokeAuthorization')&&t===true)j.setAccessToken(null);});h.subscribe('request.error',function(q,r,s,t){if(n&&t.error.type==='http')k.log('jssdk_error',{appId:j.getClientID(),error:'transport',extra:{name:'transport',message:ES('JSON','stringify',false,t.error)}});});function p(q){if(typeof q==='string'){if(j.getIsVersioned()){i.assertVersionIsSet();if(!/https?/.test(q)&&q.charAt(0)!=='/')q='/'+q;q=new l(q).setDomain(null).setProtocol(null).toString();if(!i.REGEX.test(q.substring(1,ES(q,'indexOf',true,'/',1))))q='/'+j.getVersion()+q;var r=[q].concat(Array.prototype.slice.call(arguments,1));h.graph.apply(h,r);}else h.graph.apply(h,arguments);}else h.rest.apply(h,arguments);}f.exports=p;}),null);
__d('legacy:fb.api',['FB','sdk.api'],(function a(b,c,d,e,f,g,h,i){h.provide('',{api:i});}),3);
__d('resolveURI',[],(function a(b,c,d,e,f,g){function h(i){if(!i)return window.location.href;i=i.replace(/&/g,'&amp;').replace(/\"/g,'&quot;');var j=document.createElement('div');j.innerHTML='<a href="'+i+'"></a>';return j.firstChild.href;}f.exports=h;}),null);
__d('sdk.Canvas.Environment',['sdk.RPC'],(function a(b,c,d,e,f,g,h){function i(l){h.remote.getPageInfo(function(m){l(m.result);});}function j(l,m){h.remote.scrollTo({x:l||0,y:m||0});}h.stub('getPageInfo');h.stub('scrollTo');var k={getPageInfo:i,scrollTo:j};f.exports=k;}),null);
__d('sdk.DialogUtils',['sdk.Content','sdk.DOM','DOMEventListener','sdk.UA','sdk.feature'],(function a(b,c,d,e,f,g,h,i,j,k,l){'use strict';var m={isOrientationPotrait:function n(){return window.innerWidth<window.innerHeight;},addDoubleClickAction:function n(o,p,q){var r=null;return j.add(o,'click',function(){if(r!==null){clearTimeout(r);r=null;p();}r=setTimeout(function(){r=null;},q);});},addIdleDesktopAction:function n(o,p,q){var r=void 0,event=void 0,s=function t(){r=setTimeout(p,q);};s();return j.add(o,'mouseenter',function(){clearTimeout(r);if(!event)event=j.add(o,'mouseleave',function(){s();});});},addMobileOrientationChangeAction:function n(o){if(!k.mobile())return null;var event='onorientationchange' in window?'orientationchange':'resize',p=function q(r){return setTimeout(function(s){return o(s);},50);};return j.add(window,event,p);},applyScreenDimensions:function n(o){if(o==null)return;var p=i.getViewportInfo();o.style.minHeight=p.height||p.width?p.height+'px':'';o.style.top=p.scrollTop?p.scrollTop+'px':'';},setDialogPositionToCenter:function n(o,p,q){var r=function ba(ca){return typeof ca==='number'?ca:parseInt(ca,10);},s=i.getViewportInfo(),t=r(o.offsetWidth),u=r(o.offsetHeight),v=s.scrollLeft+(s.width-t)/2,w=(s.height-u)/2.5;if(v<w)w=v;var x=s.height-u-w,y=(s.height-u)/2;if(q)y=q.scrollTop-q.offsetTop+(q.clientHeight-u)/2;if(y<w){y=w;}else if(y>x)y=x;y+=s.scrollTop;if(k.mobile()){var z=100;if(p){z+=(s.height-u)/2;i.addCss(document.body,'fb_reposition');}else{i.addCss(document.body,'fb_hidden');if(l('dialog_resize_refactor',false))document.body.style.width='auto';y=10000;}var aa=i.getByClass('fb_dialog_padding',o);if(aa.length)aa[0].style.height=z+'px';}o.style.left=(v>0?v:0)+'px';o.style.top=(y>0?y:0)+'px';},setDialogPositionToTop:function n(o,p,q){this.setDialogPositionToCenter(o,p,q);var r=i.getViewportInfo(),s=r.scrollTop+(r.height-o.offsetHeight)*.05;i.setStyle(o,'top',s+'px');},setupNewDarkOverlay:function n(){var o=document.createElement('div');o.setAttribute('id','fb_dialog_ipad_overlay');this.applyScreenDimensions(o);return o;},setupNewDialog:function n(o){o=o||{};var p=document.createElement('div'),q=o,r=q.onClose;if(o.closeIcon&&r){var s=document.createElement('a');s.className='fb_dialog_close_icon';j.add(s,'click',r);p.appendChild(s);}var t='fb_dialog';t+=' '+(o.classes||'');if(k.ie()){t+=' fb_dialog_legacy';ES(['vert_left','vert_right','horiz_top','horiz_bottom','top_left','top_right','bottom_left','bottom_right'],'forEach',true,function(x){var y=document.createElement('span');y.className='fb_dialog_'+x;p.appendChild(y);});}else t+=k.mobile()?' fb_dialog_mobile':' fb_dialog_advanced';p.className=t;if(o.width){var u=parseInt(o.width,10);if(!isNaN(u))p.style.width=u+'px';}var v=document.createElement('div');if(o.content)h.append(o.content,v);v.className='fb_dialog_content';p.appendChild(v);if(k.mobile()){var w=document.createElement('div');w.className='fb_dialog_padding';p.appendChild(w);}return {dialogElement:p,contentRoot:v};},onDialogHideCleanup:function n(o){var p=document.body;if(o){i.removeCss(p,'fb_reposition');}else i.removeCss(p,'fb_hidden');}};f.exports=m;}),null);
__d('sdk.fbt',[],(function a(b,c,d,e,f,g){var h={_:function i(j){return typeof j==='string'?j:j[0];}};f.exports=h;}),null);
__d('sdk.Dialog',['sdk.Canvas.Environment','sdk.Content','sdk.DialogUtils','sdk.DOM','DOMEventListener','ObservableMixin','sdk.Runtime','Type','sdk.UA','sdk.fbt','sdk.feature'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var s=30,t=590,u=500,v=240,w=575;function x(){if(r('dialog_resize_refactor',false)){var aa=k.getViewportInfo();if(aa.height&&aa.width)return {width:Math.min(aa.width,u),height:Math.min(aa.height,t)};}return null;}var y=o.extend({constructor:function aa(ba,ca){this.parent();this.id=ba;this.display=ca;this._e2e={};if(!z._dialogs){z._dialogs={};z._addOrientationHandler();}z._dialogs[ba]=this;this.trackEvent('init');},trackEvent:function aa(ba,ca){if(this._e2e[ba])return this;this._e2e[ba]=ca||ES('Date','now',false);if(ba=='close')this.inform('e2e:end',this._e2e);return this;},trackEvents:function aa(ba){if(typeof ba==='string')ba=ES('JSON','parse',false,ba);for(var ca in ba)if(Object.prototype.hasOwnProperty.call(ba,ca))this.trackEvent(ca,ba[ca]);return this;}},m),z={newInstance:function aa(ba,ca){return new y(ba,ca);},_dialogs:null,_lastYOffset:0,_overlayListeners:[],_loaderEl:null,_overlayEl:null,_stack:[],_active:null,_forceTabletStyle:null,_closeOnOverlayTap:null,_positionDialogAtTopWhenPortrait:null,get:function aa(ba){return z._dialogs[ba];},_findRoot:function aa(ba){while(ba){if(k.containsCss(ba,'fb_dialog'))return ba;ba=ba.parentNode;}},_createWWWLoader:function aa(ba){ba=ba?ba:460;return z.create({content:'<div class="dialog_title">'+'  <a id="fb_dialog_loader_close">'+'    <div class="fb_dialog_close_icon"></div>'+'  </a>'+'  <span>Facebook</span>'+'  <div style="clear:both;"></div>'+'</div>'+'<div class="dialog_content"></div>'+'<div class="dialog_footer"></div>',width:ba});},_createMobileLoader:function aa(){var ba;if(p.nativeApp()){ba='<div class="dialog_header"></div>';}else if(z.isTabletStyle()){ba='<div class="overlayLoader">'+'<div id="fb_dialog_loader_spinner"></div>'+'<a id="fb_dialog_loader_close" href="#">'+q._("Cancel")+'</a>'+'</div>';}else ba='<div class="dialog_header">'+'<table>'+'  <tbody>'+'    <tr>'+'      <td class="header_left">'+'        <label class="touchable_button">'+'          <input type="submit" value="'+q._("Cancel")+'"'+'            id="fb_dialog_loader_close"/>'+'        </label>'+'      </td>'+'      <td class="header_center">'+'        <div>'+'         '+q._("Loading...")+'        </div>'+'      </td>'+'      <td class="header_right">'+'      </td>'+'    </tr>'+'  </tbody>'+'</table>'+'</div>';return z.create({classes:'loading'+(z.isTabletStyle()?' centered':''),content:ba});},_setDialogOverlayStyle:function aa(){j.applyScreenDimensions(z._overlayEl);},_showTabletOverlay:function aa(ba){if(!z.isTabletStyle())return;if(!z._overlayEl){z._overlayEl=j.setupNewDarkOverlay();i.append(z._overlayEl,null);}if(z._closeOnOverlayTap){var ca=j.addDoubleClickAction(z._overlayEl,ES(ba,'bind',true,this),5000);z._overlayListeners.push(ca);}z._overlayEl.className='';},_hideTabletOverlay:function aa(){if(z.isTabletStyle()){z._overlayEl.className='hidden';ES(z._overlayListeners,'forEach',true,function(ba){return ba.remove();});z._overlayListeners=[];}},showLoader:function aa(ba,ca){if(!ba)ba=function ga(){};var da=function ga(){z._hideLoader();j.onDialogHideCleanup(z.isTabletStyle());z._hideTabletOverlay();ba();};z._showTabletOverlay(da);if(!z._loaderEl)z._loaderEl=z._findRoot(p.mobile()?z._createMobileLoader():z._createWWWLoader(ca));var ea=document.getElementById('fb_dialog_loader_close');if(ea){k.removeCss(ea,'fb_hidden');var fa=l.add(ea,'click',da);z._overlayListeners.push(fa);}z._makeActive(z._loaderEl);},setCloseOnOverlayTap:function aa(ba){z._closeOnOverlayTap=!!ba;},setPositionDialogAtTopWhenPortrait:function aa(ba){z._positionDialogAtTopWhenPortrait=!!ba;},_hideLoader:function aa(){if(z._loaderEl&&z._loaderEl==z._active)z._loaderEl.style.top='-10000px';},_makeActive:function aa(ba){z._setDialogSizes();z._lowerActive();z._active=ba;if(n.isEnvironment(n.ENVIRONMENTS.CANVAS))h.getPageInfo(function(ca){z._centerActive(ca);});z._centerActive();},_lowerActive:function aa(){if(!z._active)return;z._active.style.top='-10000px';z._active=null;},_removeStacked:function aa(ba){z._stack=ES(z._stack,'filter',true,function(ca){return ca!=ba;});},_centerActive:function aa(ba){var ca=z._active;if(!ca)return;if(z._positionDialogAtTopWhenPortrait&&j.isOrientationPotrait()){j.setDialogPositionToTop(ca,z.isTabletStyle(),ba);}else j.setDialogPositionToCenter(ca,z.isTabletStyle(),ba);},_setDialogSizes:function aa(){var ba=arguments.length<=0||arguments[0]===undefined?false:arguments[0];if(!p.mobile())return;for(var ca in z._dialogs)if(Object.prototype.hasOwnProperty.call(z._dialogs,ca)){var da=document.getElementById(ca);if(da){da.style.width=z.getDefaultSize().width+'px';if(!ba)da.style.height=z.getDefaultSize().height+'px';}}},getDefaultSize:function aa(){if(p.mobile()){var ba=x();if(ba){if(k.getViewportInfo().width<=ba.width)ba.width=k.getViewportInfo().width-s;if(k.getViewportInfo().height<=ba.height)ba.height=k.getViewportInfo().height-s;return ba;}if(p.ipad())return {width:u,height:t};if(p.android()){return {width:screen.availWidth,height:screen.availHeight};}else{var ca=window.innerWidth,da=window.innerHeight,ea=ca/da>1.2;return {width:ca,height:Math.max(da,ea?screen.width:screen.height)};}}return {width:w,height:v};},_handleOrientationChange:function aa(){var ba=r('dialog_resize_refactor',false)?k.getViewportInfo().width:screen.availWidth;z._availScreenWidth=ba;if(z.isTabletStyle()){z._setDialogSizes(true);z._centerActive();z._setDialogOverlayStyle();}else{var ca=z.getDefaultSize().width;for(var da in z._dialogs)if(Object.prototype.hasOwnProperty.call(z._dialogs,da)){var ea=document.getElementById(da);if(ea)ea.style.width=ca+'px';}}},_addOrientationHandler:function aa(){if(!p.mobile())return null;z._availScreenWidth=r('dialog_resize_refactor',false)?k.getViewportInfo().width:screen.availWidth;j.addMobileOrientationChangeAction(z._handleOrientationChange);},create:function aa(ba){var ca=j.setupNewDialog(ba);i.append(ca.dialogElement);if(ba.visible)z.show(ca.dialogElement);if(typeof ba.styles==='object')ES('Object','assign',false,ca.dialogElement.style,ba.styles);return ca.contentRoot;},show:function aa(ba){var ca=z._findRoot(ba);if(ca){z._removeStacked(ca);z._hideLoader();z._makeActive(ca);z._stack.push(ca);if('fbCallID' in ba)z.get(ba.fbCallID).inform('iframe_show').trackEvent('show');}},hide:function aa(ba){var ca=z._findRoot(ba);z._hideLoader();if(ca==z._active){z._lowerActive();j.onDialogHideCleanup(z.isTabletStyle());z._hideTabletOverlay();if('fbCallID' in ba)z.get(ba.fbCallID).inform('iframe_hide').trackEvent('hide');}},remove:function aa(ba){ba=z._findRoot(ba);if(ba){var ca=z._active==ba;z._removeStacked(ba);if(ca){z._hideLoader();if(z._stack.length>0){z.show(z._stack.pop());}else{z._lowerActive();j.onDialogHideCleanup(z.isTabletStyle());z._hideTabletOverlay();}}else if(z._active===null&&z._stack.length>0)z.show(z._stack.pop());setTimeout(function(){ba.parentNode.removeChild(ba);},3000);}},isActive:function aa(ba){var ca=z._findRoot(ba);return ca&&ca===z._active;},setForceTabletStyle:function aa(ba){z._forceTabletStyle=!!ba;},isTabletStyle:function aa(){var ba;if(!p.mobile())return false;if(z._forceTabletStyle)return true;if(r('dialog_resize_refactor',false)){var ca=x();ba=ca&&(ca.height>=t||ca.width>=u);}else ba=!!p.ipad();return ba;}};f.exports=z;}),null);
__d('sdk.Frictionless',['sdk.Auth','sdk.api','sdk.Event','sdk.Dialog'],(function a(b,c,d,e,f,g,h,i,j,k){var l={_allowedRecipients:{},_useFrictionless:false,_updateRecipients:function m(){l._allowedRecipients={};i('/me/apprequestformerrecipients',function(n){if(!n||n.error)return;ES(n.data,'forEach',true,function(o){l._allowedRecipients[o.recipient_id]=true;});});},init:function m(){l._useFrictionless=true;h.getLoginStatus(function(n){if(n.status=='connected')l._updateRecipients();});j.subscribe('auth.login',function(n){if(n.authResponse)l._updateRecipients();});},_processRequestResponse:function m(n,o){return function(p){var q=p&&p.updated_frictionless;if(l._useFrictionless&&q)l._updateRecipients();if(p){if(!o&&p.frictionless){k._hideLoader();k._restoreBodyPosition();k._hideIPadOverlay();}delete p.frictionless;delete p.updated_frictionless;}n&&n(p);};},isAllowed:function m(n){if(!n)return false;if(typeof n==='number')return n in l._allowedRecipients;if(typeof n==='string')n=n.split(',');n=ES(n,'map',true,function(q){return ES(String(q),'trim',true);});var o=true,p=false;ES(n,'forEach',true,function(q){o=o&&q in l._allowedRecipients;p=true;});return o&&p;}};j.subscribe('init:post',function(m){if(m.frictionlessRequests)l.init();});f.exports=l;}),null);
__d('sdk.Native',['Log','sdk.UA'],(function a(b,c,d,e,f,g,h,i){var j='fbNativeReady',k={onready:function l(m){if(!i.nativeApp()){h.error('FB.Native.onready only works when the page is rendered '+'in a WebView of the native Facebook app. Test if this is the '+'case calling FB.UA.nativeApp()');return;}if(window.__fbNative&&!this.nativeReady)ES('Object','assign',false,this,window.__fbNative);if(this.nativeReady){m();}else{var n=function o(p){window.removeEventListener(j,o);this.onready(m);};window.addEventListener(j,n,false);}}};f.exports=k;}),null);
__d('sdk.openMessenger',['sdk.UA'],(function a(b,c,d,e,f,g,h){'use strict';var i='https://itunes.apple.com/us/app/messenger/id454638411',j='https://play.google.com/store/apps/details?id=com.facebook.orca',k=3000;function l(m){var n=void 0,o=void 0,p=m.link,q=m.app_id;if(h.android()){n='intent://share/#Intent;'+'package=com.facebook.orca;'+'scheme=fb-messenger;'+'S.android.intent.extra.TEXT='+encodeURIComponent(p)+';'+'S.trigger=send_plugin;';if(q)n+='S.platform_app_id='+encodeURIComponent(q)+';';n+='end';o=j;}else{n='fb-messenger://share?link='+encodeURIComponent(p);if(q)n+='&app_id='+encodeURIComponent(q);o=i;}setTimeout(function(){window.location.href=o;},k);window.location.href=n;}f.exports=l;}),null);
__d('sdk.UIServer',['sdk.Auth','sdk.Content','sdk.DOM','sdk.Dialog','sdk.Event','sdk.Frictionless','Log','sdk.Native','QueryString','sdk.RPC','sdk.Runtime','JSSDKConfig','sdk.UA','UrlMap','sdk.XD','createObjectFrom','sdk.feature','sdk.fbt','flattenObject','sdk.getContextType','guid','insertIframe','sdk.openMessenger','resolveURI'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ba,ca,da,ea){var fa={transform:function la(ma){if(ma.params.display==='touch'&&ka.canIframe(ma.params)&&window.postMessage){ma.params.channel=ka._xdChannelHandler(ma.id,'parent');if(!t.nativeApp())ma.params.in_iframe=1;return ma;}else return ka.genericTransform(ma);},getXdRelation:function la(ma){var na=ma.display;if(na==='touch'&&window.postMessage&&ma.in_iframe)return 'parent';return ka.getXdRelation(ma);}},ga={'stream.share':{size:{width:670,height:340},url:'sharer.php',transform:function la(ma){if(!ma.params.u)ma.params.u=window.location.toString();ma.params.display='popup';return ma;}},apprequests:{transform:function la(ma){ma=fa.transform(ma);ma.params.frictionless=m&&m._useFrictionless;if(ma.params.frictionless){if(m.isAllowed(ma.params.to)){ma.params.display='iframe';ma.params.in_iframe=true;ma.hideLoader=true;}ma.cb=m._processRequestResponse(ma.cb,ma.hideLoader);}ma.closeIcon=false;return ma;},getXdRelation:fa.getXdRelation},'permissions.oauth':{url:'dialog/oauth',size:{width:t.mobile()?null:475,height:t.mobile()?null:183},transform:function la(ma){if(!r.getClientID()){n.error('FB.login() called before FB.init().');return;}if(h.getAuthResponse()&&!ma.params.scope&&!ma.params.auth_type){n.error('FB.login() called when user is already connected.');ma.cb&&ma.cb({status:r.getLoginStatus(),authResponse:h.getAuthResponse()});return;}var na=ma.cb,oa=ma.id;delete ma.cb;var pa=ES('Object','keys',false,ES('Object','assign',false,ma.params.response_type?w(ma.params.response_type.split(',')):{},{token:true,signed_request:true})).join(',');if(ma.params.display==='async'){ES('Object','assign',false,ma.params,{client_id:r.getClientID(),origin:aa(),response_type:pa,domain:location.hostname});ma.cb=h.xdResponseWrapper(na,h.getAuthResponse(),'permissions.oauth');}else ES('Object','assign',false,ma.params,{client_id:r.getClientID(),redirect_uri:ea(ka.xdHandler(na,oa,'opener',h.getAuthResponse(),'permissions.oauth')),origin:aa(),response_type:pa,domain:location.hostname});return ma;}},'auth.logout':{url:'logout.php',transform:function la(ma){if(!r.getClientID()){n.error('FB.logout() called before calling FB.init().');}else if(!h.getAuthResponse()){n.error('FB.logout() called without an access token.');}else{ma.params.next=ka.xdHandler(ma.cb,ma.id,'parent',h.getAuthResponse(),'logout');return ma;}}},'login.status':{url:'dialog/oauth',transform:function la(ma){var na=ma.cb,oa=ma.id;delete ma.cb;ES('Object','assign',false,ma.params,{client_id:r.getClientID(),redirect_uri:ka.xdHandler(na,oa,'parent',h.getAuthResponse(),'login_status'),origin:aa(),response_type:'token,signed_request,code',domain:location.hostname});return ma;}},pay:{size:{width:555,height:120},connectDisplay:'popup'},live_broadcast:{transform:function la(ma){if(ma.params.phase==='create')ma.size={width:480,height:280};if(ma.params.phase==='publish')ma.size={width:772,height:540};return ma;},require_access_token:true}},ha={};function ia(la,ma){ha[ma]=true;return function(na){delete ha[ma];la(na);};}function ja(la){if(!x('should_force_single_dialog_instance',true))return false;var ma=la.method.toLowerCase();if(ma==='pay'&&la.display==='async')return true;return false;}var ka={Methods:ga,_loadedNodes:{},_defaultCb:{},_resultToken:'"xxRESULTTOKENxx"',genericTransform:function la(ma){if(ma.params.display=='dialog'||ma.params.display=='iframe')ES('Object','assign',false,ma.params,{display:'iframe',channel:ka._xdChannelHandler(ma.id,'parent.parent')},true);return ma;},checkOauthDisplay:function la(ma){var na=ma.scope||ma.perms||r.getScope();if(!na)return ma.display;var oa=na.split(/\s|,/g);for(var pa=0;pa<oa.length;pa++)if(!s.initSitevars.iframePermissions[ES(oa[pa],'trim',true)])return 'popup';return ma.display;},prepareCall:function la(ma,na){var oa=ma.method.toLowerCase(),pa=Object.prototype.hasOwnProperty.call(ka.Methods,oa)?ES('Object','assign',false,{},ka.Methods[oa]):{},qa=ba(),ra=r.getSecure()||oa!=='auth.status'&&oa!='login.status';ES('Object','assign',false,ma,{app_id:r.getClientID(),locale:r.getLocale(),sdk:'joey',access_token:ra&&r.getAccessToken()||undefined});if(oa==='share'||oa==='share_open_graph'){ma.mobile_iframe=t.mobile()&&(ma.mobile_iframe||ma.iframe_test);if(ma.mobile_iframe)pa=ES('Object','assign',false,{},fa);}ma.display=ka.getDisplayMode(pa,ma);if(!pa.url)pa.url='dialog/'+oa;if((pa.url=='dialog/oauth'||pa.url=='dialog/permissions.request')&&(ma.display=='iframe'||ma.display=='touch'&&ma.in_iframe))ma.display=ka.checkOauthDisplay(ma);if(ma.display=='popup'&&!pa.require_access_token)delete ma.access_token;if(r.getIsVersioned()&&pa.url.substring(0,7)==='dialog/')pa.url=ma.version+'/'+pa.url;if(ja(ma)){if(ha[oa]){var sa='Dialog "'+oa+'" is trying to run more than once.';n.warn(sa);na({error_code:-100,error_message:sa});return;}na=ia(na,oa);}var ta={cb:na,id:qa,size:pa.size||ka.getDefaultSize(),url:u.resolve(ma.display=='touch'?'m':'www',ra)+'/'+pa.url,params:ma,name:oa,dialog:k.newInstance(qa,ma.display)},ua=pa.transform?pa.transform:ka.genericTransform;if(ua){ta=ua(ta);if(!ta)return;}if(ma.display==='touch'&&ma.in_iframe)ta.params.parent_height=window.innerHeight;var va=pa.getXdRelation||ka.getXdRelation,wa=va(ta.params);if(!(ta.id in ka._defaultCb)&&!('next' in ta.params)&&!('redirect_uri' in ta.params))ta.params.next=ka._xdResult(ta.cb,ta.id,wa,true);if(wa==='parent')ES('Object','assign',false,ta.params,{channel_url:ka._xdChannelHandler(qa,'parent.parent')},true);ta=ka.prepareParams(ta);return ta;},prepareParams:function la(ma){if(ma.params.display!=='async')delete ma.params.method;ma.params.kid_directed_site=r.getKidDirectedSite()||ma.params.kid_directed_site;ma.params=z(ma.params);var na=p.encode(ma.params);if(!t.nativeApp()&&ka.urlTooLongForIE(ma.url+'?'+na)){ma.post=true;}else if(na)ma.url+='?'+na;return ma;},urlTooLongForIE:function la(ma){return t.ie()&&t.ie()<=8&&ma.length>2048;},getDisplayMode:function la(ma,na){if(na.display==='hidden'||na.display==='none'||na.display==='native')return na.display;var oa=r.isEnvironment(r.ENVIRONMENTS.CANVAS)||r.isEnvironment(r.ENVIRONMENTS.PAGETAB);if(oa&&!na.display)return 'async';if(t.mobile()||na.display==='touch')return 'touch';if(na.display=='iframe'||na.display=='dialog')if(!ka.canIframe(na)){n.error('"dialog" mode can only be used when the user is connected.');return 'popup';}if(ma.connectDisplay&&!oa)return ma.connectDisplay;return na.display||(ka.canIframe(na)?'dialog':'popup');},canIframe:function la(ma){if(r.getAccessToken())return true;if(t.mobile()&&r.getLoggedIntoFacebook())return !!ma.mobile_iframe;return false;},getXdRelation:function la(ma){var na=ma.display;if(na==='popup'||na==='touch')return 'opener';if(na==='dialog'||na==='iframe'||na==='hidden'||na==='none')return 'parent';if(na==='async')return 'parent.frames['+window.name+']';},popup:function la(ma){var na=typeof window.screenX!='undefined'?window.screenX:window.screenLeft,oa=typeof window.screenY!='undefined'?window.screenY:window.screenTop,pa=typeof window.outerWidth!='undefined'?window.outerWidth:document.documentElement.clientWidth,qa=typeof window.outerHeight!='undefined'?window.outerHeight:document.documentElement.clientHeight-22,ra=t.mobile()?null:ma.size.width,sa=t.mobile()?null:ma.size.height,ta=na<0?window.screen.width+na:na,ua=parseInt(ta+(pa-ra)/2,10),va=parseInt(oa+(qa-sa)/2.5,10),wa=[];if(ra!==null)wa.push('width='+ra);if(sa!==null)wa.push('height='+sa);wa.push('left='+ua);wa.push('top='+va);wa.push('scrollbars=1');if(ma.name=='permissions.request'||ma.name=='permissions.oauth'){wa.push('toolbar=0');if(!t.chrome()||t.chrome()<59)wa.push('location=1');}wa=wa.join(',');var xa;if(ma.post){xa=window.open('about:blank',ma.id,wa);if(xa){ka.setLoadedNode(ma,xa,'popup');i.submitToTarget({url:ma.url,target:ma.id,params:ma.params});}}else{xa=window.open(ma.url,ma.id,wa);if(xa)ka.setLoadedNode(ma,xa,'popup');}if(!xa)return;if(ma.id in ka._defaultCb)ka._popupMonitor();},setLoadedNode:function la(ma,na,oa){if(oa==='iframe')na.fbCallID=ma.id;na={node:na,type:oa,fbCallID:ma.id};ka._loadedNodes[ma.id]=na;},getLoadedNode:function la(ma){var na=typeof ma=='object'?ma.id:ma,oa=ka._loadedNodes[na];return oa?oa.node:null;},hidden:function la(ma){ma.className='FB_UI_Hidden';ma.root=i.appendHidden('');ka._insertIframe(ma);},iframe:function la(ma){ma.className='FB_UI_Dialog';if(ma.params.mobile_iframe){k.setForceTabletStyle(true);k.setCloseOnOverlayTap(true);k.setPositionDialogAtTopWhenPortrait(true);}var na=function pa(){var qa=ES('JSON','stringify',false,{error_code:4201,error_message:y._("User canceled the Dialog flow")});ka._triggerDefault(ma.id,qa);},oa={onClose:na,closeIcon:ma.closeIcon===undefined?true:ma.closeIcon,classes:k.isTabletStyle()?'centered':''};if(ma.params.mobile_iframe)oa.styles={'border-radius':'8px'};ma.root=k.create(oa);if(!ma.hideLoader)k.showLoader(na,ma.size.width);j.addCss(ma.root,'fb_dialog_iframe');ka._insertIframe(ma);},touch:function la(ma){if(ma.params&&ma.params.in_iframe){if(ma.ui_created){k.showLoader(function(){ka._triggerDefault(ma.id,null);},0);}else ka.iframe(ma);}else if(t.nativeApp()&&!ma.ui_created){ma.frame=ma.id;o.onready(function(){ka.setLoadedNode(ma,o.open(ma.url+'#cb='+ma.frameName),'native');});ka._popupMonitor();}else if(!ma.ui_created)ka.popup(ma);},async:function la(ma){ma.params.redirect_uri=location.protocol+'//'+location.host+location.pathname;delete ma.params.access_token;q.remote.showDialog(ma.params,function(na){var oa=na.result;if(oa&&oa.e2e){var pa=k.get(ma.id);pa.trackEvents(oa.e2e);pa.trackEvent('close');delete oa.e2e;}ma.cb(oa);});},"native":function la(ma){da(ma.params);},getDefaultSize:function la(){return k.getDefaultSize();},_insertIframe:function la(ma){ka._loadedNodes[ma.id]=false;var na=function oa(pa){if(ma.id in ka._loadedNodes)ka.setLoadedNode(ma,pa,'iframe');};if(ma.post){ca({url:'about:blank',root:ma.root,className:ma.className,width:ma.size.width,height:ma.size.height,id:ma.id,onInsert:na,onload:function oa(pa){i.submitToTarget({url:ma.url,target:pa.name,params:ma.params});}});}else ca({url:ma.url,root:ma.root,className:ma.className,width:ma.size.width,height:ma.size.height,id:ma.id,name:ma.frameName,onInsert:na});},_handleResizeMessage:function la(ma,na){var oa=ka.getLoadedNode(ma);if(!oa)return;if(na.height)oa.style.height=na.height+'px';if(na.width)oa.style.width=na.width+'px';v.inform('resize.ack',na||{},'parent.frames['+oa.name+']');if(!k.isActive(oa)){k.show(oa);}else k._centerActive();},_triggerDefault:function la(ma,na){var oa={frame:ma};if(na)oa.result=na;ka._xdRecv(oa,ka._defaultCb[ma]||function(){});},_popupMonitor:function la(){var ma;for(var na in ka._loadedNodes)if(Object.prototype.hasOwnProperty.call(ka._loadedNodes,na)&&na in ka._defaultCb){var oa=ka._loadedNodes[na];if(oa.type!='popup'&&oa.type!='native')continue;var pa=oa.node;try{if(pa.closed){ka._triggerDefault(na,null);}else ma=true;}catch(qa){}}if(ma&&!ka._popupInterval){ka._popupInterval=setInterval(ka._popupMonitor,100);}else if(!ma&&ka._popupInterval){clearInterval(ka._popupInterval);ka._popupInterval=null;}},_xdChannelHandler:function la(ma,na){return v.handler(function(oa){var pa=ka.getLoadedNode(ma);if(!pa)return;if(oa.type=='resize'){ka._handleResizeMessage(ma,oa);}else if(oa.type=='hide'){k.hide(pa);}else if(oa.type=='rendered'){var qa=k._findRoot(pa);k.show(qa);}else if(oa.type=='fireevent')l.fire(oa.event);},na,true,null);},_xdNextHandler:function la(ma,na,oa,pa){if(pa)ka._defaultCb[na]=ma;return v.handler(function(qa){ka._xdRecv(qa,ma);},oa)+'&frame='+na;},_xdRecv:function la(ma,na){var oa=ka.getLoadedNode(ma.frame);if(oa)if(oa.close){try{oa.close();if(/iPhone.*Version\/(5|6)/.test(navigator.userAgent)&&RegExp.$1!=='5')window.focus();ka._popupCount--;}catch(qa){}}else if(j.containsCss(oa,'FB_UI_Hidden')){setTimeout(function(){oa.parentNode.parentNode.removeChild(oa.parentNode);},3000);}else if(j.containsCss(oa,'FB_UI_Dialog'))k.remove(oa);delete ka._loadedNodes[ma.frame];delete ka._defaultCb[ma.frame];if(ma.e2e){var pa=k.get(ma.frame);pa.trackEvents(ma.e2e);pa.trackEvent('close');delete ma.e2e;}na(ma);},_xdResult:function la(ma,na,oa,pa){return ka._xdNextHandler(function(qa){ma&&ma(qa.result&&qa.result!=ka._resultToken&&ES('JSON','parse',false,qa.result));},na,oa,pa)+'&result='+encodeURIComponent(ka._resultToken);},xdHandler:function la(ma,na,oa,pa,qa){return ka._xdNextHandler(h.xdResponseWrapper(ma,pa,qa),na,oa,true);}};q.stub('showDialog');f.exports=ka;}),null);
__d('sdk.ui',['Assert','sdk.Impressions','Log','sdk.PlatformVersioning','sdk.Runtime','sdk.UIServer','sdk.feature'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){function o(p,q){h.isObject(p);h.maybeFunction(q);if(l.getIsVersioned()){k.assertVersionIsSet();if(p.version){k.assertValidVersion(p.version);}else p.version=l.getVersion();}p=ES('Object','assign',false,{},p);if(!p.method){j.error('"method" is a required parameter for FB.ui().');return null;}if(p.method=='pay.prompt')p.method='pay';var r=p.method;if(p.redirect_uri){j.warn('When using FB.ui, you should not specify a redirect_uri.');delete p.redirect_uri;}if((r=='permissions.request'||r=='permissions.oauth')&&(p.display=='iframe'||p.display=='dialog'))p.display=m.checkOauthDisplay(p);if(p.display==='native'&&r!=='send'){j.error('display type "native" not supported');return null;}var s=n('e2e_tracking',true);if(s)p.e2e={};var t=m.prepareCall(p,q||function(){});if(!t)return null;var u=t.params.display;if(u==='dialog'){u='iframe';}else if(u==='none')u='hidden';var v=m[u];if(!v){j.error('"display" must be one of "popup", '+'"dialog", "iframe", "touch", "async", "hidden", or "none"');return null;}if(s)t.dialog.subscribe('e2e:end',function(w){w.method=r;w.display=u;j.debug('e2e: %s',ES('JSON','stringify',false,w));i.log(114,{payload:w});});v(t);return t.dialog;}f.exports=o;}),null);
__d('legacy:fb.auth',['sdk.Auth','sdk.Cookie','sdk.Event','FB','Log','sdk.Runtime','sdk.SignedRequest','sdk.ui'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){k.provide('',{getLoginStatus:function p(){return h.getLoginStatus.apply(h,arguments);},getAuthResponse:function p(){return h.getAuthResponse();},getAccessToken:function p(){return m.getAccessToken()||null;},getUserID:function p(){return m.getUserID()||m.getCookieUserID();},login:function p(q,r){if(r&&r.perms&&!r.scope){r.scope=r.perms;delete r.perms;l.warn('OAuth2 specification states that \'perms\' '+'should now be called \'scope\'.  Please update.');}var s=m.isEnvironment(m.ENVIRONMENTS.CANVAS)||m.isEnvironment(m.ENVIRONMENTS.PAGETAB);o(babelHelpers['extends']({method:'permissions.oauth',display:s?'async':'popup',domain:location.hostname},r||{}),q);},logout:function p(q){o({method:'auth.logout',display:'hidden'},q);}});h.subscribe('logout',ES(j.fire,'bind',true,j,'auth.logout'));h.subscribe('login',ES(j.fire,'bind',true,j,'auth.login'));h.subscribe('authresponse.change',ES(j.fire,'bind',true,j,'auth.authResponseChange'));h.subscribe('status.change',ES(j.fire,'bind',true,j,'auth.statusChange'));j.subscribe('init:post',function(p){if(p.status)h.getLoginStatus();if(m.getClientID())if(p.authResponse){h.setAuthResponse(p.authResponse,'connected');}else if(m.getUseCookie()){var q=i.loadSignedRequest(),r;if(q){try{r=n.parse(q);}catch(s){i.clearSignedRequestCookie();}if(r&&r.user_id)m.setCookieUserID(r.user_id);}i.loadMeta();}});}),3);
__d('sdk.Canvas.IframeHandling',['DOMWrapper','sdk.RPC'],(function a(b,c,d,e,f,g,h,i){var j=null,k;function l(){var p=h.getWindow().document,q=p.body,r=p.documentElement,s=Math.max(q.offsetTop,0),t=Math.max(r.offsetTop,0),u=q.scrollHeight+s,v=q.offsetHeight+s,w=r.scrollHeight+t,x=r.offsetHeight+t;return Math.max(u,v,w,x);}function m(p){if(typeof p!='object')p={};var q=0,r=0;if(!p.height){p.height=l();q=16;r=4;}if(!p.frame)p.frame=window.name||'iframe_canvas';if(k){var s=k.height,t=p.height-s;if(t<=r&&t>=-q)return false;}k=p;i.remote.setSize(p);return true;}function n(p,q){if(q===undefined&&typeof p==='number'){q=p;p=true;}if(p||p===undefined){if(j===null)j=setInterval(function(){m();},q||100);m();}else if(j!==null){clearInterval(j);j=null;}}i.stub('setSize');var o={setSize:m,setAutoGrow:n};f.exports=o;}),null);
__d('sdk.Canvas.Navigation',['sdk.RPC'],(function a(b,c,d,e,f,g,h){function i(k){h.local.navigate=function(l){k({path:l});};h.remote.setNavigationEnabled(true);}h.stub('setNavigationEnabled');var j={setUrlHandler:i};f.exports=j;}),null);
__d('sdk.Canvas.Plugin',['Log','sdk.RPC','sdk.Runtime','sdk.UA','sdk.api'],(function a(b,c,d,e,f,g,h,i,j,k,l){var m='CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000',n='CLSID:444785F1-DE89-4295-863A-D46C3A781394',o=null,p=k.osx()&&k.osx.getVersionParts(),q=!(p&&p[0]>10&&p[1]>10&&(k.chrome()>=31||k.webkit()>=537.71||k.firefox()>=25));function r(ba){ba._hideunity_savedstyle={};ba._hideunity_savedstyle.left=ba.style.left;ba._hideunity_savedstyle.position=ba.style.position;ba._hideunity_savedstyle.width=ba.style.width;ba._hideunity_savedstyle.height=ba.style.height;ba.style.left='-10000px';ba.style.position='absolute';ba.style.width='1px';ba.style.height='1px';}function s(ba){if(ba._hideunity_savedstyle){ba.style.left=ba._hideunity_savedstyle.left;ba.style.position=ba._hideunity_savedstyle.position;ba.style.width=ba._hideunity_savedstyle.width;ba.style.height=ba._hideunity_savedstyle.height;}}function t(ba){ba._old_visibility=ba.style.visibility;ba.style.visibility='hidden';}function u(ba){ba.style.visibility=ba._old_visibility||'';delete ba._old_visibility;}function v(ba){var ca=ba.type?ba.type.toLowerCase():null,da=ca==='application/x-shockwave-flash'||ba.classid&&ba.classid.toUpperCase()==m;if(!da)return false;var ea=/opaque|transparent/i;if(ea.test(ba.getAttribute('wmode')))return false;for(var fa=0;fa<ba.childNodes.length;fa++){var ga=ba.childNodes[fa];if(/param/i.test(ga.nodeName)&&/wmode/i.test(ga.name)&&ea.test(ga.value))return false;}return true;}function w(ba){var ca=ba.type?ba.type.toLowerCase():null;return ca==='application/vnd.unity'||ba.classid&&ba.classid.toUpperCase()==n;}function x(ba){var ca=ES('Array','from',false,window.document.getElementsByTagName('object'));ca=ca.concat(ES('Array','from',false,window.document.getElementsByTagName('embed')));var da=false,ea=false;ES(ca,'forEach',true,function(ga){var ha=v(ga),ia=q&&w(ga);if(!ha&&!ia)return;da=da||ha;ea=ea||ia;var ja=function la(){if(ba.state==='opened'){if(ha){t(ga);}else r(ga);}else if(ha){u(ga);}else s(ga);};if(o){h.info('Calling developer specified callback');var ka={state:ba.state,elem:ga};o(ka);setTimeout(ja,200);}else ja();});if(Math.random()<=1/1000){var fa={unity:ea,flash:da};l(j.getClientID()+'/occludespopups','post',fa);}}i.local.hidePluginObjects=function(){h.info('hidePluginObjects called');x({state:'opened'});};i.local.showPluginObjects=function(){h.info('showPluginObjects called');x({state:'closed'});};i.local.showFlashObjects=i.local.showPluginObjects;i.local.hideFlashObjects=i.local.hidePluginObjects;function y(){t();r();}function z(){u();s();}var aa={_setHidePluginCallback:function ba(ca){o=ca;},hidePluginElement:y,showPluginElement:z};f.exports=aa;}),null);
__d('sdk.Canvas.Tti',['sdk.RPC','sdk.Runtime'],(function a(b,c,d,e,f,g,h,i){function j(o,p){var q={appId:i.getClientID(),time:ES('Date','now',false),name:p},r=[q];if(o)r.push(function(s){o(s.result);});h.remote.logTtiMessage.apply(null,r);}function k(){j(null,'StartIframeAppTtiTimer');}function l(o){j(o,'StopIframeAppTtiTimer');}function m(o){j(o,'RecordIframeAppTti');}h.stub('logTtiMessage');var n={setDoneLoading:m,startTimer:k,stopTimer:l};f.exports=n;}),null);
__d('legacy:fb.canvas',['Assert','sdk.Canvas.Environment','sdk.Event','FB','sdk.Canvas.IframeHandling','sdk.Canvas.Navigation','sdk.Canvas.Plugin','sdk.RPC','sdk.Runtime','sdk.Canvas.Tti'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){k.provide('Canvas',{setSize:function r(s){h.maybeObject(s,'Invalid argument');return l.setSize.apply(null,arguments);},setAutoGrow:function r(){return l.setAutoGrow.apply(null,arguments);},getPageInfo:function r(s){h.isFunction(s,'Invalid argument');return i.getPageInfo.apply(null,arguments);},scrollTo:function r(s,t){h.maybeNumber(s,'Invalid argument');h.maybeNumber(t,'Invalid argument');return i.scrollTo.apply(null,arguments);},setDoneLoading:function r(s){h.maybeFunction(s,'Invalid argument');return q.setDoneLoading.apply(null,arguments);},startTimer:function r(){return q.startTimer.apply(null,arguments);},stopTimer:function r(s){h.maybeFunction(s,'Invalid argument');return q.stopTimer.apply(null,arguments);},getHash:function r(s){h.isFunction(s,'Invalid argument');return m.getHash.apply(null,arguments);},setHash:function r(s){h.isString(s,'Invalid argument');return m.setHash.apply(null,arguments);},setUrlHandler:function r(s){h.isFunction(s,'Invalid argument');return m.setUrlHandler.apply(null,arguments);}});o.local.fireEvent=ES(j.fire,'bind',true,j);j.subscribe('init:post',function(r){if(p.isEnvironment(p.ENVIRONMENTS.CANVAS)){h.isTrue(!r.hideFlashCallback||!r.hidePluginCallback,'cannot specify deprecated hideFlashCallback and new hidePluginCallback');n._setHidePluginCallback(r.hidePluginCallback||r.hideFlashCallback);}});}),3);
__d('legacy:fb.canvas-legacy',['Assert','FB','Log','sdk.Canvas.Tti'],(function a(b,c,d,e,f,g,h,i,j,k){i.provide('CanvasInsights',{setDoneLoading:function l(m){j.warn('Deprecated: use FB.Canvas.setDoneLoading');h.maybeFunction(m,'Invalid argument');return k.setDoneLoading.apply(null,arguments);}});}),3);
__d('legacy:fb.canvas.plugin',['FB','sdk.Canvas.Plugin'],(function a(b,c,d,e,f,g,h,i){h.provide('Canvas.Plugin',i);}),3);
__d('sdk.Canvas.Prefetcher',['JSSDKCanvasPrefetcherConfig','sdk.Runtime','sdk.api'],(function a(b,c,d,e,f,g,h,i,j){var k={AUTOMATIC:0,MANUAL:1},l=h.sampleRate,m=h.blacklist,n=k.AUTOMATIC,o=[];function p(){var u={object:'data',link:'href',script:'src'};if(n==k.AUTOMATIC)ES(ES('Object','keys',false,u),'forEach',true,function(v){var w=u[v];ES(ES('Array','from',false,document.getElementsByTagName(v)),'forEach',true,function(x){if(x[w])o.push(x[w]);});});if(o.length===0)return;j(i.getClientID()+'/staticresources','post',{urls:ES('JSON','stringify',false,o),is_https:location.protocol==='https:'});o=[];}function q(){if(!i.isEnvironment(i.ENVIRONMENTS.CANVAS)||!i.getClientID()||!l)return;if(Math.random()>1/l||m=='*'||~ES(m,'indexOf',true,i.getClientID()))return;setTimeout(p,30000);}function r(u){n=u;}function s(u){o.push(u);}var t={COLLECT_AUTOMATIC:k.AUTOMATIC,COLLECT_MANUAL:k.MANUAL,addStaticResource:s,setCollectionMode:r,_maybeSample:q};f.exports=t;}),null);
__d('legacy:fb.canvas.prefetcher',['FB','sdk.Canvas.Prefetcher','sdk.Event','sdk.Runtime'],(function a(b,c,d,e,f,g,h,i,j,k){h.provide('Canvas.Prefetcher',i);j.subscribe('init:post',function(l){if(k.isEnvironment(k.ENVIRONMENTS.CANVAS))i._maybeSample();});}),3);
__d('legacy:fb.compat.ui',['FB','Log','sdk.ui','sdk.UIServer'],(function a(b,c,d,e,f,g,h,i,j,k){h.provide('',{share:function l(m){i.error('share() has been deprecated. Please use FB.ui() instead.');j({display:'popup',method:'stream.share',u:m});},publish:function l(m,n){i.error('publish() has been deprecated. Please use FB.ui() instead.');m=m||{};j(babelHelpers['extends']({display:'popup',method:'stream.publish',preview:1},m||{}),n);},addFriend:function l(m,n){i.error('addFriend() has been deprecated. Please use FB.ui() instead.');j({display:'popup',id:m,method:'friend.add'},n);}});k.Methods['auth.login']=k.Methods['permissions.request'];}),3);
__d("mergeArrays",[],(function a(b,c,d,e,f,g){function h(i,j){for(var k=0;k<j.length;k++)if(ES(i,"indexOf",true,j[k])<0)i.push(j[k]);return i;}f.exports=h;}),null);
__d('safeEval',[],(function a(b,c,d,e,f,g){function h(i,j){if(i===null||typeof i==='undefined')return;if(typeof i!=='string')return i;if(/^\w+$/.test(i)&&typeof window[i]==='function')return window[i].apply(null,j||[]);return Function('return eval("'+i.replace(/\"/g,'\\"')+'");').apply(null,j||[]);}f.exports=h;}),null);
__d('format',[],(function a(b,c,d,e,f,g){function h(i,j){j=Array.prototype.slice.call(arguments,1);return i.replace(/\{(\d+)\}/g,function(k,l){var m=j[Number(l)];return m===null||m===undefined?'':m.toString();});}f.exports=h;}),null);
__d('sdk.Waitable',['sdk.Model'],(function a(b,c,d,e,f,g,h){var i=h.extend({constructor:function j(){this.parent({Value:undefined});},error:function j(k){this.inform("error",k);},wait:function j(k,l){if(l)this.subscribe('error',l);this.monitor('Value.change',ES(function(){var m=this.getValue();if(m!==undefined){this.value=m;k(m);return true;}},'bind',true,this));}});f.exports=i;}),null);
__d('sdk.Query',['format','safeEval','Type','sdk.Waitable'],(function a(b,c,d,e,f,g,h,i,j,k){function l(q){return ES(q.split(','),'map',true,function(r){return ES(r,'trim',true);});}function m(q){var r=/^\s*(\w+)\s*=\s*(.*)\s*$/i.exec(q),s,t,u='unknown';if(r){t=r[2];if(/^([\"\'])(?:\\?.)*?\1$/.test(t)){t=i(t);u='index';}else if(/^\d+\.?\d*$/.test(t))u='index';}if(u=='index'){s={type:'index',key:r[1],value:t};}else s={type:'unknown',value:q};return s;}function n(q){return typeof q==='string'?ES('JSON','stringify',false,q):q;}var o=1,p=k.extend({constructor:function q(){this.parent();this.name='v_'+o++;},hasDependency:function q(r){if(arguments.length)this._hasDependency=r;return !!this._hasDependency;},parse:function q(r){var s=h.apply(null,r),t=/^select (.*?) from (\w+)\s+where (.*)$/i.exec(s);this.fields=l(t[1]);this.table=t[2];this.where=m(t[3]);for(var u=1;u<r.length;u++)if(j.instanceOf(p,r[u]))r[u].hasDependency(true);return this;},toFql:function q(){var r='select '+this.fields.join(',')+' from '+this.table+' where ';switch(this.where.type){case 'unknown':r+=this.where.value;break;case 'index':r+=this.where.key+'='+n(this.where.value);break;case 'in':if(this.where.value.length==1){r+=this.where.key+'='+n(this.where.value[0]);}else r+=this.where.key+' in ('+ES(this.where.value,'map',true,n).join(',')+')';break;}return r;},toString:function q(){return '#'+this.name;}});f.exports=p;}),null);
__d('sdk.Data',['sdk.api','sdk.ErrorHandling','mergeArrays','sdk.Query','safeEval','sdk.Waitable'],(function a(b,c,d,e,f,g,h,i,j,k,l,m){var n={query:function o(p,q){var r=new k().parse(Array.prototype.slice.call(arguments));n.queue.push(r);n._waitToProcess();return r;},waitOn:function o(p,q){var r=new m(),s=p.length;if(typeof q=='string'){var t=q;q=i.unguard(function(){return l(t);});}ES(p,'forEach',true,function(u){u.monitor('Value.change',function(){var v=false;if(n._getValue(u)!==undefined){u.value=u.getValue();s--;v=true;}if(s===0){var w=q(ES(p,'map',true,n._getValue));r.setValue(w!==undefined?w:true);}return v;});});return r;},process:function o(p){n._process(p);},_getValue:function o(p){return p instanceof m?p.getValue():p;},_selectByIndex:function o(p,q,r,s){var t=new k();t.fields=p;t.table=q;t.where={type:'index',key:r,value:s};n.queue.push(t);n._waitToProcess();return t;},_waitToProcess:function o(){if(n.timer<0)n.timer=setTimeout(function(){n._process();},10);},_process:function o(p){n.timer=-1;var q={},r=n.queue;if(!r.length)return;n.queue=[];for(var s=0;s<r.length;s++){var t=r[s];if(t.where.type=='index'&&!t.hasDependency()){n._mergeIndexQuery(t,q);}else q[t.name]=t;}var u={q:{}};for(var v in q)if(Object.prototype.hasOwnProperty.call(q,v))u.q[v]=q[v].toFql();if(p)u.access_token=p;h('/fql','GET',u,function(w){if(w.error){ES(ES('Object','keys',false,q),'forEach',true,function(x){q[x].error(new Error(w.error.message));});}else ES(w.data,'forEach',true,function(x){q[x.name].setValue(x.fql_result_set);});});},_mergeIndexQuery:function o(p,q){var r=p.where.key,s=p.where.value,t='index_'+p.table+'_'+r,u=q[t];if(!u){u=q[t]=new k();u.fields=[r];u.table=p.table;u.where={type:'in',key:r,value:[]};}j(u.fields,p.fields);j(u.where.value,[s]);u.wait(function(v){p.setValue(ES(v,'filter',true,function(w){return w[r]==s;}));});},timer:-1,queue:[]};f.exports=n;}),null);
__d('legacy:fb.data',['FB','sdk.Data'],(function a(b,c,d,e,f,g,h,i){h.provide('Data',i);}),3);
__d('legacy:fb.event',['FB','sdk.Event','sdk.Runtime','sdk.Scribe','sdk.feature'],(function a(b,c,d,e,f,g,h,i,j,k,l){var m=[],n=null,o=l('event_subscriptions_log',false);h.provide('Event',{subscribe:function p(q,r){if(o){m.push(q);if(!n)n=setTimeout(function(){k.log('jssdk_error',{appId:j.getClientID(),error:'EVENT_SUBSCRIPTIONS_LOG',extra:{line:0,name:'EVENT_SUBSCRIPTIONS_LOG',script:'N/A',stack:'N/A',message:m.sort().join(',')}});m.length=0;n=null;},o);}return i.subscribe(q,r);},unsubscribe:ES(i.unsubscribe,'bind',true,i)});}),3);
__d('legacy:fb.event-legacy',['FB','sdk.Event'],(function a(b,c,d,e,f,g,h,i){h.provide('Event',{clear:ES(i.clear,'bind',true,i),fire:ES(i.fire,'bind',true,i),monitor:ES(i.monitor,'bind',true,i)});h.provide('EventProvider',i);}),3);
__d('legacy:fb.frictionless',['FB','sdk.Frictionless'],(function a(b,c,d,e,f,g,h,i){h.provide('Frictionless',i);}),3);
__d('sdk.MBasicInitializer',['sdk.DOM','sdk.Runtime','sdk.UA','sdk.URI','UrlMap','sdk.fbt','sdk.feature'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){var o=function q(){function r(s){if(!s)return;var t=s.parentNode;if(!t)return;var u=h.getAttr(s,'href')||window.location.href,v=new k(l.resolve('m'));v.setPath('/dialog/share');v.addQueryData('href',encodeURI(u));v.addQueryData('app_id',i.getClientID());v.addQueryData('mbasic_link',1);var w=document.createElement('a');w.style='display:inline-block; zoom:1;';w.textContent=m._("Share to Facebook");w.setAttribute('href',v.toString());w.setAttribute('target','_blank');t.insertBefore(w,s);t.removeChild(s);}if(!n('js_sdk_mbasic_share_plugin_init',false))return;ES(ES('Array','from',false,document.getElementsByTagName('fb:share-button')),'forEach',true,function(s){return r(s);});ES(ES('Array','from',false,document.getElementsByClassName('fb-share-button')),'forEach',true,function(s){return r(s);});};function p(){if(!j.mBasic())return;o();}f.exports={init:p};}),null);
__d('sdk.init',['sdk.Cookie','sdk.ErrorHandling','sdk.Event','sdk.Impressions','Log','ManagedError','sdk.MBasicInitializer','sdk.PlatformVersioning','QueryString','sdk.Runtime','sdk.UA','sdk.URI','sdk.feature'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){function u(w){var x=typeof w==='number'&&w>0||typeof w==='string'&&/^[0-9a-f]{21,}$|^[0-9]{1,21}$/.test(w);if(x)return w.toString();l.warn('Invalid App Id: Must be a number or numeric string representing '+'the application id.');return null;}function v(w){if(q.getInitialized())l.warn('FB.init has already been called - this could indicate a problem');if(q.getIsVersioned()){if(Object.prototype.toString.call(w)!=='[object Object]')throw new m('Invalid argument');if(w.authResponse)l.warn('Setting authResponse is not supported');if(!w.version)w.version=new s(location.href).getQueryData().sdk_version;o.assertValidVersion(w.version);q.setVersion(w.version);}else{if(/number|string/.test(typeof w)){l.warn('FB.init called with invalid parameters');w={apiKey:w};}w=ES('Object','assign',false,{status:true},w||{});}var x=u(w.appId||w.apiKey);if(x!==null)q.setClientID(x);if('scope' in w)q.setScope(w.scope);if(w.cookie){q.setUseCookie(true);if(typeof w.cookie==='string')h.setDomain(w.cookie);}if(w.kidDirectedSite)q.setKidDirectedSite(true);q.setInitialized(true);if(t('js_sdk_impression_on_load',true))k.log(115,{});if(r.mBasic())n.init();j.fire('init:post',w);}setTimeout(function(){var w=/(connect\.facebook\.net|\.facebook\.com\/assets.php).*?#(.*)/;ES(ES('Array','from',false,fb_fif_window.document.getElementsByTagName('script')),'forEach',true,function(x){if(x.src){var y=w.exec(x.src);if(y){var z=p.decode(y[2]);for(var aa in z)if(Object.prototype.hasOwnProperty.call(z,aa)){var ba=z[aa];if(ba=='0')z[aa]=0;}v(z);}}});if(window.fbAsyncInit&&!window.fbAsyncInit.hasRun){window.fbAsyncInit.hasRun=true;i.unguard(window.fbAsyncInit)();}},0);f.exports=v;}),null);
__d('legacy:fb.init',['FB','sdk.init'],(function a(b,c,d,e,f,g,h,i){h.provide('',{init:i});}),3);
__d('legacy:fb.json',['FB','ManagedError'],(function a(b,c,d,e,f,g,h,i){h.provide('JSON',{stringify:function j(k){try{return ES('JSON','stringify',false,k);}catch(l){throw new i(l.message,l);}},parse:function j(k){try{return ES('JSON','parse',false,k);}catch(l){throw new i(l.message,l);}}});}),3);
__d('legacy:fb.ua',['FB','sdk.UA'],(function a(b,c,d,e,f,g,h,i){h.provide('UA',{nativeApp:i.nativeApp});}),3);
__d('legacy:fb.ui',['FB','sdk.ui'],(function a(b,c,d,e,f,g,h,i){h.provide('',{ui:i});}),3);
__d('IframePlugin',['sdk.Auth','sdk.DOM','sdk.Event','Log','ObservableMixin','sdk.PlatformVersioning','QueryString','sdk.Runtime','Type','sdk.UA','sdk.URI','UrlMap','sdk.XD','sdk.createIframe','sdk.feature','guid','resolveURI'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x){var y={skin:'string',font:'string',width:'string',height:'px',ref:'string',color_scheme:'string'};function z(ha,ia,ja){if(ia||ia===0)if(ia==='100%'){ha.style.width='100%';}else ha.style.width=ia+'px';if(ja||ja===0)ha.style.height=ja+'px';}function aa(ha){return function(ia){var ja={width:ia.width,height:ia.height,pluginID:ha};j.fire('xfbml.resize',ja);};}var ba={string:function ha(ia){return ia;},bool:function ha(ia){return ia?/^(?:true|1|yes|on)$/i.test(ia):undefined;},url:function ha(ia){return x(ia);},url_maybe:function ha(ia){return ia?x(ia):ia;},hostname:function ha(ia){return ia||window.location.hostname;},px:function ha(ia){return /^(\d+)(?:px)?$/.test(ia)?parseInt(RegExp.$1,10):undefined;},text:function ha(ia){return ia;}};function ca(ha,ia){var ja=ha[ia]||ha[ia.replace(/_/g,'-')]||ha[ia.replace(/_/g,'')]||ha['data-'+ia]||ha['data-'+ia.replace(/_/g,'-')]||ha['data-'+ia.replace(/_/g,'')]||undefined;return ja;}function da(ha,ia,ja,ka){ES(ES('Object','keys',false,ha),'forEach',true,function(la){if(ha[la]=='text'&&!ja[la]){ja[la]=ia.textContent||ia.innerText||'';ia.setAttribute(la,ja[la]);}ka[la]=ba[ha[la]](ca(ja,la));});}function ea(ha){if(ha==='100%')return '100%';return ha||ha==='0'||ha===0?parseInt(ha,10):undefined;}function fa(ha){if(ha)z(ha,0,0);}var ga=p.extend({constructor:function ha(ia,ja,ka,la){this.parent();ka=ka.replace(/-/g,'_');var ma=ca(la,'plugin_id');this.subscribe('xd.resize',aa(ma));this.subscribe('xd.resize.flow',aa(ma));this.subscribe('xd.resize.flow',ES(function(ra){ES('Object','assign',false,this._iframeOptions.root.style,{verticalAlign:'bottom',overflow:''});z(this._iframeOptions.root,ea(ra.width),ea(ra.height));this.updateLift();clearTimeout(this._timeoutID);},'bind',true,this));this.subscribe('xd.resize',ES(function(ra){ES('Object','assign',false,this._iframeOptions.root.style,{verticalAlign:'bottom',overflow:''});z(this._iframeOptions.root,ea(ra.width),ea(ra.height));z(this._iframe,ea(ra.width),ea(ra.height));this._isIframeResized=true;this.updateLift();clearTimeout(this._timeoutID);},'bind',true,this));this.subscribe('xd.resize.iframe',ES(function(ra){if(ra.reposition==='true'&&v('reposition_iframe',false))this.reposition(ea(ra.width));z(this._iframe,ea(ra.width),ea(ra.height));this._isIframeResized=true;this.updateLift();clearTimeout(this._timeoutID);},'bind',true,this));this.subscribe('xd.sdk_event',function(ra){var sa=ES('JSON','parse',false,ra.data);sa.pluginID=ma;j.fire(ra.event,sa,ia);});var na=s.resolve('www',true)+'/plugins/'+ka+'.php?',oa={};da(this.getParams(),ia,la,oa);da(y,ia,la,oa);ES('Object','assign',false,oa,{app_id:o.getClientID(),locale:o.getLocale(),sdk:'joey',kid_directed_site:o.getKidDirectedSite(),channel:t.handler(ES(function(ra){return this.inform('xd.'+ra.type,ra);},'bind',true,this),'parent.parent',true)});if(this.shouldIgnoreWidth())oa.width=void 0;oa.container_width=ia.offsetWidth;i.addCss(ia,'fb_iframe_widget');var pa=w();this.subscribe('xd.verify',function(ra){t.sendToFacebook(pa,{method:'xd/verify',params:ES('JSON','stringify',false,ra.token)});});this.subscribe('xd.refreshLoginStatus',ES(function(){h.removeLogoutState();h.getLoginStatus(ES(this.inform,'bind',true,this,'login.status'),true);},'bind',true,this));var qa=document.createElement('span');ES('Object','assign',false,qa.style,{verticalAlign:'top',width:'0px',height:'0px',overflow:'hidden'});this._element=ia;this._ns=ja;this._tag=ka;this._params=oa;this._config=this.getConfig();this._iframeOptions={root:qa,url:na+n.encode(oa),name:pa,width:this._config.mobile_fullsize&&q.mobile()?void 0:oa.width||1000,height:oa.height||1000,style:{border:'none',visibility:'hidden'},title:this._ns+':'+this._tag+' Facebook Social Plugin',onload:ES(function(){return this.inform('render');},'bind',true,this),onerror:ES(function(){return fa(this._iframe);},'bind',true,this)};if(this.isFluid()&&oa.width!=='auto'){i.addCss(this._element,'fb_iframe_widget_fluid_desktop');if(!oa.width&&this._config.full_width){this._element.style.width='100%';this._iframeOptions.root.style.width='100%';this._iframeOptions.style.width='100%';this._params.container_width=this._element.offsetWidth;this._iframeOptions.url=na+n.encode(this._params);}}},shouldIgnoreWidth:function ha(){return q.mobile();},process:function ha(){if(o.getIsVersioned()){m.assertVersionIsSet();var ia=new r(this._iframeOptions.url);this._iframeOptions.url=ia.setPath('/'+o.getVersion()+ia.getPath()).toString();}var ja=ES('Object','assign',false,{},this._params);delete ja.channel;var ka=n.encode(ja);if(this._element.getAttribute('fb-iframe-plugin-query')==ka){k.info('Skipping render: %s:%s %s',this._ns,this._tag,ka);this.inform('render');return;}this._element.setAttribute('fb-iframe-plugin-query',ka);this.subscribe('render',ES(function(){this._iframe.style.visibility='visible';if(!this._isIframeResized)fa(this._iframe);},'bind',true,this));while(this._element.firstChild)this._element.removeChild(this._element.firstChild);this._element.appendChild(this._iframeOptions.root);var la=q.mobile()?120:45;this._timeoutID=setTimeout(ES(function(){fa(this._iframe);k.warn('%s:%s failed to resize in %ss',this._ns,this._tag,la);},'bind',true,this),la*1000);this._iframe=u(this._iframeOptions);if(q.mobile()||ja.width==='auto'){i.addCss(this._element,'fb_iframe_widget_fluid');if(!this._iframeOptions.width){ES('Object','assign',false,this._element.style,{display:'block',width:'100%',height:'auto'});ES('Object','assign',false,this._iframeOptions.root.style,{width:'100%',height:'auto'});var ma={height:'auto',position:'static',width:'100%'};if(q.iphone()||q.ipad())ES('Object','assign',false,ma,{width:'220px','min-width':'100%'});ES('Object','assign',false,this._iframe.style,ma);}}},getConfig:function ha(){return {};},isFluid:function ha(){var ia=this.getConfig();return ia.fluid;},reposition:function ha(ia){var ja=i.getPosition(this._iframe).x,ka=i.getViewportInfo().width,la=parseInt(i.getStyle(this._iframe,'width'),10),ma={};if(ja+ia>ka&&ja>ia){this._iframe.style.left=parseInt(i.getStyle(this._iframe,'width'),10)-ia+'px';this._isRepositioned=true;ma.type='reposition';}else if(this._isRepositioned&&la-ia!==0){this._iframe.style.left='0px';this._isRepositioned=false;ma.type='restore';}else return;t.sendToFacebook(this._iframe.name,{method:'xd/reposition',params:ES('JSON','stringify',false,ma)});},updateLift:function ha(){var ia=this._iframe.style.width===this._iframeOptions.root.style.width&&this._iframe.style.height===this._iframeOptions.root.style.height;i[ia?'removeCss':'addCss'](this._iframe,'fb_iframe_widget_lift');}},l);ga.getVal=ca;ga.withParams=function(ha,ia){return ga.extend({getParams:function ja(){return ha;},getConfig:function ja(){return ia?ia:{};}});};f.exports=ga;}),null);
__d('PluginConfig',['sdk.feature'],(function a(b,c,d,e,f,g,h){var i={comment_embed:{mobile_fullsize:true},messengerpreconfirmation:{mobile_fullsize:true},messengeraccountconfirmation:{mobile_fullsize:true},messengerbusinesslink:{mobile_fullsize:true},messengertoggle:{mobile_fullsize:true},messengermessageus:{mobile_fullsize:true},send_to_messenger:{mobile_fullsize:true},post:{fluid:h('fluid_embed',false),mobile_fullsize:true}};f.exports=i;}),null);
__d('PluginTags',[],(function a(b,c,d,e,f,g){var h={comment_embed:{href:'url',include_parent:'bool'},composer:{action_type:'string',action_properties:'string'},create_event_button:{},follow:{href:'url',layout:'string',show_faces:'bool',size:'string'},like:{href:'url',layout:'string',show_faces:'bool',share:'bool',action:'string',send:'bool',size:'string'},like_box:{href:'string',show_faces:'bool',header:'bool',stream:'bool',force_wall:'bool',show_border:'bool',id:'string',connections:'string',profile_id:'string',name:'string'},page:{href:'string',hide_cta:'bool',hide_cover:'bool',small_header:'bool',adapt_container_width:'bool',show_facepile:'bool',show_posts:'bool',tabs:'string'},messenger_checkbox:{messenger_app_id:'string',page_id:'string',pixel_id:'string',prechecked:'bool',allow_login:'bool',size:'string',origin:'string',user_ref:'string',identity_match:'string'},messengerpreconfirmation:{messenger_app_id:'string',page_id:'string'},messengeraccountconfirmation:{messenger_app_id:'string',page_id:'string',state:'string'},messengerbusinesslink:{messenger_app_id:'string',page_id:'string',state:'string'},messengertoggle:{messenger_app_id:'string',page_id:'string',token:'string',psid:'string'},messengermessageus:{messenger_app_id:'string',page_id:'string',color:'string',size:'string'},send_to_messenger:{messenger_app_id:'string',page_id:'string',color:'string',size:'string',enforce_login:'bool',identity_match:'string',origin:'string'},page_events:{href:'url'},post:{href:'url',show_text:'bool'},profile_pic:{uid:'string',linked:'bool',href:'string',size:'string',facebook_logo:'bool'},send:{href:'url',size:'string'},send_to_mobile:{max_rows:'string',show_faces:'bool',size:'string'}},i={subscribe:'follow',fan:'like_box',likebox:'like_box'};ES(ES('Object','keys',false,i),'forEach',true,function(j){h[j]=h[i[j]];});f.exports=h;}),null);
__d("runOnce",[],(function a(b,c,d,e,f,g){function h(i){var j,k;return function(){if(!j){j=true;k=i();}return k;};}f.exports=h;}),null);
__d('XFBML',['Assert','sdk.DOM','Log','ObservableMixin','sdk.UA','runOnce'],(function a(b,c,d,e,f,g,h,i,j,k,l,m){var n={},o={},p=0,q=new k();function r(y,z){return ES(y[z]+'','trim',true);}function s(y){return y.scopeName?y.scopeName+':'+y.nodeName:'';}function t(y){return n[r(y,'nodeName').toLowerCase()]||n[s(y).toLowerCase()];}function u(y){var z=ES(r(y,'className').split(/\s+/),'filter',true,function(aa){return Object.prototype.hasOwnProperty.call(o,aa);});if(z.length===0)return undefined;if(y.getAttribute('fb-xfbml-state')||!y.childNodes||y.childNodes.length===0||y.childNodes.length===1&&y.childNodes[0].nodeType===3||y.children.length===1&&r(y.children[0],'className')==='fb-xfbml-parse-ignore')return o[z[0]];}function v(y){var z={};ES(ES('Array','from',false,y.attributes),'forEach',true,function(aa){z[r(aa,'name')]=r(aa,'value');});return z;}function w(y,z,aa){var ba=document.createElement('div');i.addCss(y,z+'-'+aa);ES(ES('Array','from',false,y.childNodes),'forEach',true,function(ca){ba.appendChild(ca);});ES(ES('Array','from',false,y.attributes),'forEach',true,function(ca){ba.setAttribute(ca.name,ca.value);});y.parentNode.replaceChild(ba,y);return ba;}function x(y,z,aa){h.isTrue(y&&y.nodeType&&y.nodeType===1&&!!y.getElementsByTagName,'Invalid DOM node passed to FB.XFBML.parse()');h.isFunction(z,'Invalid callback passed to FB.XFBML.parse()');var ba=++p;j.info('XFBML Parsing Start %s',ba);var ca=1,da=0,ea=function ga(){ca--;if(ca===0){j.info('XFBML Parsing Finish %s, %s tags found',ba,da);z();q.inform('render',ba,da);}h.isTrue(ca>=0,'onrender() has been called too many times');};ES(ES('Array','from',false,y.getElementsByTagName('*')),'forEach',true,function(ga){if(!aa&&ga.getAttribute('fb-xfbml-state'))return;if(ga.nodeType!==1)return;var ha=t(ga)||u(ga);if(!ha)return;if(l.ie()<9&&ga.scopeName)ga=w(ga,ha.xmlns,ha.localName);ca++;da++;var ia=new ha.ctor(ga,ha.xmlns,ha.localName,v(ga));ia.subscribe('render',m(function(){ga.setAttribute('fb-xfbml-state','rendered');ea();}));var ja=function ka(){if(ga.getAttribute('fb-xfbml-state')=='parsed'){q.subscribe('render.queue',ka);}else{ga.setAttribute('fb-xfbml-state','parsed');ia.process();}};ja();});q.inform('parse',ba,da);var fa=30000;setTimeout(function(){if(ca>0)j.warn('%s tags failed to render in %s ms',ca,fa);},fa);ea();}q.subscribe('render',function(){var y=q.getSubscribers('render.queue');q.clearSubscribers('render.queue');ES(y,'forEach',true,function(z){z();});});ES('Object','assign',false,q,{registerTag:function y(z){var aa=z.xmlns+':'+z.localName;h.isUndefined(n[aa],aa+' already registered');n[aa]=z;o[z.xmlns+'-'+z.localName]=z;},parse:function y(z,aa){x(z||document.body,aa||function(){},true);},parseNew:function y(){x(document.body,function(){},false);}});f.exports=q;}),null);
__d('sdk.Arbiter',[],(function a(b,c,d,e,f,g){var h={BEHAVIOR_EVENT:'e',BEHAVIOR_PERSISTENT:'p',BEHAVIOR_STATE:'s'};f.exports=h;}),null);
__d('sdk.XFBML.Element',['sdk.DOM','Type','ObservableMixin'],(function a(b,c,d,e,f,g,h,i,j){var k=i.extend({constructor:function l(m){this.parent();this.dom=m;},fire:function l(){this.inform.apply(this,arguments);},getAttribute:function l(m,n,o){var p=h.getAttr(this.dom,m);return p?o?o(p):p:n;},_getBoolAttribute:function l(m,n){var o=h.getBoolAttr(this.dom,m);return o===null?n:o;},_getPxAttribute:function l(m,n){return this.getAttribute(m,n,function(o){var p=parseInt(o,10);return isNaN(p)?n:p;});},_getLengthAttribute:function l(m,n){return this.getAttribute(m,n,function(o){if(o==='100%'||o==='auto')return o;var p=parseInt(o,10);return isNaN(p)?n:p;});},_getAttributeFromList:function l(m,n,o){return this.getAttribute(m,n,function(p){p=p.toLowerCase();return ES(o,'indexOf',true,p)>-1?p:n;});},isValid:function l(){for(var m=this.dom;m;m=m.parentNode)if(m==document.body)return true;},clear:function l(){h.html(this.dom,'');}},j);f.exports=k;}),null);
__d('sdk.XFBML.IframeWidget',['sdk.Arbiter','sdk.Auth','sdk.Content','sdk.DOM','sdk.Event','sdk.XFBML.Element','guid','insertIframe','QueryString','sdk.Runtime','sdk.ui','UrlMap','sdk.XD'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){var u=m.extend({_iframeName:null,_showLoader:true,_refreshOnAuthChange:false,_allowReProcess:false,_fetchPreCachedLoader:false,_visibleAfter:'load',_widgetPipeEnabled:false,_borderReset:false,_repositioned:false,getUrlBits:function w(){throw new Error('Inheriting class needs to implement getUrlBits().');},setupAndValidate:function w(){return true;},oneTimeSetup:function w(){},getSize:function w(){},getIframeName:function w(){return this._iframeName;},getIframeTitle:function w(){return 'Facebook Social Plugin';},getChannelUrl:function w(){if(!this._channelUrl){var x=this;this._channelUrl=t.handler(function(y){x.fire('xd.'+y.type,y);},'parent.parent',true);}return this._channelUrl;},getIframeNode:function w(){return this.dom.getElementsByTagName('iframe')[0];},arbiterInform:function w(event,x,y){t.sendToFacebook(this.getIframeName(),{method:event,params:ES('JSON','stringify',false,x||{}),behavior:y||h.BEHAVIOR_PERSISTENT});},_arbiterInform:function w(event,x,y){var z='parent.frames["'+this.getIframeNode().name+'"]';t.inform(event,x,z,y);},getDefaultWebDomain:function w(){return s.resolve('www');},process:function w(x){if(this._done){if(!this._allowReProcess&&!x)return;this.clear();}else this._oneTimeSetup();this._done=true;this._iframeName=this.getIframeName()||this._iframeName||n();if(!this.setupAndValidate()){this.fire('render');return;}if(this._showLoader)this._addLoader();k.addCss(this.dom,'fb_iframe_widget');if(this._visibleAfter!='immediate'){k.addCss(this.dom,'fb_hide_iframes');}else this.subscribe('iframe.onload',ES(this.fire,'bind',true,this,'render'));var y=this.getSize()||{},z=this.getFullyQualifiedURL();if(y.width=='100%')k.addCss(this.dom,'fb_iframe_widget_fluid');this.clear();o({url:z,root:this.dom.appendChild(document.createElement('span')),name:this._iframeName,title:this.getIframeTitle(),className:q.getRtl()?'fb_rtl':'fb_ltr',height:y.height,width:y.width,onload:ES(this.fire,'bind',true,this,'iframe.onload')});this._resizeFlow(y);this.loaded=false;this.subscribe('iframe.onload',ES(function(){this.loaded=true;if(!this._isResizeHandled)k.addCss(this.dom,'fb_hide_iframes');},'bind',true,this));},generateWidgetPipeIframeName:function w(){v++;return 'fb_iframe_'+v;},getFullyQualifiedURL:function w(){var x=this._getURL();x+='?'+p.encode(this._getQS());if(x.length>2000){x='about:blank';var y=ES(function(){this._postRequest();this.unsubscribe('iframe.onload',y);},'bind',true,this);this.subscribe('iframe.onload',y);}return x;},_getWidgetPipeShell:function w(){return s.resolve('www')+'/common/widget_pipe_shell.php';},_oneTimeSetup:function w(){this.subscribe('xd.resize',ES(this._handleResizeMsg,'bind',true,this));this.subscribe('xd.resize',ES(this._bubbleResizeEvent,'bind',true,this));this.subscribe('xd.resize.iframe',ES(this._resizeIframe,'bind',true,this));this.subscribe('xd.resize.flow',ES(this._resizeFlow,'bind',true,this));this.subscribe('xd.resize.flow',ES(this._bubbleResizeEvent,'bind',true,this));this.subscribe('xd.refreshLoginStatus',function(){i.getLoginStatus(function(){},true);});this.subscribe('xd.logout',function(){r({method:'auth.logout',display:'hidden'},function(){});});if(this._refreshOnAuthChange)this._setupAuthRefresh();if(this._visibleAfter=='load')this.subscribe('iframe.onload',ES(this._makeVisible,'bind',true,this));this.subscribe('xd.verify',ES(function(x){this.arbiterInform('xd/verify',x.token);},'bind',true,this));this.oneTimeSetup();},_makeVisible:function w(){this._removeLoader();k.removeCss(this.dom,'fb_hide_iframes');this.fire('render');},_setupAuthRefresh:function w(){i.getLoginStatus(ES(function(x){var y=x.status;l.subscribe('auth.statusChange',ES(function(z){if(!this.isValid())return;if(y=='unknown'||z.status=='unknown')this.process(true);y=z.status;},'bind',true,this));},'bind',true,this));},_handleResizeMsg:function w(x){if(!this.isValid())return;this._resizeIframe(x);this._resizeFlow(x);if(!this._borderReset){this.getIframeNode().style.border='none';this._borderReset=true;}this._isResizeHandled=true;this._makeVisible();},_bubbleResizeEvent:function w(x){var y={height:x.height,width:x.width,pluginID:this.getAttribute('plugin-id')};l.fire('xfbml.resize',y);},_resizeIframe:function w(x){var y=this.getIframeNode();if(x.reposition==='true')this._repositionIframe(x);x.height&&(y.style.height=x.height+'px');x.width&&(y.style.width=x.width+'px');},_resizeFlow:function w(x){var y=this.dom.getElementsByTagName('span')[0];x.height&&(y.style.height=x.height+'px');x.width&&(y.style.width=x.width+'px');},_repositionIframe:function w(x){var y=this.getIframeNode(),z=parseInt(k.getStyle(y,'width'),10),aa=k.getPosition(y).x,ba=k.getViewportInfo().width,ca=parseInt(x.width,10);if(aa+ca>ba&&aa>ca){y.style.left=z-ca+'px';this.arbiterInform('xd/reposition',{type:'horizontal'});this._repositioned=true;}else if(this._repositioned){y.style.left='0px';this.arbiterInform('xd/reposition',{type:'restore'});this._repositioned=false;}},_addLoader:function w(){if(!this._loaderDiv){k.addCss(this.dom,'fb_iframe_widget_loader');this._loaderDiv=document.createElement('div');this._loaderDiv.className='FB_Loader';this.dom.appendChild(this._loaderDiv);}},_removeLoader:function w(){if(this._loaderDiv){k.removeCss(this.dom,'fb_iframe_widget_loader');if(this._loaderDiv.parentNode)this._loaderDiv.parentNode.removeChild(this._loaderDiv);this._loaderDiv=null;}},_getQS:function w(){return ES('Object','assign',false,{api_key:q.getClientID(),locale:q.getLocale(),sdk:'joey',kid_directed_site:q.getKidDirectedSite(),ref:this.getAttribute('ref')},this.getUrlBits().params);},_getURL:function w(){var x=this.getDefaultWebDomain(),y='';return x+'/plugins/'+y+this.getUrlBits().name+'.php';},_postRequest:function w(){j.submitToTarget({url:this._getURL(),target:this.getIframeNode().name,params:this._getQS()});}}),v=0;f.exports=u;}),null);
__d('sdk.XFBML.Comments',['sdk.Event','sdk.XFBML.IframeWidget','QueryString','sdk.Runtime','JSSDKConfig','sdk.UA','UrlMap'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){var o=320,p=i.extend({_visibleAfter:'immediate',_refreshOnAuthChange:true,setupAndValidate:function q(){var r={channel_url:this.getChannelUrl(),colorscheme:this.getAttribute('colorscheme'),skin:this.getAttribute('skin'),numposts:this.getAttribute('num-posts',10),width:this._getLengthAttribute('width'),href:this.getAttribute('href'),permalink:this.getAttribute('permalink'),publish_feed:this.getAttribute('publish_feed'),order_by:this.getAttribute('order_by'),mobile:this._getBoolAttribute('mobile'),version:this.getAttribute('version')};if(!r.width&&!r.permalink)r.width=550;if(l.initSitevars.enableMobileComments&&m.mobile()&&r.mobile!==false){r.mobile=true;delete r.width;}if(!r.skin)r.skin=r.colorscheme;if(!r.href){r.migrated=this.getAttribute('migrated');r.xid=this.getAttribute('xid');r.title=this.getAttribute('title',document.title);r.url=this.getAttribute('url',document.URL);r.quiet=this.getAttribute('quiet');r.reverse=this.getAttribute('reverse');r.simple=this.getAttribute('simple');r.css=this.getAttribute('css');r.notify=this.getAttribute('notify');if(!r.xid){var s=ES(document.URL,'indexOf',true,'#');if(s>0){r.xid=encodeURIComponent(document.URL.substring(0,s));}else r.xid=encodeURIComponent(document.URL);}if(r.migrated)r.href=n.resolve('www')+'/plugins/comments_v1.php?'+'app_id='+k.getClientID()+'&xid='+encodeURIComponent(r.xid)+'&url='+encodeURIComponent(r.url);}else{var t=this.getAttribute('fb_comment_id');if(!t){t=j.decode(document.URL.substring(ES(document.URL,'indexOf',true,'?')+1)).fb_comment_id;if(t&&ES(t,'indexOf',true,'#')>0)t=t.substring(0,ES(t,'indexOf',true,'#'));}if(t){r.fb_comment_id=t;this.subscribe('render',ES(function(){if(!window.location.hash)window.location.hash=this.getIframeNode().id;},'bind',true,this));}}if(!r.version)r.version=k.getVersion();this._attr=r;return true;},oneTimeSetup:function q(){this.subscribe('xd.sdk_event',function(r){h.fire(r.event,ES('JSON','parse',false,r.data));});},getSize:function q(){if(!this._attr.permalink)return {width:this._attr.mobile||this._attr.width==='auto'||this._attr.width==='100%'?'100%':Math.max(this._attr.width,o),height:100};},getUrlBits:function q(){return {name:'comments',params:this._attr};},getDefaultWebDomain:function q(){return n.resolve('www',true);}});f.exports=p;}),null);
__d('sdk.XFBML.CommentsCount',['ApiClient','sdk.DOM','sdk.XFBML.Element','sprintf'],(function a(b,c,d,e,f,g,h,i,j,k){var l=j.extend({process:function m(){i.addCss(this.dom,'fb_comments_count_zero');var n=this.getAttribute('href',window.location.href);h.scheduleBatchCall('/v2.1/'+encodeURIComponent(n),{fields:'share'},ES(function(o){var p=o.share&&o.share.comment_count||0;i.html(this.dom,k('<span class="fb_comments_count">%s</span>',p));if(p>0)i.removeCss(this.dom,'fb_comments_count_zero');this.fire('render');},'bind',true,this));}});f.exports=l;}),null);
__d('sdk.Helper',['sdk.ErrorHandling','sdk.Event','UrlMap','safeEval','sprintf'],(function a(b,c,d,e,f,g,h,i,j,k,l){var m={isUser:function n(o){return o<2.2e+09||o>=1e+14&&o<=100099999989999||o>=8.9e+13&&o<=89999999999999||o>=6.000001e+13&&o<=60000019999999;},upperCaseFirstChar:function n(o){if(o.length>0){return o.substr(0,1).toUpperCase()+o.substr(1);}else return o;},getProfileLink:function n(o,p,q){if(!q&&o)q=l('%s/profile.php?id=%s',j.resolve('www'),o.uid||o.id);if(q)p=l('<a class="fb_link" href="%s">%s</a>',q,p);return p;},invokeHandler:function n(o,p,q){if(o)if(typeof o==='string'){h.unguard(k)(o,q);}else if(o.apply)h.unguard(o).apply(p,q||[]);},fireEvent:function n(o,p){var q=p._attr.href;p.fire(o,q);i.fire(o,q,p);},executeFunctionByName:function n(o){var p=Array.prototype.slice.call(arguments,1),q=o.split("."),r=q.pop(),s=window;for(var t=0;t<q.length;t++)s=s[q[t]];return s[r].apply(this,p);}};f.exports=m;}),null);
__d('sdk.XFBML.LoginButton',['sdk.Helper','IframePlugin','Log','sdk.ui','sdk.XD'],(function a(b,c,d,e,f,g,h,i,j,k,l){var m=i.extend({constructor:function n(o,p,q,r){this.parent(o,p,q,r);var s=i.getVal(r,'on_login'),t=null,u=this._iframeOptions.name;if(s){t=function v(w){if(w.error_code){j.debug('Plugin Return Error (%s): %s',w.error_code,w.error_message||w.error_description);return;}h.invokeHandler(s,null,[w]);};this.subscribe('login.status',t);}this.subscribe('xd.login_button_dialog_open',function(v){k(ES('JSON','parse',false,v.params),function(w){l.sendToFacebook(u,{method:'loginReload',params:ES('JSON','stringify',false,w)});});});},shouldIgnoreWidth:function n(){return false;},getParams:function n(){return {scope:'string',perms:'string',size:'string',login_text:'text',show_faces:'bool',max_rows:'string',show_login_face:'bool',registration_url:'url_maybe',auto_logout_link:'bool',one_click:'bool',show_banner:'bool',auth_type:'string',default_audience:'string',use_continue_as:'bool',button_type:'string',width:'px',height:'px'};}});f.exports=m;}),null);
__d('escapeHTML',[],(function a(b,c,d,e,f,g){var h=/[&<>\"\'\/]/g,i={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;','/':'&#x2F;'};function j(k){return k.replace(h,function(l){return i[l];});}f.exports=j;}),null);
__d('sdk.XFBML.Name',['ApiClient','escapeHTML','sdk.Event','sdk.XFBML.Element','sdk.Helper','Log','sdk.Runtime'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n){var o={}.hasOwnProperty,p=k.extend({process:function q(){ES('Object','assign',false,this,{_uid:this.getAttribute('uid'),_firstnameonly:this._getBoolAttribute('first-name-only'),_lastnameonly:this._getBoolAttribute('last-name-only'),_possessive:this._getBoolAttribute('possessive'),_reflexive:this._getBoolAttribute('reflexive'),_objective:this._getBoolAttribute('objective'),_linked:this._getBoolAttribute('linked',true),_subjectId:this.getAttribute('subject-id')});if(!this._uid){m.error('"uid" is a required attribute for <fb:name>');this.fire('render');return;}var r=[];if(this._firstnameonly){r.push('first_name');}else if(this._lastnameonly){r.push('last_name');}else r.push('name');if(this._subjectId){r.push('gender');if(this._subjectId==n.getUserID())this._reflexive=true;}j.monitor('auth.statusChange',ES(function(){if(!this.isValid()){this.fire('render');return true;}if(!this._uid||this._uid=='loggedinuser')this._uid=n.getUserID();if(!this._uid)return;h.scheduleBatchCall('/v1.0/'+this._uid,{fields:r.join(',')},ES(function(s){if(o.call(s,'error')){m.warn('The name is not found for ID: '+this._uid);return;}if(this._subjectId==this._uid){this._renderPronoun(s);}else this._renderOther(s);this.fire('render');},'bind',true,this));},'bind',true,this));},_renderPronoun:function q(r){var s='',t=this._objective;if(this._subjectId){t=true;if(this._subjectId===this._uid)this._reflexive=true;}if(this._uid==n.getUserID()&&this._getBoolAttribute('use-you',true)){if(this._possessive){if(this._reflexive){s='your own';}else s='your';}else if(this._reflexive){s='yourself';}else s='you';}else switch(r.gender){case 'male':if(this._possessive){s=this._reflexive?'his own':'his';}else if(this._reflexive){s='himself';}else if(t){s='him';}else s='he';break;case 'female':if(this._possessive){s=this._reflexive?'her own':'her';}else if(this._reflexive){s='herself';}else if(t){s='her';}else s='she';break;default:if(this._getBoolAttribute('use-they',true)){if(this._possessive){if(this._reflexive){s='their own';}else s='their';}else if(this._reflexive){s='themselves';}else if(t){s='them';}else s='they';}else if(this._possessive){if(this._reflexive){s='his/her own';}else s='his/her';}else if(this._reflexive){s='himself/herself';}else if(t){s='him/her';}else s='he/she';break;}if(this._getBoolAttribute('capitalize',false))s=l.upperCaseFirstChar(s);this.dom.innerHTML=s;},_renderOther:function q(r){var s='',t='';if(this._uid==n.getUserID()&&this._getBoolAttribute('use-you',true)){if(this._reflexive){if(this._possessive){s='your own';}else s='yourself';}else if(this._possessive){s='your';}else s='you';}else if(r){if(null===r.first_name)r.first_name='';if(null===r.last_name)r.last_name='';if(this._firstnameonly&&r.first_name!==undefined){s=i(r.first_name);}else if(this._lastnameonly&&r.last_name!==undefined)s=i(r.last_name);if(!s)s=i(r.name);if(s!==''&&this._possessive)s+='\'s';}if(!s)s=i(this.getAttribute('if-cant-see','Facebook User'));if(s){if(this._getBoolAttribute('capitalize',false))s=l.upperCaseFirstChar(s);if(r&&this._linked){t=l.getProfileLink(r,s,this.getAttribute('href',null));}else t=s;}this.dom.innerHTML=t;}});f.exports=p;}),null);
__d('UnicodeUtils',['invariant'],(function a(b,c,d,e,f,g,h){'use strict';var i=55296,j=56319,k=56320,l=57343,m=/[\uD800-\uDFFF]/;function n(w){return i<=w&&w<=l;}function o(w,x){0<=x&&x<w.length||h(0);if(x+1===w.length)return false;var y=w.charCodeAt(x),z=w.charCodeAt(x+1);return i<=y&&y<=j&&k<=z&&z<=l;}function p(w){return m.test(w);}function q(w,x){return 1+n(w.charCodeAt(x));}function r(w){if(!p(w))return w.length;var x=0;for(var y=0;y<w.length;y+=q(w,y))x++;return x;}function s(w,x,y){x=x||0;y=y===undefined?Infinity:y||0;if(!p(w))return w.substr(x,y);var z=w.length;if(z<=0||x>z||y<=0)return '';var aa=0;if(x>0){for(;x>0&&aa<z;x--)aa+=q(w,aa);if(aa>=z)return '';}else if(x<0){for(aa=z;x<0&&0<aa;x++)aa-=q(w,aa-1);if(aa<0)aa=0;}var ba=z;if(y<z)for(ba=aa;y>0&&ba<z;y--)ba+=q(w,ba);return w.substring(aa,ba);}function t(w,x,y){x=x||0;y=y===undefined?Infinity:y||0;if(x<0)x=0;if(y<0)y=0;var z=Math.abs(y-x);x=x<y?x:y;return s(w,x,z);}function u(w){var x=[];for(var y=0;y<w.length;y+=q(w,y))x.push(w.codePointAt(y));return x;}var v={getCodePoints:u,getUTF16Length:q,hasSurrogateUnit:p,isCodeUnitInSurrogateRange:n,isSurrogatePair:o,strlen:r,substring:t,substr:s};f.exports=v;}),null);
__d('isNode',[],(function a(b,c,d,e,f,g){function h(i){var j=i?i.ownerDocument||i:document,k=j.defaultView||window;return !!(i&&(typeof k.Node==='function'?i instanceof k.Node:typeof i==='object'&&typeof i.nodeType==='number'&&typeof i.nodeName==='string'));}f.exports=h;}),18);
__d('isTextNode',['isNode'],(function a(b,c,d,e,f,g,h){function i(j){return h(j)&&j.nodeType==3;}f.exports=i;}),18);
__d('containsNode',['isTextNode'],(function a(b,c,d,e,f,g,h){function i(j,k){if(!j||!k){return false;}else if(j===k){return true;}else if(h(j)){return false;}else if(h(k)){return i(j,k.parentNode);}else if('contains' in j){return ES(j,'contains',true,k);}else if(j.compareDocumentPosition){return !!(j.compareDocumentPosition(k)&16);}else return false;}f.exports=i;}),null);
__d('sdk.XFBML.Quote',['sdk.DOM','DOMEventListener','IframePlugin','UnicodeUtils','sdk.UA','sdk.XD','containsNode','sdk.feature'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){'use strict';var p='fb-quotable',q=155,r=70,s='',t=null,u=[],v=false,w=null,x=l.mobile();function y(da){var ea=da.getRangeAt(0),fa=ea.startContainer;return fa.nodeType===3?fa.parentNode:fa;}function z(da){if(!document.getSelection||x)return;var ea=document.getSelection();if(ea.rangeCount===0){ba();return;}var fa=u.length;ba();if(fa){var ga=false;for(var ha=0;ha<fa;ha++)if(n(u[ha],ea.focusNode)){ga=true;break;}if(!ga)return;}s=ea.toString();if(s===''){ba();return;}s=ES(s.toString().replace(/\s+/g,' '),'trim',true);var ia=Number(o('sharequotelimit',500));if(k.strlen(s)>ia){s=k.substr(s,0,ia-3)+'...';}else s=k.substr(s,0,ia);if(!v&&w){y(ea).appendChild(w);var ja=aa(ea);w.style.left=ja.x+'px';w.style.top=ja.y+'px';}}function aa(da){var ea=w&&w.offsetWidth,fa=ea?w.offsetHeight:r,ga=ea?w.offsetWidth:q,ha=da.getRangeAt(0),ia=document.createElement('span'),ja=document.createElement('span'),ka=document.createRange();ka.setStart(ha.startContainer,ha.startOffset);ka.insertNode(ia);var la=document.createRange();la.setStart(ha.endContainer,ha.endOffset);la.insertNode(ja);var ma=ia.offsetTop-fa,na=ia.offsetLeft+(ja.offsetLeft-ia.offsetLeft)/2-ga/2;ia.parentNode.removeChild(ia);ja.parentNode.removeChild(ja);return {x:na,y:ma};}function ba(){s='';if(!v&&w)w.style.left='-9999px';}var ca=j.extend({constructor:function da(ea,fa,ga,ha){if(t)return t;this.parent(ea,fa,ga,ha);v=h.getAttr(ea,'layout')==='button';w=ea;w.style.position='absolute';w.style.display='';i.add(document,'keyup',z);i.add(document,'mouseup',z);this.subscribe('xd.getTextSelection',ES(function(){m.sendToFacebook(this._iframeOptions.name,{method:'setTextSelection',params:ES('JSON','stringify',false,{text:s})});ba();},'bind',true,this));u=ES(ES('Array','from',false,document.getElementsByTagName('*')),'filter',true,function(ia){return ia.nodeName.toLowerCase()==='article'||h.containsCss(ia,p);});ba();t=this;return t;},getParams:function da(){return {href:'url',layout:'string'};}});f.exports=ca;}),null);
__d('sdk.XFBML.Save',['sdk.Content','sdk.DialogUtils','sdk.DOM','sdk.Event','IframePlugin','QueryString','sdk.UA','sdk.XD','sdk.createIframe'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){'use strict';var q=void 0,r=l.extend({constructor:function s(t,u,v,w){this.parent(t,u,v,w);var x=n.mobile();this.subscribe('xd.savePluginGetBlankIframe',ES(function(y){var z=void 0,aa=void 0,ba=void 0,ca=function ha(ia){if(ia)j.removeCss(ia,'fb_invisible');},da=function ha(ia){if(ia)j.addCss(ia,'fb_invisible');};if(x){z=i.setupNewDarkOverlay();da(z);h.append(z);i.addDoubleClickAction(z,function(){return ES(ba,'forEach',true,da);},5000);}aa=this.setupNewIframeDialog(ES('JSON','parse',false,y.data),y.fromIframe,ES('JSON','parse',false,y.isHTTPS));da(aa);h.append(aa);ba=[aa,z];var ea=function ha(){ES(ba,'forEach',true,da);i.onDialogHideCleanup(x);clearInterval(q);},fa=void 0;this.subscribe('xd.savePluginShowIframe',ES(function(){k.fire('savePlugin:hideDialog');ES(ba,'forEach',true,ca);this.positionOnScreen(aa,z);if(!x&&!fa)fa=i.addIdleDesktopAction(aa,ea,7000);},'bind',true,this));this.subscribe('xd.savePluginHideIframe',function(){return ea();});k.subscribe('savePlugin:hideDialog',function(){return ea();});var ga=setInterval(function(){var ha=document.getElementsByName(y.fromIframe);if(ha.length===0){clearTimeout(ga);ea();ES(ba,'forEach',true,function(ia){ia&&ia.parentNode.removeChild(ia);});}},500);},'bind',true,this));},positionOnScreen:function s(t,u){var v,w=n.mobile();if(w){(function(){var x=function y(z,aa){if(aa!=null)i.setDialogPositionToCenter(aa,w);i.setDialogPositionToCenter(z,w);};x(t,u);i.addMobileOrientationChangeAction(function(y){x(t,u);});q=setInterval(function(){return x(t,u);},100);})();}else{j.setStyle(t,'position','fixed');j.setStyle(t,'top','20px');j.setStyle(t,'right','20px');}},setupNewIframeDialog:function s(t,u,v){var w='#'+m.encode({forIframe:u}),x=i.setupNewDialog();p({url:o.getXDArbiterURL(v)+w,name:'blank_'+this._iframeOptions.name,root:x.contentRoot,tabindex:-1});j.addCss(x.contentRoot,'fb_dialog_iframe');ES('Object','assign',false,x.dialogElement.style,t.style||{});j.setStyle(x.dialogElement,'width',t.width+'px');j.setStyle(x.dialogElement,'height',t.height+'px');ES(t.classList,'forEach',true,function(y){return j.addCss(x.dialogElement,y);});j.removeCss(x.dialogElement,'fb_dialog_advanced');return x.dialogElement;},getParams:function s(){return {uri:'url',url_category:'string',size:'string'};}});f.exports=r;}),null);
__d('sdk.XFBML.ShareButton',['IframePlugin','sdk.UA','sdk.ui'],(function a(b,c,d,e,f,g,h,i,j){'use strict';var k=h.extend({constructor:function l(m,n,o,p){this.parent(m,n,o,p);this.subscribe('xd.shareTriggerMobileIframe',function(q){var r=ES('JSON','parse',false,q.data);j({method:'share',href:r.href,mobile_iframe:i.mobile()});});},getParams:function l(){return {href:'url',layout:'string',mobile_iframe:'bool',type:'string',size:'string'};}});f.exports=k;}),null);
__d('sdk.XFBML.Video',['Assert','sdk.Event','IframePlugin','ObservableMixin','sdk.XD'],(function a(b,c,d,e,f,g,h,i,j,k,l){function m(p){'use strict';this.$VideoCache1=p.isMuted;this.$VideoCache2=p.volume;this.$VideoCache3=p.timePosition;this.$VideoCache4=p.duration;}m.prototype.update=function(p){'use strict';if(p.isMuted!==undefined)this.$VideoCache1=p.isMuted;if(p.volume!==undefined)this.$VideoCache2=p.volume;if(p.timePosition!==undefined)this.$VideoCache3=p.timePosition;if(p.duration!==undefined)this.$VideoCache4=p.duration;};m.prototype.isMuted=function(){'use strict';return this.$VideoCache1;};m.prototype.getVolume=function(){'use strict';return this.$VideoCache1?0:this.$VideoCache2;};m.prototype.getCurrentPosition=function(){'use strict';return this.$VideoCache3;};m.prototype.getDuration=function(){'use strict';return this.$VideoCache4;};function n(p,q,r){'use strict';this.$VideoController1=p;this.$VideoController2=q;this.$VideoController3=r;}n.prototype.play=function(){'use strict';l.sendToFacebook(this.$VideoController1,{method:'play',params:ES('JSON','stringify',false,{})});};n.prototype.pause=function(){'use strict';l.sendToFacebook(this.$VideoController1,{method:'pause',params:ES('JSON','stringify',false,{})});};n.prototype.seek=function(p){'use strict';h.isNumber(p,'Invalid argument');l.sendToFacebook(this.$VideoController1,{method:'seek',params:ES('JSON','stringify',false,{target:p})});};n.prototype.mute=function(){'use strict';l.sendToFacebook(this.$VideoController1,{method:'mute',params:ES('JSON','stringify',false,{})});};n.prototype.unmute=function(){'use strict';l.sendToFacebook(this.$VideoController1,{method:'unmute',params:ES('JSON','stringify',false,{})});};n.prototype.setVolume=function(p){'use strict';h.isNumber(p,'Invalid argument');l.sendToFacebook(this.$VideoController1,{method:'setVolume',params:ES('JSON','stringify',false,{volume:p})});};n.prototype.isMuted=function(){'use strict';return this.$VideoController3.isMuted();};n.prototype.getVolume=function(){'use strict';return this.$VideoController3.getVolume();};n.prototype.getCurrentPosition=function(){'use strict';return this.$VideoController3.getCurrentPosition();};n.prototype.getDuration=function(){'use strict';return this.$VideoController3.getDuration();};n.prototype.subscribe=function(event,p){'use strict';h.isString(event,'Invalid argument');h.isFunction(p,'Invalid argument');this.$VideoController2.subscribe(event,p);return {release:ES(function(){this.$VideoController2.unsubscribe(event,p);},'bind',true,this)};};var o=j.extend({constructor:function p(q,r,s,t){this.parent(q,r,s,t);this._videoController=null;this._sharedObservable=null;this._sharedVideoCache=null;this.subscribe('xd.onVideoAPIReady',function(u){this._sharedObservable=new k();this._sharedVideoCache=new m(ES('JSON','parse',false,u.data));this._videoController=new n(this._iframeOptions.name,this._sharedObservable,this._sharedVideoCache);i.fire('xfbml.ready',{type:'video',id:t.id,instance:this._videoController});});this.subscribe('xd.stateChange',function(u){this._sharedObservable.inform(u.state);});this.subscribe('xd.cachedStateUpdateRequest',function(u){this._sharedVideoCache.update(ES('JSON','parse',false,u.data));});},getParams:function p(){return {allowfullscreen:'bool',autoplay:'bool',controls:'bool',href:'url',show_captions:'bool',show_text:'bool'};},getConfig:function p(){return {fluid:true,full_width:true};}});f.exports=o;}),null);
__d('legacy:fb.xfbml',['Assert','sdk.Event','FB','IframePlugin','PluginConfig','PluginTags','XFBML','sdk.domReady','sdk.feature','wrapFunction','sdk.XFBML.Comments','sdk.XFBML.CommentsCount','sdk.XFBML.LoginButton','sdk.XFBML.Name','sdk.XFBML.Quote','sdk.XFBML.Save','sdk.XFBML.ShareButton','sdk.XFBML.Video'],(function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var r={comments:c('sdk.XFBML.Comments'),comments_count:c('sdk.XFBML.CommentsCount'),login_button:c('sdk.XFBML.LoginButton'),name:c('sdk.XFBML.Name'),quote:c('sdk.XFBML.Quote'),save:c('sdk.XFBML.Save'),share_button:c('sdk.XFBML.ShareButton'),video:c('sdk.XFBML.Video')},s=p('plugin_tags_blacklist',[]);ES(ES('Object','keys',false,m),'forEach',true,function(t){if(ES(s,'indexOf',true,t)!==-1)return;n.registerTag({xmlns:'fb',localName:t.replace(/_/g,'-'),ctor:k.withParams(m[t],l[t])});});ES(ES('Object','keys',false,r),'forEach',true,function(t){if(ES(s,'indexOf',true,t)!==-1)return;n.registerTag({xmlns:'fb',localName:t.replace(/_/g,'-'),ctor:r[t]});});j.provide('XFBML',{parse:function t(u){h.maybeXfbml(u,'Invalid argument');if(u&&u.nodeType===9)u=u.body;return n.parse.apply(null,arguments);}});n.subscribe('parse',ES(i.fire,'bind',true,i,'xfbml.parse'));n.subscribe('render',ES(i.fire,'bind',true,i,'xfbml.render'));i.subscribe('init:post',function(t){if(t.xfbml)setTimeout(q(ES(o,'bind',true,null,n.parse),'entry','init:post:xfbml.parse'),0);});h.define('Xfbml',function(t){return (t.nodeType===1||t.nodeType===9)&&typeof t.nodeName==='string';});try{if(document.namespaces&&!document.namespaces.item.fb)document.namespaces.add('fb');}catch(t){}}),3);
    }  }).call(global);})(window.inDapIF ? parent.window : window, window);} catch (e) {new Image().src="http:\/\/www.facebook.com\/" + 'common/scribe_endpoint.php?c=jssdk_error&m='+encodeURIComponent('{"error":"LOAD", "extra": {"name":"'+e.name+'","line":"'+(e.lineNumber||e.line)+'","script":"'+(e.fileName||e.sourceURL||e.script)+'","stack":"'+(e.stackTrace||e.stack)+'","revision":"3112099","namespace":"FB","message":"'+e.message+'"}}');}
;

function controlFunction(){
				FB.api("/me",
						function (response) {
						var facebookID;
						facebookID = response.id;
						getBestInMonth(facebookID);
					});
}

function getBestInMonth(userid){
	messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/');
	var ch= "Users/"+userid+"/posts/BestofMonth/";
	console.log(ch);
	var ref = messagesRef.child(ch);

	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value",function(snapshot) {
	    //console.log("checkPost -- " + JSON.stringify(snapshot.val()));
		var like_accumurate = 0;
		var picture_accumurate = 0;
		var Comments_accumurate = 0;
	    snapshot.forEach(function (childSnapshot) {
			var value = childSnapshot.val();
			//console.log("postID is : " + value.postID + " ");
			if(value.full_picture.trim()!=''){
				var img = document.createElement('img');
				document.getElementById('gall-container').appendChild(img);
				img.src = value.full_picture;
				picture_accumurate++;
			}
			var likeCount = value.likes_total_count? value.likes_total_count : 0;
			var commentCount = value.comment_total_count? value.comment_total_count : 0;
			like_accumurate = like_accumurate+likeCount;
			Comments_accumurate = Comments_accumurate+commentCount;		
		});

			document.getElementById('countPic').innerHTML = "<b>  "+picture_accumurate+ " Pictures </b>";
			document.getElementById('countLik').innerHTML = "<b>  "+like_accumurate+ " Like </b>";
			document.getElementById('countCom').innerHTML = "<b>  "+Comments_accumurate+ " Comments </b>";

	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
}
;
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            throw new Error("Existing connection must be closed before opening");
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {


}).call(this);
function iniFB(){	

		var messagesRef = new Firebase('https://bestofthemonth-3418f.firebaseio.com/');	
			 var config = {
                 apiKey: 'AIzaSyA8uKyZZpaRZ7bbV8pQGR3Nll2ukhBB508',
                 authDomain: 'https://console.firebase.google.com/',
                 databaseURL: 'https://kept-7b0c3.firebaseio.com/',
                 storageBucket: 'gs://kept-7b0c3.appspot.com/'
             };
			
			firebase.initializeApp(config);
			return firebase;
}
;
//////////API Facebook

	function ShowMyName(firebase) {
		
			var messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/posts');	
			var user_id = "";
			var FBUSID = "";
			FB.api("/me",
					function (response) {
						
						fbinfo = new Array();
						fbinfo[0] = response.id;
						console.log(response);
						//console.log(response.id);
						//console.log("response.id " + fbinfo[0]);
						fbinfo[1] = response.first_name;
						fbinfo[2] = response.last_name;
						fbinfo[3] = response.email;
						user_id = fbinfo[0];
						
						/* var div = document.createElement('div');
						div.className = 'row';

						//div.innerHTML = '<div align="center">ID = '+response.id+'</div>';
						div.innerHTML += '<div align="center">first_name = '+response.name+'</div>';

						 document.getElementById('content').appendChild(div);
						*/
						document.getElementById('content_name').innerHTML =  'first_name = '+response.name;
						
							var picture_pro = "";
							var user_cover = "";
							FB.api('/me/picture?width=4000&height=4000', function (response) {
								picture_pro = response.data.url;
								messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
								messagesRef.update({user_pic:picture_pro});														
								var im = document.getElementById("profileImage").setAttribute("src", response.data.url);
								//alert(im);
							});
							
							FB.api('/me?fields=cover&width=4000&height=4000', function (response) {
							//alert("Test");
							//alert(response.cover.source);
							user_cover = response.cover.source;
							messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
						    messagesRef.update({userCover:user_cover});	
							var im = document.getElementById("profileCover").setAttribute("src", response.cover.source);
							});					
						
						
						//insert user id
						messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users');
						user_id = fbinfo[0];
						FBUSID = fbinfo[0];
						//check exists 
						var userExists = false;
						///keep User
						const promise = new Promise(function(resolve, reject){
							findSameID(user_id, resolve);
						});
						promise.then(function(return_id){
							console.log("Promise");
							console.log(user_id);
							console.log(return_id);
							
							console.log("real --> "+userExists);
							
							var picture_pro = "";
							var user_cover = "";
							FB.api('/me/picture?width=4000&height=4000', function (response) {
								picture_pro = response.data.url;
								messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
								messagesRef.update({user_pic:picture_pro});														
								var im = document.getElementById("profileImage").setAttribute("src", response.data.url);
								//alert(im);
							});
							
							FB.api('/me?fields=cover&width=4000&height=4000', function (response) {
							//alert("Test");
							//alert(response.cover.source);
							user_cover = response.cover.source;
							messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
						    messagesRef.update({userCover:user_cover});	
							var im = document.getElementById("profileCover").setAttribute("src", response.cover.source);
							});
							
							if(return_id==-1){
								console.log(user_id + " Insert ");
								messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
								messagesRef.set({userID:user_id,Name:response.name,user_pic:picture_pro,userCover:user_cover});
								console.log("---push successful!!--" + user_id + " " );
							}else if(user_id){
								console.log(user_id + " Update ");								
								messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
								messagesRef.update({userID:user_id,Name:response.name,user_pic:picture_pro,userCover:user_cover});								
								console.log("---update successful!!--" + user_id + " " );
							}
							
						});	

						
					  console.log("---BestofMonth---" + FBUSID);
					  insertPostBestofMonth(FBUSID);
					  
					});
			
			
			
				//getFriends();		
						
					

     //var im = document.getElementById("profileImage").setAttribute("src", "http://graph.facebook.com/" + response.id + "/picture?type=normal");
	}
var USERS_LOCATION = 'https://SampleChat.firebaseIO-demo.com/users'
	// Tests to see if /posts/<postId> has any data. 

function clearOldBestMonth(){
	
} 
	
function insertPostBestofMonth(user_id){
	
	FB.api('me/posts?fields=comments.limit(1).summary(true),likes.limit(1).summary(true),picture,place,updated_time,created_time,full_picture', function (response) {
						
						console.log(response);
						for ( i = 0; i < response.data.length; i++ ) {
							
							console.log("---Loop " + i + response.data[i].id);
							var created_time = response.data[i].created_time;
							var likes_count = response.data[i].likes.summary.total_count;
							
							var created_date =  getDate(created_time); // created_time.substring(0, 10);
							var created_tim =   getTime(created_time); //created_time.substring(11, 19);
							var created_time_d = getDay(created_date);
							var created_time_m  = getMonth(created_date);//new Date(created_date).getMonth();
							var created_time_y  = getYear(created_date);
							
							var current_time = new Date();
							//var current_date =  current_time.getDate(); 
							var current_time_d = current_time.getDate();
							var current_time_m  = current_time.getMonth()+1;//new Date(created_date).getMonth();
							var current_time_y  = current_time.getFullYear();
							
							//check post only in month
							if(current_time_y==created_time_y){
								//console.log("---same year");
								//check in same month
								if(current_time_m==created_time_m){
									console.log("---same month----" + current_time_m + " "+ created_time_m );
								     //keep data
									  // process this row
										
										var postid = response.data[i].id;
										var full_picture = response.data[i].full_picture;
										var description = response.data[i].description;
										var source = response.data[i].source;
										var updated_time = response.data[i].updated_time;
										var comment_total_count = response.data[i].comments.summary.total_count;
										var likes_total_count = response.data[i].likes.summary.total_count;
										var full_picture = (response.data[i].full_picture? response.data[i].full_picture : '');
										var useFlag = true;
												var messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id+'/posts/BestofMonth/'+postid);										  
												var id = (postid ? postid : '');
												var full_picture = (full_picture? full_picture : '');
												var description = (description? description : '');
												var source = (source? source : '');
												messagesRef.set({postID:id, picture:full_picture,description:description,source:source,updated_time:updated_time,comment_total_count:comment_total_count,likes_total_count:likes_total_count,full_picture:full_picture,useflag:true});
												console.log("---POST PUSH SUCCESSfUL!");

								}
								
							}			
						}

					});
	
}	


function findSameID(user_id, resolve){
  
	messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/');
						var ref = messagesRef.child("Users");
						// Attach an asynchronous callback to read the data at our posts reference
						ref.on("value",function(snapshot) {						  
						   snapshot.forEach( function (childSnapshot) {							   
								var value = childSnapshot.val();
								console.log("ID is : " + value.userID);
								if(value.userID==user_id){
									//console.log(user_id + " Exists!! ");
									resolve(value.userID);
									return;
								}
							});
							
							resolve(-1);
						   
						}, function (errorObject) {
						  console.log("The read failed: " + errorObject.code);
						});			
}
	
function checkPostByUser(postid,userid,resolve){
	messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/');
	var ch= "Users/"+userid+"/posts/BestofMonth/";
	console.log("ch");
	console.log(ch);
	var ref = messagesRef.child(ch);
	
	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value",function(snapshot) {		
	    console.log("checkPost -- " + JSON.stringify(snapshot.val()));	  
	    snapshot.forEach(function (childSnapshot) {
			var value = childSnapshot.val();
			console.log("postID is : " + value.postID + " " + postid);
			if(value.postID==postid){
				console.log(postid + " Exists!! ");
				resolve(value.postID);
				//return;
			}
		});	  		
		
		resolve(-1);
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	  return false;
	});
	
}	
	
function checkIfPostIDExists(postId) {
  var usersRef = new Firebase(USERS_LOCATION);
  usersRef.child(userId).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    userExistsCallback(userId, exists);
  });
}
	
function getDate(timestamp){
return timestamp.substring(0, 10);
}

function getTime(timestamp){
	return timestamp.substring(11, 19);
}

function getDay(date){
	return parseInt(date.substring(8, 10));
}

function getMonth(date){
	return parseInt(date.substring(5, 7));
}

function getYear(date){
	return parseInt(date.substring(0, 4));
}

	
;

//////////API Facebook
	function ShowMyName() {
			var messagesRef = new Firebase('https://kept-ef59d.firebaseio.com/');	
			 var config = {
                 apiKey: 'AIzaSyB60Hc7GEGgilbDATju6uxqWliRQUe711c',
                 authDomain: 'localhost',
                 databaseURL: 'https://kept-ef59d.firebaseio.com/',
                 storageBucket: 'gs://kept-ef59d.appspot.com/'
                };
			
			firebase.initializeApp(config);
			FB.api("/me",
					function (response) {
						
						fbinfo = new Array();
						fbinfo[0] = response.id;
						fbinfo[1] = response.first_name;
						fbinfo[2] = response.last_name;
						fbinfo[3] = response.email;
						//alert('Name is ' + response.name + " ID " + fbinfo[0] + " first_name " + response.first_name + " last_name " + response.last_name + " email " + response.email  );
						

						var div = document.createElement('div');

						div.className = 'row';

						div.innerHTML = '<div align="center">ID = '+response.id+'</div>';
						div.innerHTML += '<div align="center">first_name = '+response.name+'</div>';

						 document.getElementById('content').appendChild(div);
											
						
						FB.api('/me/picture?width=4000&height=4000', function (response) {
							var im = document.getElementById("profileImage").setAttribute("src", response.data.url);
							//alert(im);
						});
						
						FB.api('/me?fields=cover&width=4000&height=4000', function (response) {
						//alert("Test");
						//alert(response.cover.source);
						var im = document.getElementById("profileCover").setAttribute("src", response.cover.source);
						});
						
						
						
						
					});
				
				FB.api('/me/posts?fields=full_picture,description,source', function (response) {
						for ( i = 0; i < response.data.length; i++ ) {
										// process this row		
										var id = (response.data[i].id ? response.data[i].id : '');
										var full_picture = (response.data[i].full_picture ? response.data[i].full_picture : '');
										var description = (response.data[i].description ? response.data[i].description : '');
										var source = (response.data[i].source ? response.data[i].source : '');
										messagesRef.push({postID:id, picture:full_picture,description:description,source:source});
										//gs://kept-ef59d.appspot.com/
										if(full_picture&&full_picture!=''){
										var storageRef = firebase.storage().ref();
										var storageRef = firebase.storage().ref("123.jpg");
										storageRef.put(full_picture);
										}
											
										
							  }
						 
						//alert('Test2');	
						});
				
					
				//getFriends();		
						
					

     //var im = document.getElementById("profileImage").setAttribute("src", "http://graph.facebook.com/" + response.id + "/picture?type=normal");
	}
;
function removeDateBytime(firebase){ 
		
		var ref = firebase.database().ref('/database/data/-KnMPwLIbmofrflOkhg9');
		var now = Date.now();
		var cutoff = now - 2 * 60 * 60 * 1000;
		var old = ref.orderByChild('timestamp').endAt(cutoff).limitToLast(1);
		var listener = old.on('child_added', function(snapshot) {
			snapshot.ref.remove();
		});
}
;
(function() {


}).call(this);

function profile(){
				FB.api("/me",
						function (response) {
						var facebookID;
						facebookID = response.id;
						getUserInfo(facebookID);
					});
}

function getUserInfo(userid){
	messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/');
	var ch= "Users/";
	console.log(ch);
	var ref = messagesRef.child(ch);
	console.log(ref);
	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value",function(snapshot) {
	    //console.log("checkPost -- " + JSON.stringify(snapshot.val()));

		var picture_profile;
		var username;
		console.log(snapshot);
	    snapshot.forEach(function (childSnapshot) {
			console.log(childSnapshot);
			var value = childSnapshot.val();
		if(userid==value.userID){
			document.getElementById('profile_pic').src = value.user_pic;
			document.getElementById('profile_name').innerHTML = "<b>  "+ value.Name + " </b>";
		}
		});
			
			
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
}
;
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8000, function(){
    console.log('Server running on 8000...');
});

function thailandJS(){
				FB.api("/me",
						function (response) {
						var facebookID;							
						facebookID = response.id;
						getThailand(facebookID);
					});	
}

function getThailand(userid){
	messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/');
	var ch= "Users/"+userid+"/posts/Thailand/";
	console.log(ch);
	var ref = messagesRef.child(ch);
	
	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value",function(snapshot) {		
	    //console.log("checkPost -- " + JSON.stringify(snapshot.val()));
		var like_accumurate = 0;
		var picture_accumurate = 0;
		var Comments_accumurate = 0;
	    snapshot.forEach(function (childSnapshot) {
			var value = childSnapshot.val();
			//console.log("postID is : " + value.postID + " ");		
			if(value.full_picture.trim()!=''){
				var img = document.createElement('img');	
				document.getElementById('gall-container').appendChild(img);
				img.src = value.full_picture;
				picture_accumurate++;
			}
			var likeCount = value.likes_total_count? value.likes_total_count : 0;
			var commentCount = value.comment_total_count? value.comment_total_count : 0;
			like_accumurate = like_accumurate+likeCount;
			Comments_accumurate = Comments_accumurate+commentCount;
			
		});	 

			document.getElementById('countPic').innerHTML = "<b>  "+picture_accumurate+ " Pictures </b>";
			document.getElementById('countLik').innerHTML = "<b>  "+like_accumurate+ " Like </b>";
			document.getElementById('countCom').innerHTML = "<b>  "+Comments_accumurate+ " Comments </b>";
			
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});	
}
;
//////////API Facebook
	function KeptStart(resolve) {
		
			var messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/posts');	
			var user_id = "";
			var FBUSID = "";
			
			FB.api("/me",
					function (response) {
						
						fbinfo = new Array();
						fbinfo[0] = response.id;
						console.log(response);
						//console.log(response.id);
						//console.log("response.id " + fbinfo[0]);
						fbinfo[1] = response.first_name;
						fbinfo[2] = response.last_name;
						fbinfo[3] = response.email;
						user_id = fbinfo[0];
						
						/* var div = document.createElement('div');
						div.className = 'row';

						//div.innerHTML = '<div align="center">ID = '+response.id+'</div>';
						div.innerHTML += '<div align="center">first_name = '+response.name+'</div>';

						 document.getElementById('content').appendChild(div);
						*/
						//document.getElementById('content_name').innerHTML =  'first_name = '+response.name;
						
							var picture_pro = "";
							var user_cover = "";
							FB.api('/me/picture?width=4000&height=4000', function (response) {
								picture_pro = response.data.url;
								messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
								messagesRef.update({user_pic:picture_pro});														
								//var im = document.getElementById("profileImage").setAttribute("src", response.data.url);
								//alert(im);
							});
							
							FB.api('/me?fields=cover&width=4000&height=4000', function (response) {
							//alert("Test");
							//alert(response.cover.source);
							user_cover = response.cover.source;
							messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
						    messagesRef.update({userCover:user_cover});	
							//var im = document.getElementById("profileCover").setAttribute("src", response.cover.source);
							});					
						
						
						//insert user id
						messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users');
						user_id = fbinfo[0];
						FBUSID = fbinfo[0];
						//check exists 
						var userExists = false;
						///keep User
						const promise = new Promise(function(resolve, reject){
							findSameID(user_id, resolve);
						});
						promise.then(function(return_id){
							console.log("Promise");
							console.log(user_id);
							console.log(return_id);
							
							console.log("real --> "+userExists);
							
							var picture_pro = "";
							var user_cover = "";
							FB.api('/me/picture?width=4000&height=4000', function (response) {
								picture_pro = response.data.url;
								messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
								messagesRef.update({user_pic:picture_pro});														
								//var im = document.getElementById("profileImage").setAttribute("src", response.data.url);
								//alert(im);
							});
							
							FB.api('/me?fields=cover&width=4000&height=4000', function (response) {
							//alert("Test");
							//alert(response.cover.source);
							user_cover = response.cover.source;
							messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
						    messagesRef.update({userCover:user_cover});	
							//var im = document.getElementById("profileCover").setAttribute("src", response.cover.source);
							});
							
							if(return_id==-1){
								console.log(user_id + " Insert ");
								messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
								messagesRef.set({userID:user_id,Name:response.name,user_pic:picture_pro,userCover:user_cover});
								console.log("---push successful!!--" + user_id + " " );
							}else if(user_id){
								console.log(user_id + " Update ");								
								messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
								messagesRef.update({userID:user_id,Name:response.name,user_pic:picture_pro,userCover:user_cover});								
								console.log("---update successful!!--" + user_id + " " );
							}
							const promise = new Promise(function(resolve, reject){
								console.log("--- Post ---" + FBUSID);
								insertPostBestofMonth(FBUSID,resolve);
							});
							promise.then(function(return_){	
								if(resolve==1)						
								console.log("--- Post ---" + FBUSID);
							});
						});	

					});
						
			/* FB.api("/me",
					function (response) {
						
						fbinfo = new Array();
						fbinfo[0] = response.id;
						console.log(response);
						//console.log(response.id);
						//console.log("response.id " + fbinfo[0]);
						fbinfo[1] = response.first_name;
						fbinfo[2] = response.last_name;
						fbinfo[3] = response.email;
						FBUSID = fbinfo[0];
						
						///keep User
						const promise = new Promise(function(resolve, reject){
							console.log("--- Insert Picture---" + FBUSID);
							insertPostBestofMonth(FBUSID,resolve);
						});
						promise.then(function(return_){	
							if(resolve==1)						
							console.log("--- End Insert Picture---" + FBUSID);
						});	

					}); */	
	console.log("---Finnish !!---");
	resolve(1);					
				//getFriends();		
     //var im = document.getElementById("profileImage").setAttribute("src", "http://graph.facebook.com/" + response.id + "/picture?type=normal");
	}
var USERS_LOCATION = 'https://SampleChat.firebaseIO-demo.com/users'
	// Tests to see if /posts/<postId> has any data. 

function clearOldBestMonth(){
	
} 
	
function insertPostBestofMonth(user_id,resolve){
	
	FB.api('me/posts?fields=comments.limit(1).summary(true),likes.limit(1).summary(true),picture,place,updated_time,created_time,full_picture', function (response) {
						
						console.log(response);
						for ( i = 0; i < response.data.length; i++ ) {
							
							console.log("---Loop " + i + response.data[i].id);
							var created_time = response.data[i].created_time;
							var likes_count = response.data[i].likes.summary.total_count;
							
							var created_date =  getDate(created_time); // created_time.substring(0, 10);
							var created_tim =   getTime(created_time); //created_time.substring(11, 19);
							var created_time_d = getDay(created_date);
							var created_time_m  = getMonth(created_date);//new Date(created_date).getMonth();
							var created_time_y  = getYear(created_date);
							
							var current_time = new Date();
							//var current_date =  current_time.getDate(); 
							var current_time_d = current_time.getDate();
							var current_time_m  = current_time.getMonth()+1;//new Date(created_date).getMonth();
							var current_time_y  = current_time.getFullYear();
							//check post pace in thailand
							
							//case in Thailand post
							console.log("Before Place --> ");
							if(response.data[i].place){
								//console.log(response.data[i]);
								locationBaseKeep(user_id,response.data[i]);
							}
							
							//Holiday case  
							console.log("Before Holiday --> ");
							if(created_date==6||created_date==0){
								console.log(response.data[i]);
								//HolidayCase(user_id,response.data[i]);
							}
								
							//check post only in month
							if(current_time_y==created_time_y){
								//console.log("---same year");
								//check in same month
								if(current_time_m==created_time_m){
									console.log("---same month----" + current_time_m + " "+ created_time_m );
								     //keep data
									  // process this row
										
										var postid = response.data[i].id;
										var full_picture = response.data[i].full_picture;
										var description = response.data[i].description;
										var source = response.data[i].source;
										var updated_time = response.data[i].updated_time;
										var comment_total_count = response.data[i].comments.summary.total_count;
										var likes_total_count = response.data[i].likes.summary.total_count;
										var full_picture = (response.data[i].full_picture? response.data[i].full_picture : '');
										var useFlag = true;
												var messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id+'/posts/BestofMonth/'+postid);										  
												var id = (postid ? postid : '');
												var full_picture = (full_picture? full_picture : '');
												var description = (description? description : '');
												var source = (source? source : '');
												messagesRef.set({postID:id, picture:full_picture,description:description,source:source,updated_time:updated_time,comment_total_count:comment_total_count,likes_total_count:likes_total_count,full_picture:full_picture,useflag:true});
												console.log("---POST PUSH SUCCESSfUL!");

								}
								
							}			
						}
						
					});
					
	resolve(1);	
	
}	

//function HolidayCase(user_id,response){
//	
//}

function locationBaseKeep(user_id,response){

	//Start Reference ---- !!
	var country = (response.place.location.country ? response.place.location.country : '');
	
	if(country=="Thailand"||country=="ประเทศไทย"){
		console.log(response.id);
		var postid = response.id;
		var full_picture = response.full_picture;
		var description = response.description;
		var source = response.source;
		var updated_time = response.updated_time;
		var comment_total_count = response.comments.summary.total_count;
		var likes_total_count = response.likes.summary.total_count;
		var full_picture = (response.full_picture? response.full_picture : '');
		var useFlag = true;
		
		var messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id+'/posts/Thailand/'+postid);										  
		var id = (postid ? postid : '');
		var full_picture = (full_picture? full_picture : '');
		var description = (description? description : '');
		var source = (source? source : '');
		messagesRef.set({postID:id, picture:full_picture,description:description,source:source,updated_time:updated_time,comment_total_count:comment_total_count,likes_total_count:likes_total_count,full_picture:full_picture,useflag:true,place:response.place});
		console.log("---POST PUSH SUCCESSfUL!");
	}
	


	
}

function findSameID(user_id, resolve){
  
	messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/');
						var ref = messagesRef.child("Users");
						// Attach an asynchronous callback to read the data at our posts reference
						ref.on("value",function(snapshot) {						  
						   snapshot.forEach( function (childSnapshot) {							   
								var value = childSnapshot.val();
								console.log("ID is : " + value.userID);
								if(value.userID==user_id){
									//console.log(user_id + " Exists!! ");
									resolve(value.userID);
									return;
								}
							});
							
							resolve(-1);
						   
						}, function (errorObject) {
						  console.log("The read failed: " + errorObject.code);
						});			
}
	
function checkPostByUser(postid,userid,resolve){
	messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/');
	var ch= "Users/"+userid+"/posts/BestofMonth/";
	console.log("ch");
	console.log(ch);
	var ref = messagesRef.child(ch);
	
	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value",function(snapshot) {		
	    console.log("checkPost -- " + JSON.stringify(snapshot.val()));	  
	    snapshot.forEach(function (childSnapshot) {
			var value = childSnapshot.val();
			console.log("postID is : " + value.postID + " " + postid);
			if(value.postID==postid){
				console.log(postid + " Exists!! ");
				resolve(value.postID);
				//return;
			}
		});	  		
		
		resolve(-1);
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	  return false;
	});
	
}	
	
function checkIfPostIDExists(postId) {
  var usersRef = new Firebase(USERS_LOCATION);
  usersRef.child(userId).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    userExistsCallback(userId, exists);
  });
}
	
function getDate(timestamp){
return timestamp.substring(0, 10);
}

function getTime(timestamp){
	return timestamp.substring(11, 19);
}

function getDay(date){
	return parseInt(date.substring(8, 10));
}

function getMonth(date){
	return parseInt(date.substring(5, 7));
}

function getYear(date){
	return parseInt(date.substring(0, 4));
}

	
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




;

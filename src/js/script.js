/**
 * Error Checking
 *
 * @package uri-code-compliance
 */

// jshint esversion: 6
// jscs:disable requireVarDeclFirst
( function() {

	'use strict';

	var data = {
		'elClass': 'compliance-flagged-element',
		'messageClass': 'compliance-message',
		'issues': {
			'total': 0,
			'errors': 0,
			'warnings': 0,
			'suggestions': 0
		}
	};

	document.addEventListener( 'DOMContentLoaded', init, false );

	class Compliance {

		/**
		 * Iterate over the tests
		 *
		 * @param specs obj The element information
		 * @param tests obj The tests to perform
		 */
		static iterateTests( specs, tests ) {

			var i, j, test = {};

			for ( i = 0; i < tests.length; i++ ) {

				test.message = tests[i].message;
				test.type = tests[i].type;

				for ( j = 0; j < tests[i].selectors.length; j++ ) {
					test.selector = tests[i].selectors[j];
					Compliance.runTest( specs.tag, specs.class, test );
				}

			}

		}

		/**
		 * Do the test
		 *
		 * @param tag str The tag to search for
		 * @param classname str The wrapper class to pass to Compliance.display()
		 * @param test obj The test information
		 */
		static runTest( tag, classname, test ) {

			var els, i;

			els = data.main.querySelectorAll( tag + '[' + test.selector + ']' );

			for ( i = 0; i < els.length; i++ ) {

				Compliance.display( els[i], classname, test.message, test.type );

			}

		}

		/**
		 * Display the error
		 *
		 * @param el el The element to flag
		 * @param classname str The class to give the wrapper
		 * @param message str The message to display
		 * @param type str The issue type
		 */
		static display( el, classname, message, type ) {

			var wrapper, ul;

			data.issues.total++;
			data.issues[type + 's']++;

			if ( el.classList.contains( data.elClass ) ) {

				ul = el.previousSibling;
				ul.appendChild( Compliance.buildMessage( type, message ) );

			} else {

				el.classList.add( data.elClass );

				wrapper = document.createElement( 'span' );
				wrapper.className = 'compliance-wrapper ' + classname;

				ul = document.createElement( 'ul' );
				ul.className = data.messageClass + 's';

				ul.appendChild( Compliance.buildMessage( type, message ) );

				wrapper.appendChild( ul );

				el.parentNode.insertBefore( wrapper, el.nextSibling );
				wrapper.appendChild( el );

			}

		}

		/**
		 * Build the error message
		 *
		 * @param type str The issue type
		 * @param message str The message to display
		 * @return el The list element
		 */
		static buildMessage( type, message ) {

			var li;

			li = document.createElement( 'li' );
			li.className = data.messageClass + ' compliance-type-' + type;
			li.innerHTML = '<div class="compliance-icon">' + type + '</div><div class="compliance-message-content">' + message + '</div>';
			li.addEventListener(
				 'click',
				function() {
					li.classList.contains( 'open' ) ? li.classList.remove( 'open' ) : li.classList.add( 'open' );
				}
				);

			return li;

		}

	}

	function init() {

		if ( ! document.body.classList.contains( 'logged-in' ) ) {
			return;
		}

		start();

	}

	function start() {

		var x, div;

		data.main = document.getElementById( 'main' );

		doImages();
		doLinks();
		doIDs();
		doStyles();
		doDeprecatedTags();
		doDiscouragedAttributes();

		displayStatus();

	}

	function doImages() {

		var specs, tests;

		specs = {
			tag: 'img',
			class: 'flagged-image'
		};

		tests = [
			{
				selectors: ['alt=""'],
				message: 'Alt attribute required for ADA compliance',
				type: 'error'
		},
			{
				selectors: ['src^="file:"'],
				message: 'No sourcing local resources',
				type: 'error'
		}
		];

		Compliance.iterateTests( specs, tests );

	}

	function doLinks() {

		var specs, tests;

		specs = {
			tag: 'a',
			class: 'flagged-link'
		};

		tests = [
			{
				selectors: ['href="#"'],
				message: '"#" is not a valid URL',
				type: 'error'
		},
			{
				selectors: ['href^="javascript:"'],
				message: 'No JavaScript in links',
				type: 'error'
		},
			{
				selectors: [
					'href^="file:"',
					'href^="///"'
					],
				message: 'No linking to local resources',
				type: 'error'
		},
			{
				selectors: ['href$=".pdf"'],
				message: 'Consider linking to a webpage instead of a PDF',
				type: 'suggestion'
		},
			{
				selectors: ['target'],
				message: 'Opening links in a new tab or window is discouraged',
				type: 'warning'
		},
			{
				selectors: [
					'href$=".doc"',
					'href$=".docx"',
					'href$=".docm"',
					'href$=".xls"',
					'href$=".xlm"',
					'href$=".xlsx"',
					'href$=".xlsm"',
					'href$=".ppt"',
					'href$=".pps"',
					'href$=".pptx"',
					'href$=".pptm"',
					'href$=".ppsx"',
					'href$=".sldx"',
					'href$=".sldm"',
					'href$=".pub"',
					'href$=".xps"',
					'href$=".accdb"',
					'href$=".accde"'
					],
				message: 'Not all users may be able to open this file.  Provide a download link to the required software.',
				type: 'warning'
		},
			{
				selectors: [
					'href$=".pages"',
					'href$=".numbers"',
					'href$=".keynote"',
					'href$=".dmg"',
					'href$=".exe"'
					],
				message: 'Not all users may be able to open this file because the required software is not available on all operating systems.',
				type: 'warning'
		}
		];

		Compliance.iterateTests( specs, tests );

	}

	function doIDs() {

		var els, i, id, ids = {}, x;

		els = data.main.querySelectorAll( '*[id]' );

		for ( i = 0; i < els.length; i++ ) {
			id = els[i].id;
			id in ids ? ids[id]++ : ids[id] = 1;
		}

		for ( x in ids ) {

			if ( ids[x] > 1 ) {
				els = data.main.querySelectorAll( '[id="' + x + '"]' );
				for ( i = 0; i < els.length; i++ ) {
					Compliance.display( els[i], 'flagged-duplicate-id', 'No duplicate ids ("' + x + '")', 'error' );
				}
			}

		}

	}

	function doStyles() {

		var els, i;

		els = data.main.querySelectorAll( 'style' );
		for ( i = 0; i < els.length; i++ ) {
			Compliance.display( els[i], 'flagged-tag-style', 'Avoid &lt;style&gt; tags in the body', 'warning' );
		}

	}

	function doDiscouragedAttributes() {

		var specs, tests;

		specs = {
			tag: '*',
			class: 'flagged-attribute'
		};

		tests = [
			/*
			{
				selectors: ['style'],
				message: 'Avoid using inline styles',
				type: 'warning'
		},
		*/
			{
				selectors: ['onclick'],
				message: 'Avoid adding actions to elements using onclick',
				type: 'warning'
		},
			{
				selectors: ['onmouseover'],
				message: 'Avoid adding actions to elements using onmouseover',
				type: 'warning'
		}
		];

		Compliance.iterateTests( specs, tests );

	}

	function doDeprecatedTags() {

		var tags, els, i, j;

		tags = ['font', 'link'];

		for ( i = 0; i < tags.length; i++ ) {
			els = data.main.querySelectorAll( tags[i] );
			for ( j = 0; j < els.length; j++ ) {
				Compliance.display( els[j], 'flagged-tag-' + tags[i], '&lt;' + tags[i] + '&gt; tag is deprecated.', 'error' );
			}
		}

	}

	function displayStatus() {

		var div, plural, delimiter, string, button;

		if ( 0 == data.issues.errors ) {
			return;
		}

		div = document.createElement( 'div' );
		div.className = 'compliance-status';

		plural = ( 1 == data.issues.errors ) ? '' : 's';
		string = 'This page has ' + data.issues.errors + ' critical error' + plural + ' that must be addressed.';

		button = document.createElement( 'div' );
		button.className = 'compliance-open-all-messages';
		button.innerHTML = 'Open all messages';
		button.addEventListener(
			 'click',
			function() {
				if ( document.body.classList.contains( 'compliance-open-all-messages' ) ) {
					document.body.classList.remove( 'compliance-open-all-messages' );
					button.innerHTML = 'Open all messages';
				} else {
					document.body.classList.add( 'compliance-open-all-messages' );
					button.innerHTML = 'Close all messages';
				}
			}
			);

		div.innerHTML = string;
		div.appendChild( button );

		document.getElementById( 'page' ).insertBefore( div, document.getElementById( 'masthead' ) );

	}

})();

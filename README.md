# state-logger

examples/winston.js

```javascript
'use strict';

const $winston = require( 'winston' );
const $stateLogger = require( './state-logger/index' );

const level = 'debug';
const logger  = new $winston.Logger();

logger.configure( {
    transports: [
        new ( $winston.transports.Console )( {
            level: level,
            colorize: true,
            prettyPrint: true,
            timestamp: true,
            json: false
        } )
    ]
} );

const $log = $stateLogger( logger, $stateLogger.calls.winston ).get( 'example' );

$log.log( 'debug', 'foo bar' ); // [example] foo bar

componentFoo();
componentBar();

function componentFoo () {
    const $$log = $log.get( 'foo' );

    $$log.log( 'debug', 'bar' ); // [example.foo] bar

    subComponentBar();

    function subComponentBar () {
        const $$$log = $$log.get( 'bar' );

        $$$log.log( 'debug', 'bar foo' ); // [example.foo.bar] bar foo
    }
}

function componentBar () {
    const $$log = $log.get( 'bar' );

    $$log.log( 'debug', 'foo' ); // [example.bar] foo
}
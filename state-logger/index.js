'use strict';

const GET_PROP = 'get';

function getLogger ( logger, calls, values, value ) {
    if ( value ) {
        values = values.concat( value );
    }

    return new Proxy( logger, {
        get: function ( logger, prop ) {
            if ( prop === GET_PROP ) {
                return getLogger.bind( null, logger, calls, values );
            }
            const call = Object.keys( calls ).find( function ( call ) {
                return call === prop;
            } );
            if ( !call ) {
                return logger[ prop ];
            }
            return new Proxy( logger[ prop ], {
                apply: function ( func, ctx, args ) {
                    return func.call( ctx, values, args );
                }
            } );
        }
    } );
}

module.exports = function ( logger, calls ) {

    const loggerProxy = new Proxy( logger, {
        get: function ( logger, prop ) {
            const call = Object.keys( calls ).find( function ( call ) {
                return call === prop;
            } );
            if ( !call ) {
                return logger[ prop ];
            }
            return new Proxy( logger[ prop ], {
                apply: calls[ call ]
            } );
        }
    } );

    return getLogger( loggerProxy, calls, [] );
};
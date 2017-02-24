'use strict';

module.exports = {
    log: function ( func, ctx, args ) {
        const values = args[ 0 ];
        args = args[ 1 ];

        let msg = args[ 1 ];
        msg = `[${ values.join( '.' ) }] ${ msg }`;

        args = [ args[ 0 ], msg ].concat( args.slice( 2 ) );

        return func.apply( ctx, args );
    }
};
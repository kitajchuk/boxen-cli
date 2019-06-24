const lager = require( "properjs-lager" );
const child_process = require( "child_process" );
const boxenInstall = require( "./boxen.install" );
const boxen = require( "boxen" );
const fs = require( "fs" );
const path = require( "path" );
const json = JSON.parse( String( fs.readFileSync( path.join( __dirname, "package.json" ) ) ) );



module.exports = ( cli, dir ) => {
    if ( dir && !fs.existsSync( dir ) ) {
        child_process.execSync( `mkdir ${dir}` );
    }

    boxenInstall( cli, dir ).then(() => {
        lager.cache( "Boxen install complete!" );

        const lines = [
            `Boxen Version ${json.version}`,
            `A Kit of Parts Squarespace developer SDK.`,
            ``,
            `You should now install the node_modules:`,
            `   npm i`,
            ``,
            `Then you can use the SDKs npm commands:`,
            `   npm start`,
            `   npm run deploy`,
            `   etc...`
        ];

        console.log(
            boxen( lines.join( `\n` ), {
                padding: 1,
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 1,
                    left: 0
                },
                borderStyle: "double",
                borderColor: "#2AFFEA"
            })
        );
    });
};

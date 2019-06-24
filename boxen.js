#!/usr/bin/env node



const cli = require( "cli" );
const fs = require( "fs" );
const path = require( "path" );
const json = JSON.parse( String( fs.readFileSync( path.join( __dirname, "package.json" ) ) ) );
const lager = require( "properjs-lager" );
const boxen = require( "boxen" );
const readline = require( "readline" );



cli.setApp( "boxen", json.version );
cli.disable( "help" );
cli.disable( "version" );



cli.parse( {}, ["init", "help", "version"] );



if ( cli.command === "help" ) {
    const lines = [
        `Boxen Version ${json.version}`,
        `A Kit of Parts Squarespace developer SDK.`,
        ``,
        `Usage:`,
        `   boxen init`,
        `   boxen init my-project`,
        ``,
        `Once initialized, use the SDKs npm commands:`,
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
    process.exit();

} if ( cli.command === "version" ) {
    const lines = [
        `Boxen Version ${json.version}`,
        `A Kit of Parts Squarespace developer SDK.`
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
    process.exit();

} else if ( cli.command === "init" ) {
    if ( cli.args.length ) {
        const dir = path.join( process.cwd(), cli.args[ 0 ] );

        if ( fs.existsSync( dir ) ) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            const lines = [
                `Directory already exists:`,
                `${dir}`,
                ``,
                `Initialize boxen in this directory?`,
                ``,
                `   Type (y)es or (n)o`
            ];
            const question = boxen( lines.join( `\n` ), {
                padding: 1,
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 1,
                    left: 0
                },
                borderStyle: "double",
                borderColor: "#2AFFEA"
            });

            rl.question( question, ( answer ) => {
                answer = answer.toLowerCase();

                if ( answer === "y" || answer === "yes" ) {
                    rl.close();
                    require( "./boxen.init" )( cli, dir );

                } else if ( answer === "n" || answer === "no" ) {
                    rl.close();
                    process.exit();
                }
            });

        } else {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            const lines = [
                `Directory will be created:`,
                `${dir}`,
                ``,
                `Create directory and initialize boxen there?`,
                ``,
                `   Type (y)es or (n)o`
            ];
            const question = boxen( lines.join( `\n` ), {
                padding: 1,
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 1,
                    left: 0
                },
                borderStyle: "double",
                borderColor: "#2AFFEA"
            });

            rl.question( question, ( answer ) => {
                answer = answer.toLowerCase();

                if ( answer === "y" || answer === "yes" ) {
                    rl.close();
                    require( "./boxen.init" )( cli, dir );

                } else if ( answer === "n" || answer === "no" ) {
                    rl.close();
                    process.exit();
                }
            });
        }

    } else {
        require( "./boxen.init" )( cli );
    }
}

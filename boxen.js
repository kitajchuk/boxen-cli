#!/usr/bin/env node



const cli = require( "cli" );
const fs = require( "fs" );
const path = require( "path" );
const json = JSON.parse( String( fs.readFileSync( path.join( __dirname, "package.json" ) ) ) );
const lager = require( "properjs-lager" );
const boxen = require( "boxen" );
const boxenInit = require( "./boxen.init" );
const boxenRegistry = require( "./boxen.registry" );
const boxenRegistryInstall = require( "./boxen.registry.install" );
const readline = require( "readline" );
const displayConfig = {
    padding: 1,
    margin: {
        top: 0,
        right: 0,
        bottom: 1,
        left: 0
    },
    borderStyle: "double",
    borderColor: "#2AFFEA"
};
const helpText = [
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
const versionText = [
    `Boxen Version ${json.version}`,
    `A Kit of Parts Squarespace developer SDK.`
];



cli.setApp( "boxen", json.version );
cli.disable( "help" );
cli.disable( "version" );



cli.parse( {}, ["init", "help", "version", "registry", "install"] );



if ( cli.command === "help" ) {
    console.log( boxen( helpText.join( `\n` ), displayConfig ) );
    process.exit();

} else if ( cli.command === "version" ) {
    console.log( boxen( versionText.join( `\n` ), displayConfig ) );
    process.exit();

} else if ( cli.command === "registry" ) {
    boxenRegistry( cli );

} else if ( cli.command === "install" ) {
    boxenRegistryInstall( cli );

} else if ( cli.command === "init" ) {
    boxenInit( cli );
}

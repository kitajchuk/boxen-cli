const fs = require( "fs" );
const path = require( "path" );
const lager = require( "properjs-lager" );
const request = require( "request" );
const progress = require( "request-progress" );
const child_process = require( "child_process" );
const boxen = require( "boxen" );
const headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36"
};
const registryUrl = `https://kitajchuk.com/boxen/registry`;
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



module.exports = ( cli ) => {
    lager.cache( `Pinging boxen registry...` );

    request({
        url: registryUrl,
        qs: {
            format: "json"
        },
        json: true,
        headers

    }, ( error, response, json ) => {
        const registryText = [
            `Welcome to the Boxen Registry!`,
            `Installable modules for the Kit of Parts Squarespace developer SDK.`,
            ``
        ];

        json.items.forEach(( item ) => {
            registryText.push( `${item.title}` );
            registryText.push( `    boxen install ${item.urlId}` );
            registryText.push( `    ${item.customContent.githubUrl}` );
            registryText.push( `    ${item.tags.join( " " )}` );
            registryText.push( `` );
        });

        console.log( boxen( registryText.join( `\n` ), displayConfig ) );
        process.exit();
    });
};

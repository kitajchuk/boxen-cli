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
const downloadDelay = 500;
const doInstall = ( cli, item ) => {
    return new Promise(( resolve, reject ) => {
        const releaseTag = "master";
        const zipFile = path.join( process.cwd(), `${cli.args[ 0 ]}.zip` );
        const outPath = path.join( process.cwd(), `${cli.args[ 0 ]}-${releaseTag}` );
        const releaseUrl = `${item.customContent.githubUrl}/archive/${releaseTag}.zip`;

        lager.cache( `Unpacking boxen registry module ${cli.args[ 0 ]}...` );

        progress( request.get( releaseUrl, { headers } ) )
            .on( "progress", ( state ) => {
                // cli.progress( state.percent );
            })
            .on( "error", ( error ) => {
                reject( error );
            })
            .on( "end", () => {
                setTimeout(() => {
                    const unzip = child_process.spawn( "unzip", [zipFile] );

                    unzip.on( "close", () => {
                        lager.cache( `Unpacked boxen registry module ${cli.args[ 0 ]}!` );
                        resolve();
                    });

                    unzip.stdout.on( "data", ( data ) => {
                        // console.log( data.toString() );
                    });

                    unzip.stderr.on( "data", ( data ) => {
                        // console.log( data.toString() );
                    });

                }, downloadDelay );
            })
            .pipe( fs.createWriteStream( zipFile ) );
    });
};



module.exports = ( cli ) => {
    if ( cli.args.length ) {
        lager.cache( `Downloading boxen registry module ${cli.args[ 0 ]}...` );

        request({
            url: `${registryUrl}/${cli.args[ 0 ]}`,
            qs: {
                format: "json"
            },
            json: true,
            headers

        }, ( error, response, json ) => {
            if ( json.error ) {
                console.log( boxen( `Error attempting to download boxen registry module ${cli.args[ 0 ]}!`, displayConfig ) );
                process.exit();

            } else {
                doInstall( cli, json.item ).then(() => {
                    console.log( "Downloaded" );
                    process.exit();

                }).catch(( error ) => {
                    console.log( error );
                    process.exit();
                });
            }
        });

    } else {
        console.log( boxen( "You'll need to specify a registry module to install.", displayConfig ) );
        process.exit();
    }
};

const rippleLibrary = require('ripple-lib').RippleAPI;
const api = new rippleLibrary();
const program = require('commander');
const fs = require('fs');

function list(val) {
    return val.split(',');
}

program
    .usage("[options]")
    .version("1.0.0")
    .option("-l, --list <keywords to check with ',' as delimiter>", "List of comma-delimited keywords to check against", list)
    .option("-o, --output <file>", "Output file for results")
    .parse(process.argv)

// check for mandatory field (keywords)
if (program.list === undefined) {
    console.log("Please enter one or more keywords to perform the search.");
    console.log("Eg. 'node generate.js -l johndoe,xrp,tothemoon'");
    console.log("");
    process.exit(0)
}

var art = `
###  ## #####   #####    ###   ##                #   #               #        ##     ##
 ##  #   #   #   #   #    ##   #                     #               ##        #      #
  # ##   #   #   #   #     #   #                     #              ###        #      #
   ##    #  #    #   #     #  ##  ####  ######  ##  ### ###  ##     #  #    ####   ####  ####  ###  #### ####
  ###    ####    ####       # #      #   #   #   #   #   ##  #     #####   #   #  #   #   # # #   # #  # #  #
 ## #    #  #    #          # #   ####   #   #   #   #    # ##     #   ##  #   #  #   #   #   #####  ##   ##
 #   #   #  ##   #          ##    #  #   #   #   #   #    # #     ##    #  #   #  #   #   #   #     #  # #  #
##  ### ###  ## ###          #    ##### ### ### ###  ##    #      ##   ###  #####  ##### ###   #### #### ####
                                                           #
                                                         ##
`;
console.log(art);

console.log("Searching XRP addresses starting with: ");
program.list.forEach(function(k) {
    console.log("   * ", k);
});
var regex = "^r(" + program.list.join('|') + ")";

var outputFile = "output.txt";	// default
console.log();
console.log("Output file: ");
if (program.output === undefined) {
    console.log("   * No output file specified. Saving results in default 'output.txt'");
} else {
    outputFile = program.output;
    console.log("   * Saving results in '" + outputFile + "'");
}
console.log();
console.log("====================================");

console.log("Generating..... press Control C to quit");

var re = new RegExp(regex, "i");
for (let i = 0;;i++) {
	let n = 0;
    account = api.generateAddress();
    if (re.exec(account.address)) {
        fs.appendFileSync(outputFile, "Address: [" + account.address + "] with Secret: [" + account.secret + "]\n");
        console.log("Found a match: " + account.address + " at the " + i + "th tries".);
    } else {
		if (i % 10000 === 0) {
			console.log("Processed: " + i + ". Found " + n + " match(es) so far");
		}
	}
}

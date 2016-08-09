var args = process.argv.slice(2);

args.forEach(function (arg) {
  switch (arg) {
    case '-h':
    case '--help':
      printHelp();
      break;
  }
});

function printHelp () {
  console.log(' usage:');
  console.log(' $ AwesomeProgram <options> <file-to-awesomeify>');
  console.log(' example:');
  console.log(' $ AwesomeProgram --make-awesome not-yet.awesome');
  process.exit(0);
}

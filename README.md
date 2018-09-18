# XRP Vanity Address

Search for XRP address with your preferred keywords. 

This script uses the Ripple Library "ripple-lib" by Ripple to generate XRP addresses, and then matches them against your preferred keywords. The results will be saved in a textfile.

## Why this script over 'X'?

This script saves the result in a textfile. In that way, you will be able to run parallel requests in the background (using nohup) instead of freezing your SSH terminal.

## Getting Started

### Installing

Install dependencies

```
npm install
```

## Running

```
node generate.js -o output.txt -l johndoe,xrp,tothemoon
```

To run it in the background:
```
nohup node generate.js -o output.txt -l johndoe,xrp,tothemoon
```

To stop running in background:
```
ps aux | grep node
kill -9 <pid>
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* The original [xrp-vanity-generator](https://github.com/WietseWind/xrp-vanity-generator) by [@WietseWind](https://twitter.com/WietseWind)

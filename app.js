#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv))
    .argv;

const locality = `en-US`;

// The reason we define this option is for toLocaleString will return numeric strings with commas.
const numericStringOptions = {
    useGrouping: false
}
// Find Next Palindrome can be run as follows:
// * Find the next palindrome starting with (x)
//      node app.js --start=x
//
//      returns: The next palindrome found is 11
//
// * Find the last palidrome starting with (x) and ending with (y)
//      node app.js --start=x --end=y
//
//      returns: the
//
// * Find the last palindrome before ending number with (x){
//      node app.js --end=x
//
//      returns: 

function findNextPalindromeStartingWith(num)
{
    let nextNum = num;

    let nextNumLength = nextNum.toLocaleString(locality, numericStringOptions)
        .length;
    console.log(`nextNum = ${nextNum}`);
    console.log(`nextNumLength = ${nextNumLength}`);

    while (nextNumLength < 2) {
        nextNum++;
        nextNumLength = nextNum.toLocaleString(locality, numericStringOptions)
            .length;
    }

    while (nextNum != reverseNum(nextNum)) {
        nextNum++;
    }

    return nextNum;
}

function findFirstPalindromeBefore(endNum) {

    let nextNum = --endNum;

    let nextNumLength = nextNum.toLocaleString('en-US', {useGrouping: false})
        .length;

    console.log(`nextNum = ${nextNum}`);
    console.log(`nextNume as string is: '${nextNum.toLocaleString(locality, numericStringOptions) }'`);
    console.log(`nextNumLength = ${nextNumLength}`);


    while ( nextNum != reverseNum(nextNum) ) {
        nextNum--;
    }

    if ( nextNum < 10 ) {
        return -1;
    }

    return nextNum;

}


function reverseNum(num)
{
    let numString = num.toLocaleString(locality, numericStringOptions)
        .split("");

    return numString.reverse()
        .join("");
}



if ( argv.start > 0 && argv.end == null ) {
    let firstPalindrome = findNextPalindromeStartingWith(argv.start);
    console.log(`The next palindrome found is ${firstPalindrome}`);
}
else if ( argv.start > 0 && argv.end != null ) {

    let lastPalindrome = 0;
    let lastNum = argv.start;
    let end = argv.end;

    let firstPalindrome = findNextPalindromeStartingWith(lastNum);

    if ( firstPalindrome > end ) {
        console.log(`There were no known palindromes found between ${ argv.start } and ${ argv.end }`);
    } else {
        while (lastNum < end) {
            let nextPalindrome = findNextPalindromeStartingWith(lastNum);

            if (nextPalindrome < end) {
                lastPalindrome = nextPalindrome;
            }
            lastNum++;
            console.log(lastPalindrome);
        }

        console.log(`The last palindrome found between ${argv.start} and ${argv.end} is: ${lastPalindrome}`);
    }
}
else if (argv.start == null && argv.end != null) {
    let end = argv.end;

    let finalPalindrome = findFirstPalindromeBefore(end);

    console.log(`The final palindrome found before ${argv.end} is: ${finalPalindrome }`);
}
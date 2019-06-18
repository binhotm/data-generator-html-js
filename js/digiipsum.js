"use strict";

/* ---------------
DIGIAE IPSUM
--------------- */
var mussumMainQuote = "Classis de Java sem teste unitarios noops noops ";
var mussumQuotes = ["Java, Bigdata, Mapreduce, Hadoop. ", "Java 8, tem que migrar o cluster", "Cluster HDP Ipsum dollor java 9 ta vindo ai", "Cluster Ipsum hehe hahah", "Mapreduce is a esblabers of the stribers", "Lorem orem lorem orem orem lourem XD", "Map reduce error", "Execptio of nullpointer in the end of file", "Where is the nullpointer", "Java fatal error", "faltas", "Mapreduce job: quee name : Lorem_ipsum", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", "This class stores text using standard UTF8 encoding. It provides methods to serialize, deserialize, and compare texts at byte level. The type of length is integer and is serialized using zero-compressed format.", "Converts the provided byte array to a String using the UTF-8 encoding.", "Read a Text object whose length is already known.", "For the given string, returns the number of UTF-8 bytes required to encode the string", "Returns the Unicode Scalar Value (32-bit integer value) for the character at position.", "org.apache.hadoop.conf.Configuration", "org.apache.hadoop.io.Writable", "org.apache.hadoop.fs.Path", "java.io.DataOutputStream", "org.apache.hadoop.io.LongWritable", "Bibilia do Wesley", "How is the Key", "Where is the KetValue"];

var digiIpsum = function digiIpsum(options) {
  var defaults = {
    pNum: 1,
    quotes: mussumQuotes,
    mainQuote: mussumMainQuote,
    maxOfp: 9999,
    resultType: 'text',
    tagBefore: '',
    tagAfter: ''
  };

  var extend = function extend(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i]) continue;
      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
      }
    }
    return out;
  };

  var $o = extend({}, defaults, options);
  var pNum = $o.pNum,
      quotes = $o.quotes,
      mainQuote = $o.mainQuote,
      maxOfp = $o.maxOfp,
      resultType = $o.resultType,
      tagBefore = $o.tagBefore,
      tagAfter = $o.tagAfter;

  /* Function to sort a number
  ----------------- > */
  var n,
      min = 1,
      max;
  var getRandomNumber = function getRandomNumber(min, max) {
    n = Math.random() * (max - min) + min;
    return Math.round(n) - 1; // 1 less of the total arrays to adjust with the array index
  };

  /*  create
  ----------------- > */
  var quotesLength = quotes.length,
      limit = Math.floor(quotesLength / 4),
      createParagraphs = function createParagraphs(pNum, quotes) {

    var paragraphs = [];

    function generateOriginalParagraphs() {
      // It makes 10 paragraphs
      // console.log(quotes);
      var tempQuotes = quotes.slice();
      // console.log(tempQuotes);
      for (var y = 0; y < limit; y++) {
        // 1 paragraph == 4 quotes
        var tempQuotesLength = tempQuotes.length;
        for (var i = 0, tempParagraph = ""; i < 4; i++) {
          // sort function
          var randomResult = getRandomNumber(min, tempQuotes.length);

          var q = tempQuotes[randomResult];
          tempParagraph += q + " "; // append the quote on a temp string
          tempQuotes.splice(randomResult, 1); //exlude the used value for the array
          max--; //decrease max getRandomNumber

          if (i == 3) {
            // Push the the tem string to the paragraphs array
            paragraphs.push(tempParagraph);
            break;
          }
        }
      }
    }

    // using the "limit" to define how many times we need to generate new ones.
    if (pNum <= limit) {
      // console.log('-- junt once');
      generateOriginalParagraphs(quotes, limit);
    } else {
      var v = Math.ceil(pNum / limit);
      // console.log('-- run ' + v + ' times' );
      for (var i = 0; i < v; i++) {
        generateOriginalParagraphs(quotes, limit);
      }
    }
    return paragraphs;
  };

  /*  show
  ----------------- > */
  if (pNum <= maxOfp) {
    if (quotesLength >= 4) {
      var result = "";
      var paragraphs = createParagraphs(pNum, quotes);

      // eliminate the excedents paragraphs to return the right number
      for (var i = 0; i < pNum; i++) {

        if (resultType === 'html') {
          // tags on the paragraph
          result += tagBefore;
          if (i === 0) {
            result += mainQuote;
          }
          result += paragraphs[i] + tagAfter;
        } else if (resultType === 'text') {
          // only a break of line
          if (i === 0) {
            result += mainQuote;
          }
          result += paragraphs[i] + '\n\n';
        } else {
          console.error('Error.');
        }
      }

      return result;
    } else {
      var err = "Error! You need at least 4 quotes on the pointed array.";
      console.error(err);
    }
  } else {
    console.error('I guess this is too much!');
  }
};

window.digiIpsum = digiIpsum;
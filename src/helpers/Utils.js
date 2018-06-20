'use strict';

const moment = require('moment-timezone');

module.exports = {
  hasProperty(objects, props) {
    let has = true;
    for (let i = 0, l = props.length; i < l; i++) {
      if (!objects.hasOwnProperty(props[i])) {
        has = false;
        break;
      }
    }

    return has;
  },

  /**
   * Reverse of hasProperty, nice to craft message of what's missing.
   * @param  object obj   Checked objects.
   * @param  array props  Array of checked object key.
   * @return string       Missing object key name.
   */
  missingProperty(obj, props) {
    for (let i = 0, l = props.length; i < l; i++) {
      if (!obj.hasOwnProperty(props[i])) return props[i];
    }

    return false;
  },

  /*
   function test() {
   var a = [
   {
   a: 'One',
   c: 1,
   },
   {
   a: 'Two',
   c: 4,
   },
   {
   a: 'Three',
   c: 3,
   }
   ]

   console.log(a);
   a.sort(utils.sort_by('c', true));
   console.log(a);
   }
   */

  // http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects/979325
  // http://jsfiddle.net/gfullam/sq9U7/
  sortBy(field, reverse, primer) {
    const key = primer ? x => primer(x[field]) : x => x[field];

    reverse = [-1, 1][+!!reverse];

    return (a, b) => {
      a = key(a);
      b = key(b);

      return reverse * ((a > b) - (b > a));
    };
  },

  zeroPad(num, numZeros) {
    const n = Math.abs(num);
    const zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
    let zeroString = Math.pow(10, zeros)
      .toString()
      .substr(1);
    if (num < 0) {
      zeroString = `-${zeroString}`;
    }

    return zeroString + n;
  },

  randomString(bits) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ab';
    let rand;
    let i;
    let randomizedString = '';

    // in v8, Math.random() yields 32 pseudo-random bits (in spidermonkey
    // it gives 53)
    while (bits > 0) {
      // 32-bit integer
      rand = Math.floor(Math.random() * 0x100000000);

      // base 64 means 6 bits per character, so we use the top 30 bits from rand
      // to give 30/6=5 characters.
      for (i = 26; i > 0 && bits > 0; i -= 6, bits -= 6) {
        randomizedString += chars[0x3f & (rand >>> i)];
      }
    }

    return randomizedString;
  },

  uid(len) {
    const buf = [];
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charlen = chars.length;

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 0; i < len; ++i) {
      buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
  },

  activationCode(len) {
    const buf = [];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charlen = chars.length;

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 0; i < len; ++i) {
      buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
  },

  generateNumber(len) {
    const buf = [];
    const chars = '0123456789';
    const charlen = chars.length;

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 0; i < len; ++i) {
      buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
  },

  getRandomNumbers(length) {
    const arr = [];
    while (arr.length < length) {
      const randomnumber = Math.ceil(Math.random() * length - 1);
      let found = false;
      for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i] == randomnumber) {
          found = true;
          break;
        }
      }

      if (!found) arr[arr.length] = randomnumber;
    }

    return arr;
  },

  checkNotNullValue(value) {
    return typeof value !== 'undefined' && value !== null && value !== '';
  },

  stringifyWithOrder(json, order) {
    const keys = Object.keys(json);
    const orderKeys = [];
    for (let i = 0, l = order.length; i < l; i++) {
      orderKeys.push(keys[order[i]]);
    }

    return JSON.stringify(json, orderKeys);
  },

  checkValidateEmail(value) {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  },

  getTimeNow() {
    return moment()
      .tz('Asia/Jakarta')
      .format('YYYY-MM-DDTHH:mm:ss');
  },

  getTimeKontrak() {
    return moment()
      .tz('Asia/Jakarta')
      .format('DDMMYYYYms');
  },

  getTimeSimple() {
    return moment()
      .tz('Asia/Jakarta')
      .format('DD-MM-YYYY');
  }
};

export function removeExtraSign(str: string, sign: string) {

    while (str.charAt(0) === sign) {
      str = str.slice(1);
    }


    while (str.charAt(str.length - 1) === sign) {
      str = str.slice(0, -1);
    }

    return str;
  }

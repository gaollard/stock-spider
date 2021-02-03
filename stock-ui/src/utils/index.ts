import * as generator from "generate-password";

export const generatorPwd = () => {
  const password = generator.generate({
    length: 10,
    uppercase: true,
    numbers: true,
    symbols: true,
    strict: true,
    exclude: '#%&*"></\\()~,.{}[]+=-^`;:?%$'
  });
  return password;
};

export const getDevice = (ua: string) => {
  console.log(ua);
  let stack = "";
  const list: string[] = [];

  for (let index = 0; index < ua.length; ) {
    const char = ua.charAt(index);
    if (char == " ") {
      if (stack.includes("(")) {
        if (stack[stack.length - 1] === ")") {
          list.push(stack);
          stack = "";
          index++;
        } else {
          index++;
          stack += char;
        }
      } else {
        list.push(stack);
        stack = "";
        index++;
      }
    } else {
      index++;
      stack += char;
    }
  }

  if (stack.length) {
    list.push(stack);
  }

  // ["Mozilla/5.0", "(iPhone; CPU iPhone OS 13_2_3 like Mac OS X)", "AppleWebKit/605.1.15", "(KHTML, like Gecko)", "Version/13.0.3", "Mobile/15E148"]

  return {
    os: list[1].replace("(", "").replace(")", ""),
    jsEngine: list[2],
    brower: list[list.length - 1]
  };
};

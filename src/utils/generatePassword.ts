const numbers = '123456789' as const;
const letters = 'abcdefghijklmnopqrstuvwxyz' as const;
const specialCharacters = '#@$^*;-_ç"\'`\\/<>&~{}()[]|%ù²' as const;

const isDefined = (value: unknown) => value !== undefined;

const random = (min: number, max: number) => {
  const $min = Math.ceil(min);
  const $max = Math.floor(max);
  return Math.floor(Math.random() * ($max - $min + 1) + $min);
};

function deepMergeOptions(source: Options, target: Options) {
  const options: Partial<Options> = {};

  for (const [key, value] of Object.entries(source)) {
    const targetValue = target[key];
    if (targetValue === false) continue;

    const isTargetValueDefined = isDefined(targetValue);
    const isTargetString = typeof targetValue === 'string';

    if (isTargetValueDefined && targetValue === true) {
      options[key] = value;
    } else if (isTargetValueDefined && isTargetString) {
      options[key] = targetValue.split('');
    } else if (isTargetValueDefined) {
      options[key] = targetValue;
    } else if (typeof source[key] === 'string') {
      options[key] = source[key].split('');
    } else {
      options[key] = source[key];
    }
  }

  return options;
}

export const defaultOptions: Options = {
  numbers,
  letters,
  specialCharacters,

  uppercase: true,
  length: 20,
} as const;

export function generatePassword(options: Options = defaultOptions) {
  const finalOptions = deepMergeOptions(defaultOptions, options);

  console.log(finalOptions);

  if (!finalOptions.length) {
    throw new Error(`We can't generate a password without the length property`);
  }

  const types = ['numbers', 'letters', 'specialCharacters'].filter(
    (value) => !!finalOptions[value],
  );
  let password = '';

  for (let i = 0; i < finalOptions.length; ++i) {
    const type = finalOptions[types[random(0, types.length - 1)]];
    const asUppercase = finalOptions.uppercase && Boolean(random(0, 1));

    const letter = type[random(0, type.length - 1)];

    password += asUppercase ? String(letter).toUpperCase() : letter;
  }

  return password;
}

export interface Options {
  numbers?: boolean | string;
  letters?: boolean | string;
  specialCharacters?: boolean | string;

  uppercase?: boolean;
  length?: number;
}

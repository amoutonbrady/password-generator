import {
  Component,
  createComputed,
  createSignal,
  createState,
  Show,
} from 'solid-js';
import {
  generatePassword,
  defaultOptions,
  Options,
} from './utils/generatePassword';

export const App: Component = () => {
  const [state, setState] = createState<Options>({
    ...defaultOptions,
    specialCharacters: false,
  });
  const [password, setPassword] = createSignal('');
  const [showCopied, setShowCopied] = createSignal(false);

  const generate = () => setPassword(generatePassword(state));
  createComputed(generate);

  return (
    <>
      <main class="flex items-center justify-center relative">
        <button
          onClick={() =>
            navigator.clipboard.writeText(password()).then(() => {
              setShowCopied(true);
              setTimeout(setShowCopied, 2000, false);
            })
          }
          type="button"
          class="text-blue-900 text-6xl break-all focus:outline-none"
        >
          {password()}
        </button>

        <Show when={showCopied()}>
          <span class="text-green-900 absolute bottom-10 left-10">
            Password copied successfully! ✅
          </span>
        </Show>
      </main>

      <aside class="h-full w-full p-8 flex text-blue-50">
        <form
          class="rounded-3xl bg-blue-900 flex-1 p-12 flex flex-col space-y-10"
          onSubmit={(e) => {
            e.preventDefault();
            generate();
          }}
        >
          <h1 class="text-3xl text-center font-semibold">Password Generator</h1>

          <fieldset class="bg-blue-600 bg-opacity-40 rounded-3xl px-8 py-7 flex flex-col space-y-2">
            <h2 class="uppercase leading-tight tracking-wide font-semibold">
              Options
            </h2>

            <div class="flex items-center space-x-2">
              <label class="cursor-pointer space-x-2 flex items-center">
                <input
                  type="checkbox"
                  class="rounded"
                  checked={state.uppercase}
                  onChange={(e) => setState('uppercase', e.target.checked)}
                />
                <span>Uppercase</span>
              </label>

              <span>|</span>

              <label class="cursor-pointer space-x-2 flex items-center">
                <span>Length:</span>
                <input
                  type="number"
                  min="1"
                  class="rounded-lg text-gray-900 w-20"
                  value={state.length}
                  onInput={(e) =>
                    setState('length', parseInt(e.target.value, 10))
                  }
                />
              </label>
            </div>
          </fieldset>

          <fieldset class="bg-blue-600 bg-opacity-40 rounded-3xl px-8 py-7 flex flex-col space-y-4">
            <h2 class="uppercase leading-tight tracking-wide font-semibold">
              Extra options
            </h2>

            <label class="cursor-pointer space-x-2 flex items-center">
              <input
                type="checkbox"
                class="rounded"
                checked={!!state.letters}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setState('letters', checked ? defaultOptions.letters : false);
                }}
              />
              <span class="w-40">Letters:</span>
              <input
                disabled={!state.letters}
                value={
                  !state.letters
                    ? 'No letters'
                    : typeof state.letters === 'boolean'
                    ? String(defaultOptions.letters)
                    : state.letters
                }
                onInput={(e) => setState('letters', e.target.value)}
                type="text"
                pattern="[a-z]{0,26}"
                class="rounded-lg text-gray-900 flex-1"
                classList={{
                  'bg-gray-200 opacity-50 cursor-not-allowed': !state.letters,
                }}
              />
            </label>

            <label class="mr-auto cursor-pointer space-x-2 flex items-center">
              <input
                type="checkbox"
                class="rounded"
                checked={!!state.numbers}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setState('numbers', checked ? defaultOptions.numbers : false);
                }}
              />
              <span class="w-40">Numbers:</span>
              <input
                disabled={!state.numbers}
                value={
                  !state.numbers
                    ? 'No numbers'
                    : typeof state.numbers === 'boolean'
                    ? String(defaultOptions.numbers)
                    : state.numbers
                }
                onInput={(e) => setState('numbers', e.target.value)}
                type="text"
                pattern="[0-9]+"
                class="rounded-lg text-gray-900 flex-1"
                classList={{
                  'bg-gray-200 opacity-50 cursor-not-allowed': !state.numbers,
                }}
              />
            </label>

            <label class="mr-auto cursor-pointer space-x-2 flex items-center">
              <input
                type="checkbox"
                class="rounded"
                checked={!!state.specialCharacters}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setState(
                    'specialCharacters',
                    checked ? defaultOptions.specialCharacters : false,
                  );
                }}
              />
              <span class="w-40">Special characters:</span>
              <input
                disabled={!state.specialCharacters}
                value={
                  !state.specialCharacters
                    ? 'No special characters'
                    : typeof state.specialCharacters === 'boolean'
                    ? String(defaultOptions.specialCharacters)
                    : state.specialCharacters
                }
                type="text"
                class="rounded-lg text-gray-900 flex-1"
                classList={{
                  'bg-gray-200 opacity-50 cursor-not-allowed': !state.specialCharacters,
                }}
              />
            </label>
          </fieldset>

          <button
            type="submit"
            class="w-full py-4 uppercase tracking-wide rounded-3xl bg-blue-300 text-blue-900 font-semibold hover:bg-opacity-95 focus:outline-none"
          >
            generate
          </button>
        </form>
      </aside>
    </>
  );
};

import { assert, expect, test } from 'vitest';
import { health} from "../src/grax-search"
// Edit an assertion and save to see HMR in action

test('api token', () => {
    expect(import.meta.env.GRAX_URL).toContain('secure.grax.io');
    expect(import.meta.env.GRAX_TOKEN).toContain('grax_token_');
})

test('health', async () => {
    const res = await health()
    expect(res.data.status).eq('ok')
});

test('JSON', () => {
	const input = {
		foo: 'hello',
		bar: 'world',
	};

	const output = JSON.stringify(input);

	expect(output).eq('{"foo":"hello","bar":"world"}');
	assert.deepEqual(JSON.parse(output), input, 'matches original');
});
import { assert, expect, test } from 'vitest';
import { health, search } from "../src/grax-search"
// Edit an assertion and save to see HMR in action

test('api token', () => {
    expect(import.meta.env.GRAX_URL).toContain('secure.grax.io');
    expect(import.meta.env.GRAX_TOKEN).toContain('grax_token_');
})

test('health', async () => {
    const res = await health()
    expect(res.data.status).eq('ok')
});

test('search', async () => {
    const records = await search('Opportunity')
    expect(records.length).eq(79)
});

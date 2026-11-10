import { expect, test } from 'bun:test';
import {
  createAdvisorAnswerFilter,
  stripAdvisorToolText,
} from '../src/llm/advisor-answer-filter';

const command = JSON.stringify({
  type: 'function',
  name: 'flag_caution',
  parameters: { message: 'Verify the local requirements' },
});

test('holds fragmented commands until they can be removed', () => {
  let visible = '';
  const filter = createAdvisorAnswerFilter((text) => (visible += text));
  filter.push('Hello! ');
  expect(visible).toBe('Hello! ');
  for (const char of command) {
    filter.push(char);
    expect(visible).toBe('Hello! ');
  }
  filter.push('How can I help?');
  filter.finish();
  expect(visible).toBe('Hello! How can I help?');
});

test('removes fenced commands and arrays of commands', () => {
  expect(stripAdvisorToolText('```json\n' + command + '\n```')).toBe('');
  expect(stripAdvisorToolText('```' + command + '```')).toBe('');
  expect(stripAdvisorToolText(`[${command}]`)).toBe('');
});

test('does not remove ordinary JSON, links, or code examples', () => {
  const text =
    'See [admissions](https://example.com).\n```json\n{"goal":"study"}\n```\nUse `notes`.';
  expect(stripAdvisorToolText(text)).toBe(text);
  expect(stripAdvisorToolText('{"goal":"study"}')).toBe('{"goal":"study"}');
});

test('withholds an unfinished internal command at stream end', () => {
  expect(stripAdvisorToolText(command.slice(0, -5))).toBe('');
});

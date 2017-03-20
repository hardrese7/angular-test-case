import { HighlightPipe } from './highlight.pipe';
describe('TitleCasePipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  let pipe = new HighlightPipe();
  it('should wrap "do" to span', () => {
    expect(pipe.transform('Dog ate my homework. Just do it.', 'do'))
    // tslint:disable-next-line:max-line-length
    .toBe('<span class="highlight">Do</span>g ate my homework. Just <span class="highlight">do</span> it.');
  });
  it('should wrap nothing to span when no results', () => {
    const str = 'cat ate my homework. Just did it.';
    expect(pipe.transform(str, 'do')).toBe(str);
  });
  it('should wrap nothing to span when empty', () => {
    const str = 'cat ate my homework. Just did it.';
    expect(pipe.transform(str, '')).toBe(str);
  });
  it('should wrap nothing in empty string', () => {
    const str = '';
    expect(pipe.transform(str, 'do')).toBe(str);
  });
  it('should wrap nothing in empty string with empty term', () => {
    const str = '';
    expect(pipe.transform(str, '')).toBe(str);
  });
});

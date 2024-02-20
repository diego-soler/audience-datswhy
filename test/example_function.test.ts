import { exampleFunc } from '../src/index';


describe('exampeFunc', () => {
  it('should return a string', () => {
    const result = exampleFunc('Pepe', 'Argento', 40);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result.endsWith('years old.')).toBeTruthy();
  });
  
});
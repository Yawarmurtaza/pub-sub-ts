import { add } from '../index';
 
describe('testing index file', () => {
  test('empty string should result in zero', () => {
    expect(add('')).toBe(0);
  });

  test('empty string should result in zero', () => {
    expect(add('1,2,3,4,5')).toBe(15);
  });

});
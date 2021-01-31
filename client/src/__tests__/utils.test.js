import { nameWithoutSpace } from '../utils/nameWithoutSpace';

test('Expect nameWithoutSpace() to return null if passed anything but a string', () => {
    let result = nameWithoutSpace(1)
    expect(result).toBe(null)
})

test('Expect nameWithoutSpace() to return words_sepparated_by_underscores instead of spaces', () => {
    let result = nameWithoutSpace('test string')
    expect(result).toEqual('test_string')
})
import LocationBuilder from "./LocationBuilder";

test('should remove parts', () => {

  let sut = new LocationBuilder("/test/123/456");

  sut.pop();

  let newPathName = sut.path;

  expect(newPathName).toBe("/test/123")
});

test('should add parts with trailing slash', () => {

  let sut = new LocationBuilder("/test/");

  sut.push("123");

  let newPathName = sut.path;

  expect(newPathName).toBe("/test/123")
});


test('should add parts with missing slash', () => {

  let sut = new LocationBuilder("/test");

  sut.push("123");

  let newPathName = sut.path;

  expect(newPathName).toBe("/test/123")
});


import Locations from "../src/routes/App/routes/Nobt/modules/navigation/Locations";

test('should remove parts', () => {

  let sut = new Locations("/test/123/456");

  sut.removeParts();

  let newPathName = sut.path;

  expect(newPathName).toBe("/test/123")
});

test('should add parts with trailing slash', () => {

  let sut = new Locations("/test/");

  sut.addPart("123");

  let newPathName = sut.path;

  expect(newPathName).toBe("/test/123")
});


test('should add parts with missing slash', () => {

  let sut = new Locations("/test");

  sut.addPart("123");

  let newPathName = sut.path;

  expect(newPathName).toBe("/test/123")
});


test('should merge styles', () => {

  let theme = {
    input: "class",
  };

  let themes = [theme, theme];

  let actual = themes.aggregate( (existingValue, newValue) => `${existingValue} ${newValue}` );

  expect(actual.input).toBe("class class");
});


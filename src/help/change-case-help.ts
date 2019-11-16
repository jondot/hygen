export function changeCaseHelp() {
  return `change-case - https://github.com/blakeembrey/change-case

    camelCase

      Return as a string with the separators denoted by having the next letter capitalized.
    
      changeCase.camelCase('test string')
      //=> "testString"

    constantCase

      Return as an upper case, underscore separated string.

      changeCase.constantCase('test string')
      //=> "TEST_STRING"
      
    dotCase

      Return as a lower case, period separated string.

      changeCase.dotCase('test string')
      //=> "test.string"

    headerCase

      Return as a title cased, dash separated string.

      changeCase.headerCase('test string')
      //=> "Test-String"

    isLowerCase

      Return a boolean indicating whether the string is lower cased.

      changeCase.isLowerCase('test string')
      //=> true

    isUpperCase

      Return a boolean indicating whether the string is upper cased.

      changeCase.isUpperCase('test string')
      //=> false

    lowerCase

      Return the string in lower case.

      changeCase.lowerCase('TEST STRING')
      //=> "test string"

    lowerCaseFirst

      Return the string with the first character lower cased.

      changeCase.lowerCaseFirst('TEST')
      //=> "tEST"

    noCase

      Return the string without any casing (lower case, space separated).

      changeCase.noCase('test string')
      //=> "test string"

    paramCase (kebabCase, hyphenCase)

      Return as a lower case, dash separated string.

      changeCase.paramCase('test string')
      //=> "test-string"

    pascalCase

      Return as a string denoted in the same fashion as 'camelCase', but with the first letter also capitalized.

      changeCase.pascalCase('test string')
      //=> "TestString"

    pathCase

      Return as a lower case, slash separated string.

      changeCase.pathCase('test string')
      //=> "test/string"

    sentenceCase

      Return as a lower case, space separated string with the first letter upper case.

      changeCase.sentenceCase('testString')
      //=> "Test string"

    snakeCase

      Return as a lower case, underscore separated string.

      changeCase.snakeCase('test string')
      //=> "test_string"

    swapCase

      Return as a string with every character case reversed.

      changeCase.swapCase('Test String')
      //=> "tEST sTRING"

    titleCase

      Return as a space separated string with the first character of every word upper cased.

      changeCase.titleCase('a simple test')
      //=> "A Simple Test"

    upperCase

      Return the string in upper case.

      changeCase.upperCase('test string')
      //=> "TEST STRING"

    upperCaseFirst

      Return the string with the first character upper cased.

      changeCase.upperCaseFirst('test')
      //=> "Test"
  `
}

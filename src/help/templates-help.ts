import { changeCaseHelp } from './change-case-help'
import { inflectionHelp } from './inflection-help'

export function templatesHelp() {
  return `
Template Helpers:
  You can use several provided helpers to transform and check text inside templates. 

    // example: <%= h.changeCase.camel(name) %>
    // example: <%= h.inflection.pluralize(name) %>

  # Methods summary - Change Case

  changeCase.camelCase('test string')    // => "testString"
  changeCase.constantCase('test string') // => "TEST_STRING"
  changeCase.dotCase('test string')      // => "test.string"
  changeCase.headerCase('test string')   // => "Test-String"
  changeCase.isLowerCase('test string')  // => true
  changeCase.isUpperCase('test string')  // => false
  changeCase.lowerCase('TEST STRING')    // => "test string"
  changeCase.lowerCaseFirst('TEST')      // => "tEST"
  changeCase.noCase('test string')       // => "test string"
  changeCase.paramCase('test string')    // => "test-string"
  changeCase.pascalCase('test string')   // => "TestString"
  changeCase.pathCase('test string')     // => "test/string"
  changeCase.sentenceCase('testString')  // => "Test string"
  changeCase.snakeCase('test string')    // => "test_string"
  changeCase.swapCase('Test String')     // => "tEST sTRING"
  changeCase.titleCase('a simple test')  // => "A Simple Test"
  changeCase.upperCase('test string')    // => "TEST STRING"
  changeCase.upperCaseFirst('test')      // => "Test"

  # Methods summary - Inflection

  inflection.indexOf([ 'hi','there' ], 'guys' );       // === -1
  inflection.indexOf([ 'hi','there' ], 'hi' );         // === 0
  inflection.pluralize( 'person' );                    // === 'people'
  inflection.pluralize( 'octopus' );                   // === "octopi"
  inflection.pluralize( 'Hat' );                       // === 'Hats'
  inflection.pluralize( 'person', 'guys' );            // === 'guys'
  inflection.singularize( 'people' );                  // === 'person'
  inflection.singularize( 'octopi' );                  // === "octopus"
  inflection.singularize( 'Hats' );                    // === 'Hat'
  inflection.singularize( 'guys', 'person' );          // === 'person'
  inflection.inflect( 'people', 1 );                   // === 'person'
  inflection.inflect( 'octopi', 1 );                   // === 'octopus'
  inflection.inflect( 'Hats', 1 );                     // === 'Hat'
  inflection.inflect( 'guys', 1 , 'person' );          // === 'person'
  inflection.inflect( 'person', 2 );                   // === 'people'
  inflection.inflect( 'octopus', 2 );                  // === 'octopi'
  inflection.inflect( 'Hat', 2 );                      // === 'Hats'
  inflection.inflect( 'person', 2, null, 'guys' );     // === 'guys'
  inflection.camelize( 'message_properties' );         // === 'MessageProperties'
  inflection.camelize( 'message_properties', true );   // === 'messageProperties'
  inflection.underscore( 'MessageProperties' );        // === 'message_properties'
  inflection.underscore( 'messageProperties' );        // === 'message_properties'
  inflection.underscore( 'MP' );                       // === 'm_p'
  inflection.underscore( 'MP', true );                 // === 'MP'
  inflection.humanize( 'message_properties' );         // === 'Message properties'
  inflection.humanize( 'message_properties', true );   // === 'message properties'
  inflection.capitalize( 'message_properties' );       // === 'Message_properties'
  inflection.capitalize( 'message properties', true ); // === 'Message properties'
  inflection.dasherize( 'message_properties' );        // === 'message-properties'
  inflection.dasherize( 'Message Properties' );        // === 'Message-Properties'
  inflection.titleize( 'message_properties' );         // === 'Message Properties'
  inflection.titleize( 'message properties to keep' ); // === 'Message Properties to Keep'
  inflection.demodulize( 'Message::Bus::Properties' ); // === 'Properties'
  inflection.tableize( 'MessageBusProperty' );         // === 'message_bus_properties'
  inflection.classify( 'message_bus_properties' );     // === 'MessageBusProperty'
  inflection.foreign_key( 'MessageBusProperty' );      // === 'message_bus_property_id'
  inflection.foreign_key( 'MessageBusProperty', true );// === 'message_bus_propertyid'
  inflection.ordinalize( 'the 1 pitch' );              // === 'the 1st pitch'
  inflection.transform( 'all job', [ 'pluralize', 'capitalize', 'dasherize' ]); // === 'All-jobs'

  ${changeCaseHelp()}

  ${inflectionHelp()}
  `
}

export function inflectionHelp() {
  return `# inflection - https://github.com/dreamerslab/node.inflection

    indexOf
    
      This lets us detect if an Array contains a given element.

      inflection.indexOf([ 'hi','there' ], 'guys' ); // === -1
      inflection.indexOf([ 'hi','there' ], 'hi' ); // === 0

    pluralize

      This function adds pluralization support to every String object.

      inflection.pluralize( 'person' ); // === 'people'
      inflection.pluralize( 'octopus' ); // === "octopi"
      inflection.pluralize( 'Hat' ); // === 'Hats'
      inflection.pluralize( 'person', 'guys' ); // === 'guys'

    singularize

      This function adds singularization support to every String object.

      inflection.singularize( 'people' ); // === 'person'
      inflection.singularize( 'octopi' ); // === "octopus"
      inflection.singularize( 'Hats' ); // === 'Hat'
      inflection.singularize( 'guys', 'person' ); // === 'person'

    inflect

      This function will pluralize or singularlize a String appropriately based on an integer value.

      inflection.inflect( 'people', 1 ); // === 'person'
      inflection.inflect( 'octopi', 1 ); // === 'octopus'
      inflection.inflect( 'Hats', 1 ); // === 'Hat'
      inflection.inflect( 'guys', 1 , 'person' ); // === 'person'
      inflection.inflect( 'person', 2 ); // === 'people'
      inflection.inflect( 'octopus', 2 ); // === 'octopi'
      inflection.inflect( 'Hat', 2 ); // === 'Hats'
      inflection.inflect( 'person', 2, null, 'guys' ); // === 'guys'

    camelize

      This function transforms String object from underscore to camelcase.

      inflection.camelize( 'message_properties' ); // === 'MessageProperties'
      inflection.camelize( 'message_properties', true ); // === 'messageProperties'

    underscore

      This function transforms String object from camelcase to underscore.

      inflection.underscore( 'MessageProperties' ); // === 'message_properties'
      inflection.underscore( 'messageProperties' ); // === 'message_properties'
      inflection.underscore( 'MP' ); // === 'm_p'
      inflection.underscore( 'MP', true ); // === 'MP'

    humanize

      This function adds humanize support to every String object.

      inflection.humanize( 'message_properties' ); // === 'Message properties'
      inflection.humanize( 'message_properties', true ); // === 'message properties'

    capitalize

      This function adds capitalization support to every String object.

      inflection.capitalize( 'message_properties' ); // === 'Message_properties'
      inflection.capitalize( 'message properties', true ); // === 'Message properties'

    dasherize

      This function replaces underscores with dashes in the string.

      inflection.dasherize( 'message_properties' ); // === 'message-properties'
      inflection.dasherize( 'Message Properties' ); // === 'Message-Properties'

    titleize

      This function adds titleize support to every String object.

      inflection.titleize( 'message_properties' ); // === 'Message Properties'
      inflection.titleize( 'message properties to keep' ); // === 'Message Properties to Keep'

    demodulize

      This function adds demodulize support to every String object.

      inflection.demodulize( 'Message::Bus::Properties' ); // === 'Properties'

    tableize

      This function adds tableize support to every String object.

      inflection.tableize( 'MessageBusProperty' ); // === 'message_bus_properties'

    classify

      This function adds classification support to every String object.

      inflection.classify( 'message_bus_properties' ); // === 'MessageBusProperty'

    foreign_key

      This function adds foreign key support to every String object.

      inflection.foreign_key( 'MessageBusProperty' ); // === 'message_bus_property_id'
      inflection.foreign_key( 'MessageBusProperty', true ); // === 'message_bus_propertyid'

    ordinalize

      This function adds ordinalize support to every String object.

      inflection.ordinalize( 'the 1 pitch' ); // === 'the 1st pitch'

    transform

      This function performs multiple inflection methods on a string.

      inflection.transform( 'all job', [ 'pluralize', 'capitalize', 'dasherize' ]); // === 'All-jobs'
  `
}

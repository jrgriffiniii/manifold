module ApiDocs
  module Definitions
    module Resources
      class Text

        METADATA_ATTRIBUTES = {
          series_title: Types::String,
          container_title: Types::String,
          isbn: Types::String,
          issn: Types::String,
          doi: Types::String,
          unique_identifier: Types::String,
          language: Types::String,
          original_publisher: Types::String,
          original_publisher_place: Types::String,
          original_title: Types::String,
          publisher: Types::String,
          publisher_place: Types::String,
          version: Types::String,
          series_number: Types::String,
          edition: Types::String,
          issue: Types::String,
          volume: Types::String,
          rights: Types::String,
          rights_territory: Types::String,
          restrictions: Types::String,
          rights_holder: Types::String,
          original_publication_date: Types::DateTime
        }

        class << self

          include Resource

        end
      end
    end
  end
end
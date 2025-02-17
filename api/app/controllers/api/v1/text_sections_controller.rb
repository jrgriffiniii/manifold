module API
  module V1
    # Sections controller
    class TextSectionsController < ApplicationController

      resourceful! TextSection, authorize_options: { except: [:index, :show] }

      def show
        @text_section = load_text_section
        authorize_action_for @text_section.text
        includes = %w(stylesheets)
        render_single_resource @text_section,
                               include: includes
      end

      def update
        @text_section = load_and_authorize_text_section
        ::Updaters::TextSection.new(text_section_params).update(@text_section)
        render_single_resource @text_section
      end

      def destroy
        @text_section = load_text_section
        @text_section.destroy
      end

    end
  end
end

require "rails_helper"

RSpec.describe Analytics::Reports::ForText do
  let(:text) { texts.first }
  let(:text_section) { text_sections.first }
  let(:scope) { text }

  include_examples "analytics reporter visits"

  include_examples "analytics reporter events" do
    include_context "with a single text"

    let(:share_actions) { %w[facebook twitter] }

    let(:share_clicks) do
      visits.each do |visit|
        text.text_sections.each do |text_section|
          share_actions.map do |action|
            FactoryBot.create :analytics_event,
                              record: text_section,
                              name: "share_text_section",
                              properties: { action: action, text_section: text_section.id },
                              time: visit.started_at + 10.minutes
          end
        end
      end
    end

    let(:events) do
      annotations
      text_view_events
      text_section_view_events
      share_clicks
    end

    let(:expectations) do
      l_daily_visitors = (visit_days - 1).times.map do |t|
        { "x" => (Date.yesterday - (t + 1).days).to_s, "y" => repeat_visitor_count }
      end.tap { |a| a.push({ "x" => Date.yesterday.to_s, "y" => visitor_count }) }

      l_annotations = [{
        "highlights" => per_group_annotations_count * 4,
        "private_annotations" => per_group_annotations_count,
        "public_annotations" => per_group_annotations_count,
        "reading_group_annotations" => per_group_annotations_count * 2
      }]

      l_text_section_views = text_sections.map do |ts|
        { "id" => ts.id, "name" => ts.name, "count" => visits.count }
      end

      l_text_section_shares = [
        { "action" => share_action, "count" => share_count }
      ]

      l_text_section_citations = {
        "value" => citation_count
      }

      {
        daily_visitors: l_daily_visitors,
        annotations: l_annotations,
        text_section_views: l_text_section_views,
        shares: l_text_section_shares,
        citations: l_text_section_citations
      }

    end
  end
end
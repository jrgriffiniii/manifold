# Volumes belong to Journals
class JournalVolume < ApplicationRecord

  include Authority::Abilities
  include TrackedCreator
  include SerializedAbilitiesFor
  include Filterable

  belongs_to :journal, counter_cache: true
  has_many :journal_issues, dependent: :nullify

  validates :journal_id, presence: true
  validates :number, presence: true

  scope :in_reverse_order, -> { order(number: :desc) }
  scope :in_order, -> { order(number: :asc) }

end
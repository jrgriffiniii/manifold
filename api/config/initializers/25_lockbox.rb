secret_key_base = Rails.application.secrets.secret_key_base

if Rails.env.test?
  secret_key_base = secret_key_base.presence || Lockbox.generate_key
  filtered = secret_key_base.gsub(/[^a-zA-Z0-9]+/, "")
  slice = filtered[/\A([a-zA-Z0-9]{1,64})/, 1]

  # Consistently ensure that it's a 64-character hexadecimal key
  enforced_master_key = slice.rjust(64, "0")

  Lockbox.master_key = enforced_master_key
end

require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  config.storage = :fog
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: Rails.application.secrets.aws_access_key_id,
     # "AKIAJ7Z42JMJCDQCHHLA",
    aws_secret_access_key: Rails.application.secrets.aws_secret_access_key,
    # "RB/Hd0aUTRelnw5/9Ey2uHvj+esxv9JVT85xx7VV",
    region: 'ap-northeast-1'
  }
  config.fog_directory  = 'sample-testsdfafd'

  config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/sample-testsdfafd'
  
end

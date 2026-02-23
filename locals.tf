variable "environment" {
  description = "Environment name (development, staging, production)"
  type        = string
}

locals {
  config = {
    development = {
      env_tag                                = "dev"
      centralised_parameter_store_account_id = "115283375626"
      bucket_name                            = "fss-wordpress-plugin-development"
    }
    staging = {
      env_tag                                = "stg"
      centralised_parameter_store_account_id = "469511945406"
      bucket_name                            = "fss-wordpress-plugin-staging"
    }
    production = {
      env_tag                                = "prod"
      centralised_parameter_store_account_id = "918025132036"
      bucket_name                            = "fss-wordpress-plugin-production"
    }
  }

  current_config              = local.config[var.environment]
  application_name            = "fss wordpress plugin"
  parameter_store             = "arn:aws:ssm:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:parameter"
  centralised_parameter_store = "arn:aws:ssm:${data.aws_region.current.name}:${local.current_config.centralised_parameter_store_account_id}:parameter"
  bucket_name                 = local.current_config.bucket_name
}
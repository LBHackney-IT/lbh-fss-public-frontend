terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5"
    }
  }
  backend "s3" {
    encrypt = true
    region  = "eu-west-2"
    key     = "services/fss-public-frontend/terraform.tfstate"
  }
}

locals {
  default_tags = {
    Application     = local.application_name
    TeamEmail       = "developmentteam@hackney.gov.uk"
    Environment     = local.current_config.env_tag
    Confidentiality = "Internal"
  }
}

provider "aws" {
  region = "eu-west-2"
  default_tags {
    tags = local.default_tags
  }
}
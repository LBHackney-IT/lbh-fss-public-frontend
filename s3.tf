resource "aws_s3_bucket" "fss_wordpress_plugin" {
  bucket = local.bucket_name

  tags = {
    Name        = "FSS Wordpress Plugin ${title(var.environment)} S3 Bucket"
    Environment = local.current_config.env_tag
  }
}

# Block public access
resource "aws_s3_bucket_public_access_block" "fss_wordpress_plugin" {
  bucket = aws_s3_bucket.fss_wordpress_plugin.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Enable versioning
resource "aws_s3_bucket_versioning" "fss_wordpress_plugin" {
  bucket = aws_s3_bucket.fss_wordpress_plugin.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Enable encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "fss_wordpress_plugin" {
  bucket = aws_s3_bucket.fss_wordpress_plugin.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
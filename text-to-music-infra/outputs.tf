output "public_ip"{
    value = aws_instance.app_prod_ec2.public_ip
}
provider "aws" {
  region = "${var.aws_region}"
}

resource "aws_vpc" "app_prod" {
  cidr_block           = var.cidr_block
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Name = "app_prod_vpc"
  }
}

resource "aws_subnet" "my_subnet" {
  vpc_id            = aws_vpc.app_prod.id
  cidr_block        = cidrsubnet(aws_vpc.app_prod.cidr_block, 3, 1)
  availability_zone = var.availability_zone
  tags = {
    Name = "app_prod_subnet"
  }
}

resource "aws_internet_gateway" "app_prod_gw" {
    vpc_id = aws_vpc.app_prod.id
}

resource "aws_security_group" "security" {
  name = "allow-all"

  vpc_id = aws_vpc.app_prod.id

  ingress {
    cidr_blocks = [
      "0.0.0.0/0"
    ]
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
  }

  ingress {
    cidr_blocks = [
      "0.0.0.0/0"
    ]
    from_port = 3000
    to_port   = 3000
    protocol  = "tcp"
  }

   ingress {
    cidr_blocks = [
      "0.0.0.0/0"
    ]
    from_port = 4000
    to_port   = 4000
    protocol  = "tcp"
  }



  egress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_route_table" "example" {
  vpc_id = aws_vpc.app_prod.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.app_prod_gw.id
  }
}

resource "aws_route_table_association" "example" {
  subnet_id      = aws_subnet.my_subnet.id
  route_table_id = aws_route_table.example.id
}



data "aws_ami" "ubuntu_ami" {
  most_recent = true

  filter {
    name = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter{
    name = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"]
  
}

resource "tls_private_key" "rsa" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "tf_key" {
  key_name   = var.key_pair_name
  public_key = tls_private_key.rsa.public_key_openssh
}

resource "local_file" "tf_key" {
  content  = tls_private_key.rsa.private_key_pem
  filename = var.file_name

}


resource "aws_instance" "app_prod_ec2" {
  ami                         = data.aws_ami.ubuntu_ami.id
  instance_type               = var.instance_type
  key_name                    = var.key_pair_name
  security_groups             = ["${aws_security_group.security.id}"]
  associate_public_ip_address = true

  subnet_id = aws_subnet.my_subnet.id

  tags = {
    Name = "app_prod_ec2"
  }
}

resource "null_resource" "run_provisioner" {
  depends_on = [aws_instance.app_prod_ec2, local_file.tf_key]

  connection {
    type        = "ssh"
    user        = "ubuntu"
    private_key = file(local_file.tf_key.filename)
    host        = aws_instance.app_prod_ec2.public_ip
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt install -y apt-transport-https ca-certificates curl software-properties-common",
      "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg",
      "echo 'deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu focal stable' | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null",
      "sudo apt update",
      "sudo apt install -y docker-ce docker-ce-cli containerd.io",
      "sudo usermod -aG docker $USER",
      "sudo systemctl start docker",
      "sudo systemctl enable docker"
    ]
  }
}
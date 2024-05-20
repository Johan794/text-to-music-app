#!/bin/bash
SSH_KEY="tf_key.pem"
INSTANCE_IP=$(terraform output -raw public_ip)

echo "Deploying to production..."

scp -o StrictHostKeyChecking=no -i $SSH_KEY -r docker-compose.yaml ubuntu@"$INSTANCE_IP":/home/ubuntu

ssh -o StrictHostKeyChecking=no -i $SSH_KEY ubuntu@"$INSTANCE_IP" << EOF
  sudo docker compose -f docker-compose.yaml up -d
EOF

echo "Deployment complete!"







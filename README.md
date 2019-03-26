# lambda-internet-access-checker
AWS lambda to check if it has access to the internet.
I'm using it to test internet access from the VPCs.

## How to?

1. Go to AWS console -> Lambda and create new function.
2. Copy code from index.js
3. Paste the code to the editor in AWS console.
4. Add lambda to the appropriate VPC, subnets and security groups (depending what you want to test).
5. Run the test by clicking "TEST" button in the top right in AWS lambda console.
6. Examine the logs.


## QA

### My lambda times out
If lambda times out it is usually a good indication you don't have internet access.


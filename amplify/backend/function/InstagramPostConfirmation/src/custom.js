/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  console.log('Hey, Lambda function is working');
  console.log(event);
  return event;
};

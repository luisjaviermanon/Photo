/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const {DynamoDBClient} = require('@aws-sdk/client-dynamodb');

const docClient = new DynamoDBClient();
const env = process.env.ENV;
const AppsyncID = process.env.API_INSTAGRAM_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${AppsyncID}-${env}`; // TableName-AppsyncID-env
const userExits = async id => {
  const params = {
    TableName,
    Key: id,
  };
  try {
    const response = await docClient.get(params).promise();
    return !!response?.item;
  } catch (e) {
    return false;
  }
};
const saveUser = async user => {
  const date = new Date();
  const timestamp = date.getTime();
  const dateStr = date.toDateString();
  const Item = {
      ...user,
      __typename: 'User',
      createdAt: dateStr,
      updatedAt: dateStr,
      _LastChangedAt: timestamp,
      _version: 1,
    },
    params = {
      TableName,
      Item,
    };
  try {
    await docClient.put(params).promise();
  } catch (e) {
    console.log(e);
  }
};
exports.handler = async (event, context) => {
  console.log('Hey, Lambda function is working');
  console.log(event);
  if (!event?.request?.userAttribute) {
    console.log('No user data available');
    return;
  }
  const {sub, name, email} = event.request; // {sub,email,name}
  const newUser = {
    id: sub,
    name: name,
    email: email,
  };
  // check if the user already exits
  if (await !userExits(newUser.id)) {
    await saveUser(newUser);
    console.log(`User ${newUser.id} has been saved to the database`);
  } else {
    console.log(`User ${newUser.id} already exits`);
  }
  return event;
};

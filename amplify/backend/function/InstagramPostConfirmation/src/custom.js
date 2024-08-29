/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
import {DynamoDBClient, ScanCommand} from '@aws-sdk/client-dynamodb';

const docClient = new DynamoDBClient();
const TableName = '';
const userExits = async id => {
  const params = {
    TableName,
    Key: id,
  };
  try {
    const response = await docClient.get(params).promise();
    return !!response;
  } catch (e) {
    return false;
  }
};
const saveUser = async user => {
  const Item = {
      ...user,
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
  if (!userExits(newUser.id)) {
    saveUser(newUser);
  }
  return event;
};

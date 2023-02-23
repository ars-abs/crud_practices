import { findIndex } from '@laufire/utils/collection';
import statusTypes from './statusTypes';

const getStatus = (statusCode) =>
	findIndex(statusTypes, (status) => status(statusCode));

export default getStatus;

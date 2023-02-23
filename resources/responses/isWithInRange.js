import { range } from '@laufire/utils/collection';

const isWithInRange = (
	min, max, num,
) => range(min, max).includes(num);

export default isWithInRange;

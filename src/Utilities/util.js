/* not bound to style, should be computed */
import * as nodeTypes from '../Components/NodeGraph/nodeInstanceTypes';

export function computeInOffsetByIndex(x, y, index) {
	let outx = x + 15;
	let outy = y + 49 + (index * 17);

	return { x: outx, y: outy };
}

export function computeOutOffsetByIndex(x, y, index, discriminator) {

	var xOffset = 260;
	switch (discriminator) {
		case nodeTypes.NodeInstanceModel:
			xOffset = 260;
			break;
		case nodeTypes.NodeInstanceSqlDataSource:
			xOffset = 185;
			break;
		case nodeTypes.NodeInstanceConstantDataSource:
			xOffset = 185;
			break;
		case nodeTypes.NodeInstanceReport:
			xOffset = 185;
			break;
		default:
			break;
	}
	let outx = x + xOffset;
	let outy = y + 49 + (index * 17);

	if (isNaN(outx) || isNaN(outy)) {
		debugger;
	}
	return { x: outx, y: outy };

}
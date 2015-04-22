// Material Design Easing

var MdEasing = {
	inOut: new Ease(BezierEasing(0.4, 0, 0.2, 1)),
	in: new Ease(BezierEasing(0, 0, 0.2, 1)),
	out: new Ease(BezierEasing(0.4, 0, 1, 1))
};
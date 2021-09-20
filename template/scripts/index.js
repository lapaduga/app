'use strict';

// Счетчик бутылок
var counter = 0;
document.querySelector('.app__sign--plus').onclick = function () {
	counter++;
	document.querySelector('.app__amount').innerText = counter;
};
document.querySelector('.app__sign--minus').onclick = function () {
	if (counter > 0) {
		counter--;
		document.querySelector('.app__amount').innerText = counter;
	} else {
		counter = 0;
	}
};

// Закрытие модальных окон смахиванием вниз
var swipeBlocks = document.querySelectorAll('.popup__swipe');
var x1 = null;
var y1 = null;

if (swipeBlocks) {
	var _loop = function _loop(i) {
		var swipeBlock = swipeBlocks[i];
		swipeBlock.addEventListener('touchstart', handleTouchStart, false);
		swipeBlock.addEventListener('touchmove', handleTouchMove, false);

		function handleTouchStart(e) {
			var firstTouch = e.touches[0];
			x1 = firstTouch.clientX;
			y1 = firstTouch.clientY;
		}

		function handleTouchMove(e) {
			if (!x1 || !y1) {
				return false;
			}

			var x2 = e.touches[0].clientX;
			var y2 = e.touches[0].clientY;

			var xDiff = x2 - x1;
			var yDiff = y2 - y1;

			if (Math.abs(xDiff) < Math.abs(yDiff)) {
				if (yDiff > 0) {
					popupClose(swipeBlock.closest('.popup'));
				}
			}

			x1 = null;
			y1 = null;
		}
	};

	for (var i = 0; i < swipeBlocks.length; i++) {
		_loop(i);
	}
}
'use strict';

// popup
var popupLinks = document.querySelectorAll('.popup-link');
var body = document.querySelector('body');
var lockPadding = document.querySelectorAll('.lock-padding');

var unlock = true;

var timeout = 400;

if (popupLinks.length > 0) {
	var _loop = function _loop(index) {
		var popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			var popupName = popupLink.getAttribute('href').replace('#', '');
			var currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		});
	};

	for (var index = 0; index < popupLinks.length; index++) {
		_loop(index);
	}
}

var popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	var _loop2 = function _loop2(index) {
		var el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	};

	for (var index = 0; index < popupCloseIcon.length; index++) {
		_loop2(index);
	}
}
function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		var popupActive = document.querySelector('.popup._open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('_open');
		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupActive) {
	var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	if (unlock) {
		popupActive.classList.remove('_open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	var lockPaddingValue = window.innerWidth - document.querySelector('.app').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (var index = 0; index < lockPadding.length; index++) {
			var _el = lockPadding[index];
			_el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('_lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (var index = 0; index < lockPadding.length; index++) {
				var _el2 = lockPadding[index];
				_el2.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('_lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		var popupActive = document.querySelector('.popup._open');
		popupClose(popupActive);
	}
});

(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;else node = node.parentElement;
			}
			return null;
		};
	}
})();

(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
	}
})();
//# sourceMappingURL=index.js.map

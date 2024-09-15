// // Price Range Slider
// document.addEventListener('DOMContentLoaded', function () {
// 	var slider = document.getElementById('sl2');
// 	if (slider) {
// 	  noUiSlider.create(slider, {
// 		start: [20, 80],
// 		connect: true,
// 		range: {
// 		  'min': 0,
// 		  'max': 100
// 		}
// 	  });
// 	}
  
// 	var RGBChange = function () {
// 	  var r = document.getElementById('r');
// 	  var g = document.getElementById('g');
// 	  var b = document.getElementById('b');
// 	  var rgbElement = document.getElementById('RGB');
// 	  if (r && g && b && rgbElement) {
// 		rgbElement.style.background = 'rgb(' + r.value + ',' + g.value + ',' + b.value + ')';
// 	  }
// 	};
  
// 	// Scroll to Top
// 	var scrollUpButton = document.createElement('div');
// 	scrollUpButton.id = 'scrollUp';
// 	scrollUpButton.innerHTML = '<i class="fa fa-angle-up"></i>';
// 	scrollUpButton.style.position = 'fixed';
// 	scrollUpButton.style.bottom = '20px';
// 	scrollUpButton.style.right = '20px';
// 	scrollUpButton.style.cursor = 'pointer';
// 	scrollUpButton.style.zIndex = '2147483647';
// 	scrollUpButton.style.display = 'none';
// 	document.body.appendChild(scrollUpButton);
  
// 	window.addEventListener('scroll', function () {
// 	  if (window.scrollY > 300) {
// 		scrollUpButton.style.display = 'block';
// 	  } else {
// 		scrollUpButton.style.display = 'none';
// 	  }
// 	});
  
// 	scrollUpButton.addEventListener('click', function () {
// 	  window.scrollTo({ top: 0, behavior: 'smooth' });
// 	});
  
// 	// Update Price
// 	function updatePrice(container, n) {
// 	  var priceTag = container.querySelector('.cd-price');
// 	  var selectedItem = container.querySelectorAll('.cd-item-wrapper li')[n];
// 	  if (selectedItem) {
// 		if (selectedItem.dataset.sale) {
// 		  priceTag.classList.add('on-sale');
// 		  var newPriceTag = priceTag.nextElementSibling;
// 		  if (!newPriceTag || !newPriceTag.classList.contains('cd-new-price')) {
// 			newPriceTag = document.createElement('em');
// 			newPriceTag.className = 'cd-new-price';
// 			priceTag.parentNode.insertBefore(newPriceTag, priceTag.nextSibling);
// 		  }
// 		  newPriceTag.textContent = selectedItem.dataset.price;
// 		  setTimeout(function () {
// 			newPriceTag.classList.add('is-visible');
// 		  }, 100);
// 		} else {
// 		  priceTag.classList.remove('on-sale');
// 		  var newPriceTag = priceTag.nextElementSibling;
// 		  if (newPriceTag && newPriceTag.classList.contains('cd-new-price')) {
// 			newPriceTag.classList.remove('is-visible');
// 			newPriceTag.addEventListener('transitionend', function () {
// 			  newPriceTag.remove();
// 			}, { once: true });
// 		  }
// 		}
// 	  }
// 	}
//   });
  
// document.addEventListener('DOMContentLoaded', function () {
// 	// Price Range Slider
// 	var minPriceSlider = document.getElementById('min-price');
// 	var maxPriceSlider = document.getElementById('max-price');
// 	var minPriceValue = document.getElementById('min-price-value');
// 	var maxPriceValue = document.getElementById('max-price-value');
  
// 	function updatePriceRange() {
// 	  var minPrice = minPriceSlider.value;
// 	  var maxPrice = maxPriceSlider.value;
  
// 	  if (parseInt(minPrice) > parseInt(maxPrice)) {
// 		maxPriceSlider.value = minPrice;
// 		maxPrice = minPrice;
// 	  }
  
// 	  minPriceValue.textContent = minPrice;
// 	  maxPriceValue.textContent = maxPrice;
// 	}
  
// 	minPriceSlider.addEventListener('input', updatePriceRange);
// 	maxPriceSlider.addEventListener('input', updatePriceRange);
  
// 	updatePriceRange(); // Initialize values
  
// 	// RGB Change
// 	function RGBChange() {
// 	  var r = document.getElementById('r');
// 	  var g = document.getElementById('g');
// 	  var b = document.getElementById('b');
// 	  var rgbElement = document.getElementById('RGB');
  
// 	  if (r && g && b && rgbElement) {
// 		var rgbColor = 'rgb(' + r.value + ',' + g.value + ',' + b.value + ')';
// 		rgbElement.style.background = rgbColor;
// 		document.getElementById('rgb-value').textContent = rgbColor;
// 	  }
// 	}
  
// 	document.getElementById('r').addEventListener('input', RGBChange);
// 	document.getElementById('g').addEventListener('input', RGBChange);
// 	document.getElementById('b').addEventListener('input', RGBChange);
  
// 	RGBChange(); // Initialize color
  
// 	// Scroll to Top
// 	var scrollUpButton = document.createElement('div');
// 	scrollUpButton.id = 'scrollUp';
// 	scrollUpButton.innerHTML = '<i class="fa fa-angle-up"></i>';
// 	scrollUpButton.style.position = 'fixed';
// 	scrollUpButton.style.bottom = '20px';
// 	scrollUpButton.style.right = '20px';
// 	scrollUpButton.style.cursor = 'pointer';
// 	scrollUpButton.style.zIndex = '2147483647';
// 	scrollUpButton.style.display = 'none';
// 	document.body.appendChild(scrollUpButton);
  
// 	window.addEventListener('scroll', function () {
// 	  if (window.scrollY > 300) {
// 		scrollUpButton.style.display = 'block';
// 	  } else {
// 		scrollUpButton.style.display = 'none';
// 	  }
// 	});
  
// 	scrollUpButton.addEventListener('click', function () {
// 	  window.scrollTo({ top: 0, behavior: 'smooth' });
// 	});
  
// 	// Update Price
// 	function updatePrice(container, n) {
// 	  var priceTag = container.querySelector('.cd-price');
// 	  var selectedItem = container.querySelectorAll('.cd-item-wrapper li')[n];
// 	  if (selectedItem) {
// 		if (selectedItem.dataset.sale) {
// 		  priceTag.classList.add('on-sale');
// 		  var newPriceTag = priceTag.nextElementSibling;
// 		  if (!newPriceTag || !newPriceTag.classList.contains('cd-new-price')) {
// 			newPriceTag = document.createElement('em');
// 			newPriceTag.className = 'cd-new-price';
// 			priceTag.parentNode.insertBefore(newPriceTag, priceTag.nextSibling);
// 		  }
// 		  newPriceTag.textContent = selectedItem.dataset.price;
// 		  setTimeout(function () {
// 			newPriceTag.classList.add('is-visible');
// 		  }, 100);
// 		} else {
// 		  priceTag.classList.remove('on-sale');
// 		  var newPriceTag = priceTag.nextElementSibling;
// 		  if (newPriceTag && newPriceTag.classList.contains('cd-new-price')) {
// 			newPriceTag.classList.remove('is-visible');
// 			newPriceTag.addEventListener('transitionend', function () {
// 			  newPriceTag.remove();
// 			}, { once: true });
// 		  }
// 		}
// 	  }
// 	}
//   });
  
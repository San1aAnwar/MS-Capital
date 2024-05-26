(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }
});


// About us section //

document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.nav-link');

  tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      const targetTab = document.querySelector(e.target.getAttribute('href'));
      const activeTabs = document.querySelectorAll('.nav-link.active');

      activeTabs.forEach(activeTab => {
        activeTab.classList.remove('active');
      });

      tab.classList.add('active');

      const activeContents = document.querySelectorAll('.tab-pane.fade.show.active');

      activeContents.forEach(activeContent => {
        activeContent.classList.remove('show', 'active');
      });

      targetTab.classList.add('show', 'active');
    });
  });
});

// calculator //

function updateValue(id, value) {
	document.getElementById(id).innerText = value;
}

function calculateSIP() {
	const investment = parseFloat(document.getElementById('investment').value);
	const rate = parseFloat(document.getElementById('rate').value) / 100;
	const years = parseFloat(document.getElementById('years').value);

	const totalValue = investment * Math.pow((1 + rate / 12), (years * 12));
	const estReturns = totalValue - investment;

	document.getElementById('result').innerHTML = `
		<div>Invested Amount: <span>₹${investment.toLocaleString('en-IN')}</span></div>
		<div>Estimated Returns: <span>₹${estReturns.toLocaleString('en-IN')}</span></div>
		<div>Total Value: <span>₹${totalValue.toLocaleString('en-IN')}</span></div>
	`;

	renderChart(investment, estReturns);
}

function renderChart(investedAmount, estReturns) {
	const ctx = document.getElementById('chart').getContext('2d');
	if (window.myChart) {
		window.myChart.destroy();
	}
	window.myChart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: ['Invested Amount', 'Estimated Returns'],
			datasets: [{
				data: [investedAmount, estReturns],
				backgroundColor: ['#4caf50', '#ff5722']
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: true,
					position: 'bottom'
				}
			}
		}
	});
}

window.onload = function() {
	calculateSIP(); // Initial calculation to display default values
}

// script.js
console.log("Script loaded");




// animation
  const pagetwo = document.querySelector('#pagetwo');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        pagetwo.classList.add('animate__animated', 'animate__slideInRight');
      }
    });
  });

  observer.observe(pagetwo);

  const timeline = document.querySelector('#timeline');

  const observer1 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        timeline.classList.add('animate__animated', 'animate__slideInRight');
      }
    });
  });

  observer.observer1(timeline);

 
// loader

window.onload = function() {
	const loader = document.getElementById('loader');
	loader.style.opacity = '0';
	loader.style.transition = 'opacity 0.5s';
  
	setTimeout(function() {
	  loader.style.display = 'none';
	}, 500);
  };
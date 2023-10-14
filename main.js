var opt_btn = document.querySelectorAll('.btn-opt');
var contGo_btn = document.getElementById('go');
var contPause_btn = document.getElementById('pause');
var contReset_btn = document.getElementById('reset');
var min_span = document.getElementById('min');
var sec_span = document.getElementById('sec');
var sesTime_span = document.getElementById('sesTime');
var brkTime_span = document.getElementById('brkTime');
var prog_div = document.getElementById('prog');
var not = new Audio('https://notificationsounds.com/soundfiles/cbcb58ac2e496207586df2854b17995f/file-sounds-1103-quite-impressed.wav');

var getTimer = function(p) {
	var time;
	if(p<=0) {
		time = '00';
	}
	else if(p<10) {
		time = '0'+p;
	}
	else {
		time = p;
	}
	return time;
}


var changeTimeLength = function(e) {
	var opt = e.target.textContent;
	if(opt==="+") {
		var target = e.target.nextElementSibling;
		var newTime = parseInt(target.textContent)+1;
	}
	else if(opt==='-') {
		var target = e.target.previousElementSibling;
		var newTime = parseInt(target.textContent)-1;
	}
	target.innerHTML = getTimer(newTime);
}

var RunTimer = {

	time: "",
	sesLen: 2,
	brkLen: 1,
	isSes: false,
	isReset: true,

	runtimes: function() {
		this.time = setInterval(this.calTime, 1000);
	},

	calTime: function() {
		var currMin = parseInt(min_span.textContent);
		var currSec = parseInt(sec_span.textContent);
		if(currSec===0) {
			if(currMin===0) {
        not.play();
				RunTimer.setTime();
				var progColor = !(RunTimer.isSes)? 'brk-prog': 'ses-prog';
				prog_div.className = "clock "+progColor+ " active"

			}
			else {
				min_span.innerHTML = getTimer(currMin-1);
				sec_span.innerHTML = getTimer(60);
				currSec=60;
			}
		}
		prog_div.classList.add("active");
		sec_span.innerHTML = getTimer(currSec-1);
	},

	pauseTime: function() {
		prog_div.classList.remove("active");
		clearInterval(this.time);
	},

	setTime: function() {
		var len = (this.isSes)? this.brkLen: this.sesLen;
		this.isSes = !this.isSes;
		min_span.innerHTML = getTimer(len);
		sec_span.innerHTML = getTimer(0);
	},

	resetTime: function() {
		this.sesLen = parseInt(sesTime_span.textContent);
		this.brkLen = parseInt(brkTime_span.textContent);
		min_span.innerHTML = getTimer(0);
		sec_span.innerHTML = getTimer(0);
		prog_div.className = "clock"
		this.isSes = false;
		this.isReset = false;
	}
}

function pTime(e) {
	contPause_btn.style.display = "none";
	contGo_btn.style.display = "inline-block";
	RunTimer.pauseTime();
}


opt_btn.forEach(function(x) {
	x.addEventListener('click', changeTimeLength);
});

contGo_btn.addEventListener('click', function(e) {
	contGo_btn.style.display = "none";
	contPause_btn.style.display = "inline-block";
	if(RunTimer.isReset) {
		RunTimer.resetTime();
	}
	RunTimer.runtimes();
});

contPause_btn.addEventListener('click', pTime);

contReset_btn.addEventListener('click', function(e) {
	var conf = confirm("Do you realy want to reset the clock ?");
	if(!conf) {return;}
	pTime();
	RunTimer.resetTime();
	RunTimer.isReset = true;
});
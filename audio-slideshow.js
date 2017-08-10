var audioShow = {

	// Find all audo elements and prepare the slideshow
	attachListener: function () {
		var self = this
		var audios = document.querySelectorAll('audio');
		audios.forEach( function(audio){
			var slidesId = audio.getAttribute('data-audio-show')
			var slidesObject = document.getElementById(slidesId)
			if (!slidesObject) {
				"No element with id " + slidesId
			}
			audio.setAttribute('current-slide-index', 0)
			self.sortAndSave(slidesId)
			self.setParameters(audio)
			audio.ontimeupdate = function(e) {self.checkDivs(e)}
		})
	},

	// Check if we need to change the slide
	checkDivs: function (e) {
		audio = e.target;
		starts = parseInt(audio.getAttribute('current-data-slide-starts'))
		ends = parseInt(audio.getAttribute('current-slide-ends'))
		next_end =  audio.getAttribute('next-slide-ends')
		currentTime = audio.currentTime
		if (currentTime <= starts || currentTime > ends) {
			audio.setAttribute('current-slide-ends',next_end)
			audio.setAttribute('current-data-slide-starts', ends)
			this.setParameters(audio)
		}
	},

	// We set the current and next slides and only check again when the slide changes. 
	// This prevents us from doing this calculation each time the time update event fires
	setParameters: function (audio) {
		var self = this
		var slidesId = audio.getAttribute('data-audio-show')
		if (audioShowSlides[slidesId].length < 1) return

		currentTime = audio.currentTime
		currentTime = audio.currentTime
		current_slide = parseInt(audio.getAttribute('current-slide-index'))

		do {
			starts = parseInt(audioShowSlides[slidesId][current_slide].getAttribute('data-slide-start'))
			next_slide = current_slide + 1
			ends = 99999999999999999;

			if (current_slide + 1 < (audioShowSlides[slidesId].length ))
				ends = parseInt(audioShowSlides[slidesId][current_slide + 1].getAttribute('data-slide-start'))
			if (currentTime < starts) {
				current_slide--
			} else if (currentTime > ends) {
				current_slide++			
			}
		} while ((currentTime < starts && current_slide >= 0) || (currentTime > ends && current_slide < audioShowSlides[slidesId].length ))

		next_slide = current_slide + 1
		ends = 99999999999999999;

		if (next_slide < (audioShowSlides[slidesId].length ))
			ends = parseInt(audioShowSlides[slidesId][next_slide].getAttribute('data-slide-start'))

		if (current_slide < 0) {
			self.hideAllSlides(audio)
		} else {
			audio.setAttribute('current-slide-index', current_slide)
			audio.setAttribute('current-slide', audioShowSlides[slidesId][current_slide].getAttribute('id'))
			audio.setAttribute('current-data-slide-starts', starts)
			self.showCorrectSlide(audio)
		}

		audio.setAttribute('current-slide-ends', ends)
		audio.setAttribute('next-slide-index', next_slide)
		// set a potential "infinite" end so that if there is no next slide, there is no more need to calculate
		next_ends = 99999999999999999;

		if (next_slide + 1 < (audioShowSlides[slidesId].length)) {
			audio.setAttribute('next-slide', audioShowSlides[slidesId][next_slide].getAttribute('id'))
			next_ends = parseInt(audioShowSlides[slidesId][next_slide + 1].getAttribute('data-slide-start'))
		}
		audio.setAttribute('next-slide-ends', next_ends)
	},

	hideAllSlides: function (audio) {
		var slidesId = audio.getAttribute('data-audio-show')
		var slidesObject = document.getElementById(slidesId)
		audioShowSlides[slidesId].forEach( function(element) {
			if(element.nodeType==1){
				element.style.display = "none"
			}
		})
	},

	showCorrectSlide: function (audio) {
		this.hideAllSlides(audio)
		document.getElementById(audio.getAttribute('current-slide')).style.display = "block";
	},

	sortAndSave: function (slidesId) {
		slidesObject = document.getElementById(slidesId)
		slidesArray = Array.prototype.slice.call(slidesObject.children, 0);

		// remove any child element that does not have a numeric start time, or does not have an id
		slidesArray = slidesArray.filter(function(slide){
			return (Number.isInteger(parseInt(slide.getAttribute("data-slide-start"))) && slide.hasAttribute("id"));
		});

		// sort the vaid children by the start time
		slidesArray.sort(function(a,b) {
			var aTime = parseInt(a.getAttribute("data-slide-start"))
			var bTime = parseInt(b.getAttribute("data-slide-start"))
			if (aTime > bTime) return 1;
			if (aTime < bTime) return -1;
			return 0;
		});
		audioShowSlides[slidesId] = slidesArray
	}
}

// This array will be used to keep a sorted list of the slides 
// so we don't have to check and sort the DOM whenever we need to change the slide
var audioShowSlides = [];

window.addEventListener("load", function(){audioShow.attachListener()});

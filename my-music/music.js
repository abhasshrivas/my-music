// Click-to-play: play audio from any card/item with data-audio
(function () {
	const audio = document.getElementById('global-audio');
	if (!audio) return;
	


	// Optional UI hooks
	const nowPlayingName = document.querySelector('.music-controller .audio-name');
	const nowPlayingImage = document.querySelector('.music-controller .audio-image');
	let currentUrl = '';

	function findItemWithAudio(target) {
		let node = target;
		while (node && node !== document) {
			if (node.hasAttribute && node.hasAttribute('data-audio')) return node;
			node = node.parentNode;
		}
		return null;
	}

	function updateNowPlayingUI(fromItem) {
		if (!fromItem) return;
		const titleEl = fromItem.querySelector('.heading-3');
		const imgEl = fromItem.querySelector('img');
		if (nowPlayingName && titleEl) nowPlayingName.textContent = titleEl.textContent.trim();
		if (nowPlayingImage && imgEl && imgEl.src) nowPlayingImage.src = imgEl.src;
	}

	// Simple logging for debugging
	audio.addEventListener('play', function(){ console.log('Audio: play', audio.currentSrc); });
	audio.addEventListener('pause', function(){ console.log('Audio: pause'); });
	audio.addEventListener('error', function(e){ console.error('Audio error', audio.error); alert('Audio failed to load/play.'); });

	document.addEventListener('click', function (e) {
		const item = findItemWithAudio(e.target);
		if (!item) return;
		e.preventDefault();
		const url = item.getAttribute('data-audio');
		console.log('Card clicked, url =', url);
		if (!url) { console.warn('No data-audio found on item'); return; }

		// Toggle if same track, otherwise load new
		if (currentUrl === url) {
			if (audio.paused) {
				
				audio.play();
			} else {
				audio.pause();
			}
			return;
		}

		currentUrl = url;
		audio.src = url;
		updateNowPlayingUI(item);
		audio.play();
	});
})();




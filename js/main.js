/* Chatlabz — shared interactions */

(function () {
	'use strict';

	/* FAQ accordion */
	document.querySelectorAll('.faq-question').forEach(function (btn) {
		btn.addEventListener('click', function () {
			var item = btn.closest('.faq-item');
			var isOpen = item.classList.contains('is-open');
			document.querySelectorAll('.faq-item').forEach(function (el) {
				el.classList.remove('is-open');
			});
			if (!isOpen) item.classList.add('is-open');
		});
	});

	/* Modal */
	var modalOverlay = document.getElementById('signin-modal');
	var openBtns = document.querySelectorAll('[data-open-signin]');
	var closeBtns = document.querySelectorAll('[data-close-modal]');

	function openModal() {
		if (!modalOverlay) return;
		modalOverlay.classList.add('is-open');
		document.body.style.overflow = 'hidden';
	}

	function closeModal() {
		if (!modalOverlay) return;
		modalOverlay.classList.remove('is-open');
		document.body.style.overflow = '';
	}

	openBtns.forEach(function (btn) {
		btn.addEventListener('click', openModal);
	});

	closeBtns.forEach(function (btn) {
		btn.addEventListener('click', closeModal);
	});

	if (modalOverlay) {
		modalOverlay.addEventListener('click', function (e) {
			if (e.target === modalOverlay) closeModal();
		});
	}

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') closeModal();
	});

	/* Sign in handlers */
	var googleBtn = document.getElementById('google-signin');
	var emailBtn = document.getElementById('email-signin');
	var emailInput = document.getElementById('signin-email');

	function handleSignIn() {
		closeModal();
		showToast('Signed in successfully! Redirecting…');
		setTimeout(function () {
			window.location.href = 'dashboard.html';
		}, 800);
	}

	if (googleBtn) googleBtn.addEventListener('click', handleSignIn);
	if (emailBtn) {
		emailBtn.addEventListener('click', function () {
			if (emailInput && !emailInput.value.trim()) {
				emailInput.focus();
				showToast('Please enter your email address');
				return;
			}
			handleSignIn();
		});
	}

	/* Toast */
	window.showToast = function (message) {
		var existing = document.querySelector('.toast');
		if (existing) existing.remove();

		var toast = document.createElement('div');
		toast.className = 'toast';
		toast.textContent = message;
		document.body.appendChild(toast);
		requestAnimationFrame(function () {
			toast.classList.add('is-visible');
		});
		setTimeout(function () {
			toast.classList.remove('is-visible');
			setTimeout(function () { toast.remove(); }, 300);
		}, 2800);
	};

	/* Source tabs (dashboard) */
	document.querySelectorAll('.source-tab').forEach(function (tab) {
		tab.addEventListener('click', function () {
			var target = tab.dataset.tab;
			document.querySelectorAll('.source-tab').forEach(function (t) {
				t.classList.remove('is-active');
			});
			document.querySelectorAll('.source-panel').forEach(function (p) {
				p.classList.remove('is-active');
			});
			tab.classList.add('is-active');
			var panel = document.getElementById('panel-' + target);
			if (panel) panel.classList.add('is-active');
		});
	});

	/* Sidebar links (dashboard) */
	document.querySelectorAll('.sidebar-link[data-source]').forEach(function (link) {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			var source = link.dataset.source;
			document.querySelectorAll('.sidebar-link').forEach(function (l) {
				l.classList.remove('is-active');
			});
			link.classList.add('is-active');
			var tab = document.querySelector('.source-tab[data-tab="' + source + '"]');
			if (tab) tab.click();
		});
	});

	/* File drop zone */
	var dropzone = document.getElementById('dropzone');
	var fileInput = document.getElementById('file-input');
	var fileList = document.getElementById('file-list');
	var charCount = document.getElementById('char-count');
	var progressFill = document.getElementById('progress-fill');
	var totalChars = 0;

	var sampleFiles = [
		{ name: 'product-catalog.pdf', size: '2.4 MB', chars: 48200 },
		{ name: 'faq-document.docx', size: '186 KB', chars: 12400 }
	];

	function updateCharCount(add) {
		totalChars += add;
		if (charCount) charCount.textContent = totalChars.toLocaleString();
		if (progressFill) {
			var pct = Math.min((totalChars / 11000000) * 100, 100);
			progressFill.style.width = pct + '%';
		}
	}

	function addFileItem(file) {
		if (!fileList) return;
		var chars = file.chars || Math.floor(Math.random() * 50000) + 5000;
		var item = document.createElement('div');
		item.className = 'file-item';
		item.innerHTML =
			'<div class="file-item__icon">📄</div>' +
			'<div class="file-item__info">' +
				'<div class="file-item__name">' + file.name + '</div>' +
				'<div class="file-item__meta">' + (file.size || '') + ' · ' + chars.toLocaleString() + ' characters</div>' +
			'</div>' +
			'<button class="file-item__remove" aria-label="Remove">✕</button>';
		fileList.appendChild(item);
		updateCharCount(chars);
		item.querySelector('.file-item__remove').addEventListener('click', function () {
			updateCharCount(-chars);
			item.remove();
		});
	}

	if (fileList) {
		sampleFiles.forEach(addFileItem);
	}

	if (dropzone && fileInput) {
		dropzone.addEventListener('click', function () { fileInput.click(); });

		dropzone.addEventListener('dragover', function (e) {
			e.preventDefault();
			dropzone.classList.add('is-dragover');
		});

		dropzone.addEventListener('dragleave', function () {
			dropzone.classList.remove('is-dragover');
		});

		dropzone.addEventListener('drop', function (e) {
			e.preventDefault();
			dropzone.classList.remove('is-dragover');
			Array.from(e.dataTransfer.files).forEach(function (f) {
				addFileItem({ name: f.name, size: formatSize(f.size) });
			});
		});

		fileInput.addEventListener('change', function () {
			Array.from(fileInput.files).forEach(function (f) {
				addFileItem({ name: f.name, size: formatSize(f.size) });
			});
			fileInput.value = '';
		});
	}

	function formatSize(bytes) {
		if (bytes < 1024) return bytes + ' B';
		if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
		return (bytes / 1048576).toFixed(1) + ' MB';
	}

	/* Website crawl */
	var crawlBtn = document.getElementById('crawl-btn');
	var urlInput = document.getElementById('website-url');
	var linkList = document.getElementById('link-list');

	if (crawlBtn && urlInput) {
		crawlBtn.addEventListener('click', function () {
			var url = urlInput.value.trim();
			if (!url) {
				showToast('Please enter a website URL');
				urlInput.focus();
				return;
			}
			if (!url.startsWith('http')) url = 'https://' + url;
			crawlBtn.disabled = true;
			crawlBtn.textContent = 'Crawling…';
			setTimeout(function () {
				crawlBtn.disabled = false;
				crawlBtn.textContent = 'Crawl Links';
				addLink(url);
				addLink(url.replace(/\/$/, '') + '/about');
				addLink(url.replace(/\/$/, '') + '/faq');
				addLink(url.replace(/\/$/, '') + '/pricing');
				updateCharCount(28400);
				showToast('4 pages crawled successfully');
			}, 1500);
		});
	}

	function addLink(url) {
		if (!linkList) return;
		var exists = Array.from(linkList.children).some(function (el) {
			return el.querySelector('.link-list__url').textContent === url;
		});
		if (exists) return;
		var item = document.createElement('div');
		item.className = 'link-list__item';
		item.innerHTML =
			'<span class="link-list__url">' + url + '</span>' +
			'<button class="btn btn--sm btn--ghost file-item__remove">Remove</button>';
		linkList.appendChild(item);
		item.querySelector('button').addEventListener('click', function () {
			updateCharCount(-7100);
			item.remove();
		});
	}

	/* Text source */
	var textArea = document.getElementById('text-source');
	if (textArea) {
		var debounce;
		textArea.addEventListener('input', function () {
			clearTimeout(debounce);
			debounce = setTimeout(function () {
				var len = textArea.value.length;
				if (charCount) {
					var base = 60600;
					charCount.textContent = (base + len).toLocaleString();
					if (progressFill) {
						progressFill.style.width = Math.min(((base + len) / 11000000) * 100, 100) + '%';
					}
				}
			}, 300);
		});
	}

	/* Create chatbot */
	var createBtn = document.getElementById('create-chatbot');
	if (createBtn) {
		createBtn.addEventListener('click', function () {
			if (totalChars === 0 && charCount) {
				var current = parseInt(charCount.textContent.replace(/,/g, ''), 10) || 0;
				if (current < 100) {
					showToast('Add at least one data source first');
					return;
				}
			}
			createBtn.disabled = true;
			createBtn.textContent = 'Creating…';
			setTimeout(function () {
				createBtn.disabled = false;
				createBtn.textContent = 'Create Chatbot';
				showToast('Chatbot created! Embed code ready.');
			}, 2000);
		});
	}

	/* Init char display on dashboard */
	if (charCount && charCount.textContent === '0') {
		updateCharCount(60600);
	}
})();

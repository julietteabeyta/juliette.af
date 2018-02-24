const overlay = container => {
	const searchable = container || document;
	const projectLinks = searchable.querySelectorAll('.project-link');
	const openOverlay = e => {
		const target = e.target.parentNode.dataset.target;
		const targetEl = searchable.querySelector(`#${target}`);
		if (targetEl) {
			targetEl.classList.add('active');
			const close = targetEl.querySelector('.close');
			const background = searchable.querySelector('.overlay-background');
			const removeActive = () => {
				targetEl.classList.remove('active');
			}
			background.addEventListener('click', removeActive)
			close.addEventListener('click', removeActive)	
		}
		
	}
	projectLinks.forEach(projectLink => projectLink.addEventListener('click', openOverlay));
}

export default overlay;
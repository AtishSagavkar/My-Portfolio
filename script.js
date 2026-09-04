const { useEffect } = React;

function PortfolioApp() {
	useEffect(() => {
		const year = document.getElementById('year');
		const printButton = document.querySelector('.print-resume');
		const menuToggle = document.querySelector('.menu-toggle');
		const navigation = document.querySelector('.nav-links');
		const navLinks = [...document.querySelectorAll('.nav-links a')];
		const sections = navLinks
			.map((link) => document.querySelector(link.getAttribute('href')))
			.filter(Boolean);

		year.textContent = new Date().getFullYear();

		const printResume = () => window.print();
		const toggleMenu = () => {
			const isOpen = navigation.classList.toggle('is-open');
			menuToggle.setAttribute('aria-expanded', isOpen);
			menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
		};
		const closeMenu = () => {
			navigation.classList.remove('is-open');
			menuToggle.setAttribute('aria-expanded', 'false');
			menuToggle.setAttribute('aria-label', 'Open navigation menu');
		};

		printButton?.addEventListener('click', printResume);
		menuToggle?.addEventListener('click', toggleMenu);
		navLinks.forEach((link) => link.addEventListener('click', closeMenu));

		const updateActiveLink = () => {
			const currentSection = sections.find((section) => {
				const bounds = section.getBoundingClientRect();
				return bounds.top <= 150 && bounds.bottom > 150;
			});

			navLinks.forEach((link) => {
				const isActive = currentSection && link.getAttribute('href') === `#${currentSection.id}`;
				link.toggleAttribute('aria-current', Boolean(isActive));
			});
		};

		window.addEventListener('scroll', updateActiveLink, { passive: true });
		updateActiveLink();

		return () => {
			printButton?.removeEventListener('click', printResume);
			menuToggle?.removeEventListener('click', toggleMenu);
			navLinks.forEach((link) => link.removeEventListener('click', closeMenu));
			window.removeEventListener('scroll', updateActiveLink);
		};
	}, []);

	return null;
}

ReactDOM.createRoot(document.getElementById('react-root')).render(React.createElement(PortfolioApp));

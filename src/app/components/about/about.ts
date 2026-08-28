import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({ selector: 'app-about', standalone: true, templateUrl: './about.html', styleUrl: './about.scss' })
export class AboutComponent implements AfterViewInit, OnDestroy {
	@ViewChild('aboutSection') private aboutSection?: ElementRef<HTMLElement>;
	private observer?: IntersectionObserver;

	ngAfterViewInit(): void {
		const section = this.aboutSection?.nativeElement;
		if (!section || typeof IntersectionObserver === 'undefined') return;
		this.observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				section.classList.add('is-visible');
				this.observer?.disconnect();
			}
		}, { threshold: 0.2 });
		this.observer.observe(section);
	}

	ngOnDestroy(): void {
		this.observer?.disconnect();
	}
}

import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild, signal } from '@angular/core';

interface MoreProject {
	number: string;
	title: string;
	description: string;
	technologies: string[];
	type: string;
}

@Component({
	selector: 'app-more-builds',
	standalone: true,
	templateUrl: './more-builds.html',
	styleUrl: './more-builds.scss',
})
export class MoreBuildsComponent implements AfterViewInit, OnDestroy {
	@ViewChild('carousel') private carousel?: ElementRef<HTMLElement>;
	protected readonly activeIndex = signal(0);
	protected readonly cardsVisible = signal(3);
	private resizeObserver?: ResizeObserver;

	protected readonly projects: MoreProject[] = [
		{ number: '01', title: 'Bosla Online Courses', description: 'Backend for an online learning platform with courses, lessons, users, and video-related functionality.', technologies: ['ASP.NET Core', 'REST API', 'SQL Server'], type: 'courses' },
		{ number: '02', title: 'Inventory API', description: 'Backend system for managing products, stock levels, inventory operations, and related business logic.', technologies: ['ASP.NET Core', 'REST API', 'SQL Server'], type: 'inventory' },
		{ number: '03', title: 'Pharmacy Management System', description: 'Backend system for pharmacy operations, products, users, orders, and management workflows.', technologies: ['ASP.NET Core', 'EF Core', 'SQL Server'], type: 'pharmacy' },
		{ number: '04', title: 'E-Commerce API', description: 'Scalable backend for products, carts, orders, authentication, and commerce workflows.', technologies: ['ASP.NET Core', 'EF Core', 'SQL Server'], type: 'commerce' },

	];

	ngAfterViewInit(): void {
		this.updateCardsVisible();
		if (typeof ResizeObserver !== 'undefined' && this.carousel) {
			this.resizeObserver = new ResizeObserver(() => this.updateCardsVisible());
			this.resizeObserver.observe(this.carousel.nativeElement);
		}
	}

	ngOnDestroy(): void {
		this.resizeObserver?.disconnect();
	}

	@HostListener('window:resize')
	protected updateCardsVisible(): void {
		if (typeof window === 'undefined') return;
		this.cardsVisible.set(window.innerWidth <= 700 ? 1 : window.innerWidth <= 980 ? 2 : 3);
	}

	protected move(direction: number): void {
		const carousel = this.carousel?.nativeElement;
		if (!carousel) return;
		const nextIndex = Math.max(0, Math.min(this.projects.length - this.cardsVisible(), this.activeIndex() + direction));
		const card = carousel.firstElementChild as HTMLElement | null;
		carousel.scrollTo({ left: nextIndex * ((card?.offsetWidth ?? carousel.clientWidth) + 20), behavior: 'smooth' });
		this.activeIndex.set(nextIndex);
	}

	protected goTo(index: number): void {
		const carousel = this.carousel?.nativeElement;
		if (!carousel) return;
		const card = carousel.firstElementChild as HTMLElement | null;
		carousel.scrollTo({ left: index * ((card?.offsetWidth ?? carousel.clientWidth) + 20), behavior: 'smooth' });
		this.activeIndex.set(index);
	}

	protected onScroll(): void {
		const carousel = this.carousel?.nativeElement;
		const card = carousel?.firstElementChild as HTMLElement | null;
		if (carousel && card) this.activeIndex.set(Math.round(carousel.scrollLeft / (card.offsetWidth + 20)));
	}
}

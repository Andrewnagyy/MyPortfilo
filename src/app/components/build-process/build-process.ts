import { AfterViewInit, Component, ElementRef, OnDestroy, signal } from '@angular/core';

interface BuildStep {
  number: string;
  phase: string;
  title: string;
  description: string;
  technologies: string[];
  icon: string;
}

@Component({
  selector: 'app-build-process',
  standalone: true,
  templateUrl: './build-process.html',
  styleUrl: './build-process.scss',
})
export class BuildProcessComponent implements AfterViewInit, OnDestroy {
  protected readonly visible = signal(false);
  protected readonly steps: BuildStep[] = [
    {
      number: '01', phase: 'THINK', title: 'Understand', icon: '◌',
      description: 'I break down the problem, understand the requirements, and define what needs to be built.',
      technologies: ['Requirements', 'UX', 'Product Thinking'],
    },
    {
      number: '02', phase: 'DESIGN', title: 'Architect', icon: '◇',
      description: 'I design a clean system architecture and plan how the frontend, backend, and database work together.',
      technologies: ['Angular', 'API Design', 'Database Design'],
    },
    {
      number: '03', phase: 'BUILD', title: 'Build', icon: '</>',
      description: 'I turn the architecture into clean, maintainable software using modern development practices.',
      technologies: ['Angular', '.NET', 'EF Core'],
    },
    {
      number: '04', phase: 'OPTIMIZE', title: 'Optimize', icon: '⌁',
      description: 'I focus on performance, security, reliability, and scalability before the product reaches production.',
      technologies: ['SQL', 'Performance', 'Security'],
    },
    {
      number: '05', phase: 'SHIP', title: 'Deploy', icon: '↗',
      description: 'I take the product to production and make sure it runs reliably in the real world.',
      technologies: ['Docker', 'CI/CD', 'Deployment'],
    },
  ];

  protected readonly stack = [
    'Angular', 'TypeScript', 'C#', '.NET', 'ASP.NET Core',
    'Entity Framework Core', 'SQL Server', 'Docker', 'Git', 'GitHub',
  ];

  private observer?: IntersectionObserver;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.visible.set(true);
      return;
    }

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.visible.set(true);
        this.observer?.disconnect();
      }
    }, { threshold: 0.18 });
    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

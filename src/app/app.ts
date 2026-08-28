import { Component, ViewEncapsulation } from '@angular/core';
import { AboutComponent } from './components/about/about';
import { BuildProcessComponent } from './components/build-process/build-process';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';
import { HeaderComponent } from './components/header/header';
import { HomeComponent } from './components/home/home';
import { MoreBuildsComponent } from './components/more-builds/more-builds';
import { ProjectsComponent } from './components/projects/projects';

@Component({
  selector: 'app-root',
  imports: [
    AboutComponent,
    BuildProcessComponent,
    ContactComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    MoreBuildsComponent,
    ProjectsComponent,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss', './layout.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class App {}

import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Hero } from "../../components/hero/hero";
import { Cursor } from "../../components/cursor/cursor";
import { Experience } from "../../components/experience/experience";
import { Footer } from "../../components/footer/footer";
import { HireMe } from "../../components/hire-me/hire-me";
import { Technologies } from '../../appv2/components/technologies/technologies';
import { Work } from '../../appv2/components/work/work';
import { Myprojects } from "../../appv2/components/myprojects/myprojects";
import { About } from "../../appv2/components/about/about";

@Component({
  selector: 'app-landing-page',
  imports: [Navbar, Hero, Cursor, Experience, Footer, HireMe, Technologies, Work, Myprojects, About],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {

}

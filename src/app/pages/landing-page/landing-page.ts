import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Hero } from "../../components/hero/hero";
import { Cursor } from "../../components/cursor/cursor";
import { Traits } from "../../components/traits/traits";
import { Experience } from "../../components/experience/experience";
import { Projects } from "../../components/projects/projects";
import { Footer } from "../../components/footer/footer";
import { HireMe } from "../../components/hire-me/hire-me";

@Component({
  selector: 'app-landing-page',
  imports: [Navbar, Hero, Cursor, Traits, Experience, Projects, Footer, HireMe],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {

}

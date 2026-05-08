import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { Hero } from "../../components/hero/hero";
import { Cursor } from "../../components/cursor/cursor";
import { Traits } from "../../components/traits/traits";

@Component({
  selector: 'app-landing-page',
  imports: [Navbar, Hero, Cursor, Traits],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {

}
